import pytest
from fastapi.testclient import TestClient
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security.hashing import hash_password
from app.database.database import Base, SessionLocal, engine
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


def csrf_headers(client) -> dict[str, str]:
    token = client.cookies.get(settings.CSRF_COOKIE_NAME)
    return {settings.CSRF_HEADER_NAME: token or ""}


def login_realtor(client, email: str, password: str = "password123") -> None:
    client.get("/auth/csrf")
    client.post(
        "/auth/login",
        data={"username": email, "password": password},
    )


def test_http_realtor_profile_first_get_creates_empty_profile(
    api_client,
    db_session,
):
    realtor = seed_user(db_session, email="profile-realtor@example.com")

    login_realtor(api_client, realtor.email)

    response = api_client.get("/realtor/profile")

    assert response.status_code == 200
    payload = response.json()
    assert payload["user_id"] == realtor.id
    assert payload["is_completed"] is False

    profile = (
        db_session.query(RealtorProfile)
        .filter(RealtorProfile.user_id == realtor.id)
        .one()
    )
    assert profile.is_completed is False


def test_http_realtor_profile_first_save_without_telegram_completes_profile(
    api_client,
    db_session,
):
    realtor = seed_user(db_session, email="profile-save@example.com")

    login_realtor(api_client, realtor.email)

    get_response = api_client.get("/realtor/profile")
    assert get_response.status_code == 200

    patch_response = api_client.patch(
        "/realtor/profile",
        json={
            "full_name": "Real Name",
            "phone": "+40700000001",
            "city": "Galati",
        },
        headers=csrf_headers(api_client),
    )

    assert patch_response.status_code == 200
    payload = patch_response.json()
    assert payload["is_completed"] is True
    assert payload["telegram_username"] is None
    assert payload["full_name"] == "Real Name"
    assert payload["phone"] == "+40700000001"
    assert payload["city"] == "Galati"


def test_http_realtor_profile_rejects_invalid_telegram_username(
    api_client,
    db_session,
):
    realtor = seed_user(db_session, email="profile-invalid-tg@example.com")

    login_realtor(api_client, realtor.email)
    api_client.get("/realtor/profile")

    response = api_client.patch(
        "/realtor/profile",
        json={
            "full_name": "Real Name",
            "phone": "+40700000001",
            "city": "Galati",
            "telegram_username": "@alex",
        },
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 422
