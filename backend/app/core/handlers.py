from fastapi import Request
from fastapi.responses import JSONResponse

from app.core.observability.signals import emit_failure_signal


def _request_path(request: Request | None) -> str | None:
    if request is None:
        return None

    return request.url.path


async def not_found_exception_handler(
    request: Request,
    exc,
):
    emit_failure_signal(
        "not_found",
        path=_request_path(request),
        status_code=404,
    )

    return JSONResponse(
        status_code=404,
        content={
            "success": False,
            "message": getattr(exc, "message", getattr(exc, "detail", "Not found"))
        }
    )


async def bad_request_exception_handler(
    request: Request,
    exc,
):
    emit_failure_signal(
        "bad_request",
        path=_request_path(request),
        status_code=400,
    )

    return JSONResponse(
        status_code=400,
        content={
            "success": False,
            "message": exc.detail
        }
    )


async def forbidden_exception_handler(
    request: Request,
    exc,
):
    emit_failure_signal(
        "forbidden",
        path=_request_path(request),
        status_code=403,
    )

    return JSONResponse(
        status_code=403,
        content={
            "success": False,
            "message": exc.detail
        }
    )


async def unauthorized_exception_handler(
    request: Request,
    exc,
):
    emit_failure_signal(
        "unauthorized",
        path=_request_path(request),
        status_code=401,
    )

    return JSONResponse(
        status_code=401,
        content={
            "success": False,
            "message": exc.detail
        }
    )
