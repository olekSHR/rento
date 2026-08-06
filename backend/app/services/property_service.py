from sqlalchemy.orm import Session

from types import SimpleNamespace

from app.repositories import property_repository, realtor_profile_repository
from app.core.exceptions import BadRequestException, ForbiddenException, NotFoundException
from app.core.observability.signals import emit_privileged_signal, emit_transition_signal
from app.core.upload_cleanup import collect_property_upload_urls, delete_upload_files


PROPERTY_STATUS_AVAILABLE = "available"
PROPERTY_STATUS_ARCHIVED = "archived"
PROPERTY_STATUS_PENDING = "pending"

PUBLIC_PROPERTY_STATUSES = (PROPERTY_STATUS_AVAILABLE,)
VALID_PROPERTY_STATUSES = frozenset(
    {
        PROPERTY_STATUS_AVAILABLE,
        PROPERTY_STATUS_ARCHIVED,
        PROPERTY_STATUS_PENDING,
    }
)


def _apply_profile_contacts(property_item, profile):
    property_item.contact_name = profile.full_name
    property_item.phone = profile.phone
    property_item.whatsapp = profile.whatsapp
    property_item.avatar_url = profile.avatar_url

    return property_item


def _attach_realtor_summary(db: Session, property_item):
    property_item.realtor = None

    if not property_item.owner_id:
        return property_item

    profile = realtor_profile_repository.get_by_user_id(
        db,
        property_item.owner_id,
    )

    if not profile:
        return property_item

    active_listings_count = property_repository.count_available_by_owner_id(
        db,
        property_item.owner_id,
    )

    property_item.realtor = SimpleNamespace(
        user_id=property_item.owner_id,
        full_name=profile.full_name,
        agency_name=profile.agency_name,
        avatar_url=profile.avatar_url,
        is_verified=bool(profile.is_verified),
        member_since=profile.created_at,
        active_listings_count=active_listings_count,
        telegram_username=profile.telegram_username,
    )

    return property_item


def _resolve_public_property_view(db: Session, property_item):
    property_item = _resolve_property_contacts_from_profile(db, property_item)
    property_item = _attach_realtor_summary(db, property_item)

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


def _get_required_realtor_profile(db: Session, user_id: int):
    profile = realtor_profile_repository.get_by_user_id(db, user_id)

    if not profile:
        profile = realtor_profile_repository.create_empty_profile(db, user_id)

    if not profile.is_completed:
        raise BadRequestException(
            "Complete realtor profile before creating property"
        )

    return profile


def ensure_property_mutation_allowed(property_item, current_user) -> None:
    if current_user.role == "admin":
        return

    if current_user.role != "realtor":
        raise ForbiddenException(
            "Access denied"
        )

    if property_item.owner_id != current_user.id:
        raise ForbiddenException(
            "Access denied"
        )


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

        return _resolve_public_property_view(db, property_item)

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

    return _resolve_public_property_view(db, property_item)


def get_property_images_for_viewer(
    db: Session,
    property_id: int,
    current_user=None,
):
    get_property_by_id_for_viewer(
        db,
        property_id,
        current_user,
    )

    return property_repository.get_property_images(
        db,
        property_id,
    )


def create_property(
    db: Session,
    property_data,
    current_user,
):
    owner_id = None
    status = PROPERTY_STATUS_AVAILABLE
    contact_name = None
    phone = None
    whatsapp = None

    if current_user.role == "realtor":
        profile = _get_required_realtor_profile(
            db,
            current_user.id,
        )
        owner_id = current_user.id
        status = PROPERTY_STATUS_PENDING
        contact_name = profile.full_name
        phone = profile.phone
        whatsapp = profile.whatsapp

    elif current_user.role != "admin":
        raise ForbiddenException(
            "Access denied"
        )

    created = property_repository.create_property(
        db,
        property_data.title,
        property_data.description,
        property_data.price,
        property_data.city,
        property_data.rooms,
        owner_id,
        property_data.image_url,
        status,
        contact_name,
        phone,
        whatsapp,
        getattr(property_data, "latitude", None),
        getattr(property_data, "longitude", None),
    )

    if current_user.role == "realtor":
        emit_transition_signal(
            "property",
            created.id,
            None,
            PROPERTY_STATUS_PENDING,
            actor_user_id=current_user.id,
        )

    return created


def update_property(
    db: Session,
    property_item,
    property_data,
    current_user,
):
    ensure_property_mutation_allowed(
        property_item,
        current_user,
    )

    update_kwargs = {}
    fields_set = getattr(property_data, "model_fields_set", None)

    if fields_set is not None and (
        "latitude" in fields_set
        or "longitude" in fields_set
    ):
        update_kwargs["latitude"] = property_data.latitude
        update_kwargs["longitude"] = property_data.longitude
        property_repository.clear_nearby_infrastructure_cache(db, property_item)

    return property_repository.update_property(
        db,
        property_item,
        property_data.title,
        property_data.description,
        property_data.price,
        property_data.city,
        property_data.rooms,
        property_data.image_url,
        **update_kwargs,
    )


def add_property_image(
    db: Session,
    property_id: int,
    image_data,
    current_user,
):
    property_item = get_property_by_id(
        db,
        property_id,
    )

    ensure_property_mutation_allowed(
        property_item,
        current_user,
    )

    return property_repository.create_property_image(
        db,
        property_id,
        image_data.url,
        image_data.is_cover,
        image_data.sort_order,
    )


def update_property_image_sort_order(
    db: Session,
    property_id: int,
    image_id: int,
    sort_order: int,
    current_user,
):
    property_item = get_property_by_id(
        db,
        property_id,
    )

    ensure_property_mutation_allowed(
        property_item,
        current_user,
    )

    image = property_repository.get_property_image(
        db,
        property_id,
        image_id,
    )

    if not image:
        raise NotFoundException(
            "Image not found"
        )

    return property_repository.update_property_image_sort_order(
        db,
        image,
        sort_order,
    )


def set_cover_image(
    db: Session,
    property_id: int,
    image_id: int,
    current_user,
):
    property_item = get_property_by_id(
        db,
        property_id,
    )

    ensure_property_mutation_allowed(
        property_item,
        current_user,
    )

    image = property_repository.get_property_image(
        db,
        property_id,
        image_id,
    )

    if not image:
        raise NotFoundException(
            "Image not found"
        )

    return property_repository.set_property_cover_image(
        db,
        property_item,
        image,
    )


def delete_property_image(
    db: Session,
    property_id: int,
    image_id: int,
    current_user,
):
    property_item = get_property_by_id(
        db,
        property_id,
    )

    ensure_property_mutation_allowed(
        property_item,
        current_user,
    )

    image = property_repository.get_property_image(
        db,
        property_id,
        image_id,
    )

    if not image:
        raise NotFoundException(
            "Image not found"
        )

    property_repository.delete_property_image(
        db,
        property_item,
        image,
    )


def delete_property(
    db: Session,
    property_id: int,
    *,
    actor_user_id: int | None = None,
):

    property_item = property_repository.get_property_by_id(
        db,
        property_id
    )

    if not property_item:

        raise NotFoundException(
            "Property not found"
        )

    images = property_repository.get_property_images(
        db,
        property_id,
    )
    upload_urls = collect_property_upload_urls(
        property_item.image_url,
        *(image.url for image in images),
    )

    property_repository.delete_property(
        db,
        property_item
    )

    delete_upload_files(upload_urls)

    if actor_user_id is not None:
        emit_privileged_signal(
            "property_delete",
            actor_user_id=actor_user_id,
            target_type="property",
            target_id=property_id,
            outcome="success",
        )

def verify_property(
    db: Session,
    property_id: int,
    *,
    actor_user_id: int | None = None,
):

    property_item = property_repository.get_property_by_id(
        db,
        property_id
    )

    if not property_item:

        raise NotFoundException(
            "Property not found"
        )

    if property_item.status != PROPERTY_STATUS_PENDING:
        raise BadRequestException(
            "Only pending listings can be verified"
        )

    from_status = property_item.status
    updated = property_repository.update_property_status(
        db,
        property_item,
        PROPERTY_STATUS_AVAILABLE,
        update_verified_at=True,
    )

    emit_transition_signal(
        "property",
        property_id,
        from_status,
        PROPERTY_STATUS_AVAILABLE,
        actor_user_id=actor_user_id,
    )

    if actor_user_id is not None:
        emit_privileged_signal(
            "property_verify",
            actor_user_id=actor_user_id,
            target_type="property",
            target_id=property_id,
            outcome="success",
        )

    return updated

def archive_property(
    db: Session,
    property_id: int,
    *,
    actor_user_id: int | None = None,
):

    property_item = property_repository.get_property_by_id(
        db,
        property_id
    )

    if not property_item:

        raise NotFoundException(
            "Property not found"
        )

    if property_item.status != PROPERTY_STATUS_AVAILABLE:
        raise BadRequestException(
            "Only available listings can be archived"
        )

    from_status = property_item.status
    updated = property_repository.update_property_status(
        db,
        property_item,
        PROPERTY_STATUS_ARCHIVED,
    )

    emit_transition_signal(
        "property",
        property_id,
        from_status,
        PROPERTY_STATUS_ARCHIVED,
        actor_user_id=actor_user_id,
    )

    if actor_user_id is not None:
        emit_privileged_signal(
            "property_archive",
            actor_user_id=actor_user_id,
            target_type="property",
            target_id=property_id,
            outcome="success",
        )

    return updated


def activate_property(
    db: Session,
    property_id: int,
    *,
    actor_user_id: int | None = None,
):

    property_item = property_repository.get_property_by_id(
        db,
        property_id
    )

    if not property_item:

        raise NotFoundException(
            "Property not found"
        )

    if property_item.status != PROPERTY_STATUS_ARCHIVED:
        raise BadRequestException(
            "Only archived listings can be activated"
        )

    from_status = property_item.status
    updated = property_repository.update_property_status(
        db,
        property_item,
        PROPERTY_STATUS_AVAILABLE,
        update_verified_at=True,
    )

    emit_transition_signal(
        "property",
        property_id,
        from_status,
        PROPERTY_STATUS_AVAILABLE,
        actor_user_id=actor_user_id,
    )

    if actor_user_id is not None:
        emit_privileged_signal(
            "property_activate",
            actor_user_id=actor_user_id,
            target_type="property",
            target_id=property_id,
            outcome="success",
        )

    return updated

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
