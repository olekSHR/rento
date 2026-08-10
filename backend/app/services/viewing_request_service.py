from datetime import datetime, timezone

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.exceptions import (
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
)
from app.core.observability.signals import emit_transition_signal
from app.models.property import Property
from app.models.user import User
from app.models.viewing_request import ViewingRequest
from app.repositories import property_repository, user_repository, viewing_request_repository
from app.schemas.viewing_request import (
    ViewingRequestPropertySummary,
    ViewingRequestRealtorResponse,
    ViewingRequestRenterResponse,
)
from app.services.account_status_service import ACCOUNT_STATUS_ACTIVE
from app.services.property_service import PROPERTY_STATUS_AVAILABLE


STATUS_PENDING = "pending"
STATUS_ACCEPTED = "accepted"
STATUS_DECLINED = "declined"
STATUS_CANCELLED = "cancelled"

VALID_STATUSES = frozenset(
    {
        STATUS_PENDING,
        STATUS_ACCEPTED,
        STATUS_DECLINED,
        STATUS_CANCELLED,
    }
)

MAX_MESSAGE_LENGTH = 500


def _normalize_message(message: str | None) -> str | None:
    if message is None:
        return None

    trimmed = message.strip()

    if not trimmed:
        return None

    if len(trimmed) > MAX_MESSAGE_LENGTH:
        raise BadRequestException(
            f"Message must be at most {MAX_MESSAGE_LENGTH} characters"
        )

    return trimmed


def _assert_requester_role(current_user: User) -> None:
    if current_user.role == "admin":
        raise BadRequestException(
            "Admin accounts cannot submit viewing requests"
        )


def _get_eligible_property(
    db: Session,
    property_id: int,
    requester_id: int,
) -> tuple[Property, User]:
    property_item = property_repository.get_property_by_id(
        db,
        property_id,
    )

    if not property_item:
        raise NotFoundException(
            "Property not found"
        )

    if property_item.status != PROPERTY_STATUS_AVAILABLE:
        raise NotFoundException(
            "Property not found"
        )

    if not property_item.owner_id:
        raise BadRequestException(
            "This property cannot receive viewing requests"
        )

    if property_item.owner_id == requester_id:
        raise BadRequestException(
            "You cannot request a viewing for your own property"
        )

    owner = user_repository.get_user_by_id(
        db,
        property_item.owner_id,
    )

    if not owner or owner.role != "realtor":
        raise NotFoundException(
            "Property not found"
        )

    if owner.account_status != ACCOUNT_STATUS_ACTIVE:
        raise NotFoundException(
            "Property not found"
        )

    return property_item, owner


def _build_property_summary(property_item: Property) -> ViewingRequestPropertySummary:
    return ViewingRequestPropertySummary(
        id=property_item.id,
        title=property_item.title,
        city=property_item.city,
        image_url=property_item.image_url,
        status=property_item.status,
    )


def _build_renter_response(
    db: Session,
    request_item: ViewingRequest,
) -> ViewingRequestRenterResponse:
    property_item = property_repository.get_property_by_id(
        db,
        request_item.property_id,
    )

    if not property_item:
        raise NotFoundException(
            "Property not found"
        )

    return ViewingRequestRenterResponse(
        id=request_item.id,
        property_id=request_item.property_id,
        property=_build_property_summary(property_item),
        status=request_item.status,
        message=request_item.message,
        created_at=request_item.created_at,
        updated_at=request_item.updated_at,
        responded_at=request_item.responded_at,
    )


def _build_realtor_response(
    db: Session,
    request_item: ViewingRequest,
) -> ViewingRequestRealtorResponse:
    property_item = property_repository.get_property_by_id(
        db,
        request_item.property_id,
    )

    if not property_item:
        raise NotFoundException(
            "Property not found"
        )

    requester = user_repository.get_user_by_id(
        db,
        request_item.requester_id,
    )

    if not requester:
        raise NotFoundException(
            "Viewing request not found"
        )

    return ViewingRequestRealtorResponse(
        id=request_item.id,
        property_id=request_item.property_id,
        property=_build_property_summary(property_item),
        requester_id=request_item.requester_id,
        requester_email=requester.email,
        status=request_item.status,
        message=request_item.message,
        created_at=request_item.created_at,
        updated_at=request_item.updated_at,
        responded_at=request_item.responded_at,
    )


def _get_request_for_requester(
    db: Session,
    request_id: int,
    requester_id: int,
) -> ViewingRequest:
    request_item = viewing_request_repository.get_by_id(
        db,
        request_id,
    )

    if not request_item or request_item.requester_id != requester_id:
        raise NotFoundException(
            "Viewing request not found"
        )

    return request_item


def _get_request_for_realtor(
    db: Session,
    request_id: int,
    realtor_id: int,
) -> ViewingRequest:
    request_item = viewing_request_repository.get_by_id(
        db,
        request_id,
    )

    if not request_item or request_item.realtor_id != realtor_id:
        raise NotFoundException(
            "Viewing request not found"
        )

    return request_item


def create_viewing_request(
    db: Session,
    current_user: User,
    property_id: int,
    message: str | None,
) -> ViewingRequestRenterResponse:
    _assert_requester_role(current_user)

    normalized_message = _normalize_message(message)

    property_item, owner = _get_eligible_property(
        db,
        property_id,
        current_user.id,
    )

    existing_request = viewing_request_repository.get_active_by_requester_and_property(
        db,
        current_user.id,
        property_id,
    )

    if existing_request:
        raise ConflictException(
            "Active viewing request already exists for this property"
        )

    try:
        request_item = viewing_request_repository.create_request(
            db,
            property_item.id,
            current_user.id,
            owner.id,
            normalized_message,
        )
    except IntegrityError as exc:
        db.rollback()
        raise ConflictException(
            "Active viewing request already exists for this property"
        ) from exc

    emit_transition_signal(
        "viewing_request",
        request_item.id,
        None,
        STATUS_PENDING,
        actor_user_id=current_user.id,
    )

    return _build_renter_response(db, request_item)


def list_my_viewing_requests(
    db: Session,
    current_user: User,
    *,
    status: str | None = None,
    property_id: int | None = None,
    limit: int = 20,
    offset: int = 0,
) -> dict:
    if status and status not in VALID_STATUSES:
        raise BadRequestException(
            "Invalid viewing request status"
        )

    items, total = viewing_request_repository.list_by_requester(
        db,
        current_user.id,
        status=status,
        property_id=property_id,
        limit=limit,
        offset=offset,
    )

    return {
        "items": [_build_renter_response(db, item) for item in items],
        "total": total,
        "limit": limit,
        "offset": offset,
    }


def get_viewing_request_for_requester(
    db: Session,
    current_user: User,
    request_id: int,
) -> ViewingRequestRenterResponse:
    request_item = _get_request_for_requester(
        db,
        request_id,
        current_user.id,
    )

    return _build_renter_response(db, request_item)


def get_viewing_request_for_realtor(
    db: Session,
    current_user: User,
    request_id: int,
) -> ViewingRequestRealtorResponse:
    if current_user.role != "realtor":
        raise ForbiddenException(
            "Only realtor can access this resource"
        )

    request_item = _get_request_for_realtor(
        db,
        request_id,
        current_user.id,
    )

    return _build_realtor_response(db, request_item)


def cancel_viewing_request(
    db: Session,
    current_user: User,
    request_id: int,
) -> ViewingRequestRenterResponse:
    request_item = _get_request_for_requester(
        db,
        request_id,
        current_user.id,
    )

    if request_item.status not in {STATUS_PENDING, STATUS_ACCEPTED}:
        raise BadRequestException(
            "Only pending or accepted requests can be cancelled"
        )

    from_status = request_item.status

    if not viewing_request_repository.transition_status(
        db,
        request_item,
        from_status=from_status,
        to_status=STATUS_CANCELLED,
    ):
        raise BadRequestException(
            "Request cannot be cancelled"
        )

    emit_transition_signal(
        "viewing_request",
        request_item.id,
        from_status,
        STATUS_CANCELLED,
        actor_user_id=current_user.id,
    )

    return _build_renter_response(db, request_item)


def list_realtor_viewing_requests(
    db: Session,
    current_user: User,
    *,
    status: str | None = None,
    limit: int = 20,
    offset: int = 0,
) -> dict:
    if current_user.role != "realtor":
        raise ForbiddenException(
            "Only realtor can access this resource"
        )

    if status and status not in VALID_STATUSES:
        raise BadRequestException(
            "Invalid viewing request status"
        )

    items, total = viewing_request_repository.list_by_realtor(
        db,
        current_user.id,
        status=status,
        limit=limit,
        offset=offset,
    )

    return {
        "items": [_build_realtor_response(db, item) for item in items],
        "total": total,
        "limit": limit,
        "offset": offset,
    }


def accept_viewing_request(
    db: Session,
    current_user: User,
    request_id: int,
) -> ViewingRequestRealtorResponse:
    if current_user.role != "realtor":
        raise ForbiddenException(
            "Only realtor can access this resource"
        )

    request_item = _get_request_for_realtor(
        db,
        request_id,
        current_user.id,
    )

    if request_item.status != STATUS_PENDING:
        raise BadRequestException(
            "Only pending requests can be accepted"
        )

    responded_at = datetime.now(timezone.utc)

    if not viewing_request_repository.transition_status(
        db,
        request_item,
        from_status=STATUS_PENDING,
        to_status=STATUS_ACCEPTED,
        responded_at=responded_at,
        update_responded_at=True,
    ):
        raise BadRequestException(
            "Request cannot be accepted"
        )

    emit_transition_signal(
        "viewing_request",
        request_item.id,
        STATUS_PENDING,
        STATUS_ACCEPTED,
        actor_user_id=current_user.id,
    )

    return _build_realtor_response(db, request_item)


def decline_viewing_request(
    db: Session,
    current_user: User,
    request_id: int,
) -> ViewingRequestRealtorResponse:
    if current_user.role != "realtor":
        raise ForbiddenException(
            "Only realtor can access this resource"
        )

    request_item = _get_request_for_realtor(
        db,
        request_id,
        current_user.id,
    )

    if request_item.status != STATUS_PENDING:
        raise BadRequestException(
            "Only pending requests can be declined"
        )

    responded_at = datetime.now(timezone.utc)

    if not viewing_request_repository.transition_status(
        db,
        request_item,
        from_status=STATUS_PENDING,
        to_status=STATUS_DECLINED,
        responded_at=responded_at,
        update_responded_at=True,
    ):
        raise BadRequestException(
            "Request cannot be declined"
        )

    emit_transition_signal(
        "viewing_request",
        request_item.id,
        STATUS_PENDING,
        STATUS_DECLINED,
        actor_user_id=current_user.id,
    )

    return _build_realtor_response(db, request_item)
