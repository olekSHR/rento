from types import SimpleNamespace

import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security.hashing import hash_password
from app.database.database import Base, SessionLocal, engine
from app.models.property import Property
from app.models.user import User
from app.repositories import property_repository
from app.schemas.property import PropertyCreate, PropertyUpdate, validate_coordinate_pair


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


@pytest.fixture(autouse=True)
def disable_rate_limit(monkeypatch):
    from app.core.config import settings

    monkeypatch.setattr(settings, "RATE_LIMIT_ENABLED", False)


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


def seed_admin(db_session: Session, email: str = "admin@example.com") -> User:
    user = User(
        email=email,
        hashed_password=hash_password("password123"),
        role="admin",
        account_status="active",
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


def seed_available_property(db_session: Session, **overrides) -> Property:
    data = {
        "title": "Test listing",
        "description": "Long enough description",
        "price": 1000,
        "city": "Bucharest",
        "rooms": 2,
        "status": "available",
    }
    data.update(overrides)
    property_item = Property(**data)
    db_session.add(property_item)
    db_session.commit()
    db_session.refresh(property_item)
    return property_item


def csrf_headers(client) -> dict[str, str]:
    token = client.cookies.get(settings.CSRF_COOKIE_NAME)
    return {settings.CSRF_HEADER_NAME: token or ""}


def login_admin(client, db_session: Session, email: str | None = None) -> User:
    admin = seed_admin(
        db_session,
        email=email or f"admin-{id(db_session)}@example.com",
    )
    client.get("/auth/csrf")
    client.post(
        "/auth/login",
        data={"username": admin.email, "password": "password123"},
    )
    return admin


def valid_create_payload(**overrides):
    data = {
        "title": "Valid title",
        "description": "Valid long description",
        "price": 1000,
        "city": "Bucharest",
        "rooms": 2,
    }
    data.update(overrides)
    return data


def test_create_schema_accepts_coordinate_pair():
    schema = PropertyCreate(
        **valid_create_payload(latitude=44.4268, longitude=26.1025)
    )

    assert schema.latitude == 44.4268
    assert schema.longitude == 26.1025


def test_create_schema_accepts_missing_coordinates():
    schema = PropertyCreate(**valid_create_payload())

    assert schema.latitude is None
    assert schema.longitude is None


def test_create_schema_rejects_latitude_only():
    with pytest.raises(ValidationError) as exc_info:
        PropertyCreate(**valid_create_payload(latitude=44.4268))

    assert "latitude and longitude must both be provided or both omitted" in str(
        exc_info.value
    )


def test_create_schema_rejects_longitude_only():
    with pytest.raises(ValidationError) as exc_info:
        PropertyCreate(**valid_create_payload(longitude=26.1025))

    assert "latitude and longitude must both be provided or both omitted" in str(
        exc_info.value
    )


def test_create_schema_rejects_invalid_latitude():
    with pytest.raises(ValidationError) as exc_info:
        PropertyCreate(
            **valid_create_payload(latitude=91.0, longitude=26.1025)
        )

    assert "latitude must be between -90 and 90" in str(exc_info.value)


def test_create_schema_rejects_invalid_longitude():
    with pytest.raises(ValidationError) as exc_info:
        PropertyCreate(
            **valid_create_payload(latitude=44.4268, longitude=181.0)
        )

    assert "longitude must be between -180 and 180" in str(exc_info.value)


def test_update_schema_allows_clearing_coordinates():
    schema = PropertyUpdate(
        **valid_create_payload(latitude=None, longitude=None)
    )

    assert schema.latitude is None
    assert schema.longitude is None


def test_repository_create_with_coordinates(db_session):
    created = property_repository.create_property(
        db_session,
        "Valid title",
        "Valid long description",
        1000,
        "Bucharest",
        2,
        latitude=44.4268,
        longitude=26.1025,
    )

    assert float(created.latitude) == pytest.approx(44.4268)
    assert float(created.longitude) == pytest.approx(26.1025)


def test_repository_create_without_coordinates(db_session):
    created = property_repository.create_property(
        db_session,
        "Valid title",
        "Valid long description",
        1000,
        "Bucharest",
        2,
    )

    assert created.latitude is None
    assert created.longitude is None


def test_repository_update_coordinates(db_session):
    property_item = seed_available_property(db_session)

    updated = property_repository.update_property(
        db_session,
        property_item,
        property_item.title,
        property_item.description,
        property_item.price,
        property_item.city,
        property_item.rooms,
        latitude=45.6427,
        longitude=25.5887,
    )

    assert float(updated.latitude) == pytest.approx(45.6427)
    assert float(updated.longitude) == pytest.approx(25.5887)


def test_repository_clear_coordinates(db_session):
    property_item = seed_available_property(
        db_session,
        latitude=44.4268,
        longitude=26.1025,
    )

    updated = property_repository.update_property(
        db_session,
        property_item,
        property_item.title,
        property_item.description,
        property_item.price,
        property_item.city,
        property_item.rooms,
        latitude=None,
        longitude=None,
    )

    assert updated.latitude is None
    assert updated.longitude is None


def test_validate_coordinate_pair_helper():
    validate_coordinate_pair(None, None)
    validate_coordinate_pair(44.0, 26.0)

    with pytest.raises(ValueError):
        validate_coordinate_pair(44.0, None)


def test_http_create_property_with_coordinates(api_client, db_session):
    login_admin(api_client, db_session)

    response = api_client.post(
        "/properties/",
        json=valid_create_payload(latitude=44.4268, longitude=26.1025),
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 201
    body = response.json()
    assert body["latitude"] == pytest.approx(44.4268)
    assert body["longitude"] == pytest.approx(26.1025)


def test_http_create_property_without_coordinates(api_client, db_session):
    login_admin(api_client, db_session)

    response = api_client.post(
        "/properties/",
        json=valid_create_payload(),
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 201
    body = response.json()
    assert body["latitude"] is None
    assert body["longitude"] is None


def test_http_create_property_rejects_partial_coordinates(api_client, db_session):
    login_admin(api_client, db_session)

    response = api_client.post(
        "/properties/",
        json=valid_create_payload(latitude=44.4268),
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 422


def test_http_update_property_coordinates(api_client, db_session):
    login_admin(api_client, db_session)
    property_item = seed_available_property(db_session)

    response = api_client.put(
        f"/properties/{property_item.id}",
        json=valid_create_payload(latitude=45.6427, longitude=25.5887),
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 200
    body = response.json()
    assert body["latitude"] == pytest.approx(45.6427)
    assert body["longitude"] == pytest.approx(25.5887)


def test_http_clear_property_coordinates(api_client, db_session):
    login_admin(api_client, db_session)
    property_item = seed_available_property(
        db_session,
        latitude=44.4268,
        longitude=26.1025,
    )

    response = api_client.put(
        f"/properties/{property_item.id}",
        json=valid_create_payload(latitude=None, longitude=None),
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 200
    body = response.json()
    assert body["latitude"] is None
    assert body["longitude"] is None


def test_http_update_without_coordinates_preserves_existing(api_client, db_session):
    login_admin(api_client, db_session)
    property_item = seed_available_property(
        db_session,
        latitude=44.4268,
        longitude=26.1025,
    )

    response = api_client.put(
        f"/properties/{property_item.id}",
        json=valid_create_payload(title="Updated title"),
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 200
    body = response.json()
    assert body["title"] == "Updated title"
    assert body["latitude"] == pytest.approx(44.4268)
    assert body["longitude"] == pytest.approx(26.1025)


def test_http_get_property_detail_includes_coordinates(api_client, db_session):
    property_item = seed_available_property(
        db_session,
        latitude=44.4268,
        longitude=26.1025,
    )

    response = api_client.get(f"/properties/{property_item.id}")

    assert response.status_code == 200
    body = response.json()
    assert body["latitude"] == pytest.approx(44.4268)
    assert body["longitude"] == pytest.approx(26.1025)


def test_http_get_property_without_coordinates_remains_valid(api_client, db_session):
    property_item = seed_available_property(db_session)

    response = api_client.get(f"/properties/{property_item.id}")

    assert response.status_code == 200
    body = response.json()
    assert body["latitude"] is None
    assert body["longitude"] is None
    assert body["city"] == "Bucharest"


def test_http_list_properties_omits_coordinates(api_client, db_session):
    seed_available_property(
        db_session,
        latitude=44.4268,
        longitude=26.1025,
    )

    response = api_client.get("/properties/")

    assert response.status_code == 200
    body = response.json()
    assert len(body["items"]) == 1
    item = body["items"][0]
    assert "latitude" not in item
    assert "longitude" not in item
