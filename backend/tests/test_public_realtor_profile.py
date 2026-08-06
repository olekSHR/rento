from datetime import UTC, datetime, timedelta

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from app.core.security.hashing import hash_password
from app.database.database import Base, SessionLocal, engine
from app.models.property import Property
from app.models.realtor_profile import RealtorProfile
from app.models.user import User


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
    role: str = "realtor",
    email: str = "realtor@example.com",
    account_status: str = "active",
) -> User:
    user = User(
        email=email,
        hashed_password=hash_password("password123"),
        role=role,
        account_status=account_status,
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


def seed_realtor_profile(
    db_session: Session,
    user_id: int,
    **overrides,
) -> RealtorProfile:
    data = {
        "user_id": user_id,
        "full_name": "Jane Agent",
        "phone": "+100",
        "whatsapp": "+200",
        "telegram_username": "janeagent",
        "agency_name": "Prime Realty",
        "avatar_url": "/uploads/avatar.jpg",
        "is_completed": True,
        "is_verified": True,
    }
    data.update(overrides)
    profile = RealtorProfile(**data)
    db_session.add(profile)
    db_session.commit()
    db_session.refresh(profile)
    return profile


def seed_property(
    db_session: Session,
    *,
    owner_id: int,
    status: str = "available",
    title: str = "Listing",
    created_at: datetime | None = None,
) -> Property:
    property_item = Property(
        title=title,
        description="Long enough description for validation",
        price=1000,
        city="Bucharest",
        rooms=2,
        status=status,
        owner_id=owner_id,
        image_url="/uploads/listing.jpg",
    )
    db_session.add(property_item)
    db_session.commit()
    db_session.refresh(property_item)

    if created_at is not None:
        property_item.created_at = created_at
        db_session.commit()
        db_session.refresh(property_item)

    return property_item


def test_public_realtor_profile_returns_200(api_client, db_session):
    user = seed_user(db_session)
    seed_realtor_profile(db_session, user.id)
    listing = seed_property(db_session, owner_id=user.id)

    response = api_client.get(f"/realtors/{user.id}")

    assert response.status_code == 200
    payload = response.json()
    assert payload["realtor"]["user_id"] == user.id
    assert payload["realtor"]["full_name"] == "Jane Agent"
    assert payload["realtor"]["agency_name"] == "Prime Realty"
    assert payload["realtor"]["is_verified"] is True
    assert payload["realtor"]["active_listings_count"] == 1
    assert payload["realtor"]["phone"] == "+100"
    assert payload["realtor"]["whatsapp"] == "+200"
    assert payload["realtor"]["telegram_username"] == "janeagent"
    assert payload["properties"]["total"] == 1
    assert payload["properties"]["limit"] == 12
    assert payload["properties"]["offset"] == 0
    assert len(payload["properties"]["items"]) == 1
    assert payload["properties"]["items"][0]["id"] == listing.id
    assert "email" not in payload["realtor"]
    assert "bio" not in payload["realtor"]
    assert "city" not in payload["realtor"]


def test_public_realtor_profile_returns_404_for_missing_user(api_client):
    response = api_client.get("/realtors/999")

    assert response.status_code == 404


def test_public_realtor_profile_returns_404_for_non_realtor(api_client, db_session):
    user = seed_user(db_session, role="user", email="user@example.com")

    response = api_client.get(f"/realtors/{user.id}")

    assert response.status_code == 404


def test_public_realtor_profile_returns_404_for_inactive_account(
    api_client,
    db_session,
):
    user = seed_user(
        db_session,
        account_status="suspended",
        email="inactive@example.com",
    )
    seed_realtor_profile(db_session, user.id)

    response = api_client.get(f"/realtors/{user.id}")

    assert response.status_code == 404


def test_public_realtor_profile_returns_404_without_profile(api_client, db_session):
    user = seed_user(db_session, email="noprofile@example.com")

    response = api_client.get(f"/realtors/{user.id}")

    assert response.status_code == 404


def test_public_realtor_profile_returns_200_with_zero_listings(
    api_client,
    db_session,
):
    user = seed_user(db_session, email="empty@example.com")
    seed_realtor_profile(db_session, user.id)

    response = api_client.get(f"/realtors/{user.id}")

    assert response.status_code == 200
    payload = response.json()
    assert payload["realtor"]["active_listings_count"] == 0
    assert payload["properties"]["total"] == 0
    assert payload["properties"]["items"] == []


def test_public_realtor_profile_filters_available_listings_only(
    api_client,
    db_session,
):
    user = seed_user(db_session, email="filter@example.com")
    seed_realtor_profile(db_session, user.id)
    available = seed_property(
        db_session,
        owner_id=user.id,
        status="available",
        title="Available listing",
    )
    seed_property(
        db_session,
        owner_id=user.id,
        status="pending",
        title="Pending listing",
    )
    seed_property(
        db_session,
        owner_id=user.id,
        status="archived",
        title="Archived listing",
    )

    response = api_client.get(f"/realtors/{user.id}")

    assert response.status_code == 200
    payload = response.json()
    assert payload["properties"]["total"] == 1
    assert payload["properties"]["items"][0]["id"] == available.id
    assert payload["properties"]["items"][0]["status"] == "available"


def test_public_realtor_profile_does_not_expose_email(api_client, db_session):
    user = seed_user(db_session, email="secret@example.com")
    seed_realtor_profile(db_session, user.id)

    response = api_client.get(f"/realtors/{user.id}")

    assert response.status_code == 200
    assert "email" not in response.text


def test_public_realtor_profile_orders_listings_by_created_at_desc(
    api_client,
    db_session,
):
    user = seed_user(db_session, email="order@example.com")
    seed_realtor_profile(db_session, user.id)
    now = datetime.now(UTC)
    older = seed_property(
        db_session,
        owner_id=user.id,
        title="Older listing",
        created_at=now - timedelta(days=2),
    )
    newer = seed_property(
        db_session,
        owner_id=user.id,
        title="Newer listing",
        created_at=now - timedelta(days=1),
    )

    response = api_client.get(f"/realtors/{user.id}")

    assert response.status_code == 200
    ids = [item["id"] for item in response.json()["properties"]["items"]]
    assert ids.index(newer.id) < ids.index(older.id)
