import os
from uuid import uuid4

from fastapi import APIRouter, UploadFile, File
from fastapi import Depends
from app.core.exceptions import BadRequestException
from app.core.security.dependencies import (
    require_admin_or_realtor
)

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


MAX_UPLOAD_BYTES = 10 * 1024 * 1024
CHUNK_SIZE_BYTES = 1024 * 1024


def _detect_image_type(header: bytes) -> tuple[str, str]:
    if len(header) >= 3 and header[0:3] == b"\xFF\xD8\xFF":
        return ("jpg", "image/jpeg")

    if len(header) >= 8 and header[0:8] == b"\x89PNG\r\n\x1a\n":
        return ("png", "image/png")

    if len(header) >= 12 and header[0:4] == b"RIFF" and header[8:12] == b"WEBP":
        return ("webp", "image/webp")

    raise BadRequestException(
        "Unsupported file type. Allowed: JPEG, PNG, WebP."
    )


@router.post("/")
def upload_image(
    image: UploadFile = File(...),
    current_user=Depends(
        require_admin_or_realtor
    )
):
    if not image.content_type:
        raise BadRequestException(
            "Missing content type. Allowed: image/jpeg, image/png, image/webp."
        )

    allowed_content_types = frozenset(
        {
            "image/jpeg",
            "image/png",
            "image/webp",
        }
    )

    if image.content_type not in allowed_content_types:
        raise BadRequestException(
            "Unsupported content type. Allowed: image/jpeg, image/png, image/webp."
        )

    try:
        header = image.file.read(16)
        image.file.seek(0)
    except Exception:
        raise BadRequestException(
            "Failed to read uploaded file."
        )

    extension, expected_content_type = _detect_image_type(header)

    if image.content_type != expected_content_type:
        raise BadRequestException(
            "File content does not match content type."
        )

    filename = f"{uuid4()}.{extension}"
    final_path = os.path.join("uploads", filename)
    temp_path = os.path.join("uploads", f"{uuid4()}.uploading")

    total_bytes = 0

    try:
        with open(temp_path, "xb") as buffer:
            while True:
                chunk = image.file.read(CHUNK_SIZE_BYTES)
                if not chunk:
                    break

                total_bytes += len(chunk)

                if total_bytes > MAX_UPLOAD_BYTES:
                    raise BadRequestException(
                        "File too large. Max size is 10 MB."
                    )

                buffer.write(chunk)

        os.replace(temp_path, final_path)
    except BadRequestException:
        try:
            if os.path.exists(temp_path):
                os.remove(temp_path)
        except Exception:
            pass
        raise
    except FileExistsError:
        try:
            if os.path.exists(temp_path):
                os.remove(temp_path)
        except Exception:
            pass
        raise BadRequestException(
            "Upload collision. Please retry."
        )
    except Exception:
        try:
            if os.path.exists(temp_path):
                os.remove(temp_path)
        except Exception:
            pass
        raise BadRequestException(
            "Failed to save uploaded file."
        )

    return {
        "filename": filename,
        "url": f"/uploads/{filename}"
    }
