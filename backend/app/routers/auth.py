from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserLogin,
    TokenResponse
)

from app.schemas.common import MessageResponse
from app.schemas.password_reset import (
    ForgotPasswordRequest,
    ResetPasswordRequest,
)

from app.services import auth_service
from app.services import password_reset_service

from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    return auth_service.register_user(
        db,
        user.email,
        user.password
    )

@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    return auth_service.login_user(
        db,
        form_data.username,
        form_data.password
    )


@router.post(
    "/forgot-password",
    response_model=MessageResponse,
)
def forgot_password(
    body: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):

    return password_reset_service.request_password_reset(
        db,
        body.email,
    )


@router.post(
    "/reset-password",
    response_model=MessageResponse,
)
def reset_password(
    body: ResetPasswordRequest,
    db: Session = Depends(get_db),
):

    return password_reset_service.reset_password(
        db,
        body.token,
        body.new_password,
    )

