from django.urls import include, path

from portfolio_app import views

urlpatterns = [
    path('', views.index,  name='index'),
]