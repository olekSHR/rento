from fastapi.responses import JSONResponse


async def not_found_exception_handler(
    request,
    exc
):

    return JSONResponse(
        status_code=404,
        content={
            "success": False,
            "message": getattr(exc, "message", getattr(exc, "detail", "Not found"))
        }
    )


async def bad_request_exception_handler(
    request,
    exc
):

    return JSONResponse(
        status_code=400,
        content={
            "success": False,
            "message": exc.detail
        }
    )