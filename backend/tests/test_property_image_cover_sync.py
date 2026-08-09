import pytest
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from app.core.security.hashing import hash_password
from app.database.database import Base, SessionLocal, engine
from app.models.property import Property, PropertyImage
from app.models.user import User
from app.schemas.property import PropertyImageCreate
from app.services import property_service


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


def seed_realtor(db_session: Session, email: str = "realtor@example.com") -> User:
    user = User(
        email=email,
        hashed_password=hash_password("password123"),
        role="realtor",
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
    image_url: str | None = None,
) -> Property:
    property_item = Property(
        title="Cover sync listing",
        description="Long enough description",
        price=1200,
        city="Bucharest",
        rooms=2,
        owner_id=owner_id,
        image_url=image_url,
        status="pending",
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
    sort_order: int = 0,
) -> PropertyImage:
    image = PropertyImage(
        property_id=property_id,
        url=url,
        is_cover=is_cover,
        sort_order=sort_order,
    )
    db_session.add(image)
    db_session.commit()
    db_session.refresh(image)
    return image


def test_first_image_establishes_cover_and_image_url(db_session):
    owner = seed_realtor(db_session)
    property_item = seed_property(
        db_session,
        owner_id=owner.id,
        image_url=None,
    )

    created = property_service.add_property_image(
        db_session,
        property_item.id,
        PropertyImageCreate(url="/uploads/first.jpg"),
        owner,
    )

    db_session.refresh(property_item)
    images = (
        db_session.query(PropertyImage)
        .filter_by(property_id=property_item.id)
        .all()
    )

    assert created.is_cover is True
    assert created.url == "/uploads/first.jpg"
    assert len(images) == 1
    assert images[0].is_cover is True
    assert property_item.image_url == "/uploads/first.jpg"


def test_second_image_does_not_steal_existing_cover(db_session):
    owner = seed_realtor(db_session)
    property_item = seed_property(
        db_session,
        owner_id=owner.id,
        image_url="/uploads/cover.jpg",
    )
    cover = seed_property_image(
        db_session,
        property_id=property_item.id,
        url="/uploads/cover.jpg",
        is_cover=True,
        sort_order=0,
    )

    second = property_service.add_property_image(
        db_session,
        property_item.id,
        PropertyImageCreate(url="/uploads/second.jpg"),
        owner,
    )

    db_session.refresh(property_item)
    db_session.refresh(cover)

    assert second.is_cover is False
    assert cover.is_cover is True
    assert property_item.image_url == "/uploads/cover.jpg"


def test_explicit_cover_upload_replaces_cover_and_syncs_image_url(db_session):
    owner = seed_realtor(db_session)
    property_item = seed_property(
        db_session,
        owner_id=owner.id,
        image_url="/uploads/old-cover.jpg",
    )
    previous = seed_property_image(
        db_session,
        property_id=property_item.id,
        url="/uploads/old-cover.jpg",
        is_cover=True,
        sort_order=0,
    )

    created = property_service.add_property_image(
        db_session,
        property_item.id,
        PropertyImageCreate(
            url="/uploads/new-cover.jpg",
            is_cover=True,
        ),
        owner,
    )

    db_session.refresh(property_item)
    db_session.refresh(previous)

    assert previous.is_cover is False
    assert created.is_cover is True
    assert property_item.image_url == "/uploads/new-cover.jpg"


def test_legacy_images_without_cover_get_cover_on_next_upload(db_session):
    owner = seed_realtor(db_session)
    property_item = seed_property(
        db_session,
        owner_id=owner.id,
        image_url=None,
    )
    seed_property_image(
        db_session,
        property_id=property_item.id,
        url="/uploads/orphan.jpg",
        is_cover=False,
        sort_order=0,
    )

    created = property_service.add_property_image(
        db_session,
        property_item.id,
        PropertyImageCreate(url="/uploads/recovery.jpg"),
        owner,
    )

    db_session.refresh(property_item)
    orphan = (
        db_session.query(PropertyImage)
        .filter_by(url="/uploads/orphan.jpg")
        .one()
    )

    assert orphan.is_cover is False
    assert created.is_cover is True
    assert property_item.image_url == "/uploads/recovery.jpg"


def test_set_cover_image_still_syncs_image_url(db_session):
    owner = seed_realtor(db_session)
    property_item = seed_property(
        db_session,
        owner_id=owner.id,
        image_url="/uploads/first.jpg",
    )
    first = seed_property_image(
        db_session,
        property_id=property_item.id,
        url="/uploads/first.jpg",
        is_cover=True,
        sort_order=0,
    )
    second = seed_property_image(
        db_session,
        property_id=property_item.id,
        url="/uploads/second.jpg",
        is_cover=False,
        sort_order=1,
    )

    property_service.set_cover_image(
        db_session,
        property_item.id,
        second.id,
        owner,
    )

    db_session.refresh(property_item)
    db_session.refresh(first)
    db_session.refresh(second)

    assert first.is_cover is False
    assert second.is_cover is True
    assert property_item.image_url == "/uploads/second.jpg"
