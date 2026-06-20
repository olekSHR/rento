"""add property status

Revision ID: 136f31bdc8aa
Revises: d1b885e3c526
Create Date: 2026-06-12 15:44:52.793063

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '136f31bdc8aa'
down_revision: Union[str, Sequence[str], None] = 'd1b885e3c526'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    op.add_column(
        "properties",
        sa.Column(
            "status",
            sa.String(),
            nullable=False,
            server_default="available",
        ),
    )


def downgrade() -> None:
    op.drop_column("properties", "status")
