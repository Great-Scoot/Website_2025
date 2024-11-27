import multiprocessing
import os
import environ

# Base directory (of Django project - not its parent folder)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# VARIABLES FROM ENV FILE
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '..', 'secret.env'))

ENV_GUNICORN_HOST = env('ENV_GUNICORN_HOST').strip()
ENV_GUNICORN_PORT = env('ENV_GUNICORN_PORT').strip()

bind = f'{ENV_GUNICORN_HOST}:{ENV_GUNICORN_PORT}' # Nginx will proxy to this address

# Worker configuration - adjust based on your server's CPU
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = 'gthread'
threads = 2

timeout = 120
keepalive = 5

# Logging - make sure these directories exist and are writable
accesslog = "/var/log/gunicorn/access.log"
errorlog = "/var/log/gunicorn/error.log"
loglevel = "info"