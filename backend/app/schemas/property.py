from pydantic import BaseModel, Field, ConfigDict


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


class PropertyImageResponse(BaseModel):

    id: int

    url: str

    is_cover: bool

    sort_order: int

    model_config = ConfigDict(from_attributes=True)

class PropertyImageCreate(BaseModel):

    url: str

    is_cover: bool = False

    sort_order: int = 0


class PropertyCardResponse(BaseModel):

    id: int

    title: str

    price: int | None

    city: str | None

    rooms: int | None

    image_url: str | None

    model_config = ConfigDict(from_attributes=True)


class PropertyResponse(BaseModel):

    id: int

    title: str

    description: str

    price: int

    city: str

    rooms: int

    image_url: str | None

    images: list[PropertyImageResponse] = []

    model_config = ConfigDict(from_attributes=True)


class PropertyListResponse(BaseModel):

    items: list[PropertyCardResponse]

    total: int

    limit: int

    offset: int