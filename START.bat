@echo off
REM AI ATS Resume Engine - Quick Start Script
REM This script starts both backend and frontend servers

echo.
echo ============================================
echo AI ATS Resume Engine - Quick Start
echo ============================================
echo.

REM Check if Node is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install from https://nodejs.org
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Python is not installed or not in PATH
    echo Please install from https://python.org
    pause
    exit /b 1
)

echo Starting AI ATS Resume Engine...
echo.

REM Start backend in new window
echo Starting Backend (FastAPI on port 8000)...
start "ATS Backend" cmd /k "cd /d %~dp0 && .venv\Scripts\Activate.ps1 && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

REM Wait a moment for backend to start
timeout /t 3 /nobreak

REM Start frontend in new window
echo Starting Frontend (Vite on port 5173)...
start "ATS Frontend" cmd /k "cd /d %~dp0ats-frontend && npm run dev"

REM Wait for servers to start
timeout /t 3 /nobreak

echo.
echo ============================================
echo Servers are starting...
echo.
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:8000
echo Backend Docs: http://localhost:8000/docs
echo.
echo Close the command windows to stop the servers
echo ============================================
echo.

REM Open browser
echo Opening browser...
start http://localhost:5173

pause
