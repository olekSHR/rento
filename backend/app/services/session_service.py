import hashlib
import logging
import secrets
from datetime import UTC, datetime, timedelta

from fastapi import Response
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.exceptions import UnauthorizedException
from app.models.auth_session import AuthSession
from app.models.user import User
from app.repositories import user_repository

logger = logging.getLogger(__name__)


def _hash_token(raw_token: str) -> str:
    return hashlib.sha256(raw_token.encode()).hexdigest()


def _now() -> datetime:
    return datetime.now(UTC)


def _as_utc(value: datetime) -> datetime:
    if value.tzinfo is None:
        return value.replace(tzinfo=UTC)
    return value.astimezone(UTC)


def create_session(db: Session, user_id: int) -> str:
    raw_token = secrets.token_urlsafe(32)
    now = _now()
    idle_expires_at = now + timedelta(minutes=settings.SESSION_IDLE_TIMEOUT_MINUTES)
    absolute_expires_at = now + timedelta(
        minutes=settings.SESSION_ABSOLUTE_TIMEOUT_MINUTES
    )

    session = AuthSession(
        user_id=user_id,
        token_hash=_hash_token(raw_token),
        last_activity_at=now,
        idle_expires_at=idle_expires_at,
        absolute_expires_at=absolute_expires_at,
    )
    db.add(session)
    db.commit()
    db.refresh(session)

    logger.info("Session created user_id=%s session_id=%s", user_id, session.id)
    return raw_token


def set_session_cookie(response: Response, raw_token: str) -> None:
    response.set_cookie(
        key=settings.SESSION_COOKIE_NAME,
        value=raw_token,
        httponly=True,
        secure=settings.SESSION_COOKIE_SECURE,
        samesite=settings.SESSION_COOKIE_SAMESITE,
        max_age=settings.SESSION_ABSOLUTE_TIMEOUT_MINUTES * 60,
        path="/",
    )


def clear_session_cookie(response: Response) -> None:
    response.delete_cookie(
        key=settings.SESSION_COOKIE_NAME,
        path="/",
    )


def get_valid_session(
    db: Session,
    raw_token: str | None,
    *,
    touch: bool = True,
) -> AuthSession | None:
    if not raw_token:
        return None

    token_hash = _hash_token(raw_token)
    session = (
        db.query(AuthSession)
        .filter(AuthSession.token_hash == token_hash)
        .first()
    )

    if not session or session.revoked_at is not None:
        return None

    now = _now()
    absolute_expires_at = _as_utc(session.absolute_expires_at)
    idle_expires_at = _as_utc(session.idle_expires_at)

    if now >= absolute_expires_at or now >= idle_expires_at:
        session.revoked_at = now
        db.commit()
        logger.info("Session expired session_id=%s", session.id)
        return None

    if touch:
        session.last_activity_at = now
        session.idle_expires_at = now + timedelta(
            minutes=settings.SESSION_IDLE_TIMEOUT_MINUTES
        )
        db.commit()
        db.refresh(session)

    return session


def get_current_user_from_session(
    db: Session,
    raw_token: str | None,
) -> User:
    session = get_valid_session(db, raw_token)

    if not session:
        raise UnauthorizedException("Invalid or expired session")

    user = user_repository.get_user_by_id(db, session.user_id)

    if not user:
        raise UnauthorizedException("User not found")

    return user


def revoke_session(db: Session, raw_token: str | None) -> None:
    if not raw_token:
        return

    token_hash = _hash_token(raw_token)
    session = (
        db.query(AuthSession)
        .filter(AuthSession.token_hash == token_hash)
        .first()
    )

    if not session or session.revoked_at is not None:
        return

    session.revoked_at = _now()
    db.commit()
    logger.info("Session revoked session_id=%s", session.id)
