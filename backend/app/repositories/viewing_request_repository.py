from datetime import datetime

from sqlalchemy.orm import Session

from app.models.viewing_request import ViewingRequest


ACTIVE_STATUSES = ("pending", "accepted")


def create_request(
    db: Session,
    property_id: int,
    requester_id: int,
    realtor_id: int,
    message: str | None,
) -> ViewingRequest:
    request_item = ViewingRequest(
        property_id=property_id,
        requester_id=requester_id,
        realtor_id=realtor_id,
        status="pending",
        message=message,
    )

    db.add(request_item)
    db.commit()
    db.refresh(request_item)

    return request_item


def get_by_id(
    db: Session,
    request_id: int,
) -> ViewingRequest | None:
    return (
        db.query(ViewingRequest)
        .filter(ViewingRequest.id == request_id)
        .first()
    )


def get_active_by_requester_and_property(
    db: Session,
    requester_id: int,
    property_id: int,
) -> ViewingRequest | None:
    return (
        db.query(ViewingRequest)
        .filter(
            ViewingRequest.requester_id == requester_id,
            ViewingRequest.property_id == property_id,
            ViewingRequest.status.in_(ACTIVE_STATUSES),
        )
        .first()
    )


def list_by_requester(
    db: Session,
    requester_id: int,
    *,
    status: str | None = None,
    property_id: int | None = None,
    limit: int = 20,
    offset: int = 0,
) -> tuple[list[ViewingRequest], int]:
    query = db.query(ViewingRequest).filter(
        ViewingRequest.requester_id == requester_id,
    )

    if status:
        query = query.filter(ViewingRequest.status == status)

    if property_id is not None:
        query = query.filter(ViewingRequest.property_id == property_id)

    total = query.count()

    items = (
        query.order_by(ViewingRequest.created_at.desc())
        .limit(limit)
        .offset(offset)
        .all()
    )

    return items, total


def list_by_realtor(
    db: Session,
    realtor_id: int,
    *,
    status: str | None = None,
    limit: int = 20,
    offset: int = 0,
) -> tuple[list[ViewingRequest], int]:
    query = db.query(ViewingRequest).filter(
        ViewingRequest.realtor_id == realtor_id,
    )

    if status:
        query = query.filter(ViewingRequest.status == status)

    total = query.count()

    items = (
        query.order_by(ViewingRequest.created_at.desc())
        .limit(limit)
        .offset(offset)
        .all()
    )

    return items, total


def transition_status(
    db: Session,
    request_item: ViewingRequest,
    *,
    from_status: str,
    to_status: str,
    responded_at: datetime | None = None,
    update_responded_at: bool = False,
) -> bool:
    values = {
        ViewingRequest.status: to_status,
    }

    if update_responded_at:
        values[ViewingRequest.responded_at] = responded_at

    rows_updated = (
        db.query(ViewingRequest)
        .filter(
            ViewingRequest.id == request_item.id,
            ViewingRequest.status == from_status,
        )
        .update(
            values,
            synchronize_session=False,
        )
    )

    if rows_updated == 0:
        return False

    db.commit()
    db.refresh(request_item)

    return True
