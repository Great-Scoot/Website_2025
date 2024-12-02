"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf import settings

from backend import views as portfolio_project_views
from portfolio_app     import views as portfolio_app_views

urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('auth/',  include('djoser.urls')),
    path('auth/',  include('djoser.urls.authtoken')),
    path('portfolio/', include('portfolio_app.urls'), name='portfolio'),
    path('', portfolio_app_views.index, name='index'),
]

if settings.ENV_WEBSITE_MODE == 'dev':
    urlpatterns += [
        path('__debug__/', include('debug_toolbar.urls', namespace="djdt"), name='djdt'),
    ]
else:
    handler400 = 'backend.views.handler400'
    handler403 = 'backend.views.handler403'
    handler404 = 'backend.views.handler404'
    handler500 = 'backend.views.handler500'