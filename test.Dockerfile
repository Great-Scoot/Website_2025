# Image for simulating eventual production server.
# Mimics this: https://marketplace.digitalocean.com/apps/django (kind-of)

# NGINX
FROM nginx

# Set up working directory
WORKDIR /app

# Install GIT, POSTGRES, PYTHON, etc.
# Notes:
    # - Prod server should also use ufw. Do not use within Docker container.
RUN apt-get update && apt-get install -y \
    sudo \
    bash \
    openssh-server \
    net-tools \
    git \
    postgresql \
    postgresql-contrib \
    python3 \
    python3.11-venv \
    python3-pip \
    certbot \
    python3-certbot-nginx

# Copy secret.env (this will need updated)
COPY secret.env /app/temp/secret.env

# Configure Nginx
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.backup
COPY nginx/website_2025.conf /etc/nginx/conf.d
RUN mkdir /etc/nginx/conf.d/maintenance
COPY nginx/maintenance/maintenance.conf.on /etc/nginx/conf.d/maintenance

# Make log directory for GUnicorn
RUN mkdir /var/log/gunicorn

# Expose ports
EXPOSE 80 443

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]

# Next steps: 
    # Move secret.env, delete temp directory
    # Setup SSH, clone repo
    # Install stuff (pip)
    # Create database
    # createsuperuser, collectstatic, migrate
    # Configure NGINX
    # Configure GUnicorn
    # ...