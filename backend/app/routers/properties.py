from fastapi import APIRouter, Depends, HTTPException
from app.models.property import PropertyImage
from app.schemas.property import PropertyImageCreate, PropertyImageResponse
from fastapi import APIRouter, Depends
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

from app.services import property_service
from app.services import realtor_profile_service
from app.models.property import Property

from app.core.security.dependencies import (
    get_current_user,
    require_admin,
    require_admin_or_realtor,
)

router = APIRouter(
    prefix="/properties",
    tags=["Properties"]
)

def ensure_property_access(
    property_item,
    current_user
):

    if current_user.role == "admin":
        return

    if property_item.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
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
    limit: int = 10,
    offset: int = 0,
    city: str | None = None,
    min_price: int | None = None,
    max_price: int | None = None,
    rooms: int | None = None,
    sort_by: str = "created_at",
    order: str = "desc",
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
        property_id
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
        property_id
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
        property_id
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
    db: Session = Depends(get_db)
):

    return property_service.get_property_by_id(
    db,
    property_id
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

    owner_id = None
    status = property.status
    contact_name = property.contact_name
    phone = property.phone
    whatsapp = property.whatsapp

    if current_user.role == "realtor":
        profile = realtor_profile_service.get_or_create_profile(
            db,
            current_user.id,
        )

        if not profile.is_completed:
            raise HTTPException(
                status_code=400,
                detail="Complete realtor profile before creating property",
            )

        owner_id = current_user.id
        status = "pending"
        contact_name = profile.full_name
        phone = profile.phone
        whatsapp = profile.whatsapp

    new_property = property_service.create_property(
        db,
        property.title,
        property.description,
        property.price,
        property.city,
        property.rooms,
        owner_id,
        property.image_url,
        status,
        contact_name,
        phone,
        whatsapp,
    )

    return new_property

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

    ensure_property_access(
        property_item,
        current_user
    )

    if current_user.role == "realtor":
        return property_service.update_property(
            db,
            property_item,
            property.title,
            property.description,
            property.price,
            property.city,
            property.rooms,
            property.image_url,
            property_item.status,
            property_item.contact_name,
            property_item.phone,
            property_item.whatsapp,
        )

    return property_service.update_property(
        db,
        property_item,
        property.title,
        property.description,
        property.price,
        property.city,
        property.rooms,
        property.image_url,
        property.status,
        property.contact_name,
        property.phone,
        property.whatsapp,
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
    property_id
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
    db: Session = Depends(get_db)
):

    property_service.get_property_by_id(
        db,
        property_id
    )

    return (
        db.query(PropertyImage)
        .filter(PropertyImage.property_id == property_id)
        .order_by(PropertyImage.sort_order.asc())
        .all()
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

    property_item = property_service.get_property_by_id(
        db,
        property_id
    )

    ensure_property_access(
        property_item,
        current_user
    )

    if image.is_cover:
        db.query(PropertyImage).filter(
            PropertyImage.property_id == property_id
        ).update({
            "is_cover": False
        })

    new_image = PropertyImage(
        property_id=property_id,
        url=image.url,
        is_cover=image.is_cover,
        sort_order=image.sort_order
    )

    db.add(new_image)
    db.commit()
    db.refresh(new_image)

    return new_image

@router.patch("/{property_id}/images/{image_id}/sort-order")
def update_property_image_sort_order(
    property_id: int,
    image_id: int,
    sort_order: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin_or_realtor)
):
    property_item = property_service.get_property_by_id(
        db,
        property_id
    )

    ensure_property_access(
        property_item,
        current_user
    )

    image = db.query(PropertyImage).filter(
        PropertyImage.id == image_id,
        PropertyImage.property_id == property_id
    ).first()

    if not image:
        raise HTTPException(
            status_code=404,
            detail="Image not found"
        )

    image.sort_order = sort_order

    db.commit()
    db.refresh(image)

    return image

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

    property_item = property_service.get_property_by_id(
        db,
        property_id
    )

    ensure_property_access(
        property_item,
        current_user
    )

    image = (
        db.query(PropertyImage)
        .filter(
            PropertyImage.id == image_id,
            PropertyImage.property_id == property_id
        )
        .first()
    )

    if not image:
        raise HTTPException(
            status_code=404,
            detail="Image not found"
        )

    db.query(PropertyImage).filter(
        PropertyImage.property_id == property_id
    ).update({
        "is_cover": False
    })

    image.is_cover = True
 
    property_item = property_service.get_property_by_id(
    db,
    property_id
)

    property_item.image_url = image.url

    db.commit()
    db.refresh(image)

    return image


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

    property_item = property_service.get_property_by_id(
        db,
        property_id
    )

    ensure_property_access(
        property_item,
        current_user
    )

    image = (
        db.query(PropertyImage)
        .filter(
            PropertyImage.id == image_id,
            PropertyImage.property_id == property_id
        )
        .first()
    )

    if not image:
        raise HTTPException(
            status_code=404,
            detail="Image not found"
        )

    was_cover = image.is_cover

    db.delete(image)
    db.commit()

    if was_cover:
        first_image = (
            db.query(PropertyImage)
            .filter(PropertyImage.property_id == property_id)
            .order_by(PropertyImage.sort_order.asc())
            .first()
        )

        if first_image:
            first_image.is_cover = True
            db.commit()

    return {
        "success": True,
        "message": "Image deleted"
    }
