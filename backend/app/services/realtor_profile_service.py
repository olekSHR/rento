from sqlalchemy.orm import Session

from app.models.realtor_profile import RealtorProfile
from app.repositories import realtor_profile_repository
from app.schemas.realtor_profile import RealtorProfileUpdate


def get_or_create_profile(db: Session, user_id: int) -> RealtorProfile:
    profile = realtor_profile_repository.get_by_user_id(db, user_id)

    if profile:
        return profile

    return realtor_profile_repository.create_empty_profile(db, user_id)


def update_profile(
    db: Session,
    user_id: int,
    profile_update: RealtorProfileUpdate,
) -> RealtorProfile:
    profile = get_or_create_profile(db, user_id)

    return realtor_profile_repository.update_profile(
        db,
        profile,
        profile_update,
    )
