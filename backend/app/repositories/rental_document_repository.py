from datetime import datetime

from sqlalchemy.orm import Session

from app.models.rental_document import RentalDocument


def create_document(
    db: Session,
    *,
    viewing_request_id: int,
    property_id: int,
    renter_id: int,
    realtor_id: int,
    document_type: str,
    title: str | None,
    stored_path: str,
    original_filename: str | None,
    mime_type: str,
    size_bytes: int,
    uploaded_by_user_id: int,
) -> RentalDocument:
    document = RentalDocument(
        viewing_request_id=viewing_request_id,
        property_id=property_id,
        renter_id=renter_id,
        realtor_id=realtor_id,
        document_type=document_type,
        title=title,
        stored_path=stored_path,
        original_filename=original_filename,
        mime_type=mime_type,
        size_bytes=size_bytes,
        uploaded_by_user_id=uploaded_by_user_id,
        status="active",
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


def get_by_id(
    db: Session,
    document_id: int,
) -> RentalDocument | None:
    return (
        db.query(RentalDocument)
        .filter(RentalDocument.id == document_id)
        .first()
    )


def list_by_viewing_request(
    db: Session,
    viewing_request_id: int,
) -> list[RentalDocument]:
    return (
        db.query(RentalDocument)
        .filter(RentalDocument.viewing_request_id == viewing_request_id)
        .order_by(RentalDocument.created_at.desc())
        .all()
    )


def archive_document(
    db: Session,
    document: RentalDocument,
    *,
    archived_at: datetime,
) -> bool:
    rows_updated = (
        db.query(RentalDocument)
        .filter(
            RentalDocument.id == document.id,
            RentalDocument.status == "active",
        )
        .update(
            {
                RentalDocument.status: "archived",
                RentalDocument.archived_at: archived_at,
            },
            synchronize_session=False,
        )
    )

    if rows_updated == 0:
        return False

    db.commit()
    db.refresh(document)

    return True
