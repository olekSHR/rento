import inspect
import os
from io import BytesIO
from unittest.mock import Mock

import pytest
from fastapi import UploadFile
from starlette.requests import Request
from starlette.responses import Response

from app.core.config import settings
from app.core.exceptions import BadRequestException
from app.core.security.dependencies import require_admin_or_realtor
from app.routers.uploads import (
    MAX_UPLOAD_BYTES,
    _detect_image_type,
    router,
    upload_image,
)


MINIMAL_JPEG = b"\xff\xd8\xff\xe0" + b"\x00" * 20
MINIMAL_PNG = b"\x89PNG\r\n\x1a\n" + b"\x00" * 8


@pytest.fixture
def isolated_uploads(tmp_path, monkeypatch):
    uploads_dir = tmp_path / "uploads"
    uploads_dir.mkdir()
    monkeypatch.chdir(tmp_path)
    monkeypatch.setattr(settings, "RATE_LIMIT_ENABLED", False)
    monkeypatch.setattr("app.routers.uploads.limiter.enabled", False)
    yield uploads_dir


@pytest.fixture
def upload_request():
    scope = {
        "type": "http",
        "method": "POST",
        "path": "/upload/",
        "headers": [],
        "client": ("127.0.0.1", 12345),
    }
    return Request(scope)


@pytest.fixture
def upload_response():
    return Response()


@pytest.fixture
def authorized_user():
    user = Mock()
    user.role = "realtor"
    return user


def make_upload_file(content: bytes, content_type: str, filename: str = "test.jpg"):
    return UploadFile(
        file=BytesIO(content),
        filename=filename,
        headers={"content-type": content_type},
    )


def get_upload_handler():
    handler = upload_image
    while hasattr(handler, "__wrapped__"):
        handler = handler.__wrapped__
    return handler


def call_upload(image: UploadFile, request, response, current_user):
    return get_upload_handler()(
        request=request,
        response=response,
        image=image,
        current_user=current_user,
    )


def test_detect_image_type_accepts_jpeg_png_webp():
    assert _detect_image_type(MINIMAL_JPEG)[1] == "image/jpeg"
    assert _detect_image_type(MINIMAL_PNG)[1] == "image/png"
    assert _detect_image_type(b"RIFF\x00\x00\x00\x00WEBP")[1] == "image/webp"


def test_detect_image_type_rejects_unknown():
    with pytest.raises(BadRequestException, match="Unsupported file type"):
        _detect_image_type(b"not-an-image")


def test_upload_route_requires_admin_or_realtor():
    post_routes = [
        route
        for route in router.routes
        if hasattr(route, "methods") and "POST" in route.methods
    ]
    assert post_routes

    handler = post_routes[0].endpoint
    while hasattr(handler, "__wrapped__"):
        handler = handler.__wrapped__

    current_user_param = inspect.signature(handler).parameters["current_user"]
    assert current_user_param.default.dependency is require_admin_or_realtor


def test_upload_accepts_valid_jpeg(
    isolated_uploads,
    upload_request,
    upload_response,
    authorized_user,
):
    result = call_upload(
        make_upload_file(MINIMAL_JPEG, "image/jpeg"),
        upload_request,
        upload_response,
        authorized_user,
    )

    assert result["filename"].endswith(".jpg")
    assert result["url"] == f"/uploads/{result['filename']}"
    assert (isolated_uploads / result["filename"]).is_file()
    assert list(isolated_uploads.glob("*.uploading")) == []


def test_upload_rejects_empty_file(
    isolated_uploads,
    upload_request,
    upload_response,
    authorized_user,
):
    with pytest.raises(BadRequestException, match="Uploaded file is empty"):
        call_upload(
            make_upload_file(b"", "image/jpeg"),
            upload_request,
            upload_response,
            authorized_user,
        )

    assert list(isolated_uploads.iterdir()) == []


def test_upload_rejects_unsupported_mime(
    isolated_uploads,
    upload_request,
    upload_response,
    authorized_user,
):
    with pytest.raises(BadRequestException, match="Unsupported content type"):
        call_upload(
            make_upload_file(MINIMAL_JPEG, "image/gif"),
            upload_request,
            upload_response,
            authorized_user,
        )

    assert list(isolated_uploads.iterdir()) == []


def test_upload_rejects_missing_content_type(
    isolated_uploads,
    upload_request,
    upload_response,
    authorized_user,
):
    upload = UploadFile(file=BytesIO(MINIMAL_JPEG), filename="test.jpg")

    with pytest.raises(BadRequestException, match="Missing content type"):
        call_upload(
            upload,
            upload_request,
            upload_response,
            authorized_user,
        )

    assert list(isolated_uploads.iterdir()) == []


def test_upload_rejects_spoofed_content_type(
    isolated_uploads,
    upload_request,
    upload_response,
    authorized_user,
):
    with pytest.raises(BadRequestException, match="does not match content type"):
        call_upload(
            make_upload_file(MINIMAL_JPEG, "image/png", filename="test.png"),
            upload_request,
            upload_response,
            authorized_user,
        )

    assert list(isolated_uploads.iterdir()) == []


def test_upload_rejects_invalid_binary_content(
    isolated_uploads,
    upload_request,
    upload_response,
    authorized_user,
):
    with pytest.raises(BadRequestException, match="Unsupported file type"):
        call_upload(
            make_upload_file(b"plain-text-content", "image/jpeg"),
            upload_request,
            upload_response,
            authorized_user,
        )

    assert list(isolated_uploads.iterdir()) == []


def test_upload_rejects_oversized_file_and_cleans_temp(
    isolated_uploads,
    upload_request,
    upload_response,
    authorized_user,
):
    oversized_content = MINIMAL_JPEG + (b"x" * (MAX_UPLOAD_BYTES + 1))

    with pytest.raises(BadRequestException, match="File too large"):
        call_upload(
            make_upload_file(oversized_content, "image/jpeg"),
            upload_request,
            upload_response,
            authorized_user,
        )

    assert list(isolated_uploads.iterdir()) == []


class _ChunkedOversizedReader:
    def __init__(self, header: bytes, chunk_size: int):
        self._header = header
        self._chunk_size = chunk_size
        self._header_consumed = False
        self._bytes_sent = 0

    def read(self, size: int = -1) -> bytes:
        if not self._header_consumed:
            self._header_consumed = True
            return self._header[:16]

        if self._bytes_sent >= MAX_UPLOAD_BYTES + self._chunk_size:
            return b""

        chunk = b"x" * self._chunk_size
        self._bytes_sent += len(chunk)
        return chunk

    def seek(self, position: int) -> None:
        if position == 0:
            self._header_consumed = False
            self._bytes_sent = 0


def test_upload_rejects_streamed_oversized_file_without_persisting_final_file(
    isolated_uploads,
    upload_request,
    upload_response,
    authorized_user,
):
    upload = UploadFile(
        file=_ChunkedOversizedReader(MINIMAL_JPEG, 1024 * 1024),
        filename="large.jpg",
        headers={"content-type": "image/jpeg"},
    )

    with pytest.raises(BadRequestException, match="File too large"):
        call_upload(
            upload,
            upload_request,
            upload_response,
            authorized_user,
        )

    assert list(isolated_uploads.iterdir()) == []
