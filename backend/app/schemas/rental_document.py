from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator


DOCUMENT_TYPES = frozenset(
    {
        "lease_agreement",
        "inventory",
        "move_in_report",
        "payment_instructions",
        "house_rules",
        "other",
    }
)

DOCUMENT_TYPE_LABELS = {
    "lease_agreement": "Lease Agreement",
    "inventory": "Inventory",
    "move_in_report": "Move-in Report",
    "payment_instructions": "Payment Instructions",
    "house_rules": "House Rules",
    "other": "Other",
}


class RentalDocumentResponse(BaseModel):
    id: int
    viewing_request_id: int | None
    property_id: int
    renter_id: int
    realtor_id: int
    document_type: str
    display_name: str
    title: str | None
    original_filename: str | None
    mime_type: str
    size_bytes: int
    uploaded_by_user_id: int
    status: str
    can_download: bool
    can_archive: bool
    created_at: datetime
    updated_at: datetime
    archived_at: datetime | None

    model_config = ConfigDict(from_attributes=True)


class RentalDocumentListResponse(BaseModel):
    items: list[RentalDocumentResponse]
    total: int


class RentalDocumentUploadForm(BaseModel):
    document_type: Literal[
        "lease_agreement",
        "inventory",
        "move_in_report",
        "payment_instructions",
        "house_rules",
        "other",
    ]
    title: str | None = Field(default=None, max_length=200)

    @field_validator("title", mode="before")
    @classmethod
    def normalize_title(cls, value):
        if value is None:
            return None

        if isinstance(value, str):
            trimmed = value.strip()
            return trimmed or None

        return value
