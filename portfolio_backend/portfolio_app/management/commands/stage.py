from django.core.management.base import BaseCommand
from django.conf import settings
from portfolio_app.models import SystemConfiguration

class Command(BaseCommand):
    help = 'Enables staging_mode and updates staged_version.'

    def handle(self, *args, **kwargs):
        config = SystemConfiguration.objects.first()
        if config:
            config.staging_mode = True
            config.staged_version = settings.ENV_WEBSITE_VERSION
            config.save()
            self.stdout.write(
                self.style.SUCCESS(f'Updated staged_version to {config.staged_version}')
            )
