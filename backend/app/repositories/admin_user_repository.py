from sqlalchemy import func
from sqlalchemy.orm import Session, aliased

from app.models.property import Property
from app.models.realtor_application import RealtorApplication
from app.models.realtor_profile import RealtorProfile
from app.models.user import User


def list_users(
    db: Session,
    page: int,
    limit: int,
) -> dict:
    offset = (page - 1) * limit

    listings_subq = (
        db.query(
            Property.owner_id.label("owner_id"),
            func.count(Property.id).label("listings_count"),
        )
        .filter(Property.owner_id.isnot(None))
        .group_by(Property.owner_id)
        .subquery()
    )

    latest_application_subq = (
        db.query(
            RealtorApplication.user_id.label("user_id"),
            func.max(RealtorApplication.id).label("latest_application_id"),
        )
        .group_by(RealtorApplication.user_id)
        .subquery()
    )

    LatestApplication = aliased(RealtorApplication)

    total = db.query(func.count(User.id)).scalar() or 0

    rows = (
        db.query(
            User.id,
            User.email,
            User.role,
            RealtorProfile.full_name.label("profile_full_name"),
            RealtorProfile.is_verified.label("is_verified"),
            LatestApplication.full_name.label("application_full_name"),
            LatestApplication.status.label("application_status"),
            func.coalesce(listings_subq.c.listings_count, 0).label("listings_count"),
        )
        .outerjoin(RealtorProfile, RealtorProfile.user_id == User.id)
        .outerjoin(
            latest_application_subq,
            latest_application_subq.c.user_id == User.id,
        )
        .outerjoin(
            LatestApplication,
            LatestApplication.id
            == latest_application_subq.c.latest_application_id,
        )
        .outerjoin(listings_subq, listings_subq.c.owner_id == User.id)
        .order_by(User.id.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    return {
        "rows": rows,
        "total": total,
        "page": page,
        "limit": limit,
    }
