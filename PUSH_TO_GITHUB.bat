@echo off
setlocal
title AGRISETU - Push to GitHub
color 0A

echo ========================================================
echo   🌾 AGRISETU - Automated GitHub Repository Push Tool
echo ========================================================
echo.

set GIT_CMD="C:\Users\lokit\AppData\Local\Programs\Git\cmd\git.exe"

if not exist %GIT_CMD% (
    set GIT_CMD=git
)

cd /d "C:\Users\lokit\OneDrive\Desktop\AGRI"

echo Step 1: Checking local Git repository...
%GIT_CMD% status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Initializing repository...
    %GIT_CMD% init
    %GIT_CMD% branch -M main
    %GIT_CMD% add .
    %GIT_CMD% commit -m "feat: complete AGRISETU SIH prototype"
) else (
    echo Local repository is ready.
)

echo.
echo ========================================================
echo Please paste your GitHub repository URL below.
echo Example: https://github.com/YOUR_USERNAME/agrisetu.git
echo ========================================================
echo.
set /p REPO_URL="Enter GitHub Repository URL: "

if "%REPO_URL%"=="" (
    echo [ERROR] No URL entered. Aborting.
    pause
    exit /b 1
)

echo.
echo Setting remote origin to %REPO_URL%...
%GIT_CMD% remote remove origin >nul 2>&1
%GIT_CMD% remote add origin %REPO_URL%
%GIT_CMD% branch -M main

echo.
echo Pushing code to GitHub (main branch)...
%GIT_CMD% push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! Your project has been uploaded to GitHub!
    echo   GitHub Link: %REPO_URL%
    echo ========================================================
) else (
    echo.
    echo [INFO] If GitHub prompted for credentials, please sign in via browser or Personal Access Token.
)

echo.
pause
