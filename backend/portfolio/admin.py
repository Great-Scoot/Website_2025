from django.contrib import admin

from portfolio.models import SystemConfiguration, Slider, SliderItem

# Register your models here.

# Simple Models
admin.site.register(SystemConfiguration)
admin.site.register(Slider)

# Models that benefit from searching & filtering through the admin interface. 
@admin.register(SliderItem)
class SliderItemAdmin(admin.ModelAdmin):
    list_display =  ('title', 'type', 'expiration_date')
    list_filter =   ('slider', 'expiration_date', 'type', 'active')
    search_fields = ('title', 'subtitle')