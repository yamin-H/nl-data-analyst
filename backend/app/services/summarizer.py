from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from app.core.config import settings

llm = ChatGroq(
    api_key=settings.GROQ_API_KEY,
    model="llama-3.3-70b-versatile",
    temperature=0.3
)

prompt_template = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are a friendly data analyst. Your job is to explain query results in simple, clear English. Be concise. Maximum 2-3 sentences. No bullet points. Just plain conversational explanation."
    ),
    (
        "human",
        """The user asked: {question}

The data returned these results:
{results}

Explain what these results mean in simple English."""
    )
])

def summarize_results(question: str, results: list) -> str:

    if not results:
        return "No data found for your question. Try rephrasing or ask something different."

    chain = prompt_template | llm

    response = chain.invoke({
        "question": question,
        "results": results
    })

    return response.content.strip()