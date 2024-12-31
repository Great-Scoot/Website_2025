from django.shortcuts import render, redirect

from portfolio.utils import get_system_configuration, get_slider_items_by_page_name

# Create your views here.
def app_view(request, page_name, page_title):
    system_configuration = get_system_configuration(request=request)

    # If maintenance_mode and not current request path, redirect.
    if system_configuration.get('maintenance_mode', False) and request.path != '/maintenance':
        return redirect('/maintenance')
        
    context = {
        'page_title': page_title,
        'status_code': 200,
        'system_configuration': system_configuration['data'],
        'system_configuration_encoded': system_configuration['data_encoded'],
        'slider_items_by_page_name_encoded': get_slider_items_by_page_name(request=request, page_name=page_name)['data_encoded'],
    }

    return render(request, 'base.html', context)