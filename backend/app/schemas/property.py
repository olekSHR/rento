from datetime import datetime

from pydantic import BaseModel, Field, ConfigDict, model_validator


def validate_coordinate_pair(
    latitude: float | None,
    longitude: float | None,
) -> None:
    if (latitude is None) != (longitude is None):
        raise ValueError(
            "latitude and longitude must both be provided or both omitted"
        )

    if latitude is None:
        return

    if latitude < -90 or latitude > 90:
        raise ValueError("latitude must be between -90 and 90")

    if longitude < -180 or longitude > 180:
        raise ValueError("longitude must be between -180 and 180")


class PropertyCreate(BaseModel):

    title: str = Field(
        min_length=3,
        max_length=100
    )

    description: str = Field(
        min_length=10,
        max_length=2000
    )

    price: int = Field(
        gt=0
    )

    city: str = Field(
        min_length=2,
        max_length=100
    )

    rooms: int = Field(
        gt=0
    )

    image_url: str | None = None

    latitude: float | None = None

    longitude: float | None = None

    @model_validator(mode="after")
    def validate_coordinates(self):
        validate_coordinate_pair(self.latitude, self.longitude)
        return self


class PropertyUpdate(BaseModel):

    title: str = Field(
        min_length=3,
        max_length=100
    )

    description: str = Field(
        min_length=10,
        max_length=2000
    )

    price: int = Field(
        gt=0
    )

    city: str = Field(
        min_length=2,
        max_length=100
    )

    rooms: int = Field(
        gt=0
    )

    image_url: str | None = None

    latitude: float | None = None

    longitude: float | None = None

    @model_validator(mode="after")
    def validate_coordinates(self):
        validate_coordinate_pair(self.latitude, self.longitude)
        return self


class PropertyImageResponse(BaseModel):

    id: int

    url: str

    is_cover: bool

    sort_order: int

    model_config = ConfigDict(from_attributes=True)

class PropertyImageCreate(BaseModel):

    url: str = Field(
        min_length=1,
        max_length=500,
    )

    is_cover: bool = False

    sort_order: int = Field(
        default=0,
        ge=0,
    )


class PropertyCardResponse(BaseModel):

    id: int

    owner_id: int | None = None

    title: str

    price: int | None

    city: str | None

    rooms: int | None

    image_url: str | None

    status: str

    contact_name: str | None = None

    phone: str | None = None

    whatsapp: str | None = None

    avatar_url: str | None = None

    last_verified_at: datetime | None

    report_count: int = 0

    model_config = ConfigDict(from_attributes=True)

class PropertyResponse(BaseModel):

    id: int

    owner_id: int | None = None

    title: str

    description: str

    price: int

    city: str

    rooms: int

    image_url: str | None

    status: str

    contact_name: str | None
    
    phone: str | None
    
    whatsapp: str | None

    avatar_url: str | None = None

    last_verified_at: datetime | None

    report_count: int = 0

    latitude: float | None = None

    longitude: float | None = None

    images: list[PropertyImageResponse] = []

    model_config = ConfigDict(from_attributes=True)


class PropertyListResponse(BaseModel):

    items: list[PropertyCardResponse]

    total: int

    limit: int

    offset: int
