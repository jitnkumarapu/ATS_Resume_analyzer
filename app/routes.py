import logging
from fastapi import APIRouter, UploadFile, File, Form
from app.pdf_parser import extract_text_from_pdf
from app.services import (
    ats_review,
    ats_match,
    resume_improvement,
    skills_gap,
    interview_prep,
    salary_negotiation,
)

router = APIRouter()
logger = logging.getLogger(__name__)


def _safe_analysis(handler, *args, **kwargs):
    """Run an analysis handler and return a result dict. On any exception, return a safe error result."""
    try:
        return {"result": handler(*args, **kwargs)}
    except Exception as e:
        logger.exception("Analysis failed: %s", e)
        return {"result": {"raw_response": "An unexpected error occurred. Please try again. If it persists, check your OpenAI API key and backend logs."}}


@router.post("/parse-resume")
async def parse_resume(file: UploadFile = File(...)):
    text = extract_text_from_pdf(file.file)
    return {"resume_text": text}


@router.post("/ats/review")
async def ats_review_api(
    resume_text: str = Form(...),
    job_description: str = Form(...),
):
    return _safe_analysis(ats_review, resume_text, job_description)


@router.post("/ats/match")
async def ats_match_api(
    resume_text: str = Form(...),
    job_description: str = Form(...),
):
    return _safe_analysis(ats_match, resume_text, job_description)


@router.post("/resume/improve")
async def resume_improve_api(
    resume_text: str = Form(...),
    job_description: str = Form(...),
):
    return _safe_analysis(resume_improvement, resume_text, job_description)


@router.post("/career/skills-gap")
async def skills_gap_api(
    resume_text: str = Form(...),
    job_description: str = Form(...),
):
    return _safe_analysis(skills_gap, resume_text, job_description)


@router.post("/career/interview-prep")
async def interview_prep_api(
    resume_text: str = Form(...),
    job_description: str = Form(...),
):
    return _safe_analysis(interview_prep, resume_text, job_description)


@router.post("/career/salary")
async def salary_api(
    resume_text: str = Form(...),
    job_description: str = Form(...),
    location: str | None = Form(default=None),
):
    return _safe_analysis(salary_negotiation, resume_text, job_description, location)
