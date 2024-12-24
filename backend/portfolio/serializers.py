from rest_framework import serializers

from portfolio.models import SystemConfiguration
from portfolio.utils import system_configuration_fields

class SystemConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemConfiguration
        fields = system_configuration_fields