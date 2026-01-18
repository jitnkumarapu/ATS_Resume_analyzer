#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Test script to verify that all analysis endpoints are working properly.
"""
import sys
import os
import json

# Set UTF-8 encoding for Windows console
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')
    os.environ['PYTHONIOENCODING'] = 'utf-8'

from app.services import (
    ats_review,
    ats_match,
    resume_improvement,
    skills_gap,
    interview_prep,
    salary_negotiation,
)

# Sample resume and job description for testing
SAMPLE_RESUME = """
John Doe
Software Engineer
Email: john@example.com

EXPERIENCE:
Software Developer at Tech Corp (2020-2023)
- Developed web applications using Python and React
- Implemented REST APIs using FastAPI
- Worked with PostgreSQL databases

SKILLS:
Python, JavaScript, React, FastAPI, PostgreSQL, Git

EDUCATION:
Bachelor of Science in Computer Science
State University, 2020
"""

SAMPLE_JOB_DESC = """
Senior Software Engineer

Requirements:
- 3+ years of experience in software development
- Strong Python and FastAPI skills
- Experience with React and modern web frameworks
- Database design experience (PostgreSQL preferred)
- Knowledge of Docker and Kubernetes is a plus
- Excellent problem-solving skills

Responsibilities:
- Design and develop scalable web applications
- Work with cross-functional teams
- Mentor junior developers
"""

def test_analysis(name, func, *args):
    """Test a single analysis function."""
    print(f"\n{'='*60}")
    print(f"Testing: {name}")
    print(f"{'='*60}")
    
    try:
        result = func(*args)
        
        if not result:
            print(f"❌ FAILED: No result returned")
            return False
        
        if isinstance(result, dict):
            if 'raw_response' in result and len(result) == 1:
                print(f"⚠️  WARNING: Only raw_response returned (parsing may have failed)")
                print(f"Raw response preview: {result['raw_response'][:200]}...")
                return False
            
            print(f"✅ SUCCESS: Parsed {len(result)} sections")
            print(f"Sections found: {', '.join(result.keys())}")
            
            # Print a sample of the data
            for key, value in list(result.items())[:3]:
                print(f"\n  {key}:")
                if isinstance(value, list):
                    print(f"    Type: list with {len(value)} items")
                    if value:
                        print(f"    First item: {value[0][:100]}...")
                elif isinstance(value, str):
                    print(f"    Type: string")
                    print(f"    Preview: {value[:100]}...")
                else:
                    print(f"    Type: {type(value).__name__}")
                    print(f"    Value: {value}")
            
            return True
        else:
            print(f"❌ FAILED: Unexpected result type: {type(result)}")
            return False
            
    except Exception as e:
        print(f"❌ FAILED: Exception occurred: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Run all analysis tests."""
    print("Starting Analysis Tests")
    print("=" * 60)
    
    tests = [
        ("ATS Review", ats_review, SAMPLE_RESUME, SAMPLE_JOB_DESC),
        ("ATS Match", ats_match, SAMPLE_RESUME, SAMPLE_JOB_DESC),
        ("Resume Improvement", resume_improvement, SAMPLE_RESUME, SAMPLE_JOB_DESC),
        ("Skills Gap", skills_gap, SAMPLE_RESUME, SAMPLE_JOB_DESC),
        ("Interview Prep", interview_prep, SAMPLE_RESUME, SAMPLE_JOB_DESC),
        ("Salary Negotiation", salary_negotiation, SAMPLE_RESUME, SAMPLE_JOB_DESC, "India"),
    ]
    
    results = {}
    for test_name, func, *args in tests:
        results[test_name] = test_analysis(test_name, func, *args)
    
    # Summary
    print(f"\n{'='*60}")
    print("TEST SUMMARY")
    print(f"{'='*60}")
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, success in results.items():
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    
    if passed < total:
        print("\n⚠️  Some tests failed. Check the output above for details.")
        sys.exit(1)
    else:
        print("\n✅ All tests passed!")
        sys.exit(0)

if __name__ == "__main__":
    main()
