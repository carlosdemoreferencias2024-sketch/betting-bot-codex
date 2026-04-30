@echo off
setlocal
cd /d "%~dp0"
set "NODE_EXE=C:\Users\tsacl\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if not exist "%NODE_EXE%" (
  echo No encontre Node en la ruta esperada.
  echo Abre manualmente index.html o ajusta la ruta en abrir-bot.cmd
  pause
  exit /b 1
)

start "Bot de Pronosticos" "%NODE_EXE%" serve.js
timeout /t 2 /nobreak >nul
start "Bot Jobs" "%NODE_EXE%" backend-jobs.js
timeout /t 2 /nobreak >nul
start "" http://127.0.0.1:5173/
