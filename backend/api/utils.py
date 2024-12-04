import json

from django.core.serializers.json import DjangoJSONEncoder

from api.models import SystemConfiguration

# System Configuration
system_configuration_fields = ['website_version', 'maintenance_mode']

def get_system_configuration(as_DjangoJSON=False):
    config = SystemConfiguration.objects.values(*system_configuration_fields).first()

    if as_DjangoJSON :
        return json.dumps({
            'website_version':  config['website_version'],
            'maintenance_mode': config['maintenance_mode']
        }, cls=DjangoJSONEncoder)
    
    return config