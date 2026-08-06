"""add rental documents

Revision ID: a2b3c4d5e6f7
Revises: f1a2b3c4d5e6
Create Date: 2026-08-06

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "a2b3c4d5e6f7"
down_revision: Union[str, Sequence[str], None] = "f1a2b3c4d5e6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "rental_documents",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("viewing_request_id", sa.Integer(), nullable=True),
        sa.Column("property_id", sa.Integer(), nullable=False),
        sa.Column("renter_id", sa.Integer(), nullable=False),
        sa.Column("realtor_id", sa.Integer(), nullable=False),
        sa.Column("document_type", sa.String(length=50), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=True),
        sa.Column("stored_path", sa.String(length=500), nullable=False),
        sa.Column("original_filename", sa.String(length=255), nullable=True),
        sa.Column("mime_type", sa.String(length=100), nullable=False),
        sa.Column("size_bytes", sa.Integer(), nullable=False),
        sa.Column("uploaded_by_user_id", sa.Integer(), nullable=False),
        sa.Column(
            "status",
            sa.String(),
            nullable=False,
            server_default="active",
        ),
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
        sa.Column("archived_at", sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(
            ["viewing_request_id"],
            ["viewing_requests.id"],
            ondelete="RESTRICT",
        ),
        sa.ForeignKeyConstraint(
            ["property_id"],
            ["properties.id"],
            ondelete="RESTRICT",
        ),
        sa.ForeignKeyConstraint(
            ["renter_id"],
            ["users.id"],
            ondelete="RESTRICT",
        ),
        sa.ForeignKeyConstraint(
            ["realtor_id"],
            ["users.id"],
            ondelete="RESTRICT",
        ),
        sa.ForeignKeyConstraint(
            ["uploaded_by_user_id"],
            ["users.id"],
            ondelete="RESTRICT",
        ),
    )

    op.create_index(
        "ix_rental_documents_viewing_request_id",
        "rental_documents",
        ["viewing_request_id"],
    )
    op.create_index(
        "ix_rental_documents_property_id",
        "rental_documents",
        ["property_id"],
    )
    op.create_index(
        "ix_rental_documents_renter_id",
        "rental_documents",
        ["renter_id"],
    )
    op.create_index(
        "ix_rental_documents_realtor_id",
        "rental_documents",
        ["realtor_id"],
    )
    op.create_index(
        "ix_rental_documents_realtor_status_created",
        "rental_documents",
        ["realtor_id", "status", "created_at"],
    )
    op.create_index(
        "ix_rental_documents_relationship",
        "rental_documents",
        ["property_id", "renter_id", "realtor_id"],
    )
    op.create_index(
        "uq_rental_documents_active_type",
        "rental_documents",
        ["property_id", "renter_id", "realtor_id", "document_type"],
        unique=True,
        postgresql_where=sa.text("status = 'active'"),
        sqlite_where=sa.text("status = 'active'"),
    )


def downgrade() -> None:
    op.drop_index(
        "uq_rental_documents_active_type",
        table_name="rental_documents",
    )
    op.drop_index(
        "ix_rental_documents_relationship",
        table_name="rental_documents",
    )
    op.drop_index(
        "ix_rental_documents_realtor_status_created",
        table_name="rental_documents",
    )
    op.drop_index(
        "ix_rental_documents_realtor_id",
        table_name="rental_documents",
    )
    op.drop_index(
        "ix_rental_documents_renter_id",
        table_name="rental_documents",
    )
    op.drop_index(
        "ix_rental_documents_property_id",
        table_name="rental_documents",
    )
    op.drop_index(
        "ix_rental_documents_viewing_request_id",
        table_name="rental_documents",
    )
    op.drop_table("rental_documents")
