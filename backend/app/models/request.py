from pydantic import BaseModel
from typing import Optional

class QueryRequest(BaseModel):
    question: str
    session_id: str

class QueryResponse(BaseModel):
    question: str
    sql: str
    results: list[dict]
    summary: str
    chart: Optional[str] = None     
    message: str

class UploadResponse(BaseModel):
    message: str
    session_id: str
    schema: dict