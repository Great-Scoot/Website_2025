from django.urls import path, re_path

from portfolio_app import views

# App Paths...
urlpatterns = [
    path('',             views.portfolio,   name='portfolio'),
    path('portfolio/',   views.portfolio,   name='portfolio'),
    path('about/',       views.about,       name='about'),
    path('maintenance/', views.maintenance, name='maintenance'),
]