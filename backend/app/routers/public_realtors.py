from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.public_realtor import PublicRealtorProfilePageResponse
from app.services import public_realtor_service

router = APIRouter(
    prefix="/realtors",
    tags=["Public Realtors"],
)


@router.get(
    "/{user_id}",
    response_model=PublicRealtorProfilePageResponse,
)
def get_public_realtor_profile(
    user_id: int,
    limit: int = Query(default=12, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
):
    return public_realtor_service.get_public_realtor_profile(
        db,
        user_id,
        limit,
        offset,
    )
