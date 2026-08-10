import pytest
from fastapi.testclient import TestClient
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security.hashing import hash_password
from app.database.database import Base, SessionLocal, engine
from app.models.property import Property
from app.models.realtor_profile import RealtorProfile
from app.models.user import User
from app.models.viewing_request import ViewingRequest


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
    role: str = "user",
    email: str = "user@example.com",
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
) -> RealtorProfile:
    profile = RealtorProfile(
        user_id=user_id,
        full_name="Jane Agent",
        phone="+100",
        whatsapp="+200",
        is_completed=True,
        is_verified=True,
    )
    db_session.add(profile)
    db_session.commit()
    db_session.refresh(profile)
    return profile


def seed_property(
    db_session: Session,
    *,
    owner_id: int | None,
    status: str = "available",
    title: str = "Listing",
) -> Property:
    property_item = Property(
        title=title,
        description="Long enough description for validation",
        price=1000,
        city="Galati",
        rooms=2,
        status=status,
        owner_id=owner_id,
        image_url="/uploads/listing.jpg",
    )
    db_session.add(property_item)
    db_session.commit()
    db_session.refresh(property_item)
    return property_item


def csrf_headers(client) -> dict[str, str]:
    token = client.cookies.get(settings.CSRF_COOKIE_NAME)
    return {settings.CSRF_HEADER_NAME: token or ""}


def login_user(client, email: str, password: str = "password123") -> None:
    client.get("/auth/csrf")
    client.post(
        "/auth/login",
        data={"username": email, "password": password},
    )


def test_create_viewing_request_returns_201(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    seed_realtor_profile(db_session, realtor.id)
    listing = seed_property(db_session, owner_id=realtor.id)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    response = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={"message": "I would like to visit."},
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 201
    payload = response.json()
    assert payload["status"] == "pending"
    assert payload["message"] == "I would like to visit."
    assert payload["property"]["id"] == listing.id


def test_create_viewing_request_with_rate_limit_enabled_returns_201(
    api_client,
    db_session,
    monkeypatch,
):
    from app.core import rate_limit as rate_limit_module

    monkeypatch.setattr(settings, "RATE_LIMIT_ENABLED", True)
    monkeypatch.setattr(rate_limit_module.limiter, "enabled", True)

    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    seed_realtor_profile(db_session, realtor.id)
    listing = seed_property(db_session, owner_id=realtor.id)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    response = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={"message": "Rate limit path check."},
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 201
    payload = response.json()
    assert payload["status"] == "pending"
    assert payload["message"] == "Rate limit path check."
    assert payload["property"]["id"] == listing.id
    assert response.headers.get("X-RateLimit-Limit") is not None

    created_count = (
        db_session.query(ViewingRequest)
        .filter(
            ViewingRequest.property_id == listing.id,
            ViewingRequest.requester_id == renter.id,
        )
        .count()
    )
    assert created_count == 1


def test_create_viewing_request_duplicate_returns_409(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    seed_realtor_profile(db_session, realtor.id)
    listing = seed_property(db_session, owner_id=realtor.id)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    headers = csrf_headers(api_client)

    first = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={},
        headers=headers,
    )
    second = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={},
        headers=headers,
    )

    assert first.status_code == 201
    assert second.status_code == 409
    assert second.json()["success"] is False


def test_create_viewing_request_for_own_property_returns_400(
    api_client,
    db_session,
):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    seed_realtor_profile(db_session, realtor.id)
    listing = seed_property(db_session, owner_id=realtor.id)

    login_user(api_client, realtor.email)
    response = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={},
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 400


def test_create_viewing_request_unauthenticated_returns_401(
    api_client,
    db_session,
):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    seed_realtor_profile(db_session, realtor.id)
    listing = seed_property(db_session, owner_id=realtor.id)

    response = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={},
    )

    assert response.status_code == 401


def test_create_viewing_request_without_owner_returns_400(
    api_client,
    db_session,
):
    listing = seed_property(db_session, owner_id=None)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    response = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={},
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 400


def test_cancel_pending_request(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    seed_realtor_profile(db_session, realtor.id)
    listing = seed_property(db_session, owner_id=realtor.id)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    headers = csrf_headers(api_client)
    created = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={},
        headers=headers,
    )
    request_id = created.json()["id"]

    response = api_client.patch(
        f"/viewing-requests/{request_id}/cancel",
        headers=headers,
    )

    assert response.status_code == 200
    assert response.json()["status"] == "cancelled"


def test_realtor_accept_request(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    seed_realtor_profile(db_session, realtor.id)
    listing = seed_property(db_session, owner_id=realtor.id)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    headers = csrf_headers(api_client)
    created = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={"message": "Please confirm"},
        headers=headers,
    )
    request_id = created.json()["id"]

    login_user(api_client, realtor.email)
    response = api_client.patch(
        f"/realtor/viewing-requests/{request_id}/accept",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "accepted"
    assert payload["requester_email"] == renter.email
    assert payload["responded_at"] is not None


def test_realtor_decline_request(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    seed_realtor_profile(db_session, realtor.id)
    listing = seed_property(db_session, owner_id=realtor.id)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    created = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={},
        headers=csrf_headers(api_client),
    )
    request_id = created.json()["id"]

    login_user(api_client, realtor.email)
    response = api_client.patch(
        f"/realtor/viewing-requests/{request_id}/decline",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 200
    assert response.json()["status"] == "declined"


def test_realtor_cannot_manage_other_realtor_request(api_client, db_session):
    owner = seed_user(db_session, role="realtor", email="owner@example.com")
    other = seed_user(db_session, role="realtor", email="other@example.com")
    seed_realtor_profile(db_session, owner.id)
    seed_realtor_profile(db_session, other.id)
    listing = seed_property(db_session, owner_id=owner.id)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    created = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={},
        headers=csrf_headers(api_client),
    )
    request_id = created.json()["id"]

    login_user(api_client, other.email)
    response = api_client.patch(
        f"/realtor/viewing-requests/{request_id}/accept",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 404


def test_list_realtor_viewing_requests_returns_pending_request(
    api_client,
    db_session,
):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    seed_realtor_profile(db_session, realtor.id)
    listing = seed_property(db_session, owner_id=realtor.id)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    created = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={"message": "Please confirm"},
        headers=csrf_headers(api_client),
    )
    assert created.status_code == 201
    request_id = created.json()["id"]

    login_user(api_client, realtor.email)
    response = api_client.get(
        "/realtor/viewing-requests",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] == 1
    assert payload["items"][0]["id"] == request_id
    assert payload["items"][0]["status"] == "pending"
    assert payload["items"][0]["requester_email"] == renter.email
    assert payload["items"][0]["property"]["id"] == listing.id


def test_list_my_viewing_requests(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    seed_realtor_profile(db_session, realtor.id)
    listing = seed_property(db_session, owner_id=realtor.id)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    headers = csrf_headers(api_client)
    api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={"message": "Hello"},
        headers=headers,
    )

    response = api_client.get(
        f"/viewing-requests?property_id={listing.id}",
        headers=headers,
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] == 1
    assert payload["items"][0]["property"]["title"] == "Listing"
    assert payload["items"][0]["message"] == "Hello"


def test_new_request_allowed_after_decline(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    seed_realtor_profile(db_session, realtor.id)
    listing = seed_property(db_session, owner_id=realtor.id)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    renter_headers = csrf_headers(api_client)
    created = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={},
        headers=renter_headers,
    )
    request_id = created.json()["id"]

    login_user(api_client, realtor.email)
    api_client.patch(
        f"/realtor/viewing-requests/{request_id}/decline",
        headers=csrf_headers(api_client),
    )

    login_user(api_client, renter.email)
    response = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={},
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 201


def _create_accepted_viewing_request(api_client, db_session):
    realtor = seed_user(db_session, role="realtor", email="realtor@example.com")
    seed_realtor_profile(db_session, realtor.id)
    listing = seed_property(db_session, owner_id=realtor.id)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    created = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={},
        headers=csrf_headers(api_client),
    )
    request_id = created.json()["id"]

    login_user(api_client, realtor.email)
    api_client.patch(
        f"/realtor/viewing-requests/{request_id}/accept",
        headers=csrf_headers(api_client),
    )

    return realtor, renter, listing, request_id


def test_realtor_can_get_own_viewing_request_by_id(api_client, db_session):
    realtor, renter, listing, request_id = _create_accepted_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, realtor.email)
    response = api_client.get(
        f"/realtor/viewing-requests/{request_id}",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["id"] == request_id
    assert payload["status"] == "accepted"
    assert payload["requester_email"] == renter.email
    assert payload["property"]["id"] == listing.id


def test_realtor_cannot_get_other_realtor_viewing_request_by_id(
    api_client,
    db_session,
):
    owner = seed_user(db_session, role="realtor", email="owner@example.com")
    other = seed_user(db_session, role="realtor", email="other@example.com")
    seed_realtor_profile(db_session, owner.id)
    seed_realtor_profile(db_session, other.id)
    listing = seed_property(db_session, owner_id=owner.id)
    renter = seed_user(db_session, email="renter@example.com")

    login_user(api_client, renter.email)
    created = api_client.post(
        f"/properties/{listing.id}/viewing-requests",
        json={},
        headers=csrf_headers(api_client),
    )
    request_id = created.json()["id"]

    login_user(api_client, other.email)
    response = api_client.get(
        f"/realtor/viewing-requests/{request_id}",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 404


def test_renter_cannot_use_realtor_viewing_request_get_path(api_client, db_session):
    _realtor, renter, _listing, request_id = _create_accepted_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, renter.email)
    response = api_client.get(
        f"/realtor/viewing-requests/{request_id}",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 403


def test_realtor_get_viewing_request_after_property_archive(api_client, db_session):
    from app.services import property_service

    realtor, _renter, listing, request_id = _create_accepted_viewing_request(
        api_client,
        db_session,
    )

    property_service.archive_property(
        db_session,
        listing.id,
        actor_user_id=realtor.id,
    )

    login_user(api_client, realtor.email)
    response = api_client.get(
        f"/realtor/viewing-requests/{request_id}",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 200
    assert response.json()["property"]["status"] == "archived"


def test_renter_get_viewing_request_after_property_archive(api_client, db_session):
    from app.services import property_service

    realtor, renter, listing, request_id = _create_accepted_viewing_request(
        api_client,
        db_session,
    )

    property_service.archive_property(
        db_session,
        listing.id,
        actor_user_id=realtor.id,
    )

    login_user(api_client, renter.email)
    response = api_client.get(
        f"/viewing-requests/{request_id}",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 200
    assert response.json()["property"]["status"] == "archived"


def test_archived_listing_private_relationship_lifecycle(api_client, db_session):
    from app.models.rental_document import RentalDocument
    from app.models.viewing_request import ViewingRequest
    from app.services import property_service

    PDF_BYTES = b"%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF"

    realtor, renter, listing, request_id = _create_accepted_viewing_request(
        api_client,
        db_session,
    )
    outsider = seed_user(db_session, email="outsider@example.com")

    login_user(api_client, realtor.email)
    uploaded = api_client.post(
        f"/viewing-requests/{request_id}/rental-documents",
        files={"file": ("lease.pdf", PDF_BYTES, "application/pdf")},
        data={"document_type": "lease_agreement"},
        headers=csrf_headers(api_client),
    )
    assert uploaded.status_code == 201
    document_id = uploaded.json()["id"]

    property_service.archive_property(
        db_session,
        listing.id,
        actor_user_id=realtor.id,
    )

    login_user(api_client, renter.email)
    property_response = api_client.get(f"/properties/{listing.id}")
    assert property_response.status_code == 404

    renter_detail = api_client.get(
        f"/viewing-requests/{request_id}",
        headers=csrf_headers(api_client),
    )
    assert renter_detail.status_code == 200

    login_user(api_client, realtor.email)
    realtor_detail = api_client.get(
        f"/realtor/viewing-requests/{request_id}",
        headers=csrf_headers(api_client),
    )
    assert realtor_detail.status_code == 200

    login_user(api_client, renter.email)
    listed = api_client.get(
        f"/viewing-requests/{request_id}/rental-documents",
        headers=csrf_headers(api_client),
    )
    assert listed.status_code == 200
    assert listed.json()["total"] == 1

    download = api_client.get(
        f"/rental-documents/{document_id}/download",
        headers=csrf_headers(api_client),
    )
    assert download.status_code == 200

    login_user(api_client, outsider.email)
    outsider_detail = api_client.get(
        f"/viewing-requests/{request_id}",
        headers=csrf_headers(api_client),
    )
    assert outsider_detail.status_code == 404

    outsider_docs = api_client.get(
        f"/viewing-requests/{request_id}/rental-documents",
        headers=csrf_headers(api_client),
    )
    assert outsider_docs.status_code == 404

    assert (
        db_session.query(ViewingRequest).filter_by(id=request_id).count()
        == 1
    )
    assert (
        db_session.query(RentalDocument).filter_by(id=document_id).count()
        == 1
    )
