from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.core.exceptions import BadRequestException, NotFoundException
from app.models.realtor_application import RealtorApplication
from app.models.user import User
from app.repositories import realtor_application_repository
from app.schemas.realtor_application import RealtorApplicationCreate


def create_application(
    db: Session,
    current_user: User,
    application_data: RealtorApplicationCreate,
) -> RealtorApplication:
    if current_user.role == "realtor":
        raise BadRequestException(
            "User is already a realtor"
        )

    if current_user.role == "admin":
        raise BadRequestException(
            "Admin accounts cannot submit realtor applications"
        )

    pending_application = realtor_application_repository.get_pending_by_user_id(
        db,
        current_user.id,
    )

    if pending_application:
        raise BadRequestException(
            "You already have a pending application"
        )

    return realtor_application_repository.create_application(
        db,
        current_user.id,
        application_data.full_name.strip(),
        application_data.phone.strip(),
        application_data.agency_name.strip()
        if application_data.agency_name
        else None,
        application_data.message.strip()
        if application_data.message
        else None,
    )


def get_my_application(
    db: Session,
    user_id: int,
) -> RealtorApplication:
    application = realtor_application_repository.get_latest_by_user_id(
        db,
        user_id,
    )

    if not application:
        raise NotFoundException(
            "Application not found"
        )

    return application


def list_applications(
    db: Session,
    status: str | None = None,
) -> list[RealtorApplication]:
    return realtor_application_repository.list_applications(
        db,
        status,
    )


def review_application(
    db: Session,
    application_id: int,
    status: str,
    admin_user: User,
) -> RealtorApplication:
    application = realtor_application_repository.get_by_id(
        db,
        application_id,
    )

    if not application:
        raise NotFoundException(
            "Application not found"
        )

    if application.status != "pending":
        raise BadRequestException(
            "Only pending applications can be reviewed"
        )

    return realtor_application_repository.update_review(
        db,
        application,
        status,
        admin_user.id,
        datetime.now(timezone.utc),
    )
