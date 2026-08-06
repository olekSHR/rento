"""add viewing requests

Revision ID: f1a2b3c4d5e6
Revises: e9a1b2c3d4e5
Create Date: 2026-08-06

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "f1a2b3c4d5e6"
down_revision: Union[str, Sequence[str], None] = "e9a1b2c3d4e5"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "viewing_requests",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("property_id", sa.Integer(), nullable=False),
        sa.Column("requester_id", sa.Integer(), nullable=False),
        sa.Column("realtor_id", sa.Integer(), nullable=False),
        sa.Column(
            "status",
            sa.String(),
            nullable=False,
            server_default="pending",
        ),
        sa.Column("message", sa.String(length=500), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.Column("responded_at", sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(
            ["property_id"],
            ["properties.id"],
            ondelete="RESTRICT",
        ),
        sa.ForeignKeyConstraint(
            ["requester_id"],
            ["users.id"],
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["realtor_id"],
            ["users.id"],
            ondelete="RESTRICT",
        ),
    )

    op.create_index(
        "ix_viewing_requests_property_id",
        "viewing_requests",
        ["property_id"],
    )
    op.create_index(
        "ix_viewing_requests_requester_id",
        "viewing_requests",
        ["requester_id"],
    )
    op.create_index(
        "ix_viewing_requests_realtor_id",
        "viewing_requests",
        ["realtor_id"],
    )
    op.create_index(
        "ix_viewing_requests_realtor_status_created",
        "viewing_requests",
        ["realtor_id", "status", "created_at"],
    )
    op.create_index(
        "uq_viewing_requests_active_pair",
        "viewing_requests",
        ["requester_id", "property_id"],
        unique=True,
        postgresql_where=sa.text("status IN ('pending', 'accepted')"),
        sqlite_where=sa.text("status IN ('pending', 'accepted')"),
    )


def downgrade() -> None:
    op.drop_index(
        "uq_viewing_requests_active_pair",
        table_name="viewing_requests",
    )
    op.drop_index(
        "ix_viewing_requests_realtor_status_created",
        table_name="viewing_requests",
    )
    op.drop_index(
        "ix_viewing_requests_realtor_id",
        table_name="viewing_requests",
    )
    op.drop_index(
        "ix_viewing_requests_requester_id",
        table_name="viewing_requests",
    )
    op.drop_index(
        "ix_viewing_requests_property_id",
        table_name="viewing_requests",
    )
    op.drop_table("viewing_requests")
