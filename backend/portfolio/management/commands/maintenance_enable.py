from django.core.management.base import BaseCommand
from portfolio.models import SystemConfiguration

class Command(BaseCommand):
    help = 'Enables maintenance_mode.'

    def handle(self, *args, **kwargs):
        config = SystemConfiguration.objects.first()
        if config:
            config.maintenance_mode = True
            config.save()
            self.stdout.write(
                self.style.SUCCESS('Django: Enabled maintenance_mode.')
            )
