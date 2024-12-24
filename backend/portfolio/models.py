from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.
class SystemConfiguration(models.Model):
    website_version =      models.CharField(max_length=50, default='0.0.0')
    last_website_version = models.CharField(max_length=50, default='0.0.0')
    maintenance_mode =     models.BooleanField(default=False)
    last_updated =         models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'System Configuration'
        verbose_name_plural = 'System Configuration'

    def __str__(self):
        return f'version: {self.website_version}'
    
    def save(self, *args, **kwargs):
        if SystemConfiguration.objects.exists() and not self.pk:
            raise ValidationError('There can only be one SystemConfiguration instance.')
        return super().save(*args, **kwargs)
    
    def delete(self, *args, **kwargs):
        raise ValidationError('SystemConfiguration cannot be deleted.')

class Slider(models.Model):
    slider_id = models.CharField(max_length=100)

    def __str__(self):
        return self.slider_id
    
    class Meta:
        verbose_name = "Slider"
        verbose_name_plural = "Sliders"

class SliderItem(models.Model):
    title =             models.CharField(max_length=200)
    subtitle =          models.CharField(max_length=200, blank=True, null=True)
    image =             models.ImageField(upload_to='sliders/images/')
    type =              models.CharField(max_length=5, choices=[('card', 'Card'), ('image', 'Image')])
    external_url =      models.URLField(max_length=500, blank=True, null=True)
    external_url_date = models.DateTimeField(blank=True, null=True)
    expiration_date =   models.DateField(blank=True, null=True)
    active =            models.BooleanField(default=True)
    slider =            models.ForeignKey(Slider, on_delete=models.SET_NULL, related_name='items', null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Slider Item"
        verbose_name_plural = "Slider Items"