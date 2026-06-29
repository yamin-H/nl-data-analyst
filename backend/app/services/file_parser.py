import pandas as pd
from fastapi import UploadFile
import io

async def parse_file(file: UploadFile) -> dict:
    constents = await file.read()
    buffer = io.BytesIO(constents)

    if file.filename.endswith(".csv"):
        df = pd.read_csv(buffer)
    elif file.filename.endswith((".xlsx", ".xls")):
        df = pd.read_excel(buffer)
    else:
        raise ValueError("Only CSV and Excel files are supported")
    
    schema = {
        "columns" : list(df.columns),
        "dtypes": df.dtypes.astype(str).to_dict(),
        "row_count": len(df),
        "sample_rows": df.head(3).to_dict(orient="records")
    }

    return schema, df