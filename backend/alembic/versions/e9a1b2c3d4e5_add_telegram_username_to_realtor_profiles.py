"""add telegram_username to realtor_profiles

Revision ID: e9a1b2c3d4e5
Revises: d8f1a2b3c4d5
Create Date: 2026-08-06

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "e9a1b2c3d4e5"
down_revision: Union[str, Sequence[str], None] = "d8f1a2b3c4d5"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "realtor_profiles",
        sa.Column("telegram_username", sa.String(), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("realtor_profiles", "telegram_username")
