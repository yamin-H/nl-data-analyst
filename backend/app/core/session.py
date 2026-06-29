import uuid
import pandas as pd
from typing import Optional

sessions: dict = {}

def create_session(df: pd.DataFrame, schema: dict) -> str:
    session_id = str(uuid.uuid4())

    sessions[session_id] = {
        "dataframe" : df,
        "schema": schema
    }
    return session_id

def get_session(session_id: str) -> Optional[dict]:
    return sessions.get(session_id, None)