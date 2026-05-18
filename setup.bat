@echo off
REM Realtime Coaching Feed App - Setup Script for Windows

echo.
echo ====================================
echo Coaching Feed App - Windows Setup
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

node --version
npm --version
echo.

REM Setup Backend
echo [1/4] Setting up Backend...
cd backend
if not exist .env (
    echo Creating .env from .env.example...
    copy .env.example .env
)
echo Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
cd..

echo.

REM Setup Frontend
echo [2/4] Setting up Frontend...
cd frontend
if not exist .env.local (
    echo Creating .env.local from .env.example...
    copy .env.example .env.local
)
echo Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd..

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo To start the application:
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   npm run dev
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   npm run dev
echo.
echo Then open: http://localhost:3000
echo.
pause
