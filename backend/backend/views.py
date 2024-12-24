from django.shortcuts import render

from portfolio.utils import get_system_configuration

# Create your views here.
def error_view(request, exception=None):
    status_code = getattr(exception, 'status_code', 200)

    context = {
        'page_title': 'Error',
        'status_code': status_code,
        'system_configuration': get_system_configuration(False),
        'system_configuration_encoded': get_system_configuration(True)
    }
    
    response = render(request, 'base.html', context)
    response.status_code = status_code
    return response