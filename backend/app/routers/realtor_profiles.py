from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.exceptions import BadRequestException, ForbiddenException
from app.core.security.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.schemas.common import MessageResponse
from app.schemas.realtor_profile import (
    RealtorProfileResponse,
    RealtorProfileUpdate,
)
from app.services import realtor_profile_service
from app.schemas.property import PropertyListResponse, PropertyResponse
from app.services import property_service
from app.services.property_service import PROPERTY_STATUS_ARCHIVED
router = APIRouter(
    prefix="/realtor",
    tags=["realtor"],
)


def require_realtor(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "realtor":
        raise ForbiddenException(
            "Only realtor can access this resource"
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


@router.post(
    "/properties/{property_id}/archive",
    response_model=PropertyResponse,
)
def archive_my_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_realtor),
):
    property_item = property_service.get_property_by_id(db, property_id)
    property_service.ensure_property_mutation_allowed(
        property_item,
        current_user,
    )

    return property_service.archive_property(
        db,
        property_id,
        actor_user_id=current_user.id,
    )


@router.post(
    "/properties/{property_id}/restore",
    response_model=PropertyResponse,
)
def restore_my_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_realtor),
):
    property_item = property_service.get_property_by_id(db, property_id)
    property_service.ensure_property_mutation_allowed(
        property_item,
        current_user,
    )

    return property_service.activate_property(
        db,
        property_id,
        actor_user_id=current_user.id,
    )


@router.delete(
    "/properties/{property_id}",
    response_model=MessageResponse,
)
def delete_my_archived_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_realtor),
):
    property_item = property_service.get_property_by_id(db, property_id)
    property_service.ensure_property_mutation_allowed(
        property_item,
        current_user,
    )

    if property_item.status != PROPERTY_STATUS_ARCHIVED:
        raise BadRequestException(
            "Only archived listings can be permanently deleted"
        )

    property_service.delete_property(
        db,
        property_id,
        actor_user_id=current_user.id,
    )

    return {
        "success": True,
        "message": "Property deleted",
    }
