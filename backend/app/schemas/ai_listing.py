from pydantic import BaseModel, Field


class AIListingRequest(BaseModel):
    city: str = Field(..., min_length=2, max_length=80)
    price: int = Field(..., ge=1)
    rooms: int = Field(..., ge=1, le=20)
    property_type: str = Field(default="apartment", max_length=50)
    features: list[str] = Field(default_factory=list)
    language: str = Field(default="ro", pattern="^(ro|en)$")


class AIListingResponse(BaseModel):
    title: str
    description: str
    short_marketing_text: str
