#!/bin/bash
# NGINX: Enable maintenance mode
# GUnicorn: Stop
cd /app/Website_2025
git pull origin master
cp /app/Website_2025/nginx/docker.nginx.conf /etc/nginx/conf.d/
nginx -t
source venv/bin/activate
pip install -r requirements.txt
cd backend
python manage.py maintenance_enable
python manage.py migrate
python manage.py collectstatic
gunicorn backend.wsgi:application --config gunicorn_config.py
# NGINX Disable maintenance mode