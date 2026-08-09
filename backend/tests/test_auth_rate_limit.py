import pytest
from fastapi.testclient import TestClient
from sqlalchemy import event
from sqlalchemy.engine import Engine

from app.core.config import settings
from app.database.database import Base, SessionLocal, engine
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


def _clear_rate_limit_storage() -> None:
    from app.core.rate_limit import limiter

    storage = getattr(limiter, "_storage", None)
    if storage is None:
        return

    underlying = getattr(storage, "storage", None)
    if isinstance(underlying, dict):
        underlying.clear()


def _enable_rate_limit(monkeypatch) -> None:
    from app.core import rate_limit as rate_limit_module

    _clear_rate_limit_storage()
    monkeypatch.setattr(settings, "RATE_LIMIT_ENABLED", True)
    monkeypatch.setattr(rate_limit_module.limiter, "enabled", True)


def _register_payload(index: int) -> dict:
    return {
        "email": f"user{index}@example.com",
        "password": "password123",
    }


def test_register_succeeds_with_rate_limit_enabled(api_client, db_session, monkeypatch):
    _enable_rate_limit(monkeypatch)

    response = api_client.post("/auth/register", json=_register_payload(1))

    assert response.status_code == 201
    payload = response.json()
    assert payload["email"] == "user1@example.com"
    assert response.headers.get("X-RateLimit-Limit") is not None
    assert db_session.query(User).count() == 1


def test_register_returns_429_when_limit_exceeded(api_client, db_session, monkeypatch):
    _enable_rate_limit(monkeypatch)

    responses = [
        api_client.post("/auth/register", json=_register_payload(index))
        for index in range(1, 7)
    ]

    success_count = sum(response.status_code == 201 for response in responses)
    limited = [response for response in responses if response.status_code == 429]

    assert success_count == 5
    assert len(limited) == 1
    assert limited[0].json()["message"] == "Too many requests. Please try again later."
    assert db_session.query(User).count() == 5


def test_login_still_succeeds_with_rate_limit_enabled(api_client, db_session, monkeypatch):
    from app.core.security.hashing import hash_password

    _enable_rate_limit(monkeypatch)

    user = User(
        email="existing@example.com",
        hashed_password=hash_password("password123"),
        role="user",
        account_status="active",
    )
    db_session.add(user)
    db_session.commit()

    response = api_client.post(
        "/auth/login",
        data={"username": "existing@example.com", "password": "password123"},
    )

    assert response.status_code == 200
    assert response.json()["success"] is True
