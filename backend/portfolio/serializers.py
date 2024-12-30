from rest_framework import serializers

from portfolio.models import SystemConfiguration, SliderItem
from portfolio.utils  import system_configuration_fields, slider_items_fields

class SystemConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemConfiguration
        fields = system_configuration_fields

class SliderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model =  SliderItem
        fields = slider_items_fields