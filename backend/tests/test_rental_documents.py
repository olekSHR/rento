import io
from pathlib import Path
from unittest.mock import patch

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.document_storage import ensure_documents_root
from app.core.security.hashing import hash_password
from app.database.database import Base, SessionLocal, engine
from app.models.property import Property
from app.models.realtor_profile import RealtorProfile
from app.models.user import User
from app.repositories import rental_document_repository


PDF_BYTES = b"%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF"
FAKE_PDF_BYTES = b"NOT-A-PDF-FILE"


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
        city="Galati",
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


def seed_viewing_request(
    api_client,
    db_session,
    *,
    accept: bool = True,
    decline: bool = False,
    cancel: bool = False,
):
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

    if accept:
        login_user(api_client, realtor.email)
        api_client.patch(
            f"/realtor/viewing-requests/{request_id}/accept",
            headers=csrf_headers(api_client),
        )
    elif decline:
        login_user(api_client, realtor.email)
        api_client.patch(
            f"/realtor/viewing-requests/{request_id}/decline",
            headers=csrf_headers(api_client),
        )
    elif cancel:
        login_user(api_client, renter.email)
        api_client.patch(
            f"/viewing-requests/{request_id}/cancel",
            headers=csrf_headers(api_client),
        )

    return realtor, renter, listing, request_id


def upload_pdf(
    client,
    viewing_request_id: int,
    document_type: str,
    *,
    title: str | None = None,
    content: bytes = PDF_BYTES,
    content_type: str = "application/pdf",
    filename: str = "lease.pdf",
):
    data = {"document_type": document_type}
    if title is not None:
        data["title"] = title

    return client.post(
        f"/viewing-requests/{viewing_request_id}/rental-documents",
        data=data,
        files={
            "file": (
                filename,
                io.BytesIO(content),
                content_type,
            )
        },
        headers=csrf_headers(client),
    )


def test_upload_requires_accepted_viewing_request(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
        accept=False,
    )

    login_user(api_client, "realtor@example.com")
    response = upload_pdf(api_client, request_id, "lease_agreement")

    assert response.status_code == 404


def test_upload_blocked_for_declined_request(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
        accept=False,
        decline=True,
    )

    login_user(api_client, "realtor@example.com")
    response = upload_pdf(api_client, request_id, "lease_agreement")

    assert response.status_code == 404


def test_upload_blocked_for_cancelled_request(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
        accept=True,
    )

    login_user(api_client, "renter@example.com")
    api_client.patch(
        f"/viewing-requests/{request_id}/cancel",
        headers=csrf_headers(api_client),
    )

    login_user(api_client, "realtor@example.com")
    response = upload_pdf(api_client, request_id, "lease_agreement")

    assert response.status_code == 404


def test_realtor_upload_list_download_archive(api_client, db_session):
    realtor, renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, realtor.email)
    uploaded = upload_pdf(api_client, request_id, "lease_agreement")
    assert uploaded.status_code == 201
    document_id = uploaded.json()["id"]
    payload = uploaded.json()
    assert payload["status"] == "active"
    assert payload["display_name"] == "Lease Agreement"
    assert payload["can_download"] is True
    assert payload["can_archive"] is True
    assert payload["renter_id"] == renter.id
    assert payload["realtor_id"] == realtor.id
    assert "stored_path" not in payload

    listed = api_client.get(
        f"/viewing-requests/{request_id}/rental-documents",
        headers=csrf_headers(api_client),
    )
    assert listed.status_code == 200
    assert listed.json()["total"] == 1

    login_user(api_client, renter.email)
    download = api_client.get(
        f"/rental-documents/{document_id}/download",
        headers=csrf_headers(api_client),
    )
    assert download.status_code == 200
    assert download.headers["content-type"] == "application/pdf"
    assert download.headers["cache-control"] == "private, no-store"
    assert download.headers["x-content-type-options"] == "nosniff"
    assert download.content.startswith(b"%PDF")

    login_user(api_client, realtor.email)
    archived = api_client.post(
        f"/rental-documents/{document_id}/archive",
        headers=csrf_headers(api_client),
    )
    assert archived.status_code == 200
    assert archived.json()["status"] == "archived"
    assert archived.json()["can_download"] is False
    assert archived.json()["archived_at"] is not None

    archived_download = api_client.get(
        f"/rental-documents/{document_id}/download",
        headers=csrf_headers(api_client),
    )
    assert archived_download.status_code == 404


def test_renter_list_and_realtor_list(api_client, db_session):
    realtor, renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, realtor.email)
    upload_pdf(api_client, request_id, "inventory")

    login_user(api_client, renter.email)
    renter_list = api_client.get(
        f"/viewing-requests/{request_id}/rental-documents",
        headers=csrf_headers(api_client),
    )
    assert renter_list.status_code == 200
    assert renter_list.json()["total"] == 1

    login_user(api_client, realtor.email)
    realtor_list = api_client.get(
        f"/viewing-requests/{request_id}/rental-documents",
        headers=csrf_headers(api_client),
    )
    assert realtor_list.status_code == 200
    assert realtor_list.json()["total"] == 1


def test_unrelated_list_returns_404(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )
    other = seed_user(db_session, email="other@example.com")

    login_user(api_client, other.email)
    response = api_client.get(
        f"/viewing-requests/{request_id}/rental-documents",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 404


def test_duplicate_active_type_returns_409(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, "realtor@example.com")
    first = upload_pdf(api_client, request_id, "inventory")
    second = upload_pdf(api_client, request_id, "inventory")

    assert first.status_code == 201
    assert second.status_code == 409


def test_other_type_requires_title(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, "realtor@example.com")
    response = upload_pdf(api_client, request_id, "other")

    assert response.status_code == 400


def test_other_type_with_title(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, "realtor@example.com")
    response = upload_pdf(api_client, request_id, "other", title="Parking rules")

    assert response.status_code == 201
    assert response.json()["display_name"] == "Parking rules"


def test_renter_cannot_upload(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, "renter@example.com")
    response = upload_pdf(api_client, request_id, "house_rules")

    assert response.status_code == 403


def test_unrelated_realtor_upload_and_download_return_404(api_client, db_session):
    realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )
    other = seed_user(db_session, role="realtor", email="other@example.com")
    seed_realtor_profile(db_session, other.id)

    login_user(api_client, other.email)
    upload_response = upload_pdf(api_client, request_id, "house_rules")
    assert upload_response.status_code == 404

    login_user(api_client, realtor.email)
    uploaded = upload_pdf(api_client, request_id, "house_rules")
    document_id = uploaded.json()["id"]

    login_user(api_client, other.email)
    response = api_client.get(
        f"/rental-documents/{document_id}/download",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 404


def test_anonymous_download_rejected(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, "realtor@example.com")
    uploaded = upload_pdf(api_client, request_id, "house_rules")
    document_id = uploaded.json()["id"]

    api_client.cookies.clear()
    response = api_client.get(f"/rental-documents/{document_id}/download")

    assert response.status_code == 401


def test_public_uploads_block_documents_path(api_client):
    documents_root = ensure_documents_root()
    secret_name = "controlled-secret.pdf"
    secret_path = documents_root / secret_name
    secret_path.write_bytes(PDF_BYTES)

    public_root = Path("uploads")
    public_root.mkdir(exist_ok=True)
    public_image = public_root / "public-image.jpg"
    public_image.write_bytes(b"\xff\xd8\xffpublic-image")

    try:
        blocked = api_client.get(f"/uploads/documents/{secret_name}")
        assert blocked.status_code == 404
        assert not blocked.content.startswith(b"%PDF")

        encoded = api_client.get("/uploads/documents%2Fcontrolled-secret.pdf")
        assert encoded.status_code == 404

        traversal = api_client.get("/uploads/documents/../public-image.jpg")
        assert traversal.status_code in {404, 200}
        if traversal.status_code == 200:
            assert traversal.content == b"\xff\xd8\xffpublic-image"

        allowed = api_client.get("/uploads/public-image.jpg")
        assert allowed.status_code == 200
        assert allowed.content == b"\xff\xd8\xffpublic-image"
    finally:
        secret_path.unlink(missing_ok=True)
        public_image.unlink(missing_ok=True)


def test_fake_pdf_rejected(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, "realtor@example.com")
    response = upload_pdf(
        api_client,
        request_id,
        "lease_agreement",
        content=FAKE_PDF_BYTES,
    )

    assert response.status_code == 400


def test_mime_mismatch_rejected(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, "realtor@example.com")
    response = upload_pdf(
        api_client,
        request_id,
        "lease_agreement",
        content_type="image/png",
    )

    assert response.status_code == 400


def test_empty_upload_rejected(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, "realtor@example.com")
    response = upload_pdf(
        api_client,
        request_id,
        "lease_agreement",
        content=b"",
    )

    assert response.status_code == 400


def test_renter_cannot_archive(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, "realtor@example.com")
    uploaded = upload_pdf(api_client, request_id, "payment_instructions")
    document_id = uploaded.json()["id"]

    login_user(api_client, "renter@example.com")
    response = api_client.post(
        f"/rental-documents/{document_id}/archive",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 403


def test_repeated_archive_rejected(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, "realtor@example.com")
    uploaded = upload_pdf(api_client, request_id, "payment_instructions")
    document_id = uploaded.json()["id"]

    headers = csrf_headers(api_client)
    first = api_client.post(
        f"/rental-documents/{document_id}/archive",
        headers=headers,
    )
    second = api_client.post(
        f"/rental-documents/{document_id}/archive",
        headers=headers,
    )

    assert first.status_code == 200
    assert second.status_code == 400


def test_new_upload_allowed_after_archive(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, "realtor@example.com")
    uploaded = upload_pdf(api_client, request_id, "payment_instructions")
    document_id = uploaded.json()["id"]

    api_client.post(
        f"/rental-documents/{document_id}/archive",
        headers=csrf_headers(api_client),
    )

    replacement = upload_pdf(api_client, request_id, "payment_instructions")
    assert replacement.status_code == 201


def test_cancelled_request_history_remains_listable(api_client, db_session):
    _realtor, renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, "realtor@example.com")
    upload_pdf(api_client, request_id, "lease_agreement")

    login_user(api_client, renter.email)
    api_client.patch(
        f"/viewing-requests/{request_id}/cancel",
        headers=csrf_headers(api_client),
    )

    listed = api_client.get(
        f"/viewing-requests/{request_id}/rental-documents",
        headers=csrf_headers(api_client),
    )

    assert listed.status_code == 200
    assert listed.json()["total"] == 1
    assert listed.json()["items"][0]["can_download"] is True


def test_archived_property_history_remains_accessible(api_client, db_session):
    realtor, renter, listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, realtor.email)
    uploaded = upload_pdf(api_client, request_id, "lease_agreement")
    document_id = uploaded.json()["id"]

    login_user(api_client, realtor.email)
    api_client.post(
        f"/realtor/properties/{listing.id}/archive",
        headers=csrf_headers(api_client),
    )

    login_user(api_client, renter.email)
    listed = api_client.get(
        f"/viewing-requests/{request_id}/rental-documents",
        headers=csrf_headers(api_client),
    )
    assert listed.status_code == 200

    download = api_client.get(
        f"/rental-documents/{document_id}/download",
        headers=csrf_headers(api_client),
    )
    assert download.status_code == 200


def test_property_owner_change_does_not_transfer_access(api_client, db_session):
    realtor, renter, listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )
    new_owner = seed_user(db_session, role="realtor", email="newowner@example.com")
    seed_realtor_profile(db_session, new_owner.id)

    login_user(api_client, realtor.email)
    uploaded = upload_pdf(api_client, request_id, "lease_agreement")
    document_id = uploaded.json()["id"]

    listing.owner_id = new_owner.id
    db_session.commit()

    login_user(api_client, new_owner.email)
    response = api_client.get(
        f"/rental-documents/{document_id}/download",
        headers=csrf_headers(api_client),
    )

    assert response.status_code == 404


def test_db_failure_cleans_up_written_file(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, "realtor@example.com")

    documents_root = ensure_documents_root()
    before = set(documents_root.glob("*.pdf"))

    with patch.object(
        rental_document_repository,
        "create_document",
        side_effect=Exception("db failed"),
    ):
        with pytest.raises(Exception, match="db failed"):
            upload_pdf(api_client, request_id, "lease_agreement")

    after = set(documents_root.glob("*.pdf"))
    assert after == before


def test_filename_header_injection_sanitized(api_client, db_session):
    _realtor, _renter, _listing, request_id = seed_viewing_request(
        api_client,
        db_session,
    )

    login_user(api_client, "realtor@example.com")
    uploaded = upload_pdf(
        api_client,
        request_id,
        "lease_agreement",
        filename='evil"\r\nX-Test: injected.pdf',
    )
    document_id = uploaded.json()["id"]

    download = api_client.get(
        f"/rental-documents/{document_id}/download",
        headers=csrf_headers(api_client),
    )

    assert download.status_code == 200
    disposition = download.headers.get("content-disposition", "")
    assert "\r" not in disposition
    assert "\n" not in disposition
    assert "injected" not in disposition.lower() or "evil" in disposition
