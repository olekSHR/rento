"""add realtor applications

Revision ID: c4e8a1f92b03
Revises: 67a35089df97
Create Date: 2026-06-25

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "c4e8a1f92b03"
down_revision: Union[str, Sequence[str], None] = "67a35089df97"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "realtor_applications",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("full_name", sa.String(), nullable=False),
        sa.Column("phone", sa.String(), nullable=False),
        sa.Column("agency_name", sa.String(), nullable=True),
        sa.Column("message", sa.String(), nullable=True),
        sa.Column(
            "status",
            sa.String(),
            nullable=False,
            server_default="pending",
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.Column("reviewed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("reviewed_by", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["reviewed_by"], ["users.id"], ondelete="SET NULL"),
    )

    op.create_index(
        "ix_realtor_applications_user_id",
        "realtor_applications",
        ["user_id"],
    )

    op.create_index(
        "ix_realtor_applications_status",
        "realtor_applications",
        ["status"],
    )


def downgrade() -> None:
    op.drop_index("ix_realtor_applications_status", table_name="realtor_applications")
    op.drop_index("ix_realtor_applications_user_id", table_name="realtor_applications")
    op.drop_table("realtor_applications")
