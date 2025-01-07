#!/bin/bash
cp /etc/nginx/conf.d/maintenance/maintenance.conf.on /etc/nginx/conf.d/maintenance/maintenance_on.conf
nginx -s reload
# GUnicorn: Stop
cd /app/Website_2025
git reset --hard
git clean -df
git pull origin master
cp /app/Website_2025/nginx/website_2025.conf /etc/nginx/conf.d
cp /app/Website_2025/nginx/maintenance/maintenance.conf.on /etc/nginx/conf.d/maintenance
source venv/bin/activate
pip install -r requirements.txt
cd backend
python manage.py maintenance_enable
python manage.py migrate
python manage.py collectstatic --no-input
gunicorn backend.wsgi:application --config gunicorn_config.py
rm /etc/nginx/conf.d/maintenance/maintenance_on.conf
nginx -s reload