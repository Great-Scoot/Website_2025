#!/bin/bash
# NGINX: Enable maintenance mode
# GUnicorn: Stop
cd /app/Website_2025
git pull origin master
cp /app/Website_2025/nginx/docker.nginx.conf /etc/nginx/conf.d/
nginx -t
source venv/bin/activate
pip install -r requirements.txt
cd portfolio_backend
python manage.py stage
python manage.py migrate
python manage.py collectstatic
# start gunicorn
# NGINX Disable maintenance mode