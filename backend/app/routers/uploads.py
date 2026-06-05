import shutil
from uuid import uuid4

from fastapi import APIRouter, UploadFile, File


router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/")
def upload_image(
    image: UploadFile = File(...)
):

    file_extension = image.filename.split(".")[-1]

    filename = f"{uuid4()}.{file_extension}"

    file_path = f"uploads/{filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return {
        "filename": filename,
        "url": f"/uploads/{filename}"
    }