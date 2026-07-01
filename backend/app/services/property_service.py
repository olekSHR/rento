from sqlalchemy.orm import Session

from app.repositories import property_repository, realtor_profile_repository
from app.core.exceptions import BadRequestException, NotFoundException


PUBLIC_PROPERTY_STATUSES = ("available", "reserved")


def _apply_profile_contacts(property_item, profile):
    property_item.contact_name = profile.full_name
    property_item.phone = profile.phone
    property_item.whatsapp = profile.whatsapp
    property_item.avatar_url = profile.avatar_url

    return property_item


def _resolve_property_contacts_from_profile(db: Session, property_item):
    if not property_item.owner_id:
        return property_item

    profile = realtor_profile_repository.get_by_user_id(
        db,
        property_item.owner_id,
    )

    if not profile:
        return property_item

    return _apply_profile_contacts(property_item, profile)


def _resolve_properties_contacts_batch(db: Session, items):
    owner_ids = list(
        {
            property_item.owner_id
            for property_item in items
            if property_item.owner_id
        }
    )

    profiles_by_user_id = realtor_profile_repository.get_by_user_ids(
        db,
        owner_ids,
    )

    for property_item in items:
        profile = profiles_by_user_id.get(property_item.owner_id)

        if profile:
            _apply_profile_contacts(property_item, profile)

    return items


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

    result = property_repository.get_all_properties(
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

    result["items"] = _resolve_properties_contacts_batch(
        db,
        result["items"],
    )

    return result

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

def get_properties_by_owner_id(
    db: Session,
    owner_id: int,
    limit: int = 100,
    offset: int = 0,
):

    return property_repository.get_properties_by_owner_id(
        db,
        owner_id,
        limit,
        offset,
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


def get_property_by_id_for_viewer(
    db: Session,
    property_id: int,
    current_user=None,
):

    property_item = property_repository.get_property_by_id(
        db,
        property_id
    )

    if not property_item:

        raise NotFoundException(
            "Property not found"
        )

    if current_user is None:

        if property_item.status not in PUBLIC_PROPERTY_STATUSES:

            raise NotFoundException(
                "Property not found"
            )

        return _resolve_property_contacts_from_profile(db, property_item)

    if current_user.role == "admin":

        return property_item

    if current_user.role == "realtor":

        if property_item.owner_id != current_user.id:

            raise NotFoundException(
                "Property not found"
            )

        return property_item

    if property_item.status not in PUBLIC_PROPERTY_STATUSES:

        raise NotFoundException(
            "Property not found"
        )

    return _resolve_property_contacts_from_profile(db, property_item)


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

    if property_item.status != "pending":
        raise BadRequestException(
            "Only pending listings can be verified"
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
