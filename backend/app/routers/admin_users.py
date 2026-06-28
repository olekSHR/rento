from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.security.dependencies import require_admin
from app.database.database import get_db
from app.models.user import User
from app.schemas.admin_user import AdminUserListResponse
from app.services import admin_user_service

router = APIRouter(
    prefix="/admin",
    tags=["Admin Users"],
)


@router.get(
    "/users",
    response_model=AdminUserListResponse,
)
def list_admin_users(
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, ge=1, le=100),
    q: str | None = Query(default=None),
    role: str | None = Query(default=None),
    application_status: str | None = Query(default=None),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return admin_user_service.list_users(
        db,
        page,
        limit,
        q=q,
        role=role,
        application_status=application_status,
    )
