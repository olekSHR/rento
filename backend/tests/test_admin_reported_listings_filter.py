from datetime import datetime, timedelta

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from app.core.security.hashing import hash_password
from app.database.database import Base, SessionLocal, engine
from app.models.property import Property
from app.models.user import User


ADMIN_LIST_PATH = "/properties/admin/all"

BASE_CREATED_AT = datetime(2026, 1, 1, 12, 0, 0)


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


def seed_user(db_session: Session, *, role: str, email: str) -> User:
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


def login_user(client, email: str, password: str = "password123") -> None:
    client.get("/auth/csrf")
    client.post(
        "/auth/login",
        data={"username": email, "password": password},
    )


def seed_property(
    db_session: Session,
    *,
    title: str,
    report_count: int,
    age_minutes: int,
    status: str = "available",
) -> Property:
    """Seed one property with a deterministic created_at.

    age_minutes grows for older records, so ordering by created_at DESC is
    fully controlled by the caller instead of insertion timing.
    """
    property_item = Property(
        title=title,
        city="Bucharest",
        price=1000,
        rooms=2,
        status=status,
        report_count=report_count,
        created_at=BASE_CREATED_AT - timedelta(minutes=age_minutes),
    )
    db_session.add(property_item)
    db_session.commit()
    db_session.refresh(property_item)
    return property_item


def seed_admin_and_login(api_client, db_session, email: str) -> User:
    admin = seed_user(db_session, role="admin", email=email)
    login_user(api_client, admin.email)
    return admin


def seed_mixed_dataset(db_session: Session) -> None:
    """Newest first: unreported, reported, unreported, reported, reported."""
    seed_property(db_session, title="unreported-1", report_count=0, age_minutes=1)
    seed_property(db_session, title="reported-1", report_count=3, age_minutes=2)
    seed_property(db_session, title="unreported-2", report_count=0, age_minutes=3)
    seed_property(
        db_session,
        title="reported-2",
        report_count=1,
        age_minutes=4,
        status="pending",
    )
    seed_property(
        db_session,
        title="reported-3",
        report_count=7,
        age_minutes=5,
        status="archived",
    )


def test_omitted_reported_filter_returns_all_properties(api_client, db_session):
    seed_admin_and_login(api_client, db_session, "admin-omitted@example.com")
    seed_mixed_dataset(db_session)

    response = api_client.get(ADMIN_LIST_PATH)

    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] == 5
    assert [item["title"] for item in payload["items"]] == [
        "unreported-1",
        "reported-1",
        "unreported-2",
        "reported-2",
        "reported-3",
    ]


def test_reported_only_returns_reported_properties_only(api_client, db_session):
    seed_admin_and_login(api_client, db_session, "admin-reported@example.com")
    seed_mixed_dataset(db_session)

    response = api_client.get(ADMIN_LIST_PATH, params={"reported_only": "true"})

    assert response.status_code == 200
    payload = response.json()
    assert [item["title"] for item in payload["items"]] == [
        "reported-1",
        "reported-2",
        "reported-3",
    ]
    assert all(item["report_count"] > 0 for item in payload["items"])


def test_reported_only_includes_all_lifecycle_statuses(api_client, db_session):
    seed_admin_and_login(api_client, db_session, "admin-lifecycle@example.com")
    seed_mixed_dataset(db_session)

    response = api_client.get(ADMIN_LIST_PATH, params={"reported_only": "true"})

    assert response.status_code == 200
    statuses = {item["status"] for item in response.json()["items"]}
    assert statuses == {"available", "pending", "archived"}


def test_reported_only_total_counts_full_reported_dataset(api_client, db_session):
    seed_admin_and_login(api_client, db_session, "admin-total@example.com")
    seed_mixed_dataset(db_session)

    response = api_client.get(
        ADMIN_LIST_PATH,
        params={"reported_only": "true", "limit": 1},
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] == 3
    assert len(payload["items"]) == 1


def test_reported_only_total_matches_dashboard_metric(api_client, db_session):
    seed_admin_and_login(api_client, db_session, "admin-dashboard@example.com")
    seed_mixed_dataset(db_session)

    stats_response = api_client.get("/admin/stats")
    list_response = api_client.get(
        ADMIN_LIST_PATH,
        params={"reported_only": "true"},
    )

    assert stats_response.status_code == 200
    assert list_response.status_code == 200
    assert (
        list_response.json()["total"]
        == stats_response.json()["reported_listings"]
        == 3
    )


def test_reported_filter_is_applied_before_pagination(api_client, db_session):
    seed_admin_and_login(api_client, db_session, "admin-pagination@example.com")
    seed_mixed_dataset(db_session)

    first_page = api_client.get(
        ADMIN_LIST_PATH,
        params={"reported_only": "true", "limit": 2, "offset": 0},
    )
    second_page = api_client.get(
        ADMIN_LIST_PATH,
        params={"reported_only": "true", "limit": 2, "offset": 2},
    )

    assert first_page.status_code == 200
    assert second_page.status_code == 200

    first_titles = [item["title"] for item in first_page.json()["items"]]
    second_titles = [item["title"] for item in second_page.json()["items"]]

    assert first_titles == ["reported-1", "reported-2"]
    assert second_titles == ["reported-3"]
    assert first_page.json()["total"] == 3
    assert second_page.json()["total"] == 3


def test_reported_only_false_matches_omitted_behavior(api_client, db_session):
    seed_admin_and_login(api_client, db_session, "admin-false@example.com")
    seed_mixed_dataset(db_session)

    omitted = api_client.get(ADMIN_LIST_PATH)
    explicit_false = api_client.get(
        ADMIN_LIST_PATH,
        params={"reported_only": "false"},
    )

    assert omitted.status_code == 200
    assert explicit_false.status_code == 200
    assert omitted.json() == explicit_false.json()


def test_reported_only_rejects_invalid_boolean(api_client, db_session):
    seed_admin_and_login(api_client, db_session, "admin-invalid-bool@example.com")

    response = api_client.get(
        ADMIN_LIST_PATH,
        params={"reported_only": "maybe"},
    )

    assert response.status_code == 422


def test_reported_only_requires_admin(api_client, db_session):
    user = seed_user(db_session, role="user", email="user-reported@example.com")
    login_user(api_client, user.email)

    response = api_client.get(
        ADMIN_LIST_PATH,
        params={"reported_only": "true"},
    )

    assert response.status_code == 403
