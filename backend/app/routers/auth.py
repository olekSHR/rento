import logging

from fastapi import APIRouter, Depends, Request
from starlette.responses import Response
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.config import settings
from app.core.rate_limit import limiter
from app.core.security import csrf
from app.schemas.user import (
    UserCreate,
    UserResponse,
    LoginResponse,
)
from app.schemas.common import MessageResponse
from app.schemas.password_reset import (
    ForgotPasswordRequest,
    ResetPasswordRequest,
)
from app.services import auth_service
from app.services import password_reset_service
from app.services import session_service

from fastapi.security import OAuth2PasswordRequestForm

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.get(
    "/csrf",
    response_model=MessageResponse,
)
def issue_csrf_token(
    response: Response,
):
    token = csrf.generate_csrf_token()
    csrf.set_csrf_cookie(response, token)

    return {
        "success": True,
        "message": "CSRF token issued",
    }


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201
)
def register(
    user: UserCreate,
    response: Response,
    db: Session = Depends(get_db)
):
    created_user = auth_service.register_user(
        db,
        user.email,
        user.password
    )

    raw_token = session_service.create_session(db, created_user.id)
    csrf_token = csrf.generate_csrf_token()
    session_service.set_session_cookie(response, raw_token)
    csrf.set_csrf_cookie(response, csrf_token)

    logger.info("User registered user_id=%s", created_user.id)

    return created_user


@router.post(
    "/login",
    response_model=LoginResponse
)
@limiter.limit(settings.RATE_LIMIT_LOGIN)
def login(
    request: Request,
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = auth_service.login_user(
        db,
        form_data.username,
        form_data.password
    )

    raw_token = session_service.create_session(db, user.id)
    csrf_token = csrf.generate_csrf_token()
    session_service.set_session_cookie(response, raw_token)
    csrf.set_csrf_cookie(response, csrf_token)

    logger.info("User login success user_id=%s", user.id)

    return {
        "success": True,
        "message": "Logged in",
    }


@router.post(
    "/logout",
    response_model=MessageResponse,
)
def logout(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
):
    raw_token = request.cookies.get(settings.SESSION_COOKIE_NAME)
    session_service.revoke_session(db, raw_token)
    session_service.clear_session_cookie(response)
    csrf.clear_csrf_cookie(response)

    logger.info("User logout completed")

    return {
        "success": True,
        "message": "Logged out",
    }


@router.post(
    "/forgot-password",
    response_model=MessageResponse,
)
@limiter.limit(settings.RATE_LIMIT_FORGOT_PASSWORD)
def forgot_password(
    request: Request,
    response: Response,
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
