"""Quick test to verify analysis functions work."""
import sys
from app.services import ats_review, interview_prep, salary_negotiation

# Sample data
resume = "Software Engineer with 3 years of Python and FastAPI experience."
job = "Looking for Senior Python Developer with FastAPI skills."

print("Testing ATS Review...")
try:
    result = ats_review(resume, job)
    print(f"  Result keys: {list(result.keys())}")
    if 'raw_response' in result and len(result) == 1:
        print("  WARNING: Only raw_response found - parsing may have failed")
        print(f"  Preview: {result['raw_response'][:200]}")
    else:
        print("  SUCCESS: Parsed structured data")
except Exception as e:
    print(f"  ERROR: {e}")

print("\nTesting Interview Prep...")
try:
    result = interview_prep(resume, job)
    print(f"  Result keys: {list(result.keys())}")
    if 'raw_response' in result and len(result) == 1:
        print("  WARNING: Only raw_response found - parsing may have failed")
        print(f"  Preview: {result['raw_response'][:200]}")
    else:
        print("  SUCCESS: Parsed structured data")
except Exception as e:
    print(f"  ERROR: {e}")

print("\nTesting Salary Negotiation...")
try:
    result = salary_negotiation(resume, job, "India")
    print(f"  Result keys: {list(result.keys())}")
    if 'raw_response' in result and len(result) == 1:
        print("  WARNING: Only raw_response found - parsing may have failed")
        print(f"  Preview: {result['raw_response'][:200]}")
    else:
        print("  SUCCESS: Parsed structured data")
except Exception as e:
    print(f"  ERROR: {e}")

print("\nTest complete!")
