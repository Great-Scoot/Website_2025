from django.shortcuts import render, redirect

from api.utils import get_system_configuration

# Create your views here.
def app_view(request, page_title):
    system_config = get_system_configuration(False)

    # If maintenance_mode and not current request path, redirect.
    if system_config.get('maintenance_mode', False) and request.path != '/maintenance':
        return redirect('/maintenance')
        
    context = {
        'page_title': page_title,
        'system_configuration': system_config,
        'system_configuration_encoded': get_system_configuration(True)
    }

    return render(request, 'base.html', context)