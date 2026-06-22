from sqlalchemy.orm import Session

from app.repositories import property_repository
from app.core.exceptions import NotFoundException


def get_all_properties(
    db: Session,
    limit: int,
    offset: int,
    city: str | None = None,
    min_price: int | None = None,
    max_price: int | None = None,
    rooms: int | None = None,
    sort_by: str = "created_at",
    order: str = "desc"
):

    return property_repository.get_all_properties(
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

def get_all_properties_admin(
    db: Session,
    limit: int = 100,
    offset: int = 0
):

    return property_repository.get_all_properties_admin(
        db,
        limit,
        offset
    )

def get_property_by_id(
    db: Session,
    property_id: int
):

    property_item = property_repository.get_property_by_id(
        db,
        property_id
    )

    if not property_item:

        raise NotFoundException(
            "Property not found"
        )

    return property_item


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
):

    return property_repository.create_property(
        db,
        title,
        description,
        price,
        city,
        rooms,
        owner_id,
        image_url,
        status,
        contact_name,
        phone,
        whatsapp
    )


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

    return property_repository.update_property(
        db,
        property_item,
        title,
        description,
        price,
        city,
        rooms,
        image_url,
        status,
        contact_name,
        phone,
        whatsapp,
    )


def delete_property(
    db: Session,
    property_id: int
):

    property_item = property_repository.get_property_by_id(
        db,
        property_id
    )

    if not property_item:

        raise NotFoundException(
            "Property not found"
        )

    property_repository.delete_property(
        db,
        property_item
    )

def verify_property(
    db: Session,
    property_id: int
):

    property_item = property_repository.get_property_by_id(
        db,
        property_id
    )

    if not property_item:

        raise NotFoundException(
            "Property not found"
        )

    return property_repository.update_property(
        db,
        property_item,
        property_item.title,
        property_item.description,
        property_item.price,
        property_item.city,
        property_item.rooms,
        property_item.image_url,
        property_item.status,
        property_item.contact_name,
        property_item.phone,
        property_item.whatsapp,
    )

def archive_property(
    db: Session,
    property_id: int
):

    property_item = property_repository.get_property_by_id(
        db,
        property_id
    )

    if not property_item:

        raise NotFoundException(
            "Property not found"
        )

    return property_repository.update_property(
        db,
        property_item,
        property_item.title,
        property_item.description,
        property_item.price,
        property_item.city,
        property_item.rooms,
        property_item.image_url,
        "archived",
        property_item.contact_name,
        property_item.phone,
        property_item.whatsapp,
    )


def activate_property(
    db: Session,
    property_id: int
):

    property_item = property_repository.get_property_by_id(
        db,
        property_id
    )

    if not property_item:

        raise NotFoundException(
            "Property not found"
        )

    return property_repository.update_property(
        db,
        property_item,
        property_item.title,
        property_item.description,
        property_item.price,
        property_item.city,
        property_item.rooms,
        property_item.image_url,
        "available",
        property_item.contact_name,
        property_item.phone,
        property_item.whatsapp,
    )

def report_property(
    db: Session,
    property_id: int
):

    property_item = property_repository.get_property_by_id(
        db,
        property_id
    )

    if not property_item:

        raise NotFoundException(
            "Property not found"
        )

    return property_repository.report_property(
        db,
        property_item
    )
