"""add nearby infrastructure cache

Revision ID: d8f1a2b3c4d5
Revises: c7d2e4a81b03
Create Date: 2026-08-05

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "d8f1a2b3c4d5"
down_revision: Union[str, Sequence[str], None] = "c7d2e4a81b03"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "properties",
        sa.Column("nearby_infrastructure", sa.JSON(), nullable=True),
    )
    op.add_column(
        "properties",
        sa.Column(
            "nearby_infrastructure_at",
            sa.DateTime(timezone=True),
            nullable=True,
        ),
    )


def downgrade() -> None:
    op.drop_column("properties", "nearby_infrastructure_at")
    op.drop_column("properties", "nearby_infrastructure")
