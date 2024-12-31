from django.shortcuts import render

from portfolio.utils import get_system_configuration

# Create your views here.
def error_view(request, exception=None):
    status_code = getattr(exception, 'status_code', 200)
    system_configuration = get_system_configuration(request=request)

    context = {
        'page_title': 'Error',
        'status_code': status_code,
        'system_configuration': system_configuration['data'],
        'system_configuration_encoded': system_configuration['data_encoded'],
    }
    
    response = render(request, 'base.html', context)
    response.status_code = status_code
    return response