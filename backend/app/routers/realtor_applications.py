from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.security.dependencies import get_current_user, require_admin
from app.database.database import get_db
from app.models.user import User
from app.schemas.realtor_application import (
    RealtorApplicationCreate,
    RealtorApplicationListResponse,
    RealtorApplicationResponse,
    RealtorApplicationReview,
)
from app.services import realtor_application_service

router = APIRouter(
    prefix="/realtor-applications",
    tags=["Realtor Applications"],
)


@router.post(
    "/",
    response_model=RealtorApplicationResponse,
    status_code=201,
)
def create_realtor_application(
    application_data: RealtorApplicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return realtor_application_service.create_application(
        db,
        current_user,
        application_data,
    )


@router.get(
    "/me",
    response_model=RealtorApplicationResponse,
)
def get_my_realtor_application(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return realtor_application_service.get_my_application(
        db,
        current_user.id,
    )


@router.get(
    "/",
    response_model=RealtorApplicationListResponse,
)
def list_realtor_applications(
    status: str | None = Query(default=None),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    applications = realtor_application_service.list_applications(
        db,
        status,
    )

    return {
        "items": applications,
        "total": len(applications),
    }


@router.patch(
    "/{application_id}/review",
    response_model=RealtorApplicationResponse,
)
def review_realtor_application(
    application_id: int,
    review_data: RealtorApplicationReview,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return realtor_application_service.review_application(
        db,
        application_id,
        review_data.status,
        current_user,
    )
