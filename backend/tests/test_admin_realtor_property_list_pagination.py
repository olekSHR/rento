import pytest
from fastapi.testclient import TestClient
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from app.core.security.hashing import hash_password
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


def login_user(client, email: str, password: str = "password123") -> None:
    client.get("/auth/csrf")
    client.post(
        "/auth/login",
        data={"username": email, "password": password},
    )


def test_admin_property_list_rejects_out_of_domain_limit(api_client, db_session):
    admin = seed_user(db_session, role="admin", email="admin@example.com")
    login_user(api_client, admin.email)

    response = api_client.get("/properties/admin/all", params={"limit": 0})

    assert response.status_code == 422


def test_realtor_property_list_rejects_out_of_domain_limit(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    login_user(api_client, realtor.email)

    response = api_client.get("/realtor/properties", params={"limit": 0})

    assert response.status_code == 422


ADMIN_LIST_PATH = "/properties/admin/all"
REALTOR_LIST_PATH = "/realtor/properties"

VALID_PAGINATION_CASES = [
    pytest.param({}, id="default"),
    pytest.param({"limit": 1}, id="limit=1"),
    pytest.param({"limit": 100}, id="limit=100"),
    pytest.param({"offset": 0}, id="offset=0"),
]

INVALID_PAGINATION_CASES = [
    pytest.param({"limit": 101}, id="limit=101"),
    pytest.param({"offset": -1}, id="offset=-1"),
]


@pytest.mark.parametrize("path,role,email", [
    (ADMIN_LIST_PATH, "admin", "admin-valid@example.com"),
    (REALTOR_LIST_PATH, "realtor", "realtor-valid@example.com"),
])
@pytest.mark.parametrize("params", VALID_PAGINATION_CASES)
def test_property_list_accepts_valid_pagination(
    api_client,
    db_session,
    path,
    role,
    email,
    params,
):
    user = seed_user(db_session, role=role, email=email)
    login_user(api_client, user.email)

    response = api_client.get(path, params=params)

    assert response.status_code == 200
    payload = response.json()
    if not params:
        assert payload["limit"] == 100
        assert payload["offset"] == 0


@pytest.mark.parametrize("path,role,email", [
    (ADMIN_LIST_PATH, "admin", "admin-invalid@example.com"),
    (REALTOR_LIST_PATH, "realtor", "realtor-invalid@example.com"),
])
@pytest.mark.parametrize("params", INVALID_PAGINATION_CASES)
def test_property_list_rejects_out_of_domain_pagination(
    api_client,
    db_session,
    path,
    role,
    email,
    params,
):
    user = seed_user(db_session, role=role, email=email)
    login_user(api_client, user.email)

    response = api_client.get(path, params=params)

    assert response.status_code == 422


def test_admin_property_list_unauthenticated_returns_401(api_client, db_session):
    response = api_client.get(ADMIN_LIST_PATH)

    assert response.status_code == 401


def test_admin_property_list_non_admin_returns_403(api_client, db_session):
    user = seed_user(db_session, role="user", email="user@example.com")
    login_user(api_client, user.email)

    response = api_client.get(ADMIN_LIST_PATH)

    assert response.status_code == 403


def test_realtor_property_list_unauthenticated_returns_401(api_client, db_session):
    response = api_client.get(REALTOR_LIST_PATH)

    assert response.status_code == 401


def test_realtor_property_list_non_realtor_returns_403(api_client, db_session):
    user = seed_user(db_session, role="user", email="user-realtor-list@example.com")
    login_user(api_client, user.email)

    response = api_client.get(REALTOR_LIST_PATH)

    assert response.status_code == 403
