from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router
from app.llm import PROVIDER

app = FastAPI(title="AI ATS Resume Engine")

# Add CORS middleware - must be added BEFORE other middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://127.0.0.1:5175", "*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=600,
)

app.include_router(router)


@app.on_event("startup")
def _log_llm_provider():
    print(f"[ATS] Using LLM: {PROVIDER}")
    if PROVIDER == "openai":
        print("[ATS] Hint: To use OpenRouter instead, set OPENROUTER_API_KEY in .env (project root) and restart.")


@app.get("/health")
async def health_check():
    return {"status": "ok", "llm_provider": PROVIDER}
