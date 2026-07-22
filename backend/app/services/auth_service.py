from sqlalchemy.orm import Session

from app.repositories import user_repository

from app.core.security.hashing import hash_password

from app.core.exceptions import BadRequestException

from app.core.security.hashing import verify_password

from app.services import account_status_service

def _normalize_email(email: str) -> str:
    return email.strip().lower()

def login_user(
    db: Session,
    email: str,
    password: str
):

    email = _normalize_email(email)

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

    return user

def register_user(
    db: Session,
    email: str,
    password: str
):

    email = _normalize_email(email)

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