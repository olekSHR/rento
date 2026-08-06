from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.schemas.property import PropertyCardResponse, PropertyListResponse


class PublicRealtorProfileResponse(BaseModel):
    user_id: int
    full_name: str | None = None
    agency_name: str | None = None
    avatar_url: str | None = None
    is_verified: bool = False
    member_since: datetime | None = None
    active_listings_count: int = 0
    phone: str | None = None
    whatsapp: str | None = None
    telegram_username: str | None = None

    model_config = ConfigDict(from_attributes=True)


class PublicRealtorProfilePageResponse(BaseModel):
    realtor: PublicRealtorProfileResponse
    properties: PropertyListResponse
