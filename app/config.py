import os
from dotenv import load_dotenv
from pathlib import Path

# Get the project root directory (parent of 'app' folder)
PROJECT_ROOT = Path(__file__).resolve().parent.parent
env_path = PROJECT_ROOT / ".env"

# Load the .env file
load_dotenv(env_path)

def _get(key: str, default: str = "") -> str:
    return (os.getenv(key) or default).strip()

OPENAI_API_KEY = _get("OPENAI_API_KEY")
OPENROUTER_API_KEY = _get("OPENROUTER_API_KEY")
OPENROUTER_MODEL = _get("OPENROUTER_MODEL") or "openai/gpt-4o-mini"

if not OPENROUTER_API_KEY and not OPENAI_API_KEY:
    raise ValueError(
        f"Set OPENROUTER_API_KEY (https://openrouter.ai/keys) or OPENAI_API_KEY in .env. "
        f"File: {env_path}"
    )

# Server configuration
API_HOST = "0.0.0.0"
API_PORT = 8000