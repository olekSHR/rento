from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class RealtorApplicationCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    phone: str = Field(min_length=3, max_length=30)
    agency_name: str | None = Field(default=None, max_length=100)
    message: str | None = Field(default=None, max_length=2000)


class RealtorApplicationReview(BaseModel):
    status: Literal["approved", "rejected"]


class RealtorApplicationResponse(BaseModel):
    id: int
    user_id: int
    full_name: str
    phone: str
    agency_name: str | None
    message: str | None
    status: str
    created_at: datetime
    reviewed_at: datetime | None
    reviewed_by: int | None

    model_config = ConfigDict(from_attributes=True)


class RealtorApplicationListResponse(BaseModel):
    items: list[RealtorApplicationResponse]
    total: int
