#!/bin/bash
cd /app/Website_2025
git pull origin master
source venv/bin/activate
pip install -r requirements.txt
cd portfolio_backend
python manage.py stage
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
cd ../
deactivate
# sudo systemctl restart gunicorn
# sudo systemctl restart nginx