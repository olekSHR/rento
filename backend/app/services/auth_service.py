from sqlalchemy.orm import Session

from app.repositories import user_repository

from app.core.security.hashing import hash_password

from app.core.exceptions import BadRequestException

from app.core.security.hashing import verify_password

from app.core.security.jwt import create_access_token

from app.services import account_status_service

def login_user(
    db: Session,
    email: str,
    password: str
):

    user = user_repository.get_user_by_email(
        db,
        email
    )

    if not user:

        raise BadRequestException(
            "Invalid email or password"
        )

    is_valid_password = verify_password(
        password,
        user.hashed_password
    )

    if not is_valid_password:

        raise BadRequestException(
            "Invalid email or password"
        )

    account_status_service.assert_can_login(user)

    access_token = create_access_token({
        "sub": user.email
    })

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

def register_user(
    db: Session,
    email: str,
    password: str
):

    existing_user = user_repository.get_user_by_email(
        db,
        email
    )

    if existing_user:

        raise BadRequestException(
            "Email already registered"
        )

    hashed_password = hash_password(password)

    return user_repository.create_user(
        db,
        email,
        hashed_password
    )