import json

from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import F

from portfolio.models import SystemConfiguration, SliderItem

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

# Slider Items
slider_items_fields = ['title', 'subtitle', 'image', 'type', 'external_url', 'external_url_date', 'slider_id']

def get_slider_items_by_page_id(as_DjangoJSON=False, page_id=False):
    if not page_id:
        return []
    
    slider_items = SliderItem.objects.filter(slider__page__page_id=page_id).values(*slider_items_fields, slider_id_str=F('slider__slider_id'))

    if as_DjangoJSON:
        return json.dumps(list(slider_items), cls=DjangoJSONEncoder)
    
    return slider_items