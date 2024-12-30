from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from portfolio.models import SystemConfiguration, SliderItem
from portfolio.serializers import SystemConfigurationSerializer, SliderItemsSerializer
from portfolio.utils import get_system_configuration, get_slider_items_by_page_id

# Create your views here.
class SystemConfigurationView(generics.RetrieveAPIView):
    serializer_class = SystemConfigurationSerializer

    def get_object(self):
        return get_system_configuration()
    
class SliderItemsView(generics.ListAPIView):
    serializer_class = SliderItemsSerializer
    pagination_class = None

    def get_queryset(self):
        return get_slider_items_by_page_id(False, page_id='portfolio')