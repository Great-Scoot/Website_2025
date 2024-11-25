#!/bin/bash
cd /var/www/website
git pull origin main
npm install --omit=dev
npm run webpack:prod
source venv/bin/activate
pip install -r requirements.txt
cd portfolio_backend
python manage.py stage
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
sudo systemctl restart gunicorn
sudo systemctl restart nginx