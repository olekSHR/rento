from fastapi import APIRouter, Depends, Query, Request
from sqlalchemy.orm import Session

from app.core.security.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.schemas.viewing_request import (
    ViewingRequestRenterListResponse,
    ViewingRequestRenterResponse,
    ViewingRequestRealtorListResponse,
    ViewingRequestRealtorResponse,
)
from app.services import viewing_request_service


router = APIRouter(
    prefix="/viewing-requests",
    tags=["Viewing Requests"],
)

realtor_router = APIRouter(
    prefix="/realtor/viewing-requests",
    tags=["Realtor Viewing Requests"],
)


@router.get(
    "",
    response_model=ViewingRequestRenterListResponse,
)
def list_my_viewing_requests(
    status: str | None = Query(default=None),
    property_id: int | None = Query(default=None),
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return viewing_request_service.list_my_viewing_requests(
        db,
        current_user,
        status=status,
        property_id=property_id,
        limit=limit,
        offset=offset,
    )


@router.get(
    "/{request_id}",
    response_model=ViewingRequestRenterResponse,
)
def get_my_viewing_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return viewing_request_service.get_viewing_request_for_requester(
        db,
        current_user,
        request_id,
    )


@router.patch(
    "/{request_id}/cancel",
    response_model=ViewingRequestRenterResponse,
)
def cancel_viewing_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return viewing_request_service.cancel_viewing_request(
        db,
        current_user,
        request_id,
    )


@realtor_router.get(
    "",
    response_model=ViewingRequestRealtorListResponse,
)
def list_realtor_viewing_requests(
    status: str | None = Query(default=None),
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return viewing_request_service.list_realtor_viewing_requests(
        db,
        current_user,
        status=status,
        limit=limit,
        offset=offset,
    )


@realtor_router.patch(
    "/{request_id}/accept",
    response_model=ViewingRequestRealtorResponse,
)
def accept_viewing_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return viewing_request_service.accept_viewing_request(
        db,
        current_user,
        request_id,
    )


@realtor_router.patch(
    "/{request_id}/decline",
    response_model=ViewingRequestRealtorResponse,
)
def decline_viewing_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return viewing_request_service.decline_viewing_request(
        db,
        current_user,
        request_id,
    )
