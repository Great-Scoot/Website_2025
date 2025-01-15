#!/bin/bash

nginx-on() {
    sudo cp /etc/nginx/conf.d/maintenance/maintenance.conf.on /etc/nginx/conf.d/maintenance/maintenance_on.conf
    sudo nginx -s reload
    echo "NGINX: Maintenance mode enabled."
}

nginx-off() {
    sudo rm /etc/nginx/conf.d/maintenance/maintenance_on.conf
    sudo nginx -s reload
    echo "NGINX: Maintenance mode disabled."
}

django-on() {
    python3 /app/Website_2025/backend/manage.py maintenance_enable
    echo "Django: Maintenance mode enabled."
}

django-off() {
    python3 /app/Website_2025/backend/manage.py maintenance_disable
    echo "Django: Maintenance mode disabled."
}

# Handle flags
OPTIONS=$(getopt -o "" -l "nginx-on,nginx-off,django-on,django-off" -- "$@")
eval set -- "$OPTIONS"

while true; do
  case "$1" in
    --nginx-on)
      nginx-on
      shift
      ;;
    --nginx-off)
      nginx-off
      shift
      ;;
    --django-on)
      django-on
      shift
      ;;
    --django-off)
      django-off
      shift
      ;;
    --)
      shift;
      break
      ;;
    *)
      echo "Invalid option: $1" >&2
      exit 1
      ;;
  esac
done