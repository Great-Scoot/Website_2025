from django.urls import path

from api import views_api

urlpatterns = [
    path('system-configuration', views_api.SystemConfigurationView.as_view(), name='api_system_configuration'),
]