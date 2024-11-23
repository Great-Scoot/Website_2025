# gunicorn_config.py

import os
import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# VARIABLES FROM ENV FILE
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '..', '.env'))

ENV_GUNICORN_HOST = env('ENV_GUNICORN_HOST').strip()
ENV_GUNICORN_PORT = env('ENV_GUNICORN_PORT').strip()


bind = f'{ENV_GUNICORN_HOST}:{ENV_GUNICORN_PORT}'  # Or your preferred host:port
workers = 2  # Recommended formula is 2 * number_of_cores + 1
timeout = 120
accesslog = "-"  # Log to stdout
errorlog = "-"   # Log to stdout
