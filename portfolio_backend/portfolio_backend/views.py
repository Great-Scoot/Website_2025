from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.shortcuts import render

import json

from portfolio_app.models import SystemConfiguration

# System Configuration
def get_system_config():
    return json.dumps(
    SystemConfiguration.objects.values(
        'website_version',
        'maintenance_mode',
        'staging_mode',
        'staged_version',
    ).first(), 
    cls=DjangoJSONEncoder,
)

# Create your views here.
def index(request):
    return render(request, 'index.html', {'page_title': 'Home', 'system_config': get_system_config()})

def handler400(request, exception):
    return HttpResponse('Custom 400 message...')

def handler403(request, exception):
    return HttpResponse('Custom 403 message...')

def handler404(request, exception):
    return HttpResponse('Custom 404 message...')

def handler500(request):
    return HttpResponse('Custom 500 message...')