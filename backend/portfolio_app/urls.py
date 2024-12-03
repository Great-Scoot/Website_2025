from django.urls import include, path

from portfolio_app import views
from portfolio_app import views_api

urlpatterns = [
    path('api/system-configuration', views_api.SystemConfigurationView.as_view(), name='api_system_configuration'),
    path('', views.portfolio,  name='portfolio'),
]