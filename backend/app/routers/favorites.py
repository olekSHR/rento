from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.services import (
    favorite_service,
    user_service,
)


router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"]
)


@router.post("/{property_id}")
def add_favorite(
    property_id: int,
    current_user = Depends(user_service.get_current_user),
    db: Session = Depends(get_db)
):

    return favorite_service.add_to_favorites(
        db,
        current_user.id,
        property_id
    )


@router.delete("/{property_id}")
def remove_favorite(
    property_id: int,
    current_user = Depends(user_service.get_current_user),
    db: Session = Depends(get_db)
):

    return favorite_service.remove_from_favorites(
        db,
        current_user.id,
        property_id
    )


@router.get("/")
def get_my_favorites(
    current_user = Depends(user_service.get_current_user),
    db: Session = Depends(get_db)
):

    return favorite_service.get_user_favorites(
        db,
        current_user.id
    )