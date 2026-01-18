# AI ATS Resume Optimization Engine

<div align="center">

**Transform Your Resume with AI-Powered Intelligence**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.128+-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat-square&logo=python)](https://python.org/)


[Features](#features) • [Quick Start](#quick-start) • [Architecture](#architecture) • [Installation](#installation) • [API Documentation](#api-documentation)

</div>

---

## Overview

The **AI ATS Resume Optimization Engine** is a cutting-edge web application that leverages artificial intelligence to help job seekers create ATS-compliant resumes and maximize their chances of landing interviews. By analyzing resumes against specific job descriptions, our platform provides actionable insights, skill gap analysis, interview preparation guidance, and negotiation strategies.

Whether you're optimizing for ATS systems, improving your resume content, preparing for interviews, or negotiating salary—we've got you covered with AI-powered analysis.

---

## Key Features

### Core Capabilities

- **ATS Compliance Review** - Analyze how well your resume passes Applicant Tracking Systems
- **Keyword Matching** - Identify matched and missing keywords from job descriptions
- **Resume Enhancement** - AI-generated suggestions to improve resume quality and relevance
- **Skill Gap Analysis** - Discover missing skills and learning priorities
- **Interview Preparation** - Get tailored interview questions and talking points
- **Salary Negotiation** - Receive data-driven salary insights and negotiation strategies
- **Multi-Format Support** - Upload PDF or DOCX files, or paste text directly

### User Experience

- **Modern Dark Theme** - Eye-friendly interface with gradient accents
- **Drag-and-Drop Upload** - Intuitive file handling
- **Real-time Analysis** - Instant AI-powered insights
- **Smooth Animations** - Polished interactions with Framer Motion
- **Copy-to-Clipboard** - Share results with one click
- **Responsive Design** - Seamless experience on desktop and mobile
- **Loading States** - Beautiful feedback during analysis

---

## Quick Start

### Prerequisites

Ensure you have the following installed:
- **Python 3.8+** - [Download](https://www.python.org/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **Git** - For cloning the repository

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ats-resume-engine.git
cd ats-resume-engine
```

#### 2. Set Up Backend (Python/FastAPI)

```bash
# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\Activate.ps1  # Windows PowerShell
# or on macOS/Linux: source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your API key (use one)
# OpenRouter (recommended): OPENROUTER_API_KEY=sk-or-v1-...
# Or direct OpenAI: OPENAI_API_KEY=sk-...

# Start backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`

#### 3. Set Up Frontend (React/Vite)

```bash
# In a new terminal
cd ats-frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

**That's it!** You're ready to start analyzing resumes.

---

## API Documentation

### Available Endpoints

#### **1. Parse Resume**
Extract text from uploaded resume files.

```http
POST /parse-resume
Content-Type: multipart/form-data

file: <PDF or DOCX file>
```

**Response:**
```json
{
  "resume_text": "John Doe\n123 Main St\n..."
}
```

---

#### **2. ATS Review**
Get detailed feedback on ATS compliance.

```http
POST /ats/review
Content-Type: application/x-www-form-urlencoded

resume_text=<resume>&job_description=<job_desc>
```

**Response:**
```json
{
  "result": {
    "ats_score": 85,
    "feedback": "Strong ATS compliance...",
    "improvements": [...]
  }
}
```

---

#### **3. Keyword Matching**
Identify matched and missing keywords.

```http
POST /ats/match
Content-Type: application/x-www-form-urlencoded

resume_text=<resume>&job_description=<job_desc>
```

**Response:**
```json
{
  "result": {
    "matched_keywords": ["Python", "FastAPI", ...],
    "missing_keywords": ["Kubernetes", ...],
    "match_percentage": 78
  }
}
```

---

#### **4. Resume Improvement**
Get AI-powered enhancement suggestions.

```http
POST /resume/improve
Content-Type: application/x-www-form-urlencoded

resume_text=<resume>&job_description=<job_desc>
```

**Response:**
```json
{
  "result": {
    "suggestions": [
      "Add quantifiable achievements...",
      "Include relevant certifications..."
    ],
    "priority_areas": [...]
  }
}
```

---

#### **5. Skills Gap Analysis**
Discover skill gaps and learning priorities.

```http
POST /career/skills-gap
Content-Type: application/x-www-form-urlencoded

resume_text=<resume>&job_description=<job_desc>
```

**Response:**
```json
{
  "result": {
    "gaps": ["Machine Learning", "DevOps"],
    "proficiency_needed": "Advanced",
    "learning_resources": [...]
  }
}
```

---

#### **6. Interview Preparation**
Get interview questions and talking points.

```http
POST /career/interview-prep
Content-Type: application/x-www-form-urlencoded

resume_text=<resume>&job_description=<job_desc>
```

**Response:**
```json
{
  "result": {
    "likely_questions": ["Tell us about your...", ...],
    "talking_points": ["Highlight experience with..."],
    "weak_areas_to_prepare": [...]
  }
}
```

---

#### **7. Salary Negotiation**
Get data-driven salary insights.

```http
POST /career/salary
Content-Type: application/x-www-form-urlencoded

resume_text=<resume>&job_description=<job_desc>&location=<optional>
```

**Response:**
```json
{
  "result": {
    "salary_range": {
      "min": 120000,
      "max": 160000,
      "average": 140000
    },
    "negotiation_tips": [...]
  }
}
```

---

## Architecture

### Project Structure

```
ats-resume-engine/
│
├── app/                             # Backend (FastAPI)
│   ├── main.py                      # FastAPI application entry point
│   ├── routes.py                    # API endpoint definitions
│   ├── config.py                    # Configuration management
│   ├── parser.py                    # Resume text parsing logic
│   ├── pdf_parser.py                # PDF extraction utilities
│   ├── llm.py                       # LLM integration (Google/OpenAI)
│   ├── services.py                  # Business logic & AI analysis
│   ├── prompts.py                   # AI prompt templates
│   └── scoring.py                   # Scoring algorithms
│
├── ats-frontend/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx                  # Root component
│   │   ├── main.jsx                 # Entry point
│   │   ├── index.css                # Global styles
│   │   ├── api/
│   │   │   └── atsApi.js            # API client
│   │   ├── components/
│   │   │   ├── InputSection.jsx     # Resume input
│   │   │   ├── PdfUpload.jsx        # File upload
│   │   │   ├── Tabs.jsx             # Tab navigation
│   │   │   ├── ResultCard.jsx       # Result display
│   │   │   ├── ResultRenderer.jsx   # Rich result rendering
│   │   │   └── Loader.jsx           # Loading animation
│   │   └── pages/
│   │       └── Dashboard.jsx        # Main dashboard
│   ├── package.json                 # Dependencies
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── vite.config.js               # Vite configuration
│   └── eslint.config.js             # Linting rules
│
├── requirements.txt                 # Python dependencies
├── pyproject.toml                   # Project metadata
├── README.md                        # This file
└── SETUP_GUIDE.md                   # Detailed setup instructions
```

### Technology Stack

**Backend:**
- **FastAPI** - High-performance Python web framework
- **Google Generative AI** / **OpenAI** - AI language models
- **PyPDF2** - PDF text extraction
- **Pydantic** - Data validation
- **python-dotenv** - Environment configuration

**Frontend:**
- **React 19** - UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

---

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Required: Choose one AI provider
OPENROUTER_API_KEY=sk-or-v1-your_key_here
# OR
OPENAI_API_KEY=sk-your_openai_key_here

# Optional (only for OpenRouter; default: openai/gpt-4o-mini)
OPENROUTER_MODEL=openai/gpt-4o-mini

# Optional
LOG_LEVEL=INFO
API_HOST=0.0.0.0
API_PORT=8000
```

### Important Notes

- **API Keys**: Set **OPENROUTER_API_KEY** ([OpenRouter](https://openrouter.ai/keys)) or **OPENAI_API_KEY** ([OpenAI](https://platform.openai.com/api-keys)). OpenRouter is preferred — one key for many models.
- **OpenRouter models**: e.g. `openai/gpt-4o-mini`, `anthropic/claude-3.5-haiku`. [Full list](https://openrouter.ai/models).

---

## Usage Guide

### Step 1: Upload Your Resume
- Click the upload area or drag-and-drop a PDF/DOCX file
- Or paste your resume text directly

### Step 2: Enter Job Description
- Copy the job posting and paste it into the job description field
- The AI will analyze your resume against this specific role

### Step 3: Select Analysis Type
Navigate through tabs to explore:
- **ATS Review** - Overall ATS compliance score
- **Keyword Match** - Specific keywords matched/missing
- **Resume Improve** - Targeted improvement suggestions
- **Skills Gap** - Technical skills analysis
- **Interview Prep** - Interview preparation guidance
- **Salary Insights** - Negotiation data

### Step 4: Review & Apply Insights
- Copy suggestions directly to your clipboard
- Update your resume with AI-recommended improvements
- Use interview questions to prepare
- Research salary ranges for negotiation

---

## Security & Privacy

- **No Data Storage**: Resumes are processed in-memory and not saved
- **Secure API Calls**: All API communications use HTTPS
- **Environment Variables**: API keys are never committed to version control
- **CORS Protected**: Backend only accepts requests from configured origins

---

## Troubleshooting

### Backend Issues

**Port Already in Use**
```bash
# Change the port
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

**Module Not Found**
```bash
# Ensure virtual environment is activated and dependencies installed
pip install -r requirements.txt
```

**API Key Errors**
- Set `OPENROUTER_API_KEY` or `OPENAI_API_KEY` in `.env` (project root)
- No trailing spaces; no quotes around the key
- OpenRouter: add credits at [openrouter.ai/credits](https://openrouter.ai/credits) if you see quota errors

### Frontend Issues

**Port Already in Use**
```bash
# Vite will suggest alternative ports
npm run dev
```

**Dependencies Not Installed**
```bash
npm install
npm audit fix
```

**CORS Errors**
- Ensure backend is running on `http://localhost:8000`
- Check CORS middleware in `app/main.py`

---

## Performance Tips

- **Smaller Files**: PDF/DOCX under 2MB process faster
- **Concise Job Descriptions**: More detailed descriptions = more accurate analysis
- **Batch Processing**: Analyze multiple job descriptions for different roles
- **Cache Results**: Save analysis results for future reference

---

## Future Enhancements

- [ ] Resume template library
- [ ] Job market analysis
- [ ] Cover letter generation
- [ ] LinkedIn profile optimization
- [ ] Multi-language support
- [ ] Resume version control & history
- [ ] Team collaboration features
- [ ] Export to multiple formats

---

## Contributing

We welcome contributions! To help improve the ATS Resume Engine:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---




---

## Acknowledgments

- Built for job seekers worldwide
- Inspired by modern resume optimization best practices
- Powered by cutting-edge AI technology
- Thanks to the open-source community

---

<div align="center">

**Made by Jitin Kumarapu**

[Back to top](#ai-ats-resume-optimization-engine)

</div>