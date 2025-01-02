from rest_framework import serializers

from portfolio.models import SystemConfiguration, Page, Slider, SliderItem

class SystemConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemConfiguration
        fields = ['website_version', 'maintenance_mode']

class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ['name']

class SliderSerializer(serializers.ModelSerializer):
    # Nested PageSerializer
    page = PageSerializer(read_only=True)

    class Meta:
        model = Slider
        fields = ['name', 'page']

class SliderItemsSerializer(serializers.ModelSerializer):
    # Ensure absolute path returned
    image = serializers.SerializerMethodField('get_image_url')

    # Nested SliderSerializer
    slider = SliderSerializer(read_only=True)

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

    class Meta:
        model =  SliderItem
        fields = ['title', 'subtitle', 'description', 'image', 'type', 'external_url', 'external_url_date', 'external_url_text', 'expiration_date', 'slider']