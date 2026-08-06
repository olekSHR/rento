from datetime import datetime, timezone

from fastapi import UploadFile
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.document_storage import (
    delete_document_file,
    resolve_document_file_path,
    sanitize_content_disposition_filename,
    sanitize_original_filename,
    save_pdf_upload,
)
from app.core.exceptions import (
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
)
from app.core.observability.signals import emit_transition_signal
from app.models.rental_document import RentalDocument
from app.models.user import User
from app.models.viewing_request import ViewingRequest
from app.repositories import rental_document_repository, viewing_request_repository
from app.schemas.rental_document import (
    DOCUMENT_TYPE_LABELS,
    DOCUMENT_TYPES,
    RentalDocumentListResponse,
    RentalDocumentResponse,
)
from app.services.account_status_service import ACCOUNT_STATUS_ACTIVE
from app.services.viewing_request_service import STATUS_ACCEPTED


STATUS_ACTIVE = "active"
STATUS_ARCHIVED = "archived"

VALID_STATUSES = frozenset({STATUS_ACTIVE, STATUS_ARCHIVED})


def _build_display_name(document: RentalDocument) -> str:
    if document.document_type == "other":
        if document.title:
            return document.title

        return DOCUMENT_TYPE_LABELS["other"]

    return DOCUMENT_TYPE_LABELS.get(
        document.document_type,
        document.document_type,
    )


def _build_response(document: RentalDocument) -> RentalDocumentResponse:
    is_active = document.status == STATUS_ACTIVE

    return RentalDocumentResponse(
        id=document.id,
        viewing_request_id=document.viewing_request_id,
        property_id=document.property_id,
        renter_id=document.renter_id,
        realtor_id=document.realtor_id,
        document_type=document.document_type,
        display_name=_build_display_name(document),
        title=document.title,
        original_filename=document.original_filename,
        mime_type=document.mime_type,
        size_bytes=document.size_bytes,
        uploaded_by_user_id=document.uploaded_by_user_id,
        status=document.status,
        can_download=is_active,
        can_archive=is_active,
        created_at=document.created_at,
        updated_at=document.updated_at,
        archived_at=document.archived_at,
    )


def _get_accepted_viewing_request_for_realtor(
    db: Session,
    viewing_request_id: int,
    realtor_id: int,
) -> ViewingRequest:
    request_item = viewing_request_repository.get_by_id(
        db,
        viewing_request_id,
    )

    if (
        not request_item
        or request_item.realtor_id != realtor_id
        or request_item.status != STATUS_ACCEPTED
    ):
        raise NotFoundException(
            "Viewing request not found"
        )

    return request_item


def _assert_viewing_request_party_for_list(
    db: Session,
    viewing_request_id: int,
    current_user: User,
) -> ViewingRequest:
    request_item = viewing_request_repository.get_by_id(
        db,
        viewing_request_id,
    )

    if not request_item:
        raise NotFoundException(
            "Viewing request not found"
        )

    if current_user.id not in {
        request_item.requester_id,
        request_item.realtor_id,
    }:
        raise NotFoundException(
            "Viewing request not found"
        )

    return request_item


def _assert_viewing_request_party(
    db: Session,
    viewing_request_id: int,
    current_user: User,
) -> ViewingRequest:
    request_item = viewing_request_repository.get_by_id(
        db,
        viewing_request_id,
    )

    if not request_item or request_item.status != STATUS_ACCEPTED:
        raise NotFoundException(
            "Viewing request not found"
        )

    if current_user.id not in {
        request_item.requester_id,
        request_item.realtor_id,
    }:
        raise NotFoundException(
            "Viewing request not found"
        )

    return request_item


def _get_document_for_party(
    db: Session,
    document_id: int,
    current_user: User,
) -> RentalDocument:
    document = rental_document_repository.get_by_id(
        db,
        document_id,
    )

    if not document:
        raise NotFoundException(
            "Document not found"
        )

    if current_user.id not in {
        document.renter_id,
        document.realtor_id,
    }:
        raise NotFoundException(
            "Document not found"
        )

    return document


def _validate_document_type_and_title(
    document_type: str,
    title: str | None,
) -> tuple[str, str | None]:
    if document_type not in DOCUMENT_TYPES:
        raise BadRequestException(
            "Invalid document type"
        )

    if document_type == "other":
        if not title:
            raise BadRequestException(
                "Title is required for other document type"
            )

        return document_type, title

    if title:
        trimmed = title.strip()
        if trimmed:
            raise BadRequestException(
                "Title is only allowed for other document type"
            )

    return document_type, None


def upload_rental_document(
    db: Session,
    current_user: User,
    viewing_request_id: int,
    *,
    document_type: str,
    title: str | None,
    upload_file: UploadFile,
) -> RentalDocumentResponse:
    if current_user.role != "realtor":
        raise ForbiddenException(
            "Only realtor can access this resource"
        )

    if current_user.account_status != ACCOUNT_STATUS_ACTIVE:
        raise ForbiddenException(
            "Only realtor can access this resource"
        )

    request_item = _get_accepted_viewing_request_for_realtor(
        db,
        viewing_request_id,
        current_user.id,
    )

    normalized_type, normalized_title = _validate_document_type_and_title(
        document_type,
        title,
    )

    stored_path, mime_type, size_bytes = save_pdf_upload(
        upload_file,
        actor_user_id=current_user.id,
    )

    original_filename = sanitize_original_filename(upload_file.filename)

    try:
        document = rental_document_repository.create_document(
            db,
            viewing_request_id=request_item.id,
            property_id=request_item.property_id,
            renter_id=request_item.requester_id,
            realtor_id=request_item.realtor_id,
            document_type=normalized_type,
            title=normalized_title,
            stored_path=stored_path,
            original_filename=original_filename,
            mime_type=mime_type,
            size_bytes=size_bytes,
            uploaded_by_user_id=current_user.id,
        )
    except IntegrityError as exc:
        db.rollback()
        delete_document_file(stored_path)
        raise ConflictException(
            "Active document of this type already exists for this relationship"
        ) from exc
    except Exception:
        db.rollback()
        delete_document_file(stored_path)
        raise

    emit_transition_signal(
        "rental_document",
        document.id,
        None,
        STATUS_ACTIVE,
        actor_user_id=current_user.id,
    )

    return _build_response(document)


def list_rental_documents(
    db: Session,
    current_user: User,
    viewing_request_id: int,
) -> RentalDocumentListResponse:
    request_item = _assert_viewing_request_party_for_list(
        db,
        viewing_request_id,
        current_user,
    )

    items = rental_document_repository.list_by_viewing_request(
        db,
        request_item.id,
    )

    responses = [_build_response(item) for item in items]

    return RentalDocumentListResponse(
        items=responses,
        total=len(responses),
    )


def get_download_path(
    db: Session,
    current_user: User,
    document_id: int,
) -> tuple[RentalDocument, str, str]:
    document = _get_document_for_party(
        db,
        document_id,
        current_user,
    )

    if document.status != STATUS_ACTIVE:
        raise NotFoundException(
            "Document not found"
        )

    file_path = resolve_document_file_path(document.stored_path)

    if file_path is None or not file_path.is_file():
        raise NotFoundException(
            "Document not found"
        )

    download_name = sanitize_content_disposition_filename(
        document.original_filename or f"{document.document_type}.pdf"
    )

    return document, str(file_path), download_name


def archive_rental_document(
    db: Session,
    current_user: User,
    document_id: int,
) -> RentalDocumentResponse:
    if current_user.role != "realtor":
        raise ForbiddenException(
            "Only realtor can access this resource"
        )

    document = rental_document_repository.get_by_id(
        db,
        document_id,
    )

    if not document or document.realtor_id != current_user.id:
        raise NotFoundException(
            "Document not found"
        )

    if document.status != STATUS_ACTIVE:
        raise BadRequestException(
            "Only active documents can be archived"
        )

    archived_at = datetime.now(timezone.utc)

    if not rental_document_repository.archive_document(
        db,
        document,
        archived_at=archived_at,
    ):
        raise BadRequestException(
            "Document cannot be archived"
        )

    emit_transition_signal(
        "rental_document",
        document.id,
        STATUS_ACTIVE,
        STATUS_ARCHIVED,
        actor_user_id=current_user.id,
    )

    return _build_response(document)
