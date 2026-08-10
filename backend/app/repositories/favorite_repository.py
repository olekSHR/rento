from sqlalchemy.orm import Session

from app.models.favorite import Favorite
from app.models.property import Property
from app.services.property_service import PROPERTY_STATUS_AVAILABLE


def create_favorite(
    db: Session,
    user_id: int,
    property_id: int
):

    favorite = Favorite(
        user_id=user_id,
        property_id=property_id
    )

    db.add(favorite)

    db.commit()

    db.refresh(favorite)

    return favorite


def get_user_favorites(
    db: Session,
    user_id: int
):

    return (
        db.query(Favorite)
        .join(Property, Favorite.property_id == Property.id)
        .filter(
            Favorite.user_id == user_id,
            Property.status == PROPERTY_STATUS_AVAILABLE,
        )
        .all()
    )


def get_favorite(
    db: Session,
    user_id: int,
    property_id: int
):

    return db.query(Favorite).filter(
        Favorite.user_id == user_id,
        Favorite.property_id == property_id
    ).first()


def delete_favorite(
    db: Session,
    favorite: Favorite
):

    db.delete(favorite)

    db.commit()