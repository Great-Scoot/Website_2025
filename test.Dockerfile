# Simple image for testing workflow stuff, like stage_latest.sh and other bash scripts.

# NGINX (alpine includes apk)
FROM nginx:alpine

# Install Python, Node.js, and other stuff.
RUN apk update && apk add --no-cache \
    python3 \
    py3-pip \
    nodejs \
    npm \
    git \
    bash \
    openssh

# Set up working directory
WORKDIR /app

# Configure nginx
EXPOSE 80