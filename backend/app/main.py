from fastapi import FastAPI
from app.core.config import settings
from app.api.routes import upload, query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://nl-data-analyst-5rbl6yx49-yamin-hs-projects.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/api")
app.include_router(query.router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "message": "Backend is alive",
        "app_name": settings.APP_NAME,
        "environment": settings.ENVIRONMENT
    }
