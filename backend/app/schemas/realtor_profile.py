from datetime import datetime

from pydantic import BaseModel, ConfigDict, field_validator

from app.core.telegram_username import normalize_telegram_username


class RealtorProfileUpdate(BaseModel):
    full_name: str | None = None
    phone: str | None = None
    whatsapp: str | None = None
    telegram_username: str | None = None
    agency_name: str | None = None
    avatar_url: str | None = None
    bio: str | None = None
    city: str | None = None

    @field_validator("telegram_username", mode="before")
    @classmethod
    def validate_telegram_username(cls, value):
        if value is None:
            return None

        if isinstance(value, str) and not value.strip():
            return None

        return normalize_telegram_username(value)


class RealtorProfileResponse(BaseModel):
    id: int
    user_id: int
    full_name: str | None
    phone: str | None
    whatsapp: str | None
    telegram_username: str | None
    agency_name: str | None
    avatar_url: str | None
    bio: str | None
    city: str | None
    is_completed: bool
    is_verified: bool
    created_at: datetime | None
    updated_at: datetime | None

    model_config = ConfigDict(from_attributes=True)
