import pytest
from fastapi.testclient import TestClient
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from app.core.security.hashing import hash_password
from app.database.database import Base, SessionLocal, engine
from app.models.realtor_application import RealtorApplication
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


def seed_user(
    db_session: Session,
    *,
    role: str,
    email: str,
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


def seed_realtor_application(
    db_session: Session,
    *,
    user_id: int,
    status: str = "pending",
) -> RealtorApplication:
    application = RealtorApplication(
        user_id=user_id,
        full_name="Applicant Name",
        phone="+1000000",
        status=status,
    )
    db_session.add(application)
    db_session.commit()
    db_session.refresh(application)
    return application


def login_user(client, email: str, password: str = "password123") -> None:
    client.get("/auth/csrf")
    client.post(
        "/auth/login",
        data={"username": email, "password": password},
    )


INVALID_STATUS = "not-a-valid-status"


@pytest.mark.parametrize("invalid_status", [INVALID_STATUS, "bogus"])
def test_list_realtor_applications_rejects_invalid_status_filter(
    api_client,
    db_session,
    invalid_status,
):
    admin = seed_user(db_session, role="admin", email="admin@example.com")
    applicant = seed_user(db_session, role="user", email="applicant@example.com")
    seed_realtor_application(db_session, user_id=applicant.id, status="pending")

    login_user(api_client, admin.email)

    response = api_client.get(
        "/realtor-applications",
        params={"status": invalid_status},
    )

    assert response.status_code == 400
    payload = response.json()
    assert payload["success"] is False
    assert "message" in payload


@pytest.mark.parametrize("valid_status", ["pending", "approved", "rejected"])
def test_list_realtor_applications_accepts_valid_status_filter(
    api_client,
    db_session,
    valid_status,
):
    admin = seed_user(db_session, role="admin", email="admin@example.com")
    applicant = seed_user(db_session, role="user", email="applicant@example.com")
    seed_realtor_application(db_session, user_id=applicant.id, status=valid_status)

    login_user(api_client, admin.email)

    response = api_client.get(
        "/realtor-applications",
        params={"status": valid_status},
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] == 1
    assert len(payload["items"]) == 1
    assert payload["items"][0]["status"] == valid_status


def test_list_realtor_applications_valid_status_zero_matches_returns_200(
    api_client,
    db_session,
):
    admin = seed_user(db_session, role="admin", email="admin@example.com")
    applicant = seed_user(db_session, role="user", email="applicant@example.com")
    seed_realtor_application(db_session, user_id=applicant.id, status="pending")

    login_user(api_client, admin.email)

    response = api_client.get("/realtor-applications", params={"status": "approved"})

    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] == 0
    assert payload["items"] == []


def test_list_realtor_applications_accepts_omitted_status(api_client, db_session):
    admin = seed_user(db_session, role="admin", email="admin@example.com")
    applicant = seed_user(db_session, role="user", email="applicant@example.com")
    seed_realtor_application(db_session, user_id=applicant.id, status="approved")

    login_user(api_client, admin.email)

    response = api_client.get("/realtor-applications")

    assert response.status_code == 200
    assert response.json()["total"] == 1


def test_list_realtor_applications_unauthenticated_returns_401(api_client):
    response = api_client.get(
        "/realtor-applications",
        params={"status": INVALID_STATUS},
    )

    assert response.status_code == 401


def test_list_realtor_applications_non_admin_returns_403(api_client, db_session):
    user = seed_user(db_session, role="user", email="user@example.com")
    login_user(api_client, user.email)

    response = api_client.get(
        "/realtor-applications",
        params={"status": INVALID_STATUS},
    )

    assert response.status_code == 403


@pytest.mark.parametrize(
    "params,expected_status",
    [
        pytest.param({}, 200, id="default"),
        pytest.param({"limit": 1}, 200, id="limit=1"),
        pytest.param({"limit": 100}, 200, id="limit=100"),
        pytest.param({"limit": 0}, 422, id="limit=0"),
        pytest.param({"limit": 101}, 422, id="limit=101"),
        pytest.param({"offset": 0}, 200, id="offset=0"),
        pytest.param({"offset": -1}, 422, id="offset=-1"),
    ],
)
def test_list_realtor_applications_pagination_bounds(
    api_client,
    db_session,
    params,
    expected_status,
):
    admin = seed_user(db_session, role="admin", email="admin@example.com")
    login_user(api_client, admin.email)

    response = api_client.get("/realtor-applications", params=params)

    assert response.status_code == expected_status
