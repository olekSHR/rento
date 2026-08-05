"""add property coordinates

Revision ID: c7d2e4a81b03
Revises: a1f006_session_auth
Create Date: 2026-08-04

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "c7d2e4a81b03"
down_revision: Union[str, Sequence[str], None] = "a1f006_session_auth"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "properties",
        sa.Column("latitude", sa.Numeric(9, 6), nullable=True),
    )
    op.add_column(
        "properties",
        sa.Column("longitude", sa.Numeric(9, 6), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("properties", "longitude")
    op.drop_column("properties", "latitude")
