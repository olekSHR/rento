from sqlalchemy.orm import Session

from app.models.realtor_application import RealtorApplication


def create_application(
    db: Session,
    user_id: int,
    full_name: str,
    phone: str,
    agency_name: str | None,
    message: str | None,
) -> RealtorApplication:
    application = RealtorApplication(
        user_id=user_id,
        full_name=full_name,
        phone=phone,
        agency_name=agency_name,
        message=message,
        status="pending",
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    return application


def get_by_id(
    db: Session,
    application_id: int,
) -> RealtorApplication | None:
    return (
        db.query(RealtorApplication)
        .filter(RealtorApplication.id == application_id)
        .first()
    )


def get_pending_by_user_id(
    db: Session,
    user_id: int,
) -> RealtorApplication | None:
    return (
        db.query(RealtorApplication)
        .filter(
            RealtorApplication.user_id == user_id,
            RealtorApplication.status == "pending",
        )
        .first()
    )


def get_latest_by_user_id(
    db: Session,
    user_id: int,
) -> RealtorApplication | None:
    return (
        db.query(RealtorApplication)
        .filter(RealtorApplication.user_id == user_id)
        .order_by(RealtorApplication.created_at.desc())
        .first()
    )


def list_applications(
    db: Session,
    status: str | None = None,
) -> list[RealtorApplication]:
    query = db.query(RealtorApplication)

    if status:
        query = query.filter(RealtorApplication.status == status)

    return (
        query.order_by(RealtorApplication.created_at.desc())
        .all()
    )


def update_review(
    db: Session,
    application: RealtorApplication,
    status: str,
    reviewed_by: int,
    reviewed_at,
    *,
    commit: bool = True,
) -> RealtorApplication:
    application.status = status
    application.reviewed_by = reviewed_by
    application.reviewed_at = reviewed_at

    if commit:
        db.commit()
        db.refresh(application)

    return application
