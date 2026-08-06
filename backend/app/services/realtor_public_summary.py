from types import SimpleNamespace

from app.models.realtor_profile import RealtorProfile


def build_realtor_public_summary(
    profile: RealtorProfile,
    user_id: int,
    active_listings_count: int,
    *,
    include_contacts: bool = False,
):
    summary = SimpleNamespace(
        user_id=user_id,
        full_name=profile.full_name,
        agency_name=profile.agency_name,
        avatar_url=profile.avatar_url,
        is_verified=bool(profile.is_verified),
        member_since=profile.created_at,
        active_listings_count=active_listings_count,
        telegram_username=profile.telegram_username,
    )

    if include_contacts:
        summary.phone = profile.phone
        summary.whatsapp = profile.whatsapp
    else:
        summary.phone = None
        summary.whatsapp = None

    return summary
