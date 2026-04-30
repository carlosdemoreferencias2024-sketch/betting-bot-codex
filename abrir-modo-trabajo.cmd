@echo off
setlocal
cd /d "%~dp0"
set "NODE_EXE=C:\Users\tsacl\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if not exist "%NODE_EXE%" (
  echo No encontre Node en la ruta esperada.
  echo Ajusta la ruta en abrir-modo-trabajo.cmd
  pause
  exit /b 1
)

start "Bot Trabajo" "%NODE_EXE%" serve.js
timeout /t 2 /nobreak >nul
start "Bot Jobs Trabajo" "%NODE_EXE%" backend-jobs.js
timeout /t 2 /nobreak >nul
start "" http://localhost:5173/?workmode=1
