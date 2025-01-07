#!/bin/bash
cd /app/Website_2025
source venv/bin/activate
cd /app/Website_2025/backend
python manage.py maintenance_enable
cp /etc/nginx/conf.d/maintenance/maintenance.conf.on /etc/nginx/conf.d/maintenance/maintenance_on.conf
nginx -s reload
pkill gunicorn
cd /app/Website_2025
git reset --hard
git clean -df
git pull origin master
pip install -r requirements.txt
cp /app/Website_2025/nginx/website_2025.conf /etc/nginx/conf.d
cp /app/Website_2025/nginx/maintenance/maintenance.conf.on /etc/nginx/conf.d/maintenance
nginx -s reload
cd /app/Website_2025/backend
python manage.py collectstatic --no-input
python manage.py migrate
python manage.py update_website_version
gunicorn backend.wsgi:application --config gunicorn_config.py
rm /etc/nginx/conf.d/maintenance/maintenance_on.conf
nginx -s reload
python manage.py maintenance_disable