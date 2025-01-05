"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 5.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

import os
import environ

# Base directory (of Django project - not its parent folder)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# VARIABLES FROM ENV FILES
public_env = environ.Env()
secret_env = environ.Env()

environ.Env.read_env(os.path.join(BASE_DIR, '..', 'public.env'))
environ.Env.read_env(os.path.join(BASE_DIR, '..', 'secret.env'))

ENV_WEBSITE_VERSION = public_env('ENV_WEBSITE_VERSION', default='0.0.0').strip()
ENV_WEBSITE_MODE    = public_env('ENV_WEBSITE_MODE',    default='prod').strip() # Note: Server and IDE needs restarted in order to pickup changes in .env files

ENV_DJANGO_SECRET_KEY        = secret_env('ENV_DJANGO_SECRET_KEY',        default='django-insecure-k&k94_%5q8sx#7vwu&8*(4@%l(bb6&j27t%7cv+c-*l^77gp!i').strip()
ENV_DOCKER_IS_TEST_CONTAINER = secret_env('ENV_DOCKER_IS_TEST_CONTAINER', default=False) == True

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = ENV_DJANGO_SECRET_KEY # TODO: Update this...

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = ENV_WEBSITE_MODE == 'dev'

# Allowed Hosts
ALLOWED_HOSTS = ['scottzehner.com', 'www.scottzehner.com']

if ENV_WEBSITE_MODE == 'dev' or ENV_DOCKER_IS_TEST_CONTAINER == True:
    ALLOWED_HOSTS += ['*']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_filters',
    'rangefilter',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'djoser',
    'api',
    'portfolio',
]

if ENV_WEBSITE_MODE == 'dev':
    INSTALLED_APPS += ['debug_toolbar',]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

if ENV_WEBSITE_MODE == 'dev':
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware',]

# CORS
if ENV_WEBSITE_MODE == 'dev':
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOWED_ORIGINS = [
        "https://scottzehner.com",
        "https://www.scottzehner.com",
    ]

# URLs
ROOT_URLCONF = 'backend.urls'

# APPEND_SLASH = True

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            'templates'
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': secret_env('ENV_DB_NAME').strip(),
        'USER': secret_env('ENV_DB_USER').strip(),
        'PASSWORD': secret_env('ENV_DB_PASSWORD').strip(),
        'HOST': secret_env('ENV_DB_HOST').strip(),
        'PORT': secret_env('ENV_DB_PORT').strip(),
        'CONN_MAX_AGE': 300, # 5 minutes in seconds
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = '/static/'

# Dev only: Collect frontend/public
if ENV_WEBSITE_MODE == 'dev':
    # Where Django will collect from...
    STATICFILES_DIRS = [os.path.join(BASE_DIR, '..', 'frontend', 'public')]

# Dev or Prod: Collect Admin
# Where Django will copy to.
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# Media files (User-uploaded images, etc.)

MEDIA_URL = '/media/'

if ENV_WEBSITE_MODE == 'dev':
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST Framework
REST_FRAMEWORK = {
    'COERCE_DECIMAL_TO_STRING': False,
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.OrderingFilter',
        'rest_framework.filters.SearchFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_THROTTLE_RATES': {
        'anon': '200/hour',
        'user': '200/hour',
        'throttle_secret_api': '200/hour',
    },
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # 'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication', # TODO: Remove this before going to production?
    ],
}

DJOSER = {
    "USER_ID_FIELD": "username",
    # "LOGIN_FIELD": "email", # If login via email is desired...
}

if ENV_WEBSITE_MODE == 'dev':
    INTERNAL_IPS = [ # Related to debug_toolbar
        '127.0.0.1',
        'localhost',
    ]

    DEBUG_TOOLBAR_CONFIG = {
        'INTERCEPT_REDIRECTS': False,
        'SHOW_TOOLBAR_CALLBACK': lambda request: True,
    }

# HTTPS related stuff...
if ENV_WEBSITE_MODE == 'dev':
    CSRF_COOKIE_SECURE = False
    SESSION_COOKIE_SECURE = False
    SECURE_SSL_REDIRECT = False
    # SECURE_PROXY_SSL_HEADER = None
    # SECURE_HSTS_SECONDS = 0
    # SECURE_HSTS_INCLUDE_SUBDOMAINS = False
    # SECURE_HSTS_PRELOAD = False
else:
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True