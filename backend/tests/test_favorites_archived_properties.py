import pytest
from fastapi.testclient import TestClient
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security.hashing import hash_password
from app.database.database import Base, SessionLocal, engine
from app.models.favorite import Favorite
from app.models.property import Property
from app.models.user import User
from app.services import property_service
from app.services.property_service import (
    PROPERTY_STATUS_ARCHIVED,
    PROPERTY_STATUS_AVAILABLE,
)


@event.listens_for(Engine, "connect")
def _set_sqlite_foreign_keys(dbapi_connection, connection_record):
    if engine.url.get_backend_name() == "sqlite":
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()


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
def api_client():
    from app.main import app

    with TestClient(app) as client:
        yield client


def seed_user(
    db_session: Session,
    *,
    role: str = "user",
    email: str = "user@example.com",
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
    owner_id: int | None,
    status: str = PROPERTY_STATUS_AVAILABLE,
    title: str = "Listing",
) -> Property:
    property_item = Property(
        title=title,
        description="Long enough description for validation",
        price=1000,
        city="Galati",
        rooms=2,
        status=status,
        owner_id=owner_id,
        image_url="/uploads/listing.jpg",
    )
    db_session.add(property_item)
    db_session.commit()
    db_session.refresh(property_item)
    return property_item


def csrf_headers(client) -> dict[str, str]:
    token = client.cookies.get(settings.CSRF_COOKIE_NAME)
    return {settings.CSRF_HEADER_NAME: token or ""}


def login_user(client, email: str, password: str = "password123") -> None:
    client.get("/auth/csrf")
    client.post(
        "/auth/login",
        data={"username": email, "password": password},
    )


def add_favorite_via_api(client, property_id: int) -> None:
    response = client.post(
        f"/favorites/{property_id}",
        headers=csrf_headers(client),
    )
    assert response.status_code == 201


def get_favorites_via_api(client):
    response = client.get("/favorites/")
    assert response.status_code == 200
    return response.json()


def test_get_favorites_includes_available_property(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    listing = seed_property(db_session, owner_id=realtor.id, title="Available listing")
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    add_favorite_via_api(api_client, listing.id)

    payload = get_favorites_via_api(api_client)

    assert payload["total"] == 1
    assert len(payload["items"]) == 1
    assert payload["items"][0]["property_id"] == listing.id


def test_get_favorites_excludes_archived_property(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    listing = seed_property(db_session, owner_id=realtor.id, title="Soon archived")
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    add_favorite_via_api(api_client, listing.id)

    property_service.archive_property(
        db_session,
        listing.id,
        actor_user_id=realtor.id,
    )

    payload = get_favorites_via_api(api_client)

    assert payload["total"] == 0
    assert payload["items"] == []


def test_archived_favorite_relation_preserved_in_db(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    listing = seed_property(db_session, owner_id=realtor.id)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    add_favorite_via_api(api_client, listing.id)

    property_service.archive_property(
        db_session,
        listing.id,
        actor_user_id=realtor.id,
    )

    favorite_row = (
        db_session.query(Favorite)
        .filter(
            Favorite.user_id == renter.id,
            Favorite.property_id == listing.id,
        )
        .first()
    )

    assert favorite_row is not None


def test_reactivated_property_favorite_reappears(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    listing = seed_property(db_session, owner_id=realtor.id)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    add_favorite_via_api(api_client, listing.id)

    property_service.archive_property(
        db_session,
        listing.id,
        actor_user_id=realtor.id,
    )
    property_service.activate_property(
        db_session,
        listing.id,
        actor_user_id=realtor.id,
    )

    payload = get_favorites_via_api(api_client)

    assert payload["total"] == 1
    assert payload["items"][0]["property_id"] == listing.id


def test_delete_archived_favorite_removes_relation(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    listing = seed_property(db_session, owner_id=realtor.id)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    add_favorite_via_api(api_client, listing.id)

    property_service.archive_property(
        db_session,
        listing.id,
        actor_user_id=realtor.id,
    )

    response = api_client.delete(
        f"/favorites/{listing.id}",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 200

    favorite_row = (
        db_session.query(Favorite)
        .filter(
            Favorite.user_id == renter.id,
            Favorite.property_id == listing.id,
        )
        .first()
    )

    assert favorite_row is None


def test_get_favorites_returns_only_current_user_visible_favorites(
    api_client,
    db_session,
):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    available_listing = seed_property(
        db_session,
        owner_id=realtor.id,
        title="Renter A favorite",
    )
    other_listing = seed_property(
        db_session,
        owner_id=realtor.id,
        title="Renter B favorite",
    )
    renter_a = seed_user(db_session, email="renter-a@example.com")
    renter_b = seed_user(db_session, email="renter-b@example.com")

    login_user(api_client, renter_a.email)
    add_favorite_via_api(api_client, available_listing.id)

    login_user(api_client, renter_b.email)
    add_favorite_via_api(api_client, other_listing.id)

    payload = get_favorites_via_api(api_client)

    assert payload["total"] == 1
    assert payload["items"][0]["property_id"] == other_listing.id
    assert payload["items"][0]["user_id"] == renter_b.id


def test_get_favorites_mixed_available_and_archived_returns_only_available(
    api_client,
    db_session,
):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    available_listing = seed_property(
        db_session,
        owner_id=realtor.id,
        title="Available",
    )
    archived_listing = seed_property(
        db_session,
        owner_id=realtor.id,
        title="Archived",
    )
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    add_favorite_via_api(api_client, available_listing.id)
    add_favorite_via_api(api_client, archived_listing.id)

    property_service.archive_property(
        db_session,
        archived_listing.id,
        actor_user_id=realtor.id,
    )

    payload = get_favorites_via_api(api_client)

    assert payload["total"] == 1
    assert [item["property_id"] for item in payload["items"]] == [
        available_listing.id
    ]
