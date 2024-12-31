import json

from django.core.serializers.json import DjangoJSONEncoder

from portfolio.models import SystemConfiguration, SliderItem
from portfolio.serializers import SystemConfigurationSerializer, SliderItemsSerializer

# System Configuration
def get_system_configuration(request=None):
    # Fallback
    fallback_system_configuration = {
        'website_version': '0.0.0',
        'maintenance_mode': False
    }
    
    # Get first object only
    system_configuration = SystemConfiguration.objects.first()

    # If system configuration not added yet, use fallback.
    if system_configuration is None:
        system_configuration = fallback_system_configuration

    # Use same data structure as API
    serializer = SystemConfigurationSerializer(system_configuration, many=False, context={'request': request})
    
    # Return serialized data (for Django Template Language use) and json encoded data (for passing to client-side JavaScript)
    return {
        'data': serializer.data,
        'data_encoded': json.dumps(serializer.data, cls=DjangoJSONEncoder)
    }

# Slider Items
def get_slider_items_by_page_name(request=None, page_name=None):
    if not page_name:
        return []
    
    # Filter by page_name
    # Using "select_related" here drastically improves the SQL performance
    slider_items = SliderItem.objects.select_related('slider', 'slider__page').filter(active=True).filter(slider__page__name=page_name)

    # Use same data structure as API
    serializer = SliderItemsSerializer(slider_items, many=True, context={'request': request})

    # Return serialized data (for Django Template Language use) and json encoded data (for passing to client-side JavaScript)
    return {
        'data': serializer.data,
        'data_encoded': json.dumps(serializer.data, cls=DjangoJSONEncoder)
    }