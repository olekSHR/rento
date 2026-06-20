"""add report count to properties

Revision ID: 2803c6ee0796
Revises: bd3db6563d5d
Create Date: 2026-06-20
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "2803c6ee0796"
down_revision: Union[str, Sequence[str], None] = "bd3db6563d5d"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "properties",
        sa.Column(
            "report_count",
            sa.Integer(),
            nullable=False,
            server_default="0",
        ),
    )


def downgrade() -> None:
    op.drop_column(
        "properties",
        "report_count",
    )
