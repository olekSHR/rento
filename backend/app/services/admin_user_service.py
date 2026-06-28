from sqlalchemy.orm import Session

from app.core.exceptions import BadRequestException, NotFoundException
from app.repositories import admin_user_repository

VALID_ROLES = frozenset({"user", "realtor", "admin"})
VALID_APPLICATION_STATUSES = frozenset(
    {"pending", "approved", "rejected", "none"}
)


def _resolve_display_name(
    email: str,
    profile_full_name: str | None,
    application_full_name: str | None,
) -> str:
    if profile_full_name and profile_full_name.strip():
        return profile_full_name.strip()

    if application_full_name and application_full_name.strip():
        return application_full_name.strip()

    local_part = email.split("@", 1)[0].strip()

    if local_part:
        return local_part

    return "User"


def _resolve_optional_field(
    profile_value: str | None,
    application_value: str | None,
) -> str | None:
    if profile_value and profile_value.strip():
        return profile_value.strip()

    if application_value and application_value.strip():
        return application_value.strip()

    return None


def _map_user_row(row) -> dict:
    return {
        "id": row.id,
        "email": row.email,
        "role": row.role,
        "display_name": _resolve_display_name(
            row.email,
            row.profile_full_name,
            row.application_full_name,
        ),
        "application_status": row.application_status,
        "listings_count": int(row.listings_count),
        "is_verified_realtor": bool(row.is_verified),
        "registered_at": None,
    }


def _normalize_search_query(q: str | None) -> str | None:
    if q is None:
        return None

    normalized = q.strip()

    if not normalized:
        return None

    if len(normalized) < 2:
        raise BadRequestException(
            "Search query must be at least 2 characters."
        )

    return normalized


def _validate_role(role: str | None) -> str | None:
    if role is None or not role.strip():
        return None

    role = role.strip()

    if role not in VALID_ROLES:
        raise BadRequestException(
            "Invalid role filter."
        )

    return role


def _validate_application_status(
    application_status: str | None,
) -> str | None:
    if application_status is None or not application_status.strip():
        return None

    application_status = application_status.strip()

    if application_status not in VALID_APPLICATION_STATUSES:
        raise BadRequestException(
            "Invalid application status filter."
        )

    return application_status


def list_users(
    db: Session,
    page: int,
    limit: int,
    *,
    q: str | None = None,
    role: str | None = None,
    application_status: str | None = None,
) -> dict:
    normalized_q = _normalize_search_query(q)
    validated_role = _validate_role(role)
    validated_application_status = _validate_application_status(
        application_status
    )

    result = admin_user_repository.list_users(
        db,
        page,
        limit,
        q=normalized_q,
        role=validated_role,
        application_status=validated_application_status,
    )

    items = []

    for row in result["rows"]:
        items.append(_map_user_row(row))

    return {
        "items": items,
        "total": result["total"],
        "page": result["page"],
        "limit": result["limit"],
    }


def get_user_by_id(
    db: Session,
    user_id: int,
) -> dict:
    row = admin_user_repository.get_user_by_id(db, user_id)

    if not row:
        raise NotFoundException(
            "User not found"
        )

    user = _map_user_row(row)
    user["phone"] = _resolve_optional_field(
        row.profile_phone,
        row.application_phone,
    )
    user["agency_name"] = _resolve_optional_field(
        row.profile_agency_name,
        row.application_agency_name,
    )

    return user
