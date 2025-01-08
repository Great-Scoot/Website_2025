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

# Determine which option to use for git pull
if [[ -n "$COMMIT_HASH" ]]; then
  GIT_TARGET="$COMMIT_HASH"
elif [[ -n "$BRANCH" ]]; then
  GIT_TARGET="$BRANCH"
else
  echo "Error: Please provide either --branch-name or --commit-hash" >&2
  exit 1
fi

echo "Updating..."
cd /app/Website_2025
bash /app/Website_2025/actions/status.sh
source /app/Website_2025/venv/bin/activate
bash /app/Website_2025/actions/maintenance.sh --nginx-on --django-on
pkill gunicorn
git reset --hard
git clean -df
git pull origin "$GIT_TARGET" # Use the determined target
pip install -r requirements.txt
cp /app/Website_2025/nginx/website_2025.conf /etc/nginx/conf.d
cp /app/Website_2025/nginx/maintenance/maintenance.conf.on /etc/nginx/conf.d/maintenance
nginx -s reload
python /app/Website_2025/backend/manage.py collectstatic --no-input
python /app/Website_2025/backend/manage.py migrate
python /app/Website_2025/backend/manage.py update_website_version
bash /app/Website_2025/actions/clean.sh
cd /app/Website_2025/backend
gunicorn backend.wsgi:application --config gunicorn_config.py --daemon
bash /app/Website_2025/actions/maintenance.sh --nginx-off
cd /app/Website_2025
echo "Update complete. Remember to disable Django's maintenance_mode when testing complete."