import django_filters
from   django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics
# from rest_framework.permissions import IsAuthenticated

from portfolio.models import SliderItem
from portfolio.serializers import SystemConfigurationSerializer, SliderItemsSerializer
from portfolio.utils import get_system_configuration

# Create your views here.

# System Configuration
class SystemConfigurationView(generics.RetrieveAPIView):
    serializer_class = SystemConfigurationSerializer
    pagination_class = None

    def get_object(self):
        return get_system_configuration()['data']

# Slider Item (filter & view)
class SliderItemFilter(django_filters.FilterSet):
    slider_name = django_filters.AllValuesFilter(field_name='slider__name')
    page_name =   django_filters.AllValuesFilter(field_name='slider__page__name')

    class Meta:
        model = SliderItem
        fields = ['slider_name', 'page_name'] 

class SliderItemsView(generics.ListAPIView):
    serializer_class = SliderItemsSerializer
    filter_backends =  [DjangoFilterBackend]
    filterset_class =  SliderItemFilter
    pagination_class = None

    def get_queryset(self):
        # Using "select_related" here drastically improves the SQL performance
        return SliderItem.objects.select_related('slider', 'slider__page').filter(active=True).all()