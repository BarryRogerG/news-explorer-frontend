@echo off
REM Windows batch script to test API key functionality
REM Usage: test-api-key.bat [with|without]

set MODE=%1
if "%MODE%"=="" set MODE=without

echo.
echo Testing API Key Functionality
echo ================================
echo.

if "%MODE%"=="without" (
    echo Testing WITHOUT API key...
    echo.
    
    if exist .env (
        move .env .env.backup >nul 2>&1
        echo Backed up .env to .env.backup
    )
    
    echo.
    echo .env file removed/renamed
    echo What to check:
    echo   1. Warning banner should appear above search form
    echo   2. Searching should show error message with instructions
    echo.
    echo Starting dev server...
    echo After testing, restore with: move .env.backup .env
    echo.
    
) else if "%MODE%"=="with" (
    echo Testing WITH API key...
    echo.
    
    if exist .env.backup (
        move .env.backup .env >nul 2>&1
        echo Restored .env from backup
    ) else if not exist .env (
        echo No .env file found. Creating template...
        echo VITE_NEWS_API_KEY=your_api_key_here > .env
        echo Created .env template - please add your actual API key
    )
    
    echo.
    echo .env file is present
    echo What to check:
    echo   1. No warning banner should appear
    echo   2. Search should work normally
    echo.
    echo Starting dev server...
    echo.
    
) else (
    echo Usage: test-api-key.bat [with^|without]
    echo.
    echo   without  - Test without API key (shows warnings/errors)
    echo   with     - Test with API key (normal functionality)
    exit /b 1
)

npm run dev

