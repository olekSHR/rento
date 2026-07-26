from fastapi import Depends, Request
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.exceptions import ForbiddenException, UnauthorizedException
from app.core.observability.signals import emit_decision_signal
from app.database.database import get_db
from app.services import account_status_service
from app.services import session_service


def get_current_user(
    request: Request,
    db: Session = Depends(get_db),
):
    raw_token = request.cookies.get(settings.SESSION_COOKIE_NAME)
    user = session_service.get_current_user_from_session(db, raw_token)
    account_status_service.assert_can_authenticate(user)
    return user


def require_admin(
    current_user=Depends(get_current_user),
):
    if current_user.role != "admin":
        emit_decision_signal(
            "authorization",
            "deny",
            actor_user_id=current_user.id,
            reason_code="admin_required",
        )
        raise ForbiddenException("Admin access required")

    return current_user


def get_current_user_optional(
    request: Request,
    db: Session = Depends(get_db),
):
    raw_token = request.cookies.get(settings.SESSION_COOKIE_NAME)

    if not raw_token:
        return None

    user = session_service.get_current_user_from_session(db, raw_token)
    account_status_service.assert_can_authenticate(user)
    return user


def require_admin_or_realtor(
    current_user=Depends(get_current_user),
):
    if current_user.role not in ["admin", "realtor"]:
        emit_decision_signal(
            "authorization",
            "deny",
            actor_user_id=current_user.id,
            reason_code="admin_or_realtor_required",
        )
        raise ForbiddenException("Admin or realtor access required")

    return current_user
