import logging
import secrets

from fastapi import Request, Response

from app.core.config import settings
from app.core.exceptions import ForbiddenException

logger = logging.getLogger(__name__)

CSRF_EXEMPT_PATHS = frozenset(
    {
        "/auth/login",
        "/auth/register",
        "/auth/forgot-password",
        "/auth/reset-password",
    }
)


def generate_csrf_token() -> str:
    return secrets.token_urlsafe(32)


def set_csrf_cookie(response: Response, token: str) -> None:
    response.set_cookie(
        key=settings.CSRF_COOKIE_NAME,
        value=token,
        httponly=False,
        secure=settings.SESSION_COOKIE_SECURE,
        samesite=settings.SESSION_COOKIE_SAMESITE,
        max_age=settings.SESSION_ABSOLUTE_TIMEOUT_MINUTES * 60,
        path="/",
    )


def clear_csrf_cookie(response: Response) -> None:
    response.delete_cookie(
        key=settings.CSRF_COOKIE_NAME,
        path="/",
    )


def validate_csrf_request(request: Request) -> None:
    if request.method in {"GET", "HEAD", "OPTIONS"}:
        return

    if request.url.path in CSRF_EXEMPT_PATHS:
        return

    if request.method not in {"POST", "PUT", "PATCH", "DELETE"}:
        return

    if not request.cookies.get(settings.SESSION_COOKIE_NAME):
        return

    cookie_token = request.cookies.get(settings.CSRF_COOKIE_NAME)
    header_token = request.headers.get(settings.CSRF_HEADER_NAME)

    if not cookie_token or not header_token or cookie_token != header_token:
        logger.warning("CSRF validation failed for path=%s", request.url.path)
        raise ForbiddenException("CSRF validation failed")
