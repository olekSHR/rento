from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class NearbyInfrastructureItem(BaseModel):
    category: str
    label: str
    name: str
    distance_m: int = Field(ge=0)
    distance_label: str


class NearbyInfrastructureResponse(BaseModel):
    property_id: int
    available: bool
    source: str = "openstreetmap"
    fetched_at: datetime | None = None
    items: list[NearbyInfrastructureItem] = Field(default_factory=list)

    model_config = ConfigDict(from_attributes=True)
