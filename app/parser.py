import json
import re

# Field name mapping to normalize different variations to canonical names
FIELD_NAME_MAPPING = {
    # ATS Review mappings
    "overall_assessment": "overall_assessment",
    "overall assessment": "overall_assessment",
    "whats_working_well": "whats_working_well",
    "what's working well": "whats_working_well",
    "whats working well": "whats_working_well",
    "whats_working_well_your_strengths": "whats_working_well",
    "what_s_working_well_your_strengths": "whats_working_well",
    "strengths": "whats_working_well",
    "your_strengths": "whats_working_well",
    "areas_to_improve": "areas_to_improve",
    "areas to improve": "areas_to_improve",
    "areas_to_improve_critical_gaps": "areas_to_improve",
    "critical_gaps": "areas_to_improve",
    "gaps": "areas_to_improve",
    "ats_optimization_tips": "ats_optimization_tips",
    "ats optimization tips": "ats_optimization_tips",
    "optimization_tips": "ats_optimization_tips",
    "keyword_recommendations": "keyword_recommendations",
    "keywords": "keyword_recommendations",
    "key_terms_from_the_job_description_your_resume_is_missing": "keyword_recommendations",
    "key_terms": "keyword_recommendations",
    "missing_keywords": "keyword_recommendations",
    "final_verdict": "final_verdict",
    "verdict": "final_verdict",
    
    # ATS Match mappings
    "match_score": "match_score",
    "score": "match_score",
    "matched_keywords_from_job_posting": "matched_keywords_from_job_posting",
    "matched keywords from job posting": "matched_keywords_from_job_posting",
    "matched keywords": "matched_keywords_from_job_posting",
    "matched_keywords": "matched_keywords_from_job_posting",
    "matched": "matched_keywords_from_job_posting",
    "missing_critical_keywords": "missing_critical_keywords",
    "missing critical keywords": "missing_critical_keywords",
    "critical_keywords": "missing_critical_keywords",
    "missing_important_keywords": "missing_important_keywords",
    "missing important keywords": "missing_important_keywords",
    "important_keywords": "missing_important_keywords",
    "top_5_recommendations_to_improve_match": "top_5_recommendations_to_improve_match",
    "top 5 recommendations to improve match": "top_5_recommendations_to_improve_match",
    "top 5 recommendations": "top_5_recommendations_to_improve_match",
    "recommendations_to_improve": "top_5_recommendations_to_improve_match",
    "recommendations": "top_5_recommendations_to_improve_match",
    "final_match_score_breakdown": "final_match_score_breakdown",
    "final match score breakdown": "final_match_score_breakdown",
    "score breakdown": "final_match_score_breakdown",
    "match_breakdown": "final_match_score_breakdown",
    
    # Resume Improvement mappings
    "top_3_immediate_improvements": "top_3_immediate_improvements",
    "top 3 immediate improvements": "top_3_immediate_improvements",
    "immediate_improvements": "top_3_immediate_improvements",
    "immediate_fixes": "top_3_immediate_improvements",
    "strengthening_your_experience_section": "strengthening_your_experience_section",
    "strengthening your experience section": "strengthening_your_experience_section",
    "experience section": "strengthening_your_experience_section",
    "experience_improvements": "strengthening_your_experience_section",
    "keywords_and_language_improvements": "keywords_and_language_improvements",
    "keywords and language improvements": "keywords_and_language_improvements",
    "language improvements": "keywords_and_language_improvements",
    "language_fixes": "keywords_and_language_improvements",
    "skills_section_optimization": "skills_section_optimization",
    "skills section optimization": "skills_section_optimization",
    "skills optimization": "skills_section_optimization",
    "skills_improvements": "skills_section_optimization",
    "formatting_and_structure_fixes": "formatting_and_structure_fixes",
    "formatting and structure fixes": "formatting_and_structure_fixes",
    "formatting fixes": "formatting_and_structure_fixes",
    "structure_fixes": "formatting_and_structure_fixes",
    "before_and_after_examples": "before_and_after_examples",
    "before and after examples": "before_and_after_examples",
    "examples": "before_and_after_examples",
    "action_plan_implement_in_this_order": "action_plan_implement_in_this_order",
    "action plan implement in this order": "action_plan_implement_in_this_order",
    "action plan": "action_plan_implement_in_this_order",
    "implementation_plan": "action_plan_implement_in_this_order",
    
    # Skills Gap mappings
    "your_current_strengths": "your_current_strengths",
    "your current strengths": "your_current_strengths",
    "current_strengths": "your_current_strengths",
    "current_skills": "your_current_strengths",
    "critical_skill_gaps": "critical_skill_gaps",
    "critical skill gaps": "critical_skill_gaps",
    "skill gaps": "critical_skill_gaps",
    "gaps_identified": "critical_skill_gaps",
    "nicetohave_skills": "nicetohave_skills",
    "nice_to_have_skills": "nicetohave_skills",
    "nice to have skills": "nicetohave_skills",
    "nice-to-have skills": "nicetohave_skills",
    "optional_skills": "nicetohave_skills",
    "skill_bridge_opportunities": "skill_bridge_opportunities",
    "skill bridge opportunities": "skill_bridge_opportunities",
    "learning paths": "skill_bridge_opportunities",
    "bridge_skills": "skill_bridge_opportunities",
    "learning_plan_what_to_focus_on": "learning_plan_what_to_focus_on",
    "learning plan what to focus on": "learning_plan_what_to_focus_on",
    "learning plan": "learning_plan_what_to_focus_on",
    "learning_timeline": "learning_plan_what_to_focus_on",
    "focus_areas": "learning_plan_what_to_focus_on",
    "quick_wins": "quick_wins",
    "quick wins": "quick_wins",
    "easy_improvements": "quick_wins",
    "next_steps_to_take_today": "next_steps_to_take_today",
    "next steps to take today": "next_steps_to_take_today",
    "next steps": "next_steps_to_take_today",
    "immediate_actions": "next_steps_to_take_today",
    
    # Interview Prep mappings
    "predicted_interview_questions": "predicted_interview_questions",
    "predicted interview questions": "predicted_interview_questions",
    "interview questions": "predicted_interview_questions",
    "questions": "predicted_interview_questions",
    "likely_questions": "predicted_interview_questions",
    "technical_questions_based_on_job_requirements": "predicted_interview_questions",
    "technical_questions": "predicted_interview_questions",
    "behavioral_questions_based_on_your_resume": "predicted_interview_questions",
    "behavioral_questions": "predicted_interview_questions",
    "scenario_questions_problem_solving": "predicted_interview_questions",
    "scenario_questions": "predicted_interview_questions",
    "your_winning_talking_points": "your_winning_talking_points",
    "your winning talking points": "your_winning_talking_points",
    "talking points": "your_winning_talking_points",
    "key_talking_points": "your_winning_talking_points",
    "unique_strengths_to_highlight_that_match_their_needs": "your_winning_talking_points",
    "unique_strengths": "your_winning_talking_points",
    "questions_you_should_ask_them": "questions_you_should_ask_them",
    "questions you should ask them": "questions_you_should_ask_them",
    "questions to ask": "questions_you_should_ask_them",
    "your_questions": "questions_you_should_ask_them",
    "smart_insightful_questions_that_show_your_knowledge": "questions_you_should_ask_them",
    "smart_insightful_questions": "questions_you_should_ask_them",
    "red_flags_to_avoid": "red_flags_to_avoid",
    "red flags to avoid": "red_flags_to_avoid",
    "avoid these mistakes": "red_flags_to_avoid",
    "mistakes_to_avoid": "red_flags_to_avoid",
    "pitfalls": "red_flags_to_avoid",
    "don_t_accidentally_damage_your_candidacy": "red_flags_to_avoid",
    "dont_accidentally_damage_your_candidacy": "red_flags_to_avoid",
    "the_30_second_pitch": "the_30_second_pitch",
    "the 30 second pitch": "the_30_second_pitch",
    "30_second_pitch": "the_30_second_pitch",
    "30 second pitch": "the_30_second_pitch",
    "elevator pitch": "the_30_second_pitch",
    "your_pitch": "the_30_second_pitch",
    "specific_examples_to_prepare": "specific_examples_to_prepare",
    "specific examples to prepare": "specific_examples_to_prepare",
    "examples to prepare": "specific_examples_to_prepare",
    "practice stories": "specific_examples_to_prepare",
    "key_examples": "specific_examples_to_prepare",
    "be_ready_to_discuss_these_accomplishments_in_detail": "specific_examples_to_prepare",
    "accomplishments_to_discuss": "specific_examples_to_prepare",
    
    # Salary Negotiation mappings
    "market_salary_range_for_this_role_india": "market_salary_range_for_this_role_india",
    "market salary range for this role india": "market_salary_range_for_this_role_india",
    "market_salary_range_for_this_role": "market_salary_range_for_this_role_india",
    "market salary range for this role": "market_salary_range_for_this_role_india",
    "market salary range": "market_salary_range_for_this_role_india",
    "salary range": "market_salary_range_for_this_role_india",
    "salary_expectations": "market_salary_range_for_this_role_india",
    "why_you_deserve_a_higher_salary": "why_you_deserve_a_higher_salary",
    "why you deserve a higher salary": "why_you_deserve_a_higher_salary",
    "your value proposition": "why_you_deserve_a_higher_salary",
    "value_proposition": "why_you_deserve_a_higher_salary",
    "your_worth": "why_you_deserve_a_higher_salary",
    "unique_qualifications_that_justify_premium_compensation": "why_you_deserve_a_higher_salary",
    "unique_qualifications": "why_you_deserve_a_higher_salary",
    "your_negotiation_strategy": "your_negotiation_strategy",
    "your negotiation strategy": "your_negotiation_strategy",
    "negotiation strategy": "your_negotiation_strategy",
    "negotiation_plan": "your_negotiation_strategy",
    "strategy": "your_negotiation_strategy",
    "phrases_that_work": "phrases_that_work",
    "phrases that work": "phrases_that_work",
    "effective phrases": "phrases_that_work",
    "good_phrases": "phrases_that_work",
    "phrases_to_avoid": "phrases_to_avoid",
    "phrases to avoid": "phrases_to_avoid",
    "bad_phrases": "phrases_to_avoid",
    "avoid_saying": "phrases_to_avoid",
    "final_advice": "final_advice",
    "final advice": "final_advice",
    "closing_advice": "final_advice",
    "summary": "final_advice",
}

def normalize_field_name(field_name: str) -> str:
    """Normalize field name using mapping and fallback logic."""
    if not field_name:
        return field_name
    
    # Try direct mapping
    key = field_name.lower().strip()
    if key in FIELD_NAME_MAPPING:
        return FIELD_NAME_MAPPING[key]
    
    # Return as-is if no mapping found
    return field_name

def parse_llm_response(response: str) -> dict:
    """
    Parse LLM response and extract structured data.
    Handles both JSON and text formats with robust section detection.
    """
    if response is None:
        return {"raw_response": "No response from the analysis service."}
    if not isinstance(response, str):
        return {"raw_response": str(response)}
    response = response.strip()
    if not response:
        return {"raw_response": "No response from the analysis service."}
    
    # Try to parse as JSON first
    try:
        data = json.loads(response)
        # Normalize field names in JSON response
        return normalize_field_names_in_dict(data)
    except json.JSONDecodeError:
        pass
    
    # Try to extract JSON from markdown code blocks
    json_match = re.search(r'```(?:json)?\s*([\s\S]*?)```', response)
    if json_match:
        try:
            data = json.loads(json_match.group(1).strip())
            return normalize_field_names_in_dict(data)
        except json.JSONDecodeError:
            pass
    
    # Parse structured text format
    result = {}
    
    # Remove the separator lines (---)
    response = re.sub(r'\n\s*-{3,}\s*\n', '\n', response)
    
    # Remove content after "---" markers that indicate prompt information
    prompt_sep_match = re.search(r'\n\s*-{3,}\s*\n\*\*', response)
    if prompt_sep_match:
        response = response[:prompt_sep_match.start()]
    
    # Split by lines that look like section headers (ALL CAPS or Title Case starting at line beginning)
    # This matches: HEADER:, HEADER, **HEADER:**, ### HEADER, etc.
    lines = response.split('\n')
    
    current_section = None
    current_content = []
    
    for line in lines:
        stripped = line.strip()
        
        if not stripped:
            # Empty line - continue accumulating
            if current_content and current_content[-1] != '':
                current_content.append('')
            continue
        
        # Check if this line is a section header
        # Headers are: All caps words (at least 2), possibly with: ** ### : - 
        # But NOT lines that are obviously list items or content
        is_list_item = (stripped.startswith('-') or 
                       stripped.startswith('•') or 
                       (stripped.startswith('*') and not stripped.startswith('**')) or
                       re.match(r'^\d+\.\s', stripped) or
                       re.match(r'^\d+\)\s', stripped))
        
        if not is_list_item:
            # Check if it looks like a header: mostly capital letters, short enough
            # Count uppercase letters vs total letters
            uppercase_count = sum(1 for c in stripped if c.isupper())
            letter_count = sum(1 for c in stripped if c.isalpha())
            
            # Consider it a header if:
            # 1. Mostly uppercase (at least 40% of letters are uppercase)
            # 2. Length is reasonable (not a paragraph)
            # 3. Doesn't look like a sentence (no lowercase words > 3 chars)
            is_header = False
            
            if letter_count >= 2:  # At least some letters
                uppercase_ratio = uppercase_count / letter_count
                # Check if it's header-like: all caps or has colon or markdown markers
                # Improved detection: look for patterns like "TITLE:", "**TITLE:**", "### TITLE"
                ends_with_colon = stripped.rstrip('*').rstrip().endswith(':')
                starts_with_marker = stripped.startswith('**') or stripped.startswith('###') or stripped.startswith('##')
                
                if (uppercase_ratio >= 0.5 or  # Mostly uppercase (lowered threshold)
                    ends_with_colon or  # Has colon (even if wrapped in **)
                    (starts_with_marker and uppercase_ratio >= 0.3)):  # Has markers with some uppercase
                    is_header = True
            
            if is_header and len(stripped) < 120:  # Sanity check - headers aren't that long (increased limit)
                # Save previous section
                if current_section:
                    parsed_content = parse_section_content(current_content)
                    if parsed_content:
                        normalized_section = normalize_field_name(current_section)
                        result[normalized_section] = parsed_content
                
                # Start new section
                title = stripped
                # Clean up title: remove **, ###, and trailing colon
                title = re.sub(r'^\*+', '', title)
                title = re.sub(r'\*+$', '', title)
                title = re.sub(r'^#+', '', title)
                title = title.rstrip(':').strip()
                
                # Normalize section name more robustly
                current_section = title.lower()
                # Replace special characters with underscores
                current_section = re.sub(r'[^a-z0-9]+', '_', current_section)
                # Remove leading/trailing underscores and collapse multiple underscores
                current_section = re.sub(r'^_+|_+$', '', current_section)
                current_section = re.sub(r'_+', '_', current_section)
                current_content = []
                continue
        
        # Regular content line
        if stripped:
            current_content.append(stripped)
    
    # Don't forget the last section
    if current_section:
        parsed_content = parse_section_content(current_content)
        if parsed_content:
            normalized_section = normalize_field_name(current_section)
            result[normalized_section] = parsed_content
    
    # Fallback: return raw response if parsing failed
    if not result:
        return {"raw_response": response}
    
    return result

def normalize_field_names_in_dict(data: dict) -> dict:
    """Recursively normalize field names in a dictionary."""
    if not isinstance(data, dict):
        return data
    
    normalized = {}
    for key, value in data.items():
        normalized_key = normalize_field_name(key)
        if isinstance(value, dict):
            normalized[normalized_key] = normalize_field_names_in_dict(value)
        elif isinstance(value, list):
            normalized[normalized_key] = [
                normalize_field_names_in_dict(item) if isinstance(item, dict) else item
                for item in value
            ]
        else:
            normalized[normalized_key] = value
    
    return normalized


def parse_section_content(lines):
    """Parse the content of a section and return structured data."""
    if not lines:
        return None
    
    # Remove empty lines from start and end
    while lines and not lines[0]:
        lines.pop(0)
    while lines and not lines[-1]:
        lines.pop()
    
    if not lines:
        return None
    
    # Check if content is a list (lines starting with -, •, *, or digits.)
    list_items = []
    text_lines = []
    current_multiline_item = []
    in_list_item = False
    
    for line in lines:
        # Match list items: "- item", "• item", "* item", "1. item", etc.
        # But NOT lines starting with ** (which are markdown bold)
        if line.startswith('**') and line.endswith('**'):
            # This is a bold header, treat as text
            text_lines.append(line)
            continue
            
        list_match = re.match(r'^[-•]\s+(.+)$|^\d+\.\s+(.+)$', line)
        if list_match:
            # Save previous multiline item if any
            if current_multiline_item:
                list_items.append(' '.join(current_multiline_item))
                current_multiline_item = []
            
            item = (list_match.group(1) or list_match.group(2)).strip()
            if item:
                current_multiline_item = [item]
                in_list_item = True
        elif in_list_item and line and not line.startswith(('STEP', 'Step', 'Technical', 'Behavioral')):
            # Continuation of previous list item (indented or just next line)
            current_multiline_item.append(line)
        else:
            # Save any pending multiline item
            if current_multiline_item:
                list_items.append(' '.join(current_multiline_item))
                current_multiline_item = []
                in_list_item = False
            text_lines.append(line)
    
    # Don't forget last item
    if current_multiline_item:
        list_items.append(' '.join(current_multiline_item))
    
    # Return list if we found list items
    if list_items and len(list_items) >= 1:
        # Clean up list items - remove extra whitespace
        return [item.strip() for item in list_items if item.strip()]
    
    # Otherwise return as text, trying to extract numbers/percentages
    text = '\n'.join(text_lines).strip()
    
    if not text:
        return None
    
    # Try to extract percentage (but only if it's a simple score line)
    if len(text) < 50:  # Short text, might be a score
        percent_match = re.search(r'(\d+)%', text)
        if percent_match:
            return int(percent_match.group(1))
        
        # Try to extract a single number (for ranges, scores, etc.)
        number_match = re.search(r'^(\d+(?:,\d{3})*(?:\.\d+)?)\s*$', text)
        if number_match:
            try:
                return int(number_match.group(1).replace(',', ''))
            except ValueError:
                pass
    
    return text
