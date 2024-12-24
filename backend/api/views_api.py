from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from portfolio.models import SystemConfiguration
from portfolio.serializers import SystemConfigurationSerializer
from portfolio.utils import get_system_configuration

# Create your views here.
class SystemConfigurationView(generics.RetrieveAPIView):
    serializer_class = SystemConfigurationSerializer

    def get_object(self):
        return get_system_configuration()