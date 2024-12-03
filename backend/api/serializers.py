from rest_framework import serializers

from api.models import SystemConfiguration
from api.utils import system_configuration_fields

class SystemConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemConfiguration
        fields = system_configuration_fields