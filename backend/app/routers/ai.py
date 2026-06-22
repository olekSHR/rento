from fastapi import APIRouter, Depends, HTTPException

from app.core.security.dependencies import require_admin_or_realtor
from app.schemas.ai_listing import AIListingRequest, AIListingResponse
from app.services.ai_listing_service import generate_listing_text


router = APIRouter(
    prefix="/ai",
    tags=["ai"],
)


@router.post(
    "/listing-description",
    response_model=AIListingResponse,
)
def create_ai_listing_description(
    payload: AIListingRequest,
    current_user=Depends(require_admin_or_realtor),
):
    try:
        return generate_listing_text(payload)
    except RuntimeError as exc:
        raise HTTPException(
            status_code=503,
            detail=str(exc),
        ) from exc
