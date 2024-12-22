from django.core.management.base import BaseCommand
from django.conf import settings
from api.models import SystemConfiguration

class Command(BaseCommand):
    help = 'Disables maintenance_mode.'

    def handle(self, *args, **kwargs):
        config = SystemConfiguration.objects.first()
        if config:
            config.maintenance_mode = False
            config.save()
            self.stdout.write(
                self.style.SUCCESS('Disabled: maintenance_mode.')
            )