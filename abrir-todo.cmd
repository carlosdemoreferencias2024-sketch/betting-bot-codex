@echo off
setlocal
cd /d "%~dp0"

start "Sports API Pro" "C:\Users\tsacl\Documents\Codex\2026-04-20-puedes-hacer-un-bot-de-pronosticos\sports_api_pro\abrir-api-pro.cmd"
timeout /t 3 /nobreak >nul
start "Bot Principal" "C:\Users\tsacl\Documents\Codex\2026-04-20-puedes-hacer-un-bot-de-pronosticos\abrir-bot.cmd"
