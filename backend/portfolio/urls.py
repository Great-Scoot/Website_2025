from django.urls import path, re_path

from portfolio import views

# App Paths...
urlpatterns = [
    path('',                    views.app_view, {'page_name': 'portfolio',   'page_title': 'Home'},        name='portfolio'),
    re_path(r'^portfolio/?$',   views.app_view, {'page_name': 'portfolio',   'page_title': 'Home'},        name='portfolio'),
    re_path(r'^about/?$',       views.app_view, {'page_name': 'about',       'page_title': 'About'},       name='about'),
    re_path(r'^maintenance/?$', views.app_view, {'page_name': 'maintenance', 'page_title': 'Maintenance'}, name='maintenance'),
    re_path(r'.*',              views.app_view, {'page_name': 'notFound',    'page_title': 'Not Found'},   name='not_found')
]
