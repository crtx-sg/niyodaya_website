@echo off
REM One-click start for Windows.
REM Double-click this file to launch the Niyodaya site locally.
REM Needs Node.js 18+ installed (https://nodejs.org).

setlocal
cd /d "%~dp0"

echo.
echo ==========================================
echo  Niyodaya Foundation - local dev server
echo ==========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
    echo Node.js is not installed.
    echo Please install Node 18 or newer from https://nodejs.org and try again.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Installing dependencies ^(first-time only -- takes a minute or two^)...
    call npm install
    echo.
)

echo Starting the Niyodaya site...
echo Open http://localhost:5173 in your browser.
echo Press Ctrl+C in this window to stop the server.
echo.

call npm run dev

pause
