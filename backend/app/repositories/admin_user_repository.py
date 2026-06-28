from sqlalchemy import func, or_
from sqlalchemy.orm import Session, Query, aliased

from app.models.property import Property
from app.models.realtor_application import RealtorApplication
from app.models.realtor_profile import RealtorProfile
from app.models.user import User


def _build_list_users_query(db: Session) -> tuple[Query, aliased]:
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

    query = (
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
    )

    return query, LatestApplication


def _apply_filters(
    query: Query,
    LatestApplication: aliased,
    *,
    q: str | None = None,
    role: str | None = None,
    application_status: str | None = None,
) -> Query:
    if role:
        query = query.filter(User.role == role)

    if application_status == "none":
        query = query.filter(LatestApplication.id.is_(None))
    elif application_status:
        query = query.filter(LatestApplication.status == application_status)

    if q:
        search_pattern = f"%{q}%"
        query = query.filter(
            or_(
                User.email.ilike(search_pattern),
                RealtorProfile.full_name.ilike(search_pattern),
                LatestApplication.full_name.ilike(search_pattern),
                RealtorProfile.phone.ilike(search_pattern),
                LatestApplication.phone.ilike(search_pattern),
                RealtorProfile.agency_name.ilike(search_pattern),
                LatestApplication.agency_name.ilike(search_pattern),
            )
        )

    return query


def list_users(
    db: Session,
    page: int,
    limit: int,
    *,
    q: str | None = None,
    role: str | None = None,
    application_status: str | None = None,
) -> dict:
    offset = (page - 1) * limit
    filters = {
        "q": q,
        "role": role,
        "application_status": application_status,
    }

    count_query, LatestApplication = _build_list_users_query(db)
    count_query = _apply_filters(count_query, LatestApplication, **filters)
    total = (
        count_query.order_by(None)
        .with_entities(func.count(User.id))
        .scalar()
        or 0
    )

    rows_query, LatestApplication = _build_list_users_query(db)
    rows_query = _apply_filters(rows_query, LatestApplication, **filters)
    rows = (
        rows_query.order_by(User.id.desc())
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
