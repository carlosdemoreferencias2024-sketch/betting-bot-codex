@echo off
setlocal
cd /d "%~dp0"
set "PYTHON_EXE=C:\Users\tsacl\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

if not exist "%PYTHON_EXE%" (
  echo No encontre Python en la ruta esperada.
  pause
  exit /b 1
)

start "Sports API Pro Scheduler" "%PYTHON_EXE%" -m app.worker.scheduler
