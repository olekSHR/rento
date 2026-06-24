from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security.dependencies import require_admin
from app.database.database import get_db
from app.schemas.user import UserResponse, UserRoleUpdate
from app.services import user_service


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get(
    "/me",
    response_model=UserResponse
)
def get_me(
    current_user = Depends(user_service.get_current_user)
):

    return current_user


@router.patch(
    "/{user_id}/role",
    response_model=UserResponse
)
def update_user_role(
    user_id: int,
    role_update: UserRoleUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):

    return user_service.update_user_role(
        db,
        user_id,
        role_update.role
    )