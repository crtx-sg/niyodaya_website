@echo off
REM -------------------------------------------------------
REM Niyodaya - start the built site in the background (Windows)
REM Default port 3000.  Logs  ->  niyodaya.log
REM -------------------------------------------------------

setlocal
cd /d "%~dp0\.."

set "PORT=%1"
if "%PORT%"=="" set "PORT=3000"

where node >nul 2>nul
if errorlevel 1 (
    echo Node.js is not installed. Get it from https://nodejs.org
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install --no-audit --no-fund
)

if not exist "build" (
    echo Building...
    call npm run build
)

echo.
echo Starting Niyodaya on port %PORT% in background...
start "Niyodaya" /B cmd /c "set PORT=%PORT% && set HOST=0.0.0.0 && node build\index.js >> niyodaya.log 2>&1"

echo.
echo Running.
echo   URL:  http://localhost:%PORT%
echo   Logs: type niyodaya.log   (or tail with a tool like  powershell Get-Content niyodaya.log -Wait)
echo   Stop: taskkill /F /IM node.exe   (stops ALL node processes)
echo.

endlocal
