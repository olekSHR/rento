from sqlalchemy.orm import Session

from app.models.favorite import Favorite


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

    return db.query(Favorite).filter(
        Favorite.user_id == user_id
    ).all()


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