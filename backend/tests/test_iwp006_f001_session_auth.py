from datetime import UTC, datetime, timedelta
from types import SimpleNamespace
from unittest.mock import Mock

import pytest

from app.core.config import settings
from app.core.exceptions import ForbiddenException, UnauthorizedException
from app.core.security import csrf
from app.core.security.hashing import hash_password
from app.core.security import dependencies
from app.database.database import Base, SessionLocal, engine
from app.models.auth_session import AuthSession
from app.models.user import User
from app.services import session_service


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


def seed_user(db_session, *, role: str = "user", email: str = "user@example.com"):
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


def test_create_session_persists_hashed_record(db_session):
    user = seed_user(db_session)

    raw_token = session_service.create_session(db_session, user.id)

    assert raw_token
    session = db_session.query(AuthSession).one()
    assert session.user_id == user.id
    assert session.token_hash != raw_token
    assert session.revoked_at is None


def test_get_valid_session_rejects_missing_token(db_session):
    assert session_service.get_valid_session(db_session, None) is None


def test_revoked_session_is_rejected(db_session):
    user = seed_user(db_session)
    raw_token = session_service.create_session(db_session, user.id)
    session_service.revoke_session(db_session, raw_token)

    assert session_service.get_valid_session(db_session, raw_token) is None


def test_idle_expiry_rejects_session(db_session, monkeypatch):
    user = seed_user(db_session)
    monkeypatch.setattr(settings, "SESSION_IDLE_TIMEOUT_MINUTES", 0)
    raw_token = session_service.create_session(db_session, user.id)

    assert session_service.get_valid_session(db_session, raw_token, touch=False) is None


def test_absolute_expiry_rejects_session(db_session, monkeypatch):
    user = seed_user(db_session)
    raw_token = session_service.create_session(db_session, user.id)
    session = db_session.query(AuthSession).one()
    session.absolute_expires_at = datetime.now(UTC) - timedelta(minutes=1)
    db_session.commit()

    assert session_service.get_valid_session(db_session, raw_token, touch=False) is None


def test_get_current_user_from_session_returns_user(db_session):
    user = seed_user(db_session)
    raw_token = session_service.create_session(db_session, user.id)

    resolved = session_service.get_current_user_from_session(db_session, raw_token)

    assert resolved.id == user.id


def test_get_current_user_from_session_raises_for_invalid_token(db_session):
    with pytest.raises(UnauthorizedException):
        session_service.get_current_user_from_session(db_session, "invalid-token")


def test_dependencies_require_admin_returns_403(db_session):
    user = seed_user(db_session, role="user")
    raw_token = session_service.create_session(db_session, user.id)
    request = Mock()
    request.cookies = {settings.SESSION_COOKIE_NAME: raw_token}

    current_user = dependencies.get_current_user(request=request, db=db_session)

    with pytest.raises(ForbiddenException):
        dependencies.require_admin(current_user=current_user)


def test_csrf_missing_token_rejected():
    request = Mock()
    request.method = "POST"
    request.url.path = "/favorites/1"
    request.cookies = {}
    request.headers = {}

    with pytest.raises(ForbiddenException):
        csrf.validate_csrf_request(request)


def test_csrf_valid_token_accepted():
    request = Mock()
    request.method = "POST"
    request.url.path = "/auth/logout"
    request.cookies = {settings.CSRF_COOKIE_NAME: "token-value"}
    request.headers = {settings.CSRF_HEADER_NAME: "token-value"}

    csrf.validate_csrf_request(request)


def test_csrf_login_path_exempt():
    request = Mock()
    request.method = "POST"
    request.url.path = "/auth/login"
    request.cookies = {}
    request.headers = {}

    csrf.validate_csrf_request(request)


def test_dependencies_get_current_user_optional_without_cookie(db_session):
    request = Mock()
    request.cookies = {}

    assert dependencies.get_current_user_optional(request=request, db=db_session) is None
