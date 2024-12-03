from rest_framework import serializers

from portfolio_app.models import SystemConfiguration
from portfolio_app.utils import system_configuration_fields

class SystemConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemConfiguration
        fields = system_configuration_fields