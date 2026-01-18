# AI ATS Resume Engine - Complete Setup Guide

## Overview

Your ATS Resume Engine is a **fully functional** web application that helps job seekers optimize their resumes using AI-powered analysis. The application analyzes resumes against job descriptions and provides actionable insights.

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- pip (Python package manager)
- npm (Node package manager)

### Running the Application

**Terminal 1 - Backend Server:**
```bash
cd "c:\everything python\ATS"
.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend Server:**
```bash
cd "c:\everything python\ATS\ats-frontend"
npm run dev
```

Then open your browser to:
```
http://localhost:5173
```

### API key (.env)
Create a `.env` in the project root with one of:
- **OpenRouter**: `OPENROUTER_API_KEY=sk-or-v1-...` — [Get key](https://openrouter.ai/keys). Optional: `OPENROUTER_MODEL=openai/gpt-4o-mini` or e.g. `anthropic/claude-3.5-haiku`.
- **OpenAI**: `OPENAI_API_KEY=sk-...` — [Get key](https://platform.openai.com/api-keys).

---

## 📋 Features Implemented

### Backend (FastAPI)
All 7 core endpoints are implemented and accessible:

1. **POST /parse-resume**
   - Upload PDF or DOCX resume files
   - Extracts text content for analysis
   - Returns: `{ "resume_text": "..." }`

2. **POST /ats/review**
   - Analyzes resume against job description
   - Provides ATS compliance feedback
   - Parameters: `resume_text`, `job_description`

3. **POST /ats/match**
   - Keyword matching analysis
   - Shows matched and missing keywords
   - Parameters: `resume_text`, `job_description`

4. **POST /resume/improve**
   - AI-powered suggestions to enhance resume
   - Specific recommendations
   - Parameters: `resume_text`, `job_description`

5. **POST /career/skills-gap**
   - Identifies skill gaps between resume and job
   - Suggests learning priorities
   - Parameters: `resume_text`, `job_description`

6. **POST /career/interview-prep**
   - Interview preparation guidance
   - Likely questions and talking points
   - Parameters: `resume_text`, `job_description`

7. **POST /career/salary**
   - Salary negotiation insights
   - Location-aware salary ranges (optional)
   - Parameters: `resume_text`, `job_description`, `location` (optional)

### Frontend (React + Framer Motion)
Modern, polished UI with:

- **Upload Section**: Drag-and-drop PDF/DOCX upload
- **Multi-Tab Interface**: Smooth navigation between analysis types
- **Real-time Results**: Beautiful result cards with score visualization
- **Copy-to-Clipboard**: Easy sharing of analysis results
- **Loading States**: Animated loaders during analysis
- **Dark Theme**: Modern, eye-friendly dark mode with gradient accents
- **Responsive Design**: Works on mobile and desktop

---

## 🎨 UI/UX Features

### Design Inspiration
- Inspired by resume-now.com's clean, modern interface
- Dark theme with blue/purple gradient accents
- Glassmorphism effects for premium feel
- Smooth Framer Motion animations
- Tailwind CSS for responsive design

### User Journey
1. **Upload**: User uploads resume (PDF/DOCX) or pastes resume text
2. **Input**: Provide job description
3. **Select**: Choose analysis type from 6 available tools
4. **Analyze**: AI processes and generates insights
5. **View**: Beautiful, formatted results with actionable feedback
6. **Share**: Copy or download results

---

## 🔗 API Connection

### Frontend-Backend Communication
- **Base URL**: `http://localhost:8000`
- **CORS**: Enabled on backend for all origins
- **Content-Type**: `multipart/form-data` for file uploads, `application/x-www-form-urlencoded` for text

### API Service (`src/api/atsApi.js`)
All API functions are centralized:
- `parseResume(file)` - PDF/DOCX upload
- `atsReview(resumeText, jobDescription)` - ATS review
- `atsMatch(resumeText, jobDescription)` - Keyword matching
- `resumeImprove(resumeText, jobDescription)` - Resume improvements
- `skillsGap(resumeText, jobDescription)` - Skills analysis
- `interviewPrep(resumeText, jobDescription)` - Interview prep
- `salaryNegotiation(resumeText, jobDescription, location)` - Salary insights

---

## 📁 Project Structure

```
ATS/
├── app/                          # Backend (FastAPI)
│   ├── main.py                   # FastAPI app with CORS
│   ├── routes.py                 # All 7 endpoints
│   ├── llm.py                    # LLM integration
│   ├── pdf_parser.py             # PDF/DOCX extraction
│   ├── prompts.py                # AI prompts
│   ├── scoring.py                # Score calculation
│   ├── services.py               # Analysis services
│   └── config.py                 # Configuration
│
├── ats-frontend/                 # Frontend (React)
│   ├── src/
│   │   ├── main.jsx              # React entry
│   │   ├── App.jsx               # Main app
│   │   ├── index.css             # Tailwind + custom styles
│   │   ├── api/
│   │   │   └── atsApi.js         # API service
│   │   ├── components/
│   │   │   ├── Dashboard.jsx     # Main dashboard
│   │   │   ├── ResultCard.jsx    # Result display
│   │   │   ├── Loader.jsx        # Loading animation
│   │   │   ├── InputSection.jsx  # Input forms
│   │   │   ├── PdfUpload.jsx     # File upload
│   │   │   ├── ResultRenderer.jsx # Legacy
│   │   │   └── Tabs.jsx          # Tab navigation
│   │   └── pages/
│   │       └── Dashboard.jsx     # Main page
│   ├── package.json              # Dependencies
│   ├── tailwind.config.js        # Tailwind config
│   ├── vite.config.js            # Vite config
│   └── index.html                # HTML entry
│
└── requirements.txt              # Python dependencies
```

---

## 🛠 Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Python** - Core language
- **LLM Integration** - AI-powered analysis
- **CORS Middleware** - Cross-origin support

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

---

## 🎯 Customization Guide

### Changing API Base URL
Edit `src/api/atsApi.js`:
```javascript
const BASE_URL = "http://localhost:8000";  // Change this
```

### Styling Customization
- Global styles: `src/index.css`
- Tailwind config: `ats-frontend/tailwind.config.js`
- Component styles: Inline with Tailwind classes

### Adding New Analysis Types
1. Add endpoint to `app/routes.py`
2. Add API function to `src/api/atsApi.js`
3. Add tool definition to `Dashboard.jsx` `analysisTools` array
4. Results automatically display in `ResultCard.jsx`

---

## 📊 Result Display

Results are intelligently formatted:
- **Scores**: Circular progress visualization
- **Keywords**: Colored badges
- **Lists**: Formatted with icons
- **Text**: Syntax-highlighted with line breaks
- **Objects**: Table-like display

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd ats-frontend
npm run build
# Deploy `dist/` folder
```

### Backend (Heroku/Railway)
```bash
# Ensure requirements.txt has all dependencies
pip freeze > requirements.txt
# Deploy with Procfile or docker
```

---

## 🐛 Troubleshooting

### Frontend shows white/blank page
- Ensure backend is running on port 8000
- Check console for CORS errors (F12)
- Restart frontend: `npm run dev`

### API connection fails
- Verify backend is running: `http://localhost:8000/docs`
- Check CORS is enabled in `app/main.py`
- Ensure both are on same network

### File upload not working
- Use valid PDF or DOCX files
- Check file size (< 10MB recommended)
- Verify `pdf_parser.py` dependencies are installed

### Styling issues
- Restart frontend server
- Clear browser cache (Ctrl+Shift+Del)
- Ensure Tailwind classes are valid

---

## 📞 Support

All systems are operational and tested. The application is ready for production use with proper scaling and deployment infrastructure.

**Status**: ✅ Fully Functional
- Backend: FastAPI with 7 endpoints
- Frontend: Modern React UI with animations
- Connection: CORS-enabled, tested
- Styling: Dark theme, responsive, modern

---

## 🎓 Next Steps

1. Test with real resumes and job descriptions
2. Customize prompts in `app/prompts.py` for your use case
3. Add user authentication if needed
4. Deploy to cloud platform of choice
5. Monitor API usage and optimize

Enjoy your AI-powered resume optimization tool! 🚀
