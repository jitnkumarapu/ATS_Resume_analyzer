import logging
from app.llm import call_llm
from app.parser import parse_llm_response
from app.prompts import (
    ATS_REVIEW_PROMPT,
    ATS_MATCH_PROMPT,
    RESUME_IMPROVEMENT_PROMPT,
    SKILLS_GAP_ANALYSIS_PROMPT,
    INTERVIEW_PREP_PROMPT,
    SALARY_NEGOTIATION_PROMPT,
)

logger = logging.getLogger(__name__)

def ats_review(resume_text: str, job_description: str):
    logger.info("Running ATS review analysis")
    prompt = ATS_REVIEW_PROMPT.format(
        resume_text=resume_text,
        job_description=job_description
    )
    response = call_llm(prompt)
    logger.debug(f"LLM response length: {len(response)} chars")
    parsed = parse_llm_response(response)
    logger.debug(f"Parsed keys: {list(parsed.keys())}")
    return parsed

def ats_match(resume_text: str, job_description: str):
    logger.info("Running ATS match analysis")
    prompt = ATS_MATCH_PROMPT.format(
        resume_text=resume_text,
        job_description=job_description
    )
    response = call_llm(prompt)
    logger.debug(f"LLM response length: {len(response)} chars")
    parsed = parse_llm_response(response)
    logger.debug(f"Parsed keys: {list(parsed.keys())}")
    return parsed

def resume_improvement(resume_text: str, job_description: str):
    logger.info("Running resume improvement analysis")
    prompt = RESUME_IMPROVEMENT_PROMPT.format(
        resume_text=resume_text,
        job_description=job_description
    )
    response = call_llm(prompt)
    logger.debug(f"LLM response length: {len(response)} chars")
    parsed = parse_llm_response(response)
    logger.debug(f"Parsed keys: {list(parsed.keys())}")
    return parsed

def skills_gap(resume_text: str, job_description: str):
    logger.info("Running skills gap analysis")
    prompt = SKILLS_GAP_ANALYSIS_PROMPT.format(
        resume_text=resume_text,
        job_description=job_description
    )
    response = call_llm(prompt)
    logger.debug(f"LLM response length: {len(response)} chars")
    parsed = parse_llm_response(response)
    logger.debug(f"Parsed keys: {list(parsed.keys())}")
    return parsed

def interview_prep(resume_text: str, job_description: str):
    logger.info("Running interview prep analysis")
    prompt = INTERVIEW_PREP_PROMPT.format(
        resume_text=resume_text,
        job_description=job_description
    )
    response = call_llm(prompt)
    logger.debug(f"LLM response length: {len(response)} chars")
    parsed = parse_llm_response(response)
    logger.debug(f"Parsed keys: {list(parsed.keys())}")
    return parsed

def salary_negotiation(resume_text: str, job_description: str, location: str | None):
    logger.info("Running salary negotiation analysis")
    prompt = SALARY_NEGOTIATION_PROMPT.format(
        resume_text=resume_text,
        job_description=job_description,
        location=location or "Not provided"
    )
    response = call_llm(prompt)
    logger.debug(f"LLM response length: {len(response)} chars")
    parsed = parse_llm_response(response)
    logger.debug(f"Parsed keys: {list(parsed.keys())}")
    return parsed
