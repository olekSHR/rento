"""add owner id to properties

Revision ID: 46c9d35a00b0
Revises: 2803c6ee0796
Create Date: 2026-06-22 11:14:26.425939

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '46c9d35a00b0'
down_revision: Union[str, Sequence[str], None] = '2803c6ee0796'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "properties",
        sa.Column(
            "owner_id",
            sa.Integer(),
            nullable=True
        )
    )

    op.create_foreign_key(
        "fk_properties_owner_id_users",
        "properties",
        "users",
        ["owner_id"],
        ["id"],
        ondelete="SET NULL"
    )


def downgrade() -> None:
    op.drop_constraint(
        "fk_properties_owner_id_users",
        "properties",
        type_="foreignkey"
    )

    op.drop_column(
        "properties",
        "owner_id"
    )
