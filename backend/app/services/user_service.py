from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.repositories import user_repository
from app.core.exceptions import UnauthorizedException
from app.core.security.jwt import verify_access_token


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


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

    return user