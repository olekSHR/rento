import hashlib
import hmac
import logging
import secrets
from datetime import UTC, datetime, timedelta
from urllib.parse import quote

from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.exceptions import BadRequestException
from app.core.security.hashing import hash_password
from app.repositories import password_reset_repository, user_repository
from app.services.account_status_service import ACCOUNT_STATUS_ACTIVE
from app.services.email_service import send_password_reset_email


logger = logging.getLogger(__name__)


FORGOT_PASSWORD_MESSAGE = (
    "If an account with that email exists, we sent password reset instructions."
)

RESET_PASSWORD_SUCCESS_MESSAGE = (
    "Password has been reset. You can now sign in."
)

INVALID_RESET_TOKEN_MESSAGE = (
    "Invalid or expired reset token."
)


def _normalize_email(email: str) -> str:
    return email.strip().lower()


def _hash_reset_token(token: str) -> str:
    return hmac.new(
        settings.SECRET_KEY.encode(),
        token.encode(),
        hashlib.sha256,
    ).hexdigest()


def _build_reset_url(token: str) -> str:
    frontend_url = settings.FRONTEND_URL.rstrip("/")
    return f"{frontend_url}/reset-password?token={quote(token, safe='')}"


def request_password_reset(
    db: Session,
    email: str,
) -> dict:

    normalized_email = _normalize_email(email)
    user = user_repository.get_user_by_email(db, normalized_email)

    if user and user.account_status == ACCOUNT_STATUS_ACTIVE:
        plain_token = secrets.token_urlsafe(32)
        token_hash = _hash_reset_token(plain_token)
        now = datetime.now(UTC)
        expires_at = now + timedelta(
            minutes=settings.PASSWORD_RESET_EXPIRE_MINUTES
        )

        password_reset_repository.invalidate_unused_tokens_for_user(
            db,
            user.id,
            used_at=now,
            commit=False,
        )

        password_reset_repository.create_token(
            db,
            user.id,
            token_hash,
            expires_at,
            commit=False,
        )

        db.commit()

        reset_url = _build_reset_url(plain_token)

        try:
            send_password_reset_email(normalized_email, reset_url)
        except Exception:
            logger.exception(
                "Failed to send password reset email",
            )

    return {
        "success": True,
        "message": FORGOT_PASSWORD_MESSAGE,
    }


def reset_password(
    db: Session,
    token: str,
    new_password: str,
) -> dict:

    token_hash = _hash_reset_token(token.strip())
    reset_token = password_reset_repository.get_by_token_hash(
        db,
        token_hash,
    )

    now = datetime.now(UTC)

    if not reset_token:
        raise BadRequestException(INVALID_RESET_TOKEN_MESSAGE)

    if reset_token.used_at is not None:
        raise BadRequestException(INVALID_RESET_TOKEN_MESSAGE)

    expires_at = reset_token.expires_at

    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=UTC)

    if expires_at <= now:
        raise BadRequestException(INVALID_RESET_TOKEN_MESSAGE)

    user = user_repository.get_user_by_id(db, reset_token.user_id)

    if not user:
        raise BadRequestException(INVALID_RESET_TOKEN_MESSAGE)

    hashed_password = hash_password(new_password)

    user_repository.update_password(
        db,
        user,
        hashed_password,
        commit=False,
    )

    password_reset_repository.mark_token_used(
        db,
        reset_token,
        used_at=now,
        commit=False,
    )

    db.commit()

    return {
        "success": True,
        "message": RESET_PASSWORD_SUCCESS_MESSAGE,
    }
