from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.schemas.realtor_profile import (
    RealtorProfileResponse,
    RealtorProfileUpdate,
)
from app.services import realtor_profile_service
from app.schemas.property import PropertyListResponse
from app.services import property_service
router = APIRouter(
    prefix="/realtor",
    tags=["realtor"],
)


def require_realtor(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "realtor":
        from fastapi import HTTPException

        raise HTTPException(
            status_code=403,
            detail="Only realtor can access this resource",
        )

    return current_user


@router.get(
    "/profile",
    response_model=RealtorProfileResponse,
)
def get_my_realtor_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_realtor),
):
    return realtor_profile_service.get_or_create_profile(
        db,
        current_user.id,
    )


@router.patch(
    "/profile",
    response_model=RealtorProfileResponse,
)
def update_my_realtor_profile(
    profile_update: RealtorProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_realtor),
):
    return realtor_profile_service.update_profile(
        db,
        current_user.id,
        profile_update,
    )

@router.get(
    "/properties",
    response_model=PropertyListResponse,
)
def get_my_realtor_properties(
    limit: int = 100,
    offset: int = 0,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_realtor),
):
    return property_service.get_properties_by_owner_id(
        db,
        current_user.id,
        limit,
        offset,
    )
