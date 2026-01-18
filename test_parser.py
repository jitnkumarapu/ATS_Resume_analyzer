#!/usr/bin/env python
"""Test the parser with various LLM output formats"""

from app.parser import parse_llm_response

test_cases = [
    ('Skills Gap Analysis', '''
**YOUR CURRENT STRENGTHS:**
- Python: Essential for data processing and automation

**CRITICAL SKILL GAPS:**
- Deep Learning: Must-have for modern ML engineering roles

**NICE-TO-HAVE SKILLS:**
- AWS Cloud Deployment: Would strengthen competitive position

**LEARNING PLAN - WHAT TO FOCUS ON:**
1. **Start Immediately (Next 2-4 Weeks):**
   - Deep Learning: Recommended course (Andrew Ng)

2. **Medium Term (1-3 Months):**
   - Production ML Systems: Build real project
'''),
    
    ('ATS Review', '''
**OVERALL ASSESSMENT:**
Strong technical background with good resume structure for the role.

**WHAT'S WORKING WELL - YOUR STRENGTHS:**
- Solid Python and SQL experience
- Good project portfolio demonstrated

**AREAS TO IMPROVE - CRITICAL GAPS:**
- Missing cloud computing experience
- No DevOps skills mentioned

**FINAL VERDICT:**
MODERATE FIT - Technically strong but needs cloud skills
'''),
    
    ('Interview Prep', '''
**PREDICTED INTERVIEW QUESTIONS:**

Technical Questions (Based on Job Requirements):
1. Explain your experience with machine learning: Answer framework

Behavioral Questions (Based on Your Resume):
1. Tell me about your biggest project: STAR method framework

**YOUR WINNING TALKING POINTS:**
- Python expertise: 5 years production experience
- Leadership: Managed 2-person team on major project

**QUESTIONS YOU SHOULD ASK THEM:**
- What does the team structure look like?
'''),
]

print('=' * 60)
print('PARSER TEST RESULTS')
print('=' * 60)

all_passed = True
for test_name, response in test_cases:
    print(f'\nTest: {test_name}')
    print('-' * 40)
    result = parse_llm_response(response)
    
    has_single_letter_keys = False
    for key, value in result.items():
        if key == 'raw_response':
            print(f'  ⚠️ FAILED - Got raw_response (parsing failed)')
            all_passed = False
        elif len(key) <= 2:
            print(f'  ❌ ERROR - Short key: "{key}" (THIS SHOULD NOT HAPPEN)')
            has_single_letter_keys = True
            all_passed = False
        else:
            val_preview = str(value)[:50] + '...' if len(str(value)) > 50 else str(value)
            print(f'  ✓ {key}: {val_preview}')
    
    if not has_single_letter_keys and 'raw_response' not in result:
        print(f'  ✅ PASSED - All keys are properly formatted')

print('\n' + '=' * 60)
if all_passed:
    print('✅ ALL TESTS PASSED - No single-letter headers found')
else:
    print('❌ SOME TESTS FAILED - Check output above')
print('=' * 60)
