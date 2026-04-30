@echo off
setlocal
cd /d "%~dp0"
set "PYTHON_EXE=C:\Users\tsacl\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

if not exist "%PYTHON_EXE%" (
  echo No encontre Python en la ruta esperada.
  pause
  exit /b 1
)

start "Sports API Pro" "%PYTHON_EXE%" -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
timeout /t 2 /nobreak >nul
start "Sports API Pro Scheduler" "%PYTHON_EXE%" -m app.worker.scheduler
timeout /t 2 /nobreak >nul
start "" http://127.0.0.1:8000/docs
