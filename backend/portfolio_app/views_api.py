from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from portfolio_app.models import SystemConfiguration
from portfolio_app.serializers import SystemConfigurationSerializer

# Create your views here.
class SystemConfigurationView(generics.RetrieveAPIView):
    serializer_class = SystemConfigurationSerializer

    def get_object(self):
        return SystemConfiguration.objects.first()