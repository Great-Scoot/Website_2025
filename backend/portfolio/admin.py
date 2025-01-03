from django.contrib import admin

from rangefilter.filters import (
    DateRangeFilterBuilder,
    DateTimeRangeFilterBuilder,
    DateRangeQuickSelectListFilterBuilder,
    NumericRangeFilterBuilder,
)

from portfolio.models import SystemConfiguration, Page, Slider, SliderItem

# Register your models here.

# Simple Models
admin.site.register(SystemConfiguration)
admin.site.register(Page)
admin.site.register(Slider)

# Models that benefit from added searching, filtering, and whatnot.

@admin.register(SliderItem)
class SliderItemAdmin(admin.ModelAdmin):
    list_display =  ('title', 'type', 'slider', 'expiration_date', 'order')
    list_filter =   (
        'slider', 
        ('expiration_date', DateRangeFilterBuilder()), 
        'type', 
        'active'
    )
    search_fields = ('title', 'subtitle')