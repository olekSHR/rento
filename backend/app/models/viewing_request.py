from sqlalchemy import Column, DateTime, ForeignKey, Index, Integer, String, text
from sqlalchemy.sql import func

from app.database.database import Base


class ViewingRequest(Base):
    __tablename__ = "viewing_requests"

    id = Column(Integer, primary_key=True)

    property_id = Column(
        Integer,
        ForeignKey("properties.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    requester_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    realtor_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    status = Column(
        String,
        nullable=False,
        default="pending",
        server_default="pending",
    )

    message = Column(String(500), nullable=True)

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

    responded_at = Column(
        DateTime(timezone=True),
        nullable=True,
    )

    __table_args__ = (
        Index(
            "ix_viewing_requests_realtor_status_created",
            "realtor_id",
            "status",
            "created_at",
        ),
        Index(
            "uq_viewing_requests_active_pair",
            "requester_id",
            "property_id",
            unique=True,
            postgresql_where=text("status IN ('pending', 'accepted')"),
            sqlite_where=text("status IN ('pending', 'accepted')"),
        ),
    )
