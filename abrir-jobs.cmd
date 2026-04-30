@echo off
setlocal
cd /d "%~dp0"
set "NODE_EXE=C:\Users\tsacl\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if not exist "%NODE_EXE%" (
  echo No encontre Node en la ruta esperada.
  pause
  exit /b 1
)

start "Bot Jobs" "%NODE_EXE%" backend-jobs.js
