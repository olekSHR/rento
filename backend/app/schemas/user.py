from typing import Literal

from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):

    email: EmailStr

    password: str = Field(
        min_length=6
    )


class UserResponse(BaseModel):

    id: int

    email: EmailStr

    role: str

    account_status: str = "active"

    class Config:

        from_attributes = True


class UserRoleUpdate(BaseModel):

    role: Literal["user", "realtor", "admin"]


class UserLogin(BaseModel):

    email: EmailStr

    password: str


class TokenResponse(BaseModel):

    access_token: str

    token_type: str