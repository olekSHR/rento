from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.exceptions import (
    BadRequestException,
    NotFoundException,
)
from app.repositories import user_repository


ALLOWED_ROLE_TRANSITIONS = {
    "user": {"realtor"},
    "realtor": {"user"},
}


def update_user_role(
    db: Session,
    user_id: int,
    role: str,
    *,
    commit: bool = True,
):

    user = user_repository.get_user_by_id(
        db,
        user_id
    )

    if not user:

        raise NotFoundException(
            "User not found"
        )

    if user.role == "admin":
        raise BadRequestException(
            "Admin role cannot be changed"
        )

    if role == "admin":
        raise BadRequestException(
            "Cannot assign admin role"
        )

    if user.role == role:
        raise BadRequestException(
            "Role is already set"
        )

    allowed_targets = ALLOWED_ROLE_TRANSITIONS.get(user.role)

    if not allowed_targets or role not in allowed_targets:
        raise BadRequestException(
            f"Cannot change role from {user.role} to {role}"
        )

    return user_repository.update_user_role(
        db,
        user,
        role,
        commit=commit,
    )
