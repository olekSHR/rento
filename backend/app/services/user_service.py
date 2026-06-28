from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.repositories import user_repository
from app.core.exceptions import (
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
)
from app.core.security.jwt import verify_access_token

from app.services import account_status_service


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)

ALLOWED_ROLE_TRANSITIONS = {
    "user": {"realtor"},
    "realtor": {"user"},
}


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    payload = verify_access_token(token)

    if not payload:

        raise UnauthorizedException(
            "Invalid or expired token"
        )

    email = payload.get("sub")

    if not email:

        raise UnauthorizedException(
            "Invalid token payload"
        )

    user = user_repository.get_user_by_email(
        db,
        email
    )

    if not user:

        raise UnauthorizedException(
            "User not found"
        )

    account_status_service.assert_can_authenticate(user)

    return user


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
