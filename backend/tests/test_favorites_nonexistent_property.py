import pytest
from fastapi.testclient import TestClient
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security.hashing import hash_password
from app.database.database import Base, SessionLocal, engine
from app.models.property import Property
from app.models.user import User
from app.services.property_service import PROPERTY_STATUS_AVAILABLE

NONEXISTENT_PROPERTY_ID = 99999


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

    # Uncaught FK IntegrityError currently escapes as HTTP 500; observe the
    # response boundary instead of re-raising the server exception in pytest.
    with TestClient(app, raise_server_exceptions=False) as client:
        yield client


def seed_property(
    db_session: Session,
    *,
    owner_id: int | None,
    title: str = "Listing",
) -> Property:
    property_item = Property(
        title=title,
        description="Long enough description for validation",
        price=1000,
        city="Galati",
        rooms=2,
        status=PROPERTY_STATUS_AVAILABLE,
        owner_id=owner_id,
        image_url="/uploads/listing.jpg",
    )
    db_session.add(property_item)
    db_session.commit()
    db_session.refresh(property_item)
    return property_item


def seed_user(
    db_session: Session,
    *,
    role: str = "user",
    email: str = "renter@example.com",
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


def login_user(client, email: str, password: str = "password123") -> None:
    client.get("/auth/csrf")
    client.post(
        "/auth/login",
        data={"username": email, "password": password},
    )


def test_add_favorite_nonexistent_property_returns_404(api_client, db_session):
    seed_user(db_session)
    login_user(api_client, "renter@example.com")

    response = api_client.post(
        f"/favorites/{NONEXISTENT_PROPERTY_ID}",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 404
    assert response.json()["message"] == "Property not found"


def test_add_valid_favorite_returns_201(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    listing = seed_property(db_session, owner_id=realtor.id)
    seed_user(db_session, email="renter@example.com")

    login_user(api_client, "renter@example.com")

    response = api_client.post(
        f"/favorites/{listing.id}",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 201
    assert response.json()["property_id"] == listing.id


def test_add_duplicate_favorite_preserves_400(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    listing = seed_property(db_session, owner_id=realtor.id)
    seed_user(db_session, email="renter@example.com")

    login_user(api_client, "renter@example.com")
    headers = csrf_headers(api_client)

    first_response = api_client.post(
        f"/favorites/{listing.id}",
        headers=headers,
    )
    assert first_response.status_code == 201

    duplicate_response = api_client.post(
        f"/favorites/{listing.id}",
        headers=headers,
    )

    assert duplicate_response.status_code == 400
    assert duplicate_response.json()["message"] == "Property already in favorites"
