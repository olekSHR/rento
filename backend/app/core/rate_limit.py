import hashlib
import logging

from fastapi import Request
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from starlette.responses import JSONResponse

from app.core.config import settings

logger = logging.getLogger(__name__)


def get_client_ip(request: Request) -> str:
    if settings.RATE_LIMIT_TRUST_PROXY_HEADERS:
        cf_ip = request.headers.get("CF-Connecting-IP")

        if cf_ip:
            return cf_ip.strip()

        forwarded_for = request.headers.get("X-Forwarded-For")

        if forwarded_for:
            return forwarded_for.split(",")[0].strip()

        real_ip = request.headers.get("X-Real-IP")

        if real_ip:
            return real_ip.strip()

    if request.client and request.client.host:
        return request.client.host

    return "unknown"


def get_upload_rate_limit_key(request: Request) -> str:
    authorization = request.headers.get("Authorization", "")

    if authorization.startswith("Bearer "):
        token = authorization[7:].strip()

        if token:
            digest = hashlib.sha256(token.encode()).hexdigest()[:32]
            return f"upload:user:{digest}"

    return get_client_ip(request)


limiter = Limiter(
    key_func=get_client_ip,
    enabled=settings.RATE_LIMIT_ENABLED,
    storage_uri=settings.RATE_LIMIT_STORAGE_URI,
    headers_enabled=True,
    default_limits=[],
)


async def rate_limit_exception_handler(
    request: Request,
    exc: RateLimitExceeded,
) -> JSONResponse:

    response = JSONResponse(
        status_code=429,
        content={
            "success": False,
            "message": "Too many requests. Please try again later.",
        },
    )

    app_limiter = getattr(request.app.state, "limiter", None)

    if app_limiter is not None:
        view_rate_limit = getattr(request.state, "view_rate_limit", None)

        if view_rate_limit is not None:
            response = app_limiter._inject_headers(
                response,
                view_rate_limit,
            )

    return response


def register_rate_limiting(app) -> None:

    app.state.limiter = limiter
    app.add_exception_handler(
        RateLimitExceeded,
        rate_limit_exception_handler,
    )
    app.add_middleware(SlowAPIMiddleware)

    logger.info(
        "Rate limiting enabled=%s storage=%s",
        settings.RATE_LIMIT_ENABLED,
        settings.RATE_LIMIT_STORAGE_URI,
    )
