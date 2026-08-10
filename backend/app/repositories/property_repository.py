from sqlalchemy.orm import Session

from app.models import property as models

from sqlalchemy import func

from datetime import datetime, UTC


PUBLIC_PROPERTY_STATUS = "available"
_COORDINATES_UNSET = object()

def get_all_properties(
    db: Session,
    limit: int = 10,
    offset: int = 0,
    city: str | None = None,
    min_price: int | None = None,
    max_price: int | None = None,
    rooms: int | None = None,
    sort_by: str = "created_at",
    order: str = "desc"
):

    query = db.query(models.Property)
    query = query.filter(models.Property.status == PUBLIC_PROPERTY_STATUS)

    if city:

        query = query.filter(
            models.Property.city.ilike(f"%{city}%")
        )

    if min_price is not None:

        query = query.filter(
            models.Property.price >= min_price
        )

    if max_price is not None:

        query = query.filter(
            models.Property.price <= max_price
        )

    if rooms is not None:

        query = query.filter(
            models.Property.rooms >= rooms
        )

    allowed_sort_fields = {
    "price": models.Property.price,
    "created_at": models.Property.created_at,
    "rooms": models.Property.rooms
}

    sort_column = allowed_sort_fields.get(
    sort_by,
    models.Property.created_at
)

    if order == "asc":

        query = query.order_by(sort_column.asc())

    else:

        query = query.order_by(sort_column.desc())

    total = query.count()

    items = (
        query
        
        .limit(limit)
        .offset(offset)
        .all()
    )

    return {
        "items": items,
        "total": total,
        "limit": limit,
        "offset": offset
    }

def get_all_properties_admin(
    db: Session,
    limit: int = 100,
    offset: int = 0
):

    query = db.query(models.Property)

    total = query.count()

    items = (
        query
        .order_by(models.Property.created_at.desc())
        .limit(limit)
        .offset(offset)
        .all()
    )

    return {
        "items": items,
        "total": total,
        "limit": limit,
        "offset": offset
    }

def get_properties_by_owner_id(
    db: Session,
    owner_id: int,
    limit: int = 100,
    offset: int = 0,
):

    query = (
        db.query(models.Property)
        .filter(models.Property.owner_id == owner_id)
    )

    total = query.count()

    items = (
        query
        .order_by(models.Property.created_at.desc())
        .limit(limit)
        .offset(offset)
        .all()
    )

    return {
        "items": items,
        "total": total,
        "limit": limit,
        "offset": offset
    }

def get_available_properties_by_owner_id(
    db: Session,
    owner_id: int,
    limit: int = 12,
    offset: int = 0,
):
    query = (
        db.query(models.Property)
        .filter(
            models.Property.owner_id == owner_id,
            models.Property.status == PUBLIC_PROPERTY_STATUS,
        )
        .order_by(models.Property.created_at.desc())
    )

    total = query.count()

    items = (
        query
        .limit(limit)
        .offset(offset)
        .all()
    )

    return {
        "items": items,
        "total": total,
        "limit": limit,
        "offset": offset,
    }


def count_available_by_owner_id(
    db: Session,
    owner_id: int,
) -> int:
    return (
        db.query(models.Property)
        .filter(
            models.Property.owner_id == owner_id,
            models.Property.status == PUBLIC_PROPERTY_STATUS,
        )
        .count()
    )

def get_property_by_id(
    db: Session,
    property_id: int
):

    return (
        db.query(models.Property)
        .filter(models.Property.id == property_id)
        .first()
    )


def get_property_images(
    db: Session,
    property_id: int,
):
    return (
        db.query(models.PropertyImage)
        .filter(models.PropertyImage.property_id == property_id)
        .order_by(models.PropertyImage.sort_order.asc())
        .all()
    )


def get_property_image(
    db: Session,
    property_id: int,
    image_id: int,
):
    return (
        db.query(models.PropertyImage)
        .filter(
            models.PropertyImage.id == image_id,
            models.PropertyImage.property_id == property_id,
        )
        .first()
    )


def has_cover_image(
    db: Session,
    property_id: int,
) -> bool:
    return (
        db.query(models.PropertyImage.id)
        .filter(
            models.PropertyImage.property_id == property_id,
            models.PropertyImage.is_cover.is_(True),
        )
        .first()
        is not None
    )


def create_property_image(
    db: Session,
    property_id: int,
    url: str,
    is_cover: bool,
    sort_order: int,
):
    try:
        if is_cover:
            (
                db.query(models.PropertyImage)
                .filter(models.PropertyImage.property_id == property_id)
                .update({"is_cover": False})
            )

        image = models.PropertyImage(
            property_id=property_id,
            url=url,
            is_cover=is_cover,
            sort_order=sort_order,
        )

        db.add(image)

        if is_cover:
            property_item = (
                db.query(models.Property)
                .filter(models.Property.id == property_id)
                .first()
            )

            if property_item is not None:
                property_item.image_url = url
                db.add(property_item)

        db.commit()
        db.refresh(image)

        return image
    except Exception:
        db.rollback()
        raise


def update_property_image_sort_order(
    db: Session,
    image,
    sort_order: int,
):
    try:
        image.sort_order = sort_order
        db.commit()
        db.refresh(image)

        return image
    except Exception:
        db.rollback()
        raise


def set_property_cover_image(
    db: Session,
    property_item,
    image,
):
    try:
        (
            db.query(models.PropertyImage)
            .filter(models.PropertyImage.property_id == property_item.id)
            .update({"is_cover": False})
        )

        image.is_cover = True
        property_item.image_url = image.url

        db.add(property_item)
        db.commit()
        db.refresh(property_item)
        db.refresh(image)

        return image
    except Exception:
        db.rollback()
        raise


def delete_property_image(
    db: Session,
    property_item,
    image,
):
    try:
        was_cover = image.is_cover
        db.delete(image)

        replacement_image = None
        if was_cover:
            replacement_image = (
                db.query(models.PropertyImage)
                .filter(models.PropertyImage.property_id == property_item.id)
                .order_by(models.PropertyImage.sort_order.asc())
                .first()
            )

            property_item.image_url = replacement_image.url if replacement_image else None

            if replacement_image:
                replacement_image.is_cover = True

        db.commit()

        if replacement_image:
            db.refresh(replacement_image)

    except Exception:
        db.rollback()
        raise


def create_property(
    db: Session,
    title: str,
    description: str,
    price: int,
    city: str,
    rooms: int,
    owner_id: int | None = None,
    image_url: str | None = None,
    status: str = "available",
    contact_name: str | None = None,
    phone: str | None = None,
    whatsapp: str | None = None,
    latitude: float | None = None,
    longitude: float | None = None,
):

    new_property = models.Property(
        title=title,
        description=description,
        price=price,
        city=city,
        rooms=rooms,
        owner_id=owner_id,
        image_url=image_url,
        status=status,
        contact_name=contact_name,
        phone=phone,
        whatsapp=whatsapp,
        latitude=latitude,
        longitude=longitude,
    )

    db.add(new_property)

    db.commit()

    db.refresh(new_property)

    return new_property



def update_property(
    db: Session,
    property_item,
    title: str,
    description: str,
    price: int,
    city: str,
    rooms: int,
    image_url: str | None = None,
    latitude=_COORDINATES_UNSET,
    longitude=_COORDINATES_UNSET,
):

    property_item.title = title
    property_item.description = description
    property_item.price = price
    property_item.city = city
    property_item.rooms = rooms

    if latitude is not _COORDINATES_UNSET:
        property_item.latitude = latitude

    if longitude is not _COORDINATES_UNSET:
        property_item.longitude = longitude

    if image_url is not None:
        property_item.image_url = image_url

    db.commit()

    db.refresh(property_item)

    return property_item


def clear_nearby_infrastructure_cache(
    db: Session,
    property_item,
):
    property_item.nearby_infrastructure = None
    property_item.nearby_infrastructure_at = None

    db.commit()
    db.refresh(property_item)

    return property_item


def save_nearby_infrastructure_cache(
    db: Session,
    property_item,
    payload: dict,
    fetched_at,
):
    property_item.nearby_infrastructure = payload
    property_item.nearby_infrastructure_at = fetched_at

    db.commit()
    db.refresh(property_item)

    return property_item


def update_property_status(
    db: Session,
    property_item,
    status: str,
    *,
    update_verified_at: bool = False,
):

    property_item.status = status

    if update_verified_at:
        property_item.last_verified_at = datetime.now(UTC)

    db.commit()

    db.refresh(property_item)

    return property_item


def delete_property(
    db: Session,
    property_item
):

    db.delete(property_item)

    db.commit()

def report_property(
    db: Session,
    property_item
):

    property_item.report_count = (
        property_item.report_count or 0
    ) + 1

    db.commit()

    db.refresh(property_item)

    return property_item
