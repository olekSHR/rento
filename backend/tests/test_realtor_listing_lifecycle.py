from types import SimpleNamespace

import pytest
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from app.core.exceptions import BadRequestException, ForbiddenException, UnauthorizedException
from app.core.security.hashing import hash_password
from app.core.upload_cleanup import (
    delete_upload_file,
    delete_upload_files,
    resolve_upload_file_path,
)
from app.database.database import Base, SessionLocal, engine
from app.models.favorite import Favorite
from app.models.property import Property, PropertyImage
from app.models.user import User
from app.repositories import property_repository
from app.routers import realtor_profiles
from app.services import property_service, session_service


@event.listens_for(Engine, "connect")
def _set_sqlite_foreign_keys(dbapi_connection, connection_record):
    if engine.url.get_backend_name() == "sqlite":
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()


class FakeDb:
    pass


@pytest.fixture(autouse=True)
def reset_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def db_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


@pytest.fixture
def isolated_uploads(tmp_path, monkeypatch):
    uploads_dir = tmp_path / "uploads"
    uploads_dir.mkdir()
    monkeypatch.chdir(tmp_path)
    return uploads_dir


def make_property(**overrides):
    data = {
        "id": 1,
        "owner_id": 10,
        "title": "Test listing",
        "description": "Description",
        "price": 1000,
        "city": "City",
        "rooms": 2,
        "image_url": "/uploads/test.jpg",
        "status": "available",
        "contact_name": "Contact",
        "phone": "+100",
        "whatsapp": "+200",
        "last_verified_at": None,
        "report_count": 0,
    }
    data.update(overrides)
    return SimpleNamespace(**data)


def make_user(**overrides):
    data = {
        "id": 10,
        "role": "realtor",
        "account_status": "active",
    }
    data.update(overrides)
    return SimpleNamespace(**data)


def seed_user(
    db_session: Session,
    *,
    role: str = "realtor",
    email: str = "owner@example.com",
) -> User:
    user = User(
        email=email,
        hashed_password=hash_password("password123"),
        role=role,
        account_status="active",
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


def seed_property(
    db_session: Session,
    *,
    owner_id: int,
    status: str = "available",
    image_url: str | None = "/uploads/owned.jpg",
    title: str = "Listing",
) -> Property:
    property_item = Property(
        title=title,
        description="Description",
        price=1000,
        city="City",
        rooms=2,
        owner_id=owner_id,
        image_url=image_url,
        status=status,
    )
    db_session.add(property_item)
    db_session.commit()
    db_session.refresh(property_item)
    return property_item


def seed_property_image(
    db_session: Session,
    *,
    property_id: int,
    url: str,
    is_cover: bool = False,
) -> PropertyImage:
    image = PropertyImage(
        property_id=property_id,
        url=url,
        is_cover=is_cover,
        sort_order=0,
    )
    db_session.add(image)
    db_session.commit()
    db_session.refresh(image)
    return image


def test_realtor_can_archive_own_available_listing(monkeypatch):
    property_item = make_property(status="available", owner_id=10)
    realtor = make_user(id=10, role="realtor")

    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_by_id",
        lambda db, property_id: property_item,
    )

    def fake_update_status(db, item, status, *, update_verified_at=False):
        item.status = status
        return item

    monkeypatch.setattr(
        property_service.property_repository,
        "update_property_status",
        fake_update_status,
    )

    property_service.ensure_property_mutation_allowed(property_item, realtor)
    result = property_service.archive_property(FakeDb(), 1, actor_user_id=10)

    assert result.status == "archived"


def test_archived_listing_disappears_from_public_results(monkeypatch):
    filters = []

    class FakeColumn:
        def __init__(self, name):
            self.name = name

        def __eq__(self, other):
            return ("eq", self.name, other)

        def ilike(self, value):
            return ("ilike", self.name, value)

        def desc(self):
            return ("desc", self.name)

        def asc(self):
            return ("asc", self.name)

    class FakeQuery:
        def filter(self, expression):
            filters.append(expression)
            return self

        def order_by(self, expression):
            return self

        def count(self):
            return 0

        def limit(self, value):
            return self

        def offset(self, value):
            return self

        def all(self):
            return []

    class FakeDbForListing:
        def query(self, model):
            return FakeQuery()

    fake_models = SimpleNamespace(
        Property=SimpleNamespace(
            status=FakeColumn("status"),
            city=FakeColumn("city"),
            price=FakeColumn("price"),
            rooms=FakeColumn("rooms"),
            created_at=FakeColumn("created_at"),
        )
    )

    monkeypatch.setattr(property_repository, "models", fake_models)

    result = property_repository.get_all_properties(FakeDbForListing())

    assert result["items"] == []
    assert ("eq", "status", "available") in filters
    assert ("eq", "status", "archived") not in filters


def test_realtor_can_restore_own_archived_listing(monkeypatch):
    property_item = make_property(status="archived", owner_id=10)
    realtor = make_user(id=10, role="realtor")

    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_by_id",
        lambda db, property_id: property_item,
    )

    def fake_update_status(db, item, status, *, update_verified_at=False):
        item.status = status
        if update_verified_at:
            item.last_verified_at = "verified-now"
        return item

    monkeypatch.setattr(
        property_service.property_repository,
        "update_property_status",
        fake_update_status,
    )

    property_service.ensure_property_mutation_allowed(property_item, realtor)
    result = property_service.activate_property(FakeDb(), 1, actor_user_id=10)

    assert result.status == "available"
    assert result.last_verified_at == "verified-now"


def test_realtor_cannot_archive_other_realtor_listing():
    property_item = make_property(status="available", owner_id=99)
    realtor = make_user(id=10, role="realtor")

    with pytest.raises(ForbiddenException):
        property_service.ensure_property_mutation_allowed(property_item, realtor)


def test_realtor_cannot_restore_other_realtor_listing():
    property_item = make_property(status="archived", owner_id=99)
    realtor = make_user(id=10, role="realtor")

    with pytest.raises(ForbiddenException):
        property_service.ensure_property_mutation_allowed(property_item, realtor)


def test_realtor_cannot_delete_other_realtor_listing():
    property_item = make_property(status="archived", owner_id=99)
    realtor = make_user(id=10, role="realtor")

    with pytest.raises(ForbiddenException):
        property_service.ensure_property_mutation_allowed(property_item, realtor)


def test_user_role_cannot_mutate_listing():
    property_item = make_property(status="available", owner_id=10)
    user = make_user(id=10, role="user")

    with pytest.raises(ForbiddenException):
        property_service.ensure_property_mutation_allowed(property_item, user)


def test_require_realtor_rejects_user_role():
    user = make_user(role="user")

    with pytest.raises(ForbiddenException):
        realtor_profiles.require_realtor(current_user=user)


def test_unauthenticated_request_is_rejected(db_session):
    with pytest.raises(UnauthorizedException):
        session_service.get_current_user_from_session(db_session, None)


def test_delete_my_archived_property_rejects_non_archived(db_session):
    owner = seed_user(db_session)
    property_item = seed_property(
        db_session,
        owner_id=owner.id,
        status="available",
    )

    with pytest.raises(BadRequestException, match="Only archived listings"):
        realtor_profiles.delete_my_archived_property(
            property_id=property_item.id,
            db=db_session,
            current_user=owner,
        )


def test_delete_my_archived_property_rejects_user_role(db_session):
    owner = seed_user(db_session, email="owner@example.com")
    user = seed_user(db_session, role="user", email="user@example.com")
    property_item = seed_property(
        db_session,
        owner_id=owner.id,
        status="archived",
    )

    with pytest.raises(ForbiddenException):
        realtor_profiles.delete_my_archived_property(
            property_id=property_item.id,
            db=db_session,
            current_user=user,
        )


def test_archive_rejects_non_available_listing(monkeypatch):
    property_item = make_property(status="pending", owner_id=10)

    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_by_id",
        lambda db, property_id: property_item,
    )

    with pytest.raises(BadRequestException, match="Only available listings"):
        property_service.archive_property(FakeDb(), 1)


def test_resolve_upload_file_path_rejects_outside_root(isolated_uploads):
    assert resolve_upload_file_path("/uploads/../secret.txt") is None
    assert resolve_upload_file_path("/etc/passwd") is None
    assert resolve_upload_file_path("/uploads/nested/file.jpg") is None


def test_delete_property_removes_db_rows_and_owned_file(
    db_session,
    isolated_uploads,
):
    owner = seed_user(db_session)
    other_user = seed_user(db_session, email="other@example.com")
    owned_file = isolated_uploads / "owned.jpg"
    unrelated_file = isolated_uploads / "unrelated.jpg"
    owned_file.write_bytes(b"owned")
    unrelated_file.write_bytes(b"keep")

    property_item = seed_property(
        db_session,
        owner_id=owner.id,
        status="archived",
        image_url="/uploads/owned.jpg",
    )
    seed_property_image(
        db_session,
        property_id=property_item.id,
        url="/uploads/owned.jpg",
        is_cover=True,
    )
    db_session.add(
        Favorite(
            user_id=other_user.id,
            property_id=property_item.id,
        )
    )
    db_session.commit()

    property_service.delete_property(
        db_session,
        property_item.id,
        actor_user_id=owner.id,
    )

    assert db_session.query(Property).filter_by(id=property_item.id).first() is None
    assert (
        db_session.query(PropertyImage)
        .filter_by(property_id=property_item.id)
        .count()
        == 0
    )
    assert (
        db_session.query(Favorite)
        .filter_by(property_id=property_item.id)
        .count()
        == 0
    )
    assert owned_file.exists() is False
    assert unrelated_file.exists() is True


def test_delete_property_succeeds_when_physical_file_missing(
    db_session,
    isolated_uploads,
):
    owner = seed_user(db_session)
    property_item = seed_property(
        db_session,
        owner_id=owner.id,
        status="archived",
        image_url="/uploads/missing.jpg",
    )

    property_service.delete_property(
        db_session,
        property_item.id,
        actor_user_id=owner.id,
    )

    assert db_session.query(Property).filter_by(id=property_item.id).first() is None


def test_delete_upload_file_skips_outside_root(isolated_uploads, monkeypatch):
    outside_file = isolated_uploads.parent / "outside.jpg"
    outside_file.write_bytes(b"outside")

    assert delete_upload_file("/uploads/../outside.jpg") is False
    assert outside_file.exists() is True


def test_delete_upload_files_preserves_unrelated_upload(isolated_uploads):
    owned = isolated_uploads / "owned.jpg"
    unrelated = isolated_uploads / "unrelated.jpg"
    owned.write_bytes(b"owned")
    unrelated.write_bytes(b"keep")

    delete_upload_files(["/uploads/owned.jpg"])

    assert owned.exists() is False
    assert unrelated.exists() is True


def test_realtor_router_delete_removes_archived_listing(
    db_session,
    isolated_uploads,
):
    owner = seed_user(db_session)
    owned_file = isolated_uploads / "router-owned.jpg"
    owned_file.write_bytes(b"owned")
    property_item = seed_property(
        db_session,
        owner_id=owner.id,
        status="archived",
        image_url="/uploads/router-owned.jpg",
    )

    response = realtor_profiles.delete_my_archived_property(
        property_id=property_item.id,
        db=db_session,
        current_user=owner,
    )

    assert response["success"] is True
    assert db_session.query(Property).filter_by(id=property_item.id).first() is None
    assert owned_file.exists() is False
