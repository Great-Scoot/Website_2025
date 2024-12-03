from django.urls import include, path

from portfolio_app import views

urlpatterns = [
    path('about/',     views.about,     name='about'),
    path('portfolio/', views.portfolio, name='portfolio'),
    path('',           views.portfolio, name='portfolio'),
]