from typing import Dict, List

SECTION_KEYWORDS = {
    "skills": [
        "python", "sql", "machine learning", "data analysis",
        "statistics", "deep learning", "nlp", "pandas"
    ],
    "experience": [
        "intern", "experience", "worked", "developed",
        "designed", "implemented", "led"
    ],
    "projects": [
        "project", "built", "designed", "implemented",
        "system", "application", "model"
    ],
    "education": [
        "bachelor", "master", "degree", "university",
        "college", "education"
    ],
}

def compute_section_score(text: str, keywords: List[str]) -> int:
    text = text.lower()
    matched = sum(1 for kw in keywords if kw in text)
    return round((matched / len(keywords)) * 100) if keywords else 0


def compute_all_section_scores(resume_text: str) -> Dict[str, int]:
    return {
        section: compute_section_score(resume_text, keywords)
        for section, keywords in SECTION_KEYWORDS.items()
    }
