from django.db import models

# Create your models here.
class SystemConfiguration(models.Model):
    website_version =      models.CharField(max_length=50, default='0.0.0')
    last_website_version = models.CharField(max_length=50, default='0.0.0')
    maintenance_mode =     models.BooleanField(default=False) # Show maintenance page.
    staging_mode =         models.BooleanField(default=False) # Expose stage.scottzehner.com
    staged_version =       models.CharField(max_length=50, default='0.0.0')
    last_updated =         models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'System Configuration'
        verbose_name_plural = 'System Configuration'

    def __str__(self):
        return f'v{self.website_version}'