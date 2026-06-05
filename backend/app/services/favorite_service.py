from sqlalchemy.orm import Session

from app.repositories import favorite_repository
from app.core.exceptions import BadRequestException


def add_to_favorites(
    db: Session,
    user_id: int,
    property_id: int
):

    existing_favorite = favorite_repository.get_favorite(
        db,
        user_id,
        property_id
    )

    if existing_favorite:

        raise BadRequestException(
            "Property already in favorites"
        )

    return favorite_repository.create_favorite(
        db,
        user_id,
        property_id
    )


def remove_from_favorites(
    db: Session,
    user_id: int,
    property_id: int
):

    favorite = favorite_repository.get_favorite(
        db,
        user_id,
        property_id
    )

    if not favorite:

        raise BadRequestException(
            "Favorite not found"
        )

    favorite_repository.delete_favorite(
        db,
        favorite
    )


def get_user_favorites(
    db: Session,
    user_id: int
):

    return favorite_repository.get_user_favorites(
        db,
        user_id
    )