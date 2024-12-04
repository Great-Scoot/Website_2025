from django.urls import path, re_path

from portfolio_app import views

# App Paths...
urlpatterns = [
    path('',                    views.base_view, {'page_title': 'Home'},        name='portfolio'),
    re_path(r'^portfolio/?$',   views.base_view, {'page_title': 'Home'},        name='portfolio'),
    re_path(r'^about/?$',       views.base_view, {'page_title': 'About'},       name='about'),
    re_path(r'^maintenance/?$', views.base_view, {'page_title': 'Maintenance'}, name='maintenance'),
    re_path(r'.*',              views.base_view, {'page_title': 'Not Found'},   name='not_found')
]
