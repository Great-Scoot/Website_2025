from django.shortcuts import render, redirect

from portfolio.utils import get_system_configuration, get_slider_items_by_page_id

# Create your views here.
def app_view(request, page_id, page_title):
    system_config = get_system_configuration(False)

    # If maintenance_mode and not current request path, redirect.
    if system_config.get('maintenance_mode', False) and request.path != '/maintenance':
        return redirect('/maintenance')
        
    context = {
        'page_title': page_title,
        'system_configuration': system_config,
        'system_configuration_encoded': get_system_configuration(True),
        'slider_items_by_page_id_encoded': get_slider_items_by_page_id(True, page_id),
    }

    return render(request, 'base.html', context)