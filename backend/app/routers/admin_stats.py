from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security.dependencies import require_admin
from app.database.database import get_db
from app.models.user import User
from app.schemas.admin_stats import AdminStatsResponse
from app.services import admin_stats_service

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


@router.get(
    "/stats",
    response_model=AdminStatsResponse,
)
def get_admin_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return admin_stats_service.get_admin_stats(db)
