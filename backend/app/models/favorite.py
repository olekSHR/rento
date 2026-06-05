from sqlalchemy import Column, Integer, ForeignKey

from app.database.database import Base


class Favorite(Base):

    __tablename__ = "favorites"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE")
    )

    property_id = Column(
        Integer,
        ForeignKey("properties.id", ondelete="CASCADE")
    )