#!/bin/bash
# Remove assets not needed in production
sudo rm -rf /app/temp
sudo rm -rf /app/Website_2025/backend/static/debug_toolbar
sudo rm -rf /app/Website_2025/backend/static/images
sudo rm -rf /app/Website_2025/backend/static/scripts
sudo rm -rf /app/Website_2025/backend/static/styles
sudo rm -f /app/Website_2025/backend/static/error.html
sudo rm -f /app/Website_2025/backend/static/index.html
sudo rm -f /app/Website_2025/backend/static/maintenance.html
sudo rm -rf /app/Website_2025/frontend/source
sudo rm -f /app/Website_2025/frontend/public/index.html
sudo rm -rf /app/Website_2025/nginx
sudo rm -f /app/Website_2025/notes.txt
sudo rm -f /app/Website_2025/todo.txt
sudo rm -f /app/Website_2025/package-lock.json
sudo rm -f /app/Website_2025/package.json
sudo rm -f /app/Website_2025/README.md
sudo rm -f /app/Website_2025/test.Dockerfile
sudo rm -f /app/Website_2025/webpack.config.js