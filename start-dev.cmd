@echo off
cd /d "C:\Users\iss59\Desktop\antigravity\990store"
set DEV_FAKE_PAID=1
node node_modules\wrangler\bin\wrangler.js pages dev dist --port 8788 --ip 127.0.0.1 > dev-server.log 2>&1