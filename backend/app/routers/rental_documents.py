from fastapi import APIRouter, Depends, File, Form, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.core.document_storage import sanitize_content_disposition_filename
from app.core.security.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.schemas.rental_document import (
    RentalDocumentListResponse,
    RentalDocumentResponse,
)
from app.services import rental_document_service


router = APIRouter(
    tags=["Rental Documents"],
)


@router.post(
    "/viewing-requests/{viewing_request_id}/rental-documents",
    response_model=RentalDocumentResponse,
    status_code=201,
)
def upload_rental_document(
    viewing_request_id: int,
    document_type: str = Form(...),
    title: str | None = Form(default=None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return rental_document_service.upload_rental_document(
        db,
        current_user,
        viewing_request_id,
        document_type=document_type,
        title=title,
        upload_file=file,
    )


@router.get(
    "/viewing-requests/{viewing_request_id}/rental-documents",
    response_model=RentalDocumentListResponse,
)
def list_rental_documents(
    viewing_request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return rental_document_service.list_rental_documents(
        db,
        current_user,
        viewing_request_id,
    )


@router.get(
    "/rental-documents/{document_id}/download",
)
def download_rental_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    _document, file_path, download_name = rental_document_service.get_download_path(
        db,
        current_user,
        document_id,
    )

    safe_filename = sanitize_content_disposition_filename(download_name)

    return FileResponse(
        path=file_path,
        media_type="application/pdf",
        filename=safe_filename,
        headers={
            "Cache-Control": "private, no-store",
            "X-Content-Type-Options": "nosniff",
        },
    )


@router.post(
    "/rental-documents/{document_id}/archive",
    response_model=RentalDocumentResponse,
)
def archive_rental_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return rental_document_service.archive_rental_document(
        db,
        current_user,
        document_id,
    )
