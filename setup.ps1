# Realtime Coaching Feed App - PowerShell Setup Script for Windows

Write-Host "`n===================================" -ForegroundColor Cyan
Write-Host "Coaching Feed App - Windows Setup" -ForegroundColor Cyan
Write-Host "===================================`n" -ForegroundColor Cyan

# Check if Node.js is installed
$nodeVersion = node --version 2>$null
if (!$nodeVersion) {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
Write-Host "npm: $(npm --version)" -ForegroundColor Green
Write-Host ""

# Setup Backend
Write-Host "[1/4] Setting up Backend..." -ForegroundColor Yellow
Push-Location backend
if (!(Test-Path .env)) {
    Write-Host "Creating .env from .env.example..." -ForegroundColor Gray
    Copy-Item .env.example .env
}
Write-Host "Installing backend dependencies..." -ForegroundColor Gray
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install backend dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Pop-Location

Write-Host ""

# Setup Frontend
Write-Host "[2/4] Setting up Frontend..." -ForegroundColor Yellow
Push-Location frontend
if (!(Test-Path .env.local)) {
    Write-Host "Creating .env.local from .env.example..." -ForegroundColor Gray
    Copy-Item .env.example .env.local
}
Write-Host "Installing frontend dependencies..." -ForegroundColor Gray
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install frontend dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Pop-Location

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "===================================`n" -ForegroundColor Cyan

Write-Host "To start the application:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Terminal 1 - Backend:" -ForegroundColor Yellow
Write-Host "  cd backend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 - Frontend:" -ForegroundColor Yellow
Write-Host "  cd frontend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"
