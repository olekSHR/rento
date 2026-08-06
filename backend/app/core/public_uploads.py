from urllib.parse import unquote

from starlette.responses import Response
from starlette.staticfiles import StaticFiles


def _normalize_static_path(path: str) -> str:
    decoded = unquote(path).replace("\\", "/")
    while "//" in decoded:
        decoded = decoded.replace("//", "/")
    return decoded.lstrip("/")


def _is_blocked_documents_path(path: str) -> bool:
    normalized = _normalize_static_path(path)
    if not normalized:
        return False

    parts = [part for part in normalized.split("/") if part not in {"", "."}]
    if not parts:
        return False

    if parts[0].lower() == "documents":
        return True

    return "documents" in [part.lower() for part in parts]


class PublicUploadsStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        if _is_blocked_documents_path(path):
            return Response(status_code=404)

        return await super().get_response(path, scope)
