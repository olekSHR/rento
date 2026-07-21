from pydantic import BaseModel, ConfigDict


class FavoriteResponse(BaseModel):
    id: int
    user_id: int
    property_id: int

    model_config = ConfigDict(from_attributes=True)


class FavoriteListResponse(BaseModel):
    items: list[FavoriteResponse]
    total: int
