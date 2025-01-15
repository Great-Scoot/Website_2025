#!/bin/bash

# Set default values
BRANCH="master"
COMMIT_HASH=""

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --branch-name)
      BRANCH="$2"
      shift 2
      ;;
    --commit-hash)
      COMMIT_HASH="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
done

echo "Updating..."
cd /app/Website_2025
sudo bash /app/Website_2025/actions/status.sh
. /app/Website_2025/venv/bin/activate
bash /app/Website_2025/actions/maintenance.sh --nginx-on --django-on
sudo pkill gunicorn

# Checkout specific commit or branch (default master)
if [[ -n "$COMMIT_HASH" ]]; then
    echo "Checking out commit: $COMMIT_HASH"
    echo "Warning: This will put you in a detached HEAD state."
    git reset --hard
    git clean -df
    git checkout "$COMMIT_HASH"
elif [[ -n "$BRANCH" ]]; then
    echo "Checking out branch: $BRANCH"
    git reset --hard
    git clean -df
    git checkout "$BRANCH"
    git pull
else
  echo "Error: Please provide either --branch-name or --commit-hash" >&2
  exit 1
fi

pip install -r requirements.txt
sudo cp /app/Website_2025/nginx/website_2025.conf /etc/nginx/conf.d
sudo cp /app/Website_2025/nginx/maintenance/maintenance.conf.on /etc/nginx/conf.d/maintenance
sudo nginx -s reload
python3 /app/Website_2025/backend/manage.py collectstatic --no-input
python3 /app/Website_2025/backend/manage.py migrate
python3 /app/Website_2025/backend/manage.py update_website_version
sudo bash /app/Website_2025/actions/clean.sh
cd /app/Website_2025/backend
gunicorn backend.wsgi:application --config /app/Website_2025/backend/gunicorn_config.py --daemon
bash /app/Website_2025/actions/maintenance.sh --nginx-off
cd /app/Website_2025
echo "Update complete. Remember to disable Django's maintenance_mode when testing complete."