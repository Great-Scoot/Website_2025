from django.shortcuts import render

from portfolio_app.system_config import get_system_config

# Create your views here.
def index(request):
    return render(request, 'base.html', {'page_title': 'Home', 'system_config': get_system_config()})