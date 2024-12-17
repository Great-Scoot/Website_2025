import json

from django.core.serializers.json import DjangoJSONEncoder

from api.models import SystemConfiguration

# System Configuration
system_configuration_fields = ['website_version', 'maintenance_mode']

def get_system_configuration(as_DjangoJSON=False):
    default_config = {
        'website_version': '0.0.0',
        'maintenance_mode': False
    }
    
    config = SystemConfiguration.objects.values(*system_configuration_fields).first()

    if config is None:
        config = default_config
    
    if as_DjangoJSON:
        return json.dumps(config, cls=DjangoJSONEncoder)
    
    return config