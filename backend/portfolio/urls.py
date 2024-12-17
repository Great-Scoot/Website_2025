from django.urls import path, re_path

from portfolio import views

# App Paths...
urlpatterns = [
    path('',                    views.app_view, {'page_title': 'Home'},        name='portfolio'),
    re_path(r'^portfolio/?$',   views.app_view, {'page_title': 'Home'},        name='portfolio'),
    re_path(r'^about/?$',       views.app_view, {'page_title': 'About'},       name='about'),
    # Error view in backend/views.py
    re_path(r'^maintenance/?$', views.app_view, {'page_title': 'Maintenance'}, name='maintenance'),
    re_path(r'.*',              views.app_view, {'page_title': 'Not Found'},   name='not_found')
]
