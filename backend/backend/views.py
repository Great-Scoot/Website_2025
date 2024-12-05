from django.shortcuts import render

from api.utils import get_system_configuration

# Create your views here.
def error_view(request, exception=None):
    error_code = getattr(exception, 'status_code', 500)

    context = {
        'error_code': error_code,
        'page_title': 'Error',
        'system_configuration': get_system_configuration(False),
        'system_configuration_encoded': get_system_configuration(True)
    }
    
    response = render(request, 'base.html', context)
    response.status_code = error_code
    return response