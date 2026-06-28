"""add account_status to users

Revision ID: e7f2a8b91c04
Revises: c4e8a1f92b03
Create Date: 2026-06-25
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "e7f2a8b91c04"
down_revision: Union[str, Sequence[str], None] = "c4e8a1f92b03"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column(
            "account_status",
            sa.String(),
            nullable=False,
            server_default="active",
        ),
    )

    op.create_index(
        "ix_users_account_status",
        "users",
        ["account_status"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index("ix_users_account_status", table_name="users")
    op.drop_column("users", "account_status")
