# Simple image for testing workflow stuff, like stage_latest.sh and other scripts.
# Meant to mimic this: https://marketplace.digitalocean.com/apps/django

# NGINX
FROM nginx

# Set up working directory
WORKDIR /app

# Install PYTHON, POSTGRES, GIT, etc.
RUN apt-get update && apt-get install -y \
    python3 \
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

# Expose ports
EXPOSE 80 443 8000

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]