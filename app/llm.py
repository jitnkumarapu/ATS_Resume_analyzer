from openai import OpenAI
from app.config import (
    OPENAI_API_KEY,
    OPENROUTER_API_KEY,
    OPENROUTER_MODEL,
)

if OPENROUTER_API_KEY:
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=OPENROUTER_API_KEY,
    )
    MODEL = OPENROUTER_MODEL
    PROVIDER = "openrouter"
else:
    client = OpenAI(api_key=OPENAI_API_KEY)
    MODEL = "gpt-4o-mini"
    PROVIDER = "openai"


def _format_llm_error(exc: Exception, provider: str) -> str:
    """Return a user-friendly message for API errors (OpenRouter or OpenAI)."""
    s = str(exc).lower()
    if "429" in s or "quota" in s or "exceeded" in s or "rate limit" in s:
        if provider == "openrouter":
            return (
                "Your OpenRouter account has exceeded its usage quota or rate limit. "
                "Add credits at https://openrouter.ai/credits and try again. "
                f"(Error: {str(exc)[:180]})"
            )
        return (
            "Your OpenAI account has exceeded its usage quota or rate limit. "
            "Add a payment method or buy credits at https://platform.openai.com/account/billing and try again. "
            f"(Error: {str(exc)[:180]})"
        )
    if "401" in s or "invalid" in s or "api key" in s or "authentication" in s:
        key_hint = "OPENROUTER_API_KEY" if provider == "openrouter" else "OPENAI_API_KEY"
        return (
            f"The analysis could not be completed. Please check your {key_hint} in the .env file and try again. "
            f"(Error: {str(exc)[:180]})"
        )
    return (
        "The analysis could not be completed. Please check your API key and connection, then try again. "
        f"(Error: {str(exc)[:200]})"
    )


def call_llm(prompt: str, temperature: float = 0.1) -> str:
    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=temperature,
        )
    except Exception as e:
        return _format_llm_error(e, PROVIDER)

    if not getattr(response, "choices", None) or len(response.choices) == 0:
        return "The analysis could not be completed. The AI service returned an empty response. Please try again."

    content = getattr(response.choices[0].message, "content", None)
    if content is None or (isinstance(content, str) and not content.strip()):
        return "The analysis could not be completed. The AI service returned no content. Please try again."

    return content if isinstance(content, str) else str(content)
