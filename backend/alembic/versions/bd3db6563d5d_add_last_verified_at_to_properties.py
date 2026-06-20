"""add last_verified_at to properties

Revision ID: bd3db6563d5d
Revises: 9401b1cf15b2
Create Date: 2026-06-20 11:24:24.762738

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bd3db6563d5d'
down_revision: Union[str, Sequence[str], None] = '9401b1cf15b2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "properties",
        sa.Column("last_verified_at", sa.DateTime(timezone=True), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("properties", "last_verified_at")
