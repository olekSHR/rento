from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean,
    ForeignKey,
)

from sqlalchemy.orm import relationship

from datetime import datetime, UTC

from app.database.database import Base


class Property(Base):

    __tablename__ = "properties"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String,
        nullable=False
    )

    description = Column(
        String,
        nullable=True
    )

    price = Column(
        Integer,
        nullable=True
    )

    city = Column(
        String,
        nullable=True
    )

    rooms = Column(
        Integer,
        nullable=True
    )

    image_url = Column(
        String,
        nullable=True
    )

    status = Column(
        String,
        nullable=False,
        default="available",
        server_default="available",
)

    contact_name = Column(
       String,
       nullable=True
)

    phone = Column(
       String,
       nullable=True
)

    whatsapp = Column(
       String,
       nullable=True
)

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(UTC)
    )

    images = relationship(
        "PropertyImage",
        back_populates="property",
        cascade="all, delete-orphan",
    )


class PropertyImage(Base):

    __tablename__ = "property_images"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    property_id = Column(
        Integer,
        ForeignKey("properties.id", ondelete="CASCADE"),
        nullable=False
    )

    url = Column(
        String,
        nullable=False
    )

    is_cover = Column(
        Boolean,
        default=False
    )

    sort_order = Column(
        Integer,
        default=0
    )

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(UTC)
    )

    property = relationship(
        "Property",
        back_populates="images"
    )
