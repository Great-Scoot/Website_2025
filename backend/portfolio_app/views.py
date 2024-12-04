from django.shortcuts import render

from api.utils import get_system_configuration

# Create your views here.
def base_view(request, page_title):
    context = {
        'page_title': page_title,
        'system_configuration':         get_system_configuration(False),
        'system_configuration_encoded': get_system_configuration(True)
    }

    return render(request, 'base.html', context)