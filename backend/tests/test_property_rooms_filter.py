import pytest
from fastapi.testclient import TestClient
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from app.database.database import Base, SessionLocal, engine
from app.models.property import Property


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


def seed_available_property(
    db_session: Session,
    *,
    rooms: int,
    title: str,
) -> Property:
    property_item = Property(
        title=title,
        description="Long enough description for validation",
        price=1000,
        city="Galati",
        rooms=rooms,
        status="available",
        owner_id=None,
        image_url="/uploads/listing.jpg",
    )
    db_session.add(property_item)
    db_session.commit()
    db_session.refresh(property_item)
    return property_item


def test_public_properties_rooms_filter_uses_minimum_semantics(
    api_client,
    db_session,
):
    two_room = seed_available_property(
        db_session,
        rooms=2,
        title="Two room listing",
    )
    three_room = seed_available_property(
        db_session,
        rooms=3,
        title="Three room listing",
    )

    response = api_client.get("/properties/", params={"rooms": 2, "limit": 100})

    assert response.status_code == 200
    payload = response.json()
    returned_ids = {item["id"] for item in payload["items"]}

    assert two_room.id in returned_ids
    assert three_room.id in returned_ids
    assert payload["total"] == 2


def test_public_properties_rooms_filter_excludes_lower_room_counts(
    api_client,
    db_session,
):
    two_room = seed_available_property(
        db_session,
        rooms=2,
        title="Two room listing",
    )
    three_room = seed_available_property(
        db_session,
        rooms=3,
        title="Three room listing",
    )

    response = api_client.get("/properties/", params={"rooms": 3, "limit": 100})

    assert response.status_code == 200
    payload = response.json()
    returned_ids = {item["id"] for item in payload["items"]}

    assert three_room.id in returned_ids
    assert two_room.id not in returned_ids
    assert payload["total"] == 1
