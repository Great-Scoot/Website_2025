from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.models import SystemConfiguration
from api.serializers import SystemConfigurationSerializer
from api.utils import get_system_configuration

# Create your views here.
class SystemConfigurationView(generics.RetrieveAPIView):
    serializer_class = SystemConfigurationSerializer

    def get_object(self):
        return get_system_configuration()