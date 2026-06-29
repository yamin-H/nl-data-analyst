from fastapi import APIRouter, HTTPException
from app.models.request import QueryRequest
from app.models.request import QueryResponse
from app.core.session import get_session
from app.services.sql_generator import generate_sql
from app.services.query_executor import execute_sql
from app.services.summarizer import summarize_results
from app.services.chart_generator import generate_chart

router = APIRouter()

@router.post("/query", response_model=QueryResponse)
def query_data(request: QueryRequest):
    session = get_session(request.session_id)

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Session not found. Please upload a file first."
        )

    sql = generate_sql(request.question, session["schema"])

    try:
        results = execute_sql(sql, session["dataframe"])
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    summary = summarize_results(request.question, results)
    chart = generate_chart(results, request.question)

    return QueryResponse(
        question=request.question,
        sql=sql,
        results=results,
        summary=summary,
        chart=chart,
        message="Query executed successfully"
    )