from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.common import MessageResponse
from app.schemas.favorite import (
    FavoriteListResponse,
    FavoriteResponse,
)

from app.services import (
    favorite_service,
    user_service,
)


router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"]
)


@router.post(
    "/{property_id}",
    response_model=FavoriteResponse,
    status_code=201,
)
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


@router.delete(
    "/{property_id}",
    response_model=MessageResponse,
)
def remove_favorite(
    property_id: int,
    current_user = Depends(user_service.get_current_user),
    db: Session = Depends(get_db)
):

    favorite_service.remove_from_favorites(
        db,
        current_user.id,
        property_id
    )

    return {
        "success": True,
        "message": "Favorite removed",
    }

@router.get(
    "/",
    response_model=FavoriteListResponse,
)
def get_my_favorites(
    current_user = Depends(user_service.get_current_user),
    db: Session = Depends(get_db)
):

    favorites = favorite_service.get_user_favorites(
        db,
        current_user.id
    )

    return {
        "items": favorites,
        "total": len(favorites),
    }