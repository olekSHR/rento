"""database hardening indexes and constraints

Revision ID: b8c4e2f91a06
Revises: f3a9c2d81e05
Create Date: 2026-06-30
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "b8c4e2f91a06"
down_revision: Union[str, Sequence[str], None] = "f3a9c2d81e05"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute(
        """
        DELETE FROM favorites
        WHERE user_id IS NULL OR property_id IS NULL
        """
    )
    op.execute(
        """
        DELETE FROM favorites f1
        USING favorites f2
        WHERE f1.id > f2.id
          AND f1.user_id = f2.user_id
          AND f1.property_id = f2.property_id
        """
    )

    op.alter_column(
        "favorites",
        "user_id",
        existing_type=sa.Integer(),
        nullable=False,
    )
    op.alter_column(
        "favorites",
        "property_id",
        existing_type=sa.Integer(),
        nullable=False,
    )

    op.create_unique_constraint(
        "uq_favorites_user_id_property_id",
        "favorites",
        ["user_id", "property_id"],
    )

    op.create_index(
        "ix_properties_status",
        "properties",
        ["status"],
        unique=False,
    )
    op.create_index(
        "ix_properties_city",
        "properties",
        ["city"],
        unique=False,
    )
    op.create_index(
        "ix_properties_owner_id",
        "properties",
        ["owner_id"],
        unique=False,
    )
    op.create_index(
        "ix_favorites_user_id",
        "favorites",
        ["user_id"],
        unique=False,
    )
    op.create_index(
        "ix_property_images_property_id",
        "property_images",
        ["property_id"],
        unique=False,
    )
    op.create_index(
        "ix_password_reset_tokens_expires_at",
        "password_reset_tokens",
        ["expires_at"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_password_reset_tokens_expires_at",
        table_name="password_reset_tokens",
    )
    op.drop_index(
        "ix_property_images_property_id",
        table_name="property_images",
    )
    op.drop_index(
        "ix_favorites_user_id",
        table_name="favorites",
    )
    op.drop_index(
        "ix_properties_owner_id",
        table_name="properties",
    )
    op.drop_index(
        "ix_properties_city",
        table_name="properties",
    )
    op.drop_index(
        "ix_properties_status",
        table_name="properties",
    )

    op.drop_constraint(
        "uq_favorites_user_id_property_id",
        "favorites",
        type_="unique",
    )

    op.alter_column(
        "favorites",
        "property_id",
        existing_type=sa.Integer(),
        nullable=True,
    )
    op.alter_column(
        "favorites",
        "user_id",
        existing_type=sa.Integer(),
        nullable=True,
    )
