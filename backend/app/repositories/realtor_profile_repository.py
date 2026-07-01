from sqlalchemy.orm import Session

from app.models.realtor_profile import RealtorProfile
from app.schemas.realtor_profile import RealtorProfileUpdate


def get_by_user_id(db: Session, user_id: int) -> RealtorProfile | None:
    return (
        db.query(RealtorProfile)
        .filter(RealtorProfile.user_id == user_id)
        .first()
    )


def get_by_user_ids(
    db: Session,
    user_ids: list[int],
) -> dict[int, RealtorProfile]:
    if not user_ids:
        return {}

    profiles = (
        db.query(RealtorProfile)
        .filter(RealtorProfile.user_id.in_(user_ids))
        .all()
    )

    return {profile.user_id: profile for profile in profiles}


def create_empty_profile(db: Session, user_id: int) -> RealtorProfile:
    profile = RealtorProfile(user_id=user_id)

    db.add(profile)
    db.commit()
    db.refresh(profile)

    return profile


def update_profile(
    db: Session,
    profile: RealtorProfile,
    profile_update: RealtorProfileUpdate,
) -> RealtorProfile:
    update_data = profile_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(profile, field, value)

    has_name = bool(profile.full_name)
    has_contact = bool(profile.phone or profile.whatsapp)
    has_city = bool(profile.city)

    profile.is_completed = has_name and has_contact and has_city

    db.commit()
    db.refresh(profile)

    return profile
