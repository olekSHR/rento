from sqlalchemy.orm import Session

from app.models import property as models

from sqlalchemy import func

from datetime import datetime, UTC

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
    query = query.filter(
        models.Property.status.in_(
            [
                "available",
                "reserved",
            ]
        )
    )

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
            models.Property.rooms == rooms
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

def get_property_by_id(
    db: Session,
    property_id: int
):

    return (
        db.query(models.Property)
        .filter(models.Property.id == property_id)
        .first()
    )


def create_property(
    db: Session,
    title: str,
    description: str,
    price: int,
    city: str,
    rooms: int,
    image_url: str | None = None,
    status: str = "available",
    contact_name: str | None = None,
    phone: str | None = None,
    whatsapp: str | None = None,
):

    new_property = models.Property(
        title=title,
        description=description,
        price=price,
        city=city,
        rooms=rooms,
        image_url=image_url,
        status=status,
        contact_name=contact_name,
        phone=phone,
        whatsapp=whatsapp,
        last_verified_at=datetime.now(UTC)
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
    status: str = "available",
    contact_name: str | None = None,
    phone: str | None = None,
    whatsapp: str | None = None,
):

    property_item.title = title
    property_item.description = description
    property_item.price = price
    property_item.city = city
    property_item.rooms = rooms
    property_item.status = status
    property_item.contact_name = contact_name
    property_item.phone = phone
    property_item.whatsapp = whatsapp
    property_item.last_verified_at = datetime.now(UTC)

    if image_url is not None:
        property_item.image_url = image_url

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
