import logging
from pathlib import Path

logger = logging.getLogger(__name__)

UPLOAD_DIR_NAME = "uploads"


def get_upload_root() -> Path:
    return Path(UPLOAD_DIR_NAME).resolve()


def resolve_upload_file_path(stored_url: str | None) -> Path | None:
    if not stored_url:
        return None

    normalized = stored_url.strip()
    if not normalized:
        return None

    relative: str | None = None
    if normalized.startswith("/uploads/"):
        relative = normalized[len("/uploads/") :]
    elif normalized.startswith("uploads/"):
        relative = normalized[len("uploads/") :]
    else:
        return None

    if not relative or relative in {".", ".."}:
        return None

    if "/" in relative or "\\" in relative:
        return None

    if ".." in Path(relative).parts:
        return None

    upload_root = get_upload_root()
    candidate = (upload_root / relative).resolve()

    try:
        candidate.relative_to(upload_root)
    except ValueError:
        logger.warning("Rejected upload path outside upload root")
        return None

    return candidate


def collect_property_upload_urls(*stored_urls: str | None) -> list[str]:
    unique: list[str] = []
    seen: set[str] = set()

    for url in stored_urls:
        if not url:
            continue

        key = url.strip()
        if not key or key in seen:
            continue

        seen.add(key)
        unique.append(key)

    return unique


def delete_upload_file(stored_url: str | None) -> bool:
    path = resolve_upload_file_path(stored_url)
    if path is None:
        return False

    if not path.is_file():
        logger.warning(
            "Upload file missing during cleanup filename=%s",
            path.name,
        )
        return False

    try:
        path.unlink()
        return True
    except OSError:
        logger.warning(
            "Failed to delete upload file filename=%s",
            path.name,
            exc_info=True,
        )
        return False


def delete_upload_files(stored_urls: list[str]) -> None:
    for url in stored_urls:
        delete_upload_file(url)
