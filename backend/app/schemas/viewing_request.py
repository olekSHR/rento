from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ViewingRequestCreate(BaseModel):
    message: str | None = Field(default=None, max_length=500)


class ViewingRequestPropertySummary(BaseModel):
    id: int
    title: str
    city: str | None
    image_url: str | None
    status: str

    model_config = ConfigDict(from_attributes=True)


class ViewingRequestRenterResponse(BaseModel):
    id: int
    property_id: int
    property: ViewingRequestPropertySummary
    status: str
    message: str | None
    created_at: datetime
    updated_at: datetime
    responded_at: datetime | None


class ViewingRequestRealtorResponse(BaseModel):
    id: int
    property_id: int
    property: ViewingRequestPropertySummary
    requester_id: int
    requester_email: str
    status: str
    message: str | None
    created_at: datetime
    updated_at: datetime
    responded_at: datetime | None


class ViewingRequestRenterListResponse(BaseModel):
    items: list[ViewingRequestRenterResponse]
    total: int
    limit: int
    offset: int


class ViewingRequestRealtorListResponse(BaseModel):
    items: list[ViewingRequestRealtorResponse]
    total: int
    limit: int
    offset: int
