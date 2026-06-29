from fastapi import APIRouter, UploadFile, File
from app.services.file_parser import parse_file
from app.core.session import create_session
from app.models.request import UploadResponse

router = APIRouter()

@router.post("/upload", response_model=UploadResponse)
async def upload_file(file: UploadFile = File(...)):
    schema, df = await parse_file(file)
    session_id = create_session(df, schema)

    return UploadResponse(
        message="File parsed successfully",
        session_id=session_id,
        schema=schema
    )