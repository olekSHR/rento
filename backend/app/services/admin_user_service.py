from sqlalchemy.orm import Session

from app.repositories import admin_user_repository


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


def list_users(
    db: Session,
    page: int,
    limit: int,
) -> dict:
    result = admin_user_repository.list_users(
        db,
        page,
        limit,
    )

    items = []

    for row in result["rows"]:
        items.append(
            {
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
        )

    return {
        "items": items,
        "total": result["total"],
        "page": result["page"],
        "limit": result["limit"],
    }
