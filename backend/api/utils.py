import json

from django.core.serializers.json import DjangoJSONEncoder

from api.models import SystemConfiguration

# System Configuration
system_configuration_fields = ['website_version', 'maintenance_mode', 'staging_mode', 'staged_version']

def get_system_configuration(as_DjangoJSON=False):

    if as_DjangoJSON == False:
        return SystemConfiguration.objects.values(*system_configuration_fields).first()
    else:
        return json.dumps(
            SystemConfiguration.objects.values(*system_configuration_fields).first(), 
            cls=DjangoJSONEncoder,
        )