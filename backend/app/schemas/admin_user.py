from datetime import datetime

from pydantic import BaseModel, EmailStr


class AdminUserListItem(BaseModel):
    id: int
    email: EmailStr
    role: str
    display_name: str
    application_status: str | None
    listings_count: int
    is_verified_realtor: bool
    registered_at: datetime | None = None


class AdminUserListResponse(BaseModel):
    items: list[AdminUserListItem]
    total: int
    page: int
    limit: int


class AdminUserDetailResponse(BaseModel):
    id: int
    email: EmailStr
    role: str
    display_name: str
    application_status: str | None
    listings_count: int
    is_verified_realtor: bool
    registered_at: datetime | None = None
    phone: str | None = None
    agency_name: str | None = None
