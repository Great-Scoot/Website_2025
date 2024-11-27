import json

from django.core.serializers.json import DjangoJSONEncoder

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