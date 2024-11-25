from django.shortcuts import render

from portfolio_backend.views import get_system_config

# Create your views here.
def home(request):
    return render(request, 'index.html', {'page_title': 'Home', 'system_config': get_system_config()})

def test(request):
    return render(request, 'test.html', {'page_title': 'Test', 'system_config': get_system_config()})