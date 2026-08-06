import logging
import os
import re
from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

from app.core.config import settings
from app.core.exceptions import BadRequestException
from app.core.observability.signals import emit_upload_signal

logger = logging.getLogger(__name__)

DOCUMENTS_DIR_NAME = "documents"
UPLOAD_ROOT_NAME = "uploads"
CHUNK_SIZE_BYTES = 1024 * 1024
PDF_MIME_TYPE = "application/pdf"
MAX_ORIGINAL_FILENAME_LENGTH = 255

_UNSAFE_FILENAME_CHARS = re.compile(r"[^\w.\- ()]")


def get_upload_root() -> Path:
    return Path(UPLOAD_ROOT_NAME).resolve()


def get_documents_root() -> Path:
    return (get_upload_root() / DOCUMENTS_DIR_NAME).resolve()


def ensure_documents_root() -> Path:
    root = get_documents_root()
    root.mkdir(parents=True, exist_ok=True)
    return root


def is_private_document_path(stored_path: str | None) -> bool:
    if not stored_path:
        return False

    normalized = stored_path.strip().replace("\\", "/")
    return normalized.startswith(f"{DOCUMENTS_DIR_NAME}/")


def resolve_document_file_path(stored_path: str | None) -> Path | None:
    if not stored_path:
        return None

    normalized = stored_path.strip().replace("\\", "/")
    if not normalized.startswith(f"{DOCUMENTS_DIR_NAME}/"):
        return None

    relative = normalized[len(f"{DOCUMENTS_DIR_NAME}/") :]
    if not relative or relative in {".", ".."}:
        return None

    if "/" in relative or "\\" in relative:
        return None

    if ".." in Path(relative).parts:
        return None

    documents_root = get_documents_root()
    candidate = (documents_root / relative).resolve()

    try:
        candidate.relative_to(documents_root)
    except ValueError:
        logger.warning("Rejected document path outside documents root")
        return None

    return candidate


def sanitize_original_filename(filename: str | None) -> str | None:
    if filename is None:
        return None

    basename = os.path.basename(filename.strip())
    if not basename:
        return None

    cleaned = _UNSAFE_FILENAME_CHARS.sub("_", basename).strip("._")
    if not cleaned:
        return None

    if not cleaned.lower().endswith(".pdf"):
        cleaned = f"{cleaned}.pdf"

    return cleaned[:MAX_ORIGINAL_FILENAME_LENGTH]


def sanitize_content_disposition_filename(filename: str) -> str:
    cleaned = sanitize_original_filename(filename) or "document.pdf"
    without_breaks = cleaned.replace("\r", "").replace("\n", "")
    return without_breaks.replace('"', "'")[:MAX_ORIGINAL_FILENAME_LENGTH]


def _detect_pdf(header: bytes) -> None:
    if not header.startswith(b"%PDF-"):
        raise BadRequestException(
            "Unsupported file type. Allowed: PDF only."
        )


def save_pdf_upload(
    upload_file: UploadFile,
    *,
    actor_user_id: int,
) -> tuple[str, str, int]:
    if not upload_file.content_type:
        emit_upload_signal(
            "deny",
            actor_user_id=actor_user_id,
            reason_code="missing_content_type",
        )
        raise BadRequestException(
            "Missing content type. Allowed: application/pdf."
        )

    if upload_file.content_type != PDF_MIME_TYPE:
        emit_upload_signal(
            "deny",
            actor_user_id=actor_user_id,
            reason_code="unsupported_content_type",
        )
        raise BadRequestException(
            "Unsupported content type. Allowed: application/pdf."
        )

    try:
        header = upload_file.file.read(16)
        upload_file.file.seek(0)
    except Exception:
        emit_upload_signal(
            "deny",
            actor_user_id=actor_user_id,
            reason_code="read_failed",
        )
        raise BadRequestException(
            "Failed to read uploaded file."
        )

    if not header:
        emit_upload_signal(
            "deny",
            actor_user_id=actor_user_id,
            reason_code="empty_file",
        )
        raise BadRequestException(
            "Uploaded file is empty."
        )

    try:
        _detect_pdf(header)
    except BadRequestException:
        emit_upload_signal(
            "deny",
            actor_user_id=actor_user_id,
            reason_code="unsupported_file_type",
        )
        raise

    documents_root = ensure_documents_root()
    filename = f"{uuid4()}.pdf"
    stored_path = f"{DOCUMENTS_DIR_NAME}/{filename}"
    final_path = documents_root / filename
    temp_path = documents_root / f"{uuid4()}.uploading"

    max_bytes = settings.MAX_DOCUMENT_UPLOAD_BYTES
    total_bytes = 0

    try:
        with open(temp_path, "xb") as buffer:
            while True:
                chunk = upload_file.file.read(CHUNK_SIZE_BYTES)
                if not chunk:
                    break

                total_bytes += len(chunk)

                if total_bytes > max_bytes:
                    emit_upload_signal(
                        "deny",
                        actor_user_id=actor_user_id,
                        reason_code="file_too_large",
                    )
                    raise BadRequestException(
                        f"File too large. Max size is {max_bytes // (1024 * 1024)} MB."
                    )

                buffer.write(chunk)

        if total_bytes == 0:
            emit_upload_signal(
                "deny",
                actor_user_id=actor_user_id,
                reason_code="empty_file",
            )
            raise BadRequestException(
                "Uploaded file is empty."
            )

        os.replace(temp_path, final_path)
    except BadRequestException:
        try:
            if temp_path.exists():
                temp_path.unlink()
        except Exception:
            pass
        raise
    except FileExistsError:
        try:
            if temp_path.exists():
                temp_path.unlink()
        except Exception:
            pass
        emit_upload_signal(
            "deny",
            actor_user_id=actor_user_id,
            reason_code="upload_collision",
        )
        raise BadRequestException(
            "Upload collision. Please retry."
        )
    except Exception:
        try:
            if temp_path.exists():
                temp_path.unlink()
        except Exception:
            pass
        emit_upload_signal(
            "deny",
            actor_user_id=actor_user_id,
            reason_code="save_failed",
        )
        raise BadRequestException(
            "Failed to save uploaded file."
        )

    emit_upload_signal(
        "success",
        actor_user_id=actor_user_id,
        file_ref=stored_path,
    )

    return stored_path, PDF_MIME_TYPE, total_bytes


def delete_document_file(stored_path: str | None) -> bool:
    path = resolve_document_file_path(stored_path)
    if path is None:
        return False

    if not path.is_file():
        logger.warning(
            "Document file missing during cleanup path=%s",
            stored_path,
        )
        return False

    try:
        path.unlink()
        return True
    except OSError:
        logger.exception(
            "Failed to delete document file path=%s",
            stored_path,
        )
        return False
