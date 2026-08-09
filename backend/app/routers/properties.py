from app.schemas.property import PropertyImageCreate, PropertyImageResponse
from fastapi import APIRouter, Depends, Query, Request, Response
from sqlalchemy.orm import Session
from app.schemas.common import MessageResponse
from app.database.database import get_db
from app.schemas.property import (
    PropertyCreate,
    PropertyUpdate,
    PropertyResponse,
    PropertyCardResponse,
    PropertyListResponse
)
from app.schemas.viewing_request import (
    ViewingRequestCreate,
    ViewingRequestRenterResponse,
)

from app.core.config import settings
from app.core.rate_limit import get_upload_rate_limit_key, limiter

from app.services import property_service
from app.services import nearby_infrastructure_service
from app.services import viewing_request_service
from app.schemas.nearby_infrastructure import NearbyInfrastructureResponse

from app.core.security.dependencies import (
    get_current_user,
    get_current_user_optional,
    require_admin,
    require_admin_or_realtor,
)

router = APIRouter(
    prefix="/properties",
    tags=["Properties"]
)

@router.get(
    "/admin/all",
    response_model=PropertyListResponse
)
def get_properties_admin(
    limit: int = 100,
    offset: int = 0,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):

    return property_service.get_all_properties_admin(
        db,
        limit,
        offset
    )
@router.get("/", response_model=PropertyListResponse)
def get_properties(
    limit: int = Query(default=10, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    city: str | None = None,
    min_price: int | None = None,
    max_price: int | None = None,
    rooms: int | None = None,
    sort_by: str = Query(default="created_at", pattern="^(price|created_at|rooms)$"),
    order: str = Query(default="desc", pattern="^(asc|desc)$"),
    db: Session = Depends(get_db),
    
):

    return property_service.get_all_properties(
    db,
    limit,
    offset,
    city,
    min_price,
    max_price,
    rooms,
    sort_by,
    order
)

@router.post(
    "/{property_id}/verify",
    response_model=PropertyResponse
)
def verify_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):

    return property_service.verify_property(
        db,
        property_id,
        actor_user_id=current_user.id,
    )

@router.post(
    "/{property_id}/archive",
    response_model=PropertyResponse
)
def archive_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):

    return property_service.archive_property(
        db,
        property_id,
        actor_user_id=current_user.id,
    )


@router.post(
    "/{property_id}/activate",
    response_model=PropertyResponse
)
def activate_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):

    return property_service.activate_property(
        db,
        property_id,
        actor_user_id=current_user.id,
    )

@router.post(
    "/{property_id}/report",
    response_model=PropertyResponse
)
def report_property(
    property_id: int,
    db: Session = Depends(get_db)
):

    return property_service.report_property(
        db,
        property_id
    )

@router.get("/{property_id}", response_model=PropertyResponse)
def get_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user_optional),
):

    return property_service.get_property_by_id_for_viewer(
        db,
        property_id,
        current_user,
    )


@router.get(
    "/{property_id}/nearby",
    response_model=NearbyInfrastructureResponse,
)
async def get_property_nearby(
    property_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user_optional),
):
    return await nearby_infrastructure_service.get_nearby_infrastructure_for_property(
        db,
        property_id,
        current_user,
    )


@router.post(
    "/",
    response_model=PropertyResponse,
    status_code=201
)
def create_property(
    property: PropertyCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin_or_realtor)
):

    return property_service.create_property(
        db,
        property,
        current_user,
    )

@router.put("/{property_id}", response_model=PropertyResponse)
def update_property(
    property_id: int,
    property: PropertyUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin_or_realtor)
):

    property_item = property_service.get_property_by_id(
        db,
        property_id
    )

    return property_service.update_property(
        db,
        property_item,
        property,
        current_user,
    )

@router.delete(
    "/{property_id}",
    response_model=MessageResponse
)
def delete_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):

    property_item = property_service.get_property_by_id(
        db,
        property_id
    )

    property_service.delete_property(
        db,
        property_id,
        actor_user_id=current_user.id,
    )

    return {
        "success": True,
        "message": "Property deleted"
    }

@router.get(
    "/{property_id}/images",
    response_model=list[PropertyImageResponse]
)
def get_property_images(
    property_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user_optional),
):

    return property_service.get_property_images_for_viewer(
        db,
        property_id,
        current_user,
    )


@router.post(
    "/{property_id}/images",
    response_model=PropertyImageResponse,
    status_code=201
)
def add_property_image(
    property_id: int,
    image: PropertyImageCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin_or_realtor)
):

    return property_service.add_property_image(
        db,
        property_id,
        image,
        current_user,
    )

@router.patch(
    "/{property_id}/images/{image_id}/sort-order",
    response_model=PropertyImageResponse,
)
def update_property_image_sort_order(
    property_id: int,
    image_id: int,
    sort_order: int = Query(ge=0),
    db: Session = Depends(get_db),
    current_user=Depends(require_admin_or_realtor)
):
    return property_service.update_property_image_sort_order(
        db,
        property_id,
        image_id,
        sort_order,
        current_user,
    )

@router.put(
    "/{property_id}/images/{image_id}/cover",
    response_model=PropertyImageResponse
)
def set_cover_image(
    property_id: int,
    image_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin_or_realtor)
):

    return property_service.set_cover_image(
        db,
        property_id,
        image_id,
        current_user,
    )


@router.delete(
    "/{property_id}/images/{image_id}",
    response_model=MessageResponse
)
def delete_property_image(
    property_id: int,
    image_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin_or_realtor)
):

    property_service.delete_property_image(
        db,
        property_id,
        image_id,
        current_user,
    )

    return {
        "success": True,
        "message": "Image deleted"
    }


@router.post(
    "/{property_id}/viewing-requests",
    response_model=ViewingRequestRenterResponse,
    status_code=201,
)
@limiter.limit(
    settings.RATE_LIMIT_VIEWING_REQUEST,
    key_func=get_upload_rate_limit_key,
)
def create_viewing_request(
    property_id: int,
    request_data: ViewingRequestCreate,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return viewing_request_service.create_viewing_request(
        db,
        current_user,
        property_id,
        request_data.message,
    )
