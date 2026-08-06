from sqlalchemy import Column, DateTime, ForeignKey, Index, Integer, String, text
from sqlalchemy.sql import func

from app.database.database import Base


class RentalDocument(Base):
    __tablename__ = "rental_documents"

    id = Column(Integer, primary_key=True)

    viewing_request_id = Column(
        Integer,
        ForeignKey("viewing_requests.id", ondelete="RESTRICT"),
        nullable=True,
        index=True,
    )

    property_id = Column(
        Integer,
        ForeignKey("properties.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    renter_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    realtor_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    document_type = Column(String(50), nullable=False)

    title = Column(String(200), nullable=True)

    stored_path = Column(String(500), nullable=False)

    original_filename = Column(String(255), nullable=True)

    mime_type = Column(String(100), nullable=False)

    size_bytes = Column(Integer, nullable=False)

    uploaded_by_user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="RESTRICT"),
        nullable=False,
    )

    status = Column(
        String,
        nullable=False,
        default="active",
        server_default="active",
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    archived_at = Column(
        DateTime(timezone=True),
        nullable=True,
    )

    __table_args__ = (
        Index(
            "ix_rental_documents_realtor_status_created",
            "realtor_id",
            "status",
            "created_at",
        ),
        Index(
            "ix_rental_documents_relationship",
            "property_id",
            "renter_id",
            "realtor_id",
        ),
        Index(
            "uq_rental_documents_active_type",
            "property_id",
            "renter_id",
            "realtor_id",
            "document_type",
            unique=True,
            postgresql_where=text("status = 'active'"),
            sqlite_where=text("status = 'active'"),
        ),
    )
