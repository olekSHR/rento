from datetime import datetime

from pydantic import BaseModel, ConfigDict


class RealtorProfileUpdate(BaseModel):
    full_name: str | None = None
    phone: str | None = None
    whatsapp: str | None = None
    agency_name: str | None = None
    avatar_url: str | None = None
    bio: str | None = None
    city: str | None = None


class RealtorProfileResponse(BaseModel):
    id: int
    user_id: int
    full_name: str | None
    phone: str | None
    whatsapp: str | None
    agency_name: str | None
    avatar_url: str | None
    bio: str | None
    city: str | None
    is_completed: bool
    is_verified: bool
    created_at: datetime | None
    updated_at: datetime | None

    model_config = ConfigDict(from_attributes=True)
