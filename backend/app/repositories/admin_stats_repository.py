from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.property import Property
from app.models.realtor_application import RealtorApplication
from app.models.user import User


def get_stats(db: Session) -> dict[str, int]:
    total_users = db.query(func.count(User.id)).scalar() or 0

    total_realtors = (
        db.query(func.count(User.id))
        .filter(User.role == "realtor")
        .scalar()
        or 0
    )

    pending_realtor_applications = (
        db.query(func.count(RealtorApplication.id))
        .filter(RealtorApplication.status == "pending")
        .scalar()
        or 0
    )

    active_listings = (
        db.query(func.count(Property.id))
        .filter(Property.status == "available")
        .scalar()
        or 0
    )

    reported_listings = (
        db.query(func.count(Property.id))
        .filter(Property.report_count > 0)
        .scalar()
        or 0
    )

    return {
        "total_users": total_users,
        "total_realtors": total_realtors,
        "pending_realtor_applications": pending_realtor_applications,
        "active_listings": active_listings,
        "reported_listings": reported_listings,
    }
