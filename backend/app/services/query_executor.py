import pandas as pd
import pandasql as psql

def execute_sql(sql: str, df: pd.DataFrame) -> list[dict]:

    # pandasql needs the dataframe variable to be named
    # exactly what the SQL query references
    # our LLM always uses "data" as table name
    # so we create a local variable called "data"
    data = df

    try:
        result = psql.sqldf(sql, locals())
        return result.to_dict(orient="records")
    except Exception as e:
        raise ValueError(f"SQL execution failed: {str(e)}")