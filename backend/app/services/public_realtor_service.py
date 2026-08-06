from sqlalchemy.orm import Session

from app.core.exceptions import NotFoundException
from app.repositories import property_repository, realtor_profile_repository, user_repository
from app.services.account_status_service import ACCOUNT_STATUS_ACTIVE
from app.services.realtor_public_summary import build_realtor_public_summary


def get_public_realtor_profile(
    db: Session,
    user_id: int,
    limit: int = 12,
    offset: int = 0,
):
    user = user_repository.get_user_by_id(db, user_id)

    if not user:
        raise NotFoundException("Realtor not found")

    if user.role != "realtor":
        raise NotFoundException("Realtor not found")

    if user.account_status != ACCOUNT_STATUS_ACTIVE:
        raise NotFoundException("Realtor not found")

    profile = realtor_profile_repository.get_by_user_id(db, user_id)

    if not profile:
        raise NotFoundException("Realtor not found")

    properties = property_repository.get_available_properties_by_owner_id(
        db,
        user_id,
        limit,
        offset,
    )

    realtor = build_realtor_public_summary(
        profile,
        user_id,
        properties["total"],
        include_contacts=True,
    )

    return {
        "realtor": realtor,
        "properties": properties,
    }
