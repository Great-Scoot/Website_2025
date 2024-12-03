from django.shortcuts import render

from api.utils import get_system_configuration

# Create your views here.
def about(request):
    return render(request, 'base.html', {'system_configuration': get_system_configuration(True)})

def portfolio(request):
    return render(request, 'base.html', {'system_configuration': get_system_configuration(True)})