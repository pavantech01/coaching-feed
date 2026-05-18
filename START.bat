@echo off
REM Realtime Coaching Feed App - Start Script for Windows
REM This script starts both backend and frontend services

echo.
echo ====================================
echo Coaching Feed App - Starting Services
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed
    pause
    exit /b 1
)

echo [Backend] Starting on http://localhost:3001
echo [Frontend] Starting on http://localhost:3000
echo.
echo NOTE: Open two separate terminals/PowerShells to run these commands:
echo.
echo Terminal 1:
echo   cd backend ^&^& npm run dev
echo.
echo Terminal 2:
echo   cd frontend ^&^& npm run dev
echo.
pause
