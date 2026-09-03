@echo off
echo ========================================================
echo   Starting VRGC VIT Bhopal Gaming Club Website
echo ========================================================
echo.
echo Running local server on http://localhost:8080...
start http://localhost:8080/index.html
python -m http.server 8080 --directory "%~dp0"
pause
