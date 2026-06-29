from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from app.core.config import settings
from dotenv import load_dotenv

load_dotenv()
llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0)

prompt_template = ChatPromptTemplate.from_messages([
    ("system", "You are an expert SQL analyst. Your only job is to write precise SQL queries based on the schema and question provided. Always use 'data' as the table name. Return ONLY the raw SQL query. No explanations, no markdown, no backticks."),
    ("human", """
        Here is the dataset schema:
     
        Table name: data
        Columns:
        {columns_text}
     
        Sample rows:
        {sample_rows}
        User question: {question}
        
        Write a single SQL query to answer this question.
    """)
])

def generate_sql(question: str, schema: dict) -> str:
    columns_info = []
    for col in schema["columns"]:
        dtype = schema["dtypes"][col]
        columns_info.append(f"  - {col} ({dtype})")

    columns_text = "\n".join(columns_info)
    chain = prompt_template | llm

    response = chain.invoke({
        "columns_text": columns_text,
        "sample_rows": schema["sample_rows"],
        "question": question
    })

    sql = response.content.strip()
    return sql