from fastapi import Depends

from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.core.security.jwt import verify_access_token

from app.repositories import user_repository

from app.core.exceptions import BadRequestException


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    payload = verify_access_token(token)

    if not payload:

        raise BadRequestException(
            "Invalid token"
        )

    email = payload.get("sub")

    if not email:

        raise BadRequestException(
            "Invalid token payload"
        )

    user = user_repository.get_user_by_email(
        db,
        email
    )

    if not user:

        raise BadRequestException(
            "User not found"
        )

    return user

def require_admin(
    current_user = Depends(get_current_user)
):

    if current_user.role != "admin":

        raise BadRequestException(
            "Admin access required"
        )

    return current_user