import asyncio
import logging
from types import SimpleNamespace
from unittest.mock import Mock

import pytest
from fastapi import Request

from app.core.exceptions import (
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    UnauthorizedException,
)
from app.core.handlers import (
    forbidden_exception_handler,
    not_found_exception_handler,
    unauthorized_exception_handler,
)
from app.core.observability.signals import (
    SIGNAL_DECISION,
    SIGNAL_FAILURE,
    SIGNAL_PRIVILEGED,
    SIGNAL_TRANSITION,
    SIGNAL_UPLOAD,
    emit_decision_signal,
    emit_transition_signal,
)
from app.core.security import dependencies
from app.services import (
    account_status_service,
    auth_service,
    property_service,
    session_service,
    user_service,
)


FORBIDDEN_LOG_SUBSTRINGS = (
    "password",
    "secret",
    "token",
    "csrf",
    "cookie",
    "email",
    "phone",
    "bearer ",
)


@pytest.fixture
def observability_logs(caplog):
    caplog.set_level(logging.DEBUG)
    yield caplog


def observability_messages(caplog) -> str:
    return " ".join(
        record.message
        for record in caplog.records
        if record.name == "rento.observability"
    )


def assert_no_forbidden_log_content(text: str) -> None:
    lowered = text.lower()

    for substring in FORBIDDEN_LOG_SUBSTRINGS:
        assert substring not in lowered


def test_signal_helpers_emit_stable_classification(observability_logs):
    caplog = observability_logs

    emit_transition_signal("property", 1, "pending", "available", actor_user_id=5)
    emit_decision_signal(
        "authorization",
        "deny",
        actor_user_id=5,
        reason_code="admin_required",
    )

    messages = observability_messages(caplog)

    assert f"signal={SIGNAL_TRANSITION}" in messages
    assert f"signal={SIGNAL_DECISION}" in messages
    assert "entity_type=property" in messages
    assert "entity_id=1" in messages
    assert "from_status=pending" in messages
    assert "to_status=available" in messages
    assert "actor_user_id=5" in messages
    assert "decision_class=authorization" in messages
    assert "reason_code=admin_required" in messages
    assert_no_forbidden_log_content(messages)


def test_role_guard_denial_emits_decision_signal(observability_logs):
    caplog = observability_logs
    ordinary_user = SimpleNamespace(id=42, role="user")

    with pytest.raises(ForbiddenException):
        dependencies.require_admin(ordinary_user)

    messages = observability_messages(caplog)
    assert f"signal={SIGNAL_DECISION}" in messages
    assert "outcome=deny" in messages
    assert "actor_user_id=42" in messages
    assert_no_forbidden_log_content(messages)


def test_account_status_denial_emits_decision_signal(observability_logs):
    caplog = observability_logs
    restricted_user = SimpleNamespace(id=7, account_status="suspended")

    with pytest.raises(ForbiddenException):
        account_status_service.assert_can_authenticate(restricted_user)

    messages = observability_messages(caplog)
    assert f"signal={SIGNAL_DECISION}" in messages
    assert "reason_code=account_restricted" in messages
    assert "actor_user_id=7" in messages


def test_login_failure_emits_decision_signal(monkeypatch, observability_logs):
    caplog = observability_logs

    monkeypatch.setattr(
        auth_service.user_repository,
        "get_user_by_email",
        lambda db, email: None,
    )

    with pytest.raises(BadRequestException):
        auth_service.login_user(Mock(), "user@example.com", "secret-password")

    messages = observability_messages(caplog)
    assert f"signal={SIGNAL_DECISION}" in messages
    assert "reason_code=invalid_credentials" in messages
    assert "user@example.com" not in messages
    assert "secret-password" not in messages


def test_invalid_session_emits_decision_signal(monkeypatch, observability_logs):
    caplog = observability_logs

    monkeypatch.setattr(
        session_service,
        "get_valid_session",
        lambda db, raw_token: None,
    )

    with pytest.raises(UnauthorizedException):
        session_service.get_current_user_from_session(Mock(), "raw-session-token")

    messages = observability_messages(caplog)
    assert f"signal={SIGNAL_DECISION}" in messages
    assert "reason_code=invalid_or_expired_session" in messages
    assert "raw-session-token" not in messages


def test_not_found_handler_emits_failure_signal(observability_logs):
    caplog = observability_logs
    request = Request(
        {
            "type": "http",
            "method": "GET",
            "path": "/properties/99",
            "headers": [],
        }
    )

    response = asyncio.run(
        not_found_exception_handler(
            request,
            NotFoundException("Property not found"),
        )
    )

    assert response.status_code == 404
    messages = observability_messages(caplog)
    assert f"signal={SIGNAL_FAILURE}" in messages
    assert "failure_class=not_found" in messages
    assert "status_code=404" in messages
    assert "Property not found" not in messages


def test_unauthorized_handler_emits_failure_signal(observability_logs):
    caplog = observability_logs
    request = Request(
        {
            "type": "http",
            "method": "GET",
            "path": "/users/me",
            "headers": [],
        }
    )

    response = asyncio.run(
        unauthorized_exception_handler(
            request,
            UnauthorizedException("Invalid or expired session"),
        )
    )

    assert response.status_code == 401
    messages = observability_messages(caplog)
    assert f"signal={SIGNAL_FAILURE}" in messages
    assert "failure_class=unauthorized" in messages


def test_forbidden_handler_preserves_contract(observability_logs):
    caplog = observability_logs
    request = Request(
        {
            "type": "http",
            "method": "POST",
            "path": "/properties/1/verify",
            "headers": [],
        }
    )

    response = asyncio.run(
        forbidden_exception_handler(
            request,
            ForbiddenException("Admin access required"),
        )
    )

    body = response.body.decode()
    assert response.status_code == 403
    assert '"success":false' in body.replace(" ", "")
    assert "Admin access required" in body
    assert f"signal={SIGNAL_FAILURE}" in observability_messages(caplog)


def test_verify_property_emits_transition_and_privileged_signals(
    monkeypatch,
    observability_logs,
):
    caplog = observability_logs
    property_item = SimpleNamespace(id=11, status="pending")

    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_by_id",
        lambda db, property_id: property_item,
    )
    monkeypatch.setattr(
        property_service.property_repository,
        "update_property_status",
        lambda db, item, status, update_verified_at=False: SimpleNamespace(
            id=11,
            status=status,
        ),
    )

    result = property_service.verify_property(
        Mock(),
        11,
        actor_user_id=3,
    )

    assert result.status == "available"
    messages = observability_messages(caplog)
    assert f"signal={SIGNAL_TRANSITION}" in messages
    assert f"signal={SIGNAL_PRIVILEGED}" in messages
    assert "action=property_verify" in messages
    assert "actor_user_id=3" in messages


def test_user_role_update_emits_privileged_signal(monkeypatch, observability_logs):
    caplog = observability_logs
    target_user = SimpleNamespace(id=20, role="user")

    monkeypatch.setattr(
        user_service.user_repository,
        "get_user_by_id",
        lambda db, user_id: target_user,
    )
    monkeypatch.setattr(
        user_service.user_repository,
        "update_user_role",
        lambda db, user, role, commit=True: SimpleNamespace(id=20, role=role),
    )

    updated = user_service.update_user_role(
        Mock(),
        20,
        "realtor",
        actor_user_id=1,
    )

    assert updated.role == "realtor"
    messages = observability_messages(caplog)
    assert f"signal={SIGNAL_PRIVILEGED}" in messages
    assert "action=user_role_update" in messages
    assert "target_id=20" in messages


def test_upload_success_emits_upload_signal(monkeypatch, tmp_path, observability_logs):
    caplog = observability_logs
    from io import BytesIO

    from fastapi import UploadFile
    from starlette.requests import Request
    from starlette.responses import Response

    from app.core.config import settings
    from app.routers.uploads import upload_image

    uploads_dir = tmp_path / "uploads"
    uploads_dir.mkdir()
    monkeypatch.chdir(tmp_path)
    monkeypatch.setattr(settings, "RATE_LIMIT_ENABLED", False)
    monkeypatch.setattr("app.routers.uploads.limiter.enabled", False)

    content = b"\xff\xd8\xff\xe0" + b"\x00" * 20
    upload = UploadFile(
        filename="test.jpg",
        file=BytesIO(content),
        headers={"content-type": "image/jpeg"},
    )
    user = SimpleNamespace(id=9, role="realtor")
    scope = {
        "type": "http",
        "method": "POST",
        "path": "/upload/",
        "headers": [],
        "client": ("127.0.0.1", 12345),
    }

    result = upload_image(
        Request(scope),
        Response(),
        upload,
        current_user=user,
    )

    assert result["filename"].endswith(".jpg")
    messages = observability_messages(caplog)
    assert f"signal={SIGNAL_UPLOAD}" in messages
    assert "outcome=success" in messages
    assert "actor_user_id=9" in messages
