from datetime import UTC, datetime, timedelta

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from app.clients.overpass_client import (
    OverpassPoint,
    format_distance_label,
    haversine_distance_m,
    parse_overpass_elements,
    select_nearest_by_category,
)
from app.core.config import settings
from app.core.security.hashing import hash_password
from app.database.database import Base, SessionLocal, engine
from app.models.property import Property
from app.models.user import User
from app.repositories import property_repository


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


def seed_available_property(db_session: Session, **overrides) -> Property:
    data = {
        "title": "Test listing",
        "description": "Long enough description",
        "price": 1000,
        "city": "Bucharest",
        "rooms": 2,
        "status": "available",
        "latitude": 44.4268,
        "longitude": 26.1025,
    }
    data.update(overrides)
    property_item = Property(**data)
    db_session.add(property_item)
    db_session.commit()
    db_session.refresh(property_item)
    return property_item


def test_haversine_and_distance_label():
    distance = haversine_distance_m(44.4268, 26.1025, 44.4300, 26.1025)
    assert 300 < distance < 400
    assert format_distance_label(350) == "350 m"
    assert format_distance_label(1250) == "1.2 km"


def test_parse_overpass_elements_and_select_nearest():
    elements = [
        {
            "type": "node",
            "lat": 44.4275,
            "lon": 26.1030,
            "tags": {"shop": "supermarket", "name": "Penny"},
        },
        {
            "type": "node",
            "lat": 44.4290,
            "lon": 26.1040,
            "tags": {"shop": "supermarket", "name": "Far Market"},
        },
        {
            "type": "node",
            "lat": 44.4270,
            "lon": 26.1010,
            "tags": {"highway": "bus_stop", "name": "Piata Unirii"},
        },
    ]

    points = parse_overpass_elements(elements, 44.4268, 26.1025)
    nearest = select_nearest_by_category(points, 44.4268, 26.1025)

    assert nearest["supermarket"].name == "Penny"
    assert nearest["bus_stop"].name == "Piata Unirii"


def test_nearby_without_coordinates_returns_unavailable(api_client, db_session):
    seed_available_property(
        db_session,
        latitude=None,
        longitude=None,
    )

    response = api_client.get("/properties/1/nearby")

    assert response.status_code == 200
    payload = response.json()
    assert payload["available"] is False
    assert payload["items"] == []


def test_nearby_uses_valid_cache_without_overpass(api_client, db_session, monkeypatch):
    property_item = seed_available_property(db_session)
    fetched_at = datetime.now(UTC)

    property_repository.save_nearby_infrastructure_cache(
        db_session,
        property_item,
        {
            "items": [
                {
                    "category": "supermarket",
                    "label": "Supermarket",
                    "name": "Penny",
                    "distance_m": 350,
                    "distance_label": "350 m",
                }
            ]
        },
        fetched_at,
    )

    async def fail_fetch(*args, **kwargs):
        raise RuntimeError("Overpass should not be called")

    monkeypatch.setattr(
        "app.services.nearby_infrastructure_service.fetch_overpass_points",
        fail_fetch,
    )

    response = api_client.get("/properties/1/nearby")

    assert response.status_code == 200
    payload = response.json()
    assert payload["available"] is True
    assert len(payload["items"]) == 1
    assert payload["items"][0]["name"] == "Penny"


def test_nearby_fetches_and_caches_overpass_results(
    api_client,
    db_session,
    monkeypatch,
):
    seed_available_property(db_session)

    async def mock_fetch(latitude, longitude, **kwargs):
        return [
            OverpassPoint(
                latitude=44.4275,
                longitude=26.1030,
                name="Penny",
                category="supermarket",
            ),
            OverpassPoint(
                latitude=44.4270,
                longitude=26.1010,
                name="Central Stop",
                category="bus_stop",
            ),
        ]

    monkeypatch.setattr(
        "app.services.nearby_infrastructure_service.fetch_overpass_points",
        mock_fetch,
    )

    response = api_client.get("/properties/1/nearby")

    assert response.status_code == 200
    payload = response.json()
    assert payload["available"] is True
    assert {item["category"] for item in payload["items"]} == {
        "supermarket",
        "bus_stop",
    }

    stored = db_session.get(Property, 1)
    assert stored.nearby_infrastructure is not None
    assert stored.nearby_infrastructure_at is not None


def test_nearby_overpass_failure_returns_unavailable(
    api_client,
    db_session,
    monkeypatch,
):
    seed_available_property(db_session)

    async def fail_fetch(*args, **kwargs):
        raise RuntimeError("provider unavailable")

    monkeypatch.setattr(
        "app.services.nearby_infrastructure_service.fetch_overpass_points",
        fail_fetch,
    )

    response = api_client.get("/properties/1/nearby")

    assert response.status_code == 200
    payload = response.json()
    assert payload["available"] is False
    assert payload["items"] == []


def test_update_coordinates_invalidates_nearby_cache(db_session):
    from app.schemas.property import PropertyUpdate
    from app.services import property_service

    property_item = seed_available_property(db_session)
    property_repository.save_nearby_infrastructure_cache(
        db_session,
        property_item,
        {
            "items": [
                {
                    "category": "park",
                    "label": "Park",
                    "name": "Park",
                    "distance_m": 100,
                    "distance_label": "100 m",
                }
            ]
        },
        datetime.now(UTC),
    )

    admin = User(
        email="admin@example.com",
        hashed_password=hash_password("password123"),
        role="admin",
        account_status="active",
    )
    db_session.add(admin)
    db_session.commit()
    db_session.refresh(admin)

    property_service.update_property(
        db_session,
        property_item,
        PropertyUpdate(
            title=property_item.title,
            description=property_item.description,
            price=property_item.price,
            city=property_item.city,
            rooms=property_item.rooms,
            latitude=44.4300,
            longitude=26.1100,
        ),
        admin,
    )

    refreshed = db_session.get(Property, property_item.id)
    assert refreshed.nearby_infrastructure is None
    assert refreshed.nearby_infrastructure_at is None
