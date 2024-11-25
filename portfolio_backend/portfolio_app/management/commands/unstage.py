from django.core.management.base import BaseCommand
from django.conf import settings
from portfolio_app.models import SystemConfiguration

class Command(BaseCommand):
    help = 'Disables staging_mode.'

    def handle(self, *args, **kwargs):
        config = SystemConfiguration.objects.first()
        if config:
            config.staging_mode = False
            config.save()
            self.stdout.write(
                self.style.SUCCESS(f'Disabled staging_mode')
            )
