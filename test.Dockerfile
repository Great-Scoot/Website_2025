# Simple image for testing workflow stuff, like stage_latest.sh and other scripts.
# Meant to mimic this: https://marketplace.digitalocean.com/apps/django

# Python
FROM python:3

# Install NGINX, POSTGRES, GIT, etc.
RUN apt-get update && apt-get install -y \
    nginx \
    postgresql \
    postgresql-contrib \
    certbot \
    python3-certbot-nginx \
    git \
    openssh-server

# Copy secret.env (this will need updated)
COPY secret.env /app/Website_2025/secret.env

# Configure Nginx
# COPY nginx.conf /etc/nginx/sites-available/default

# Set up working directory
WORKDIR /app

# Expose ports
EXPOSE 80 443 22 8000