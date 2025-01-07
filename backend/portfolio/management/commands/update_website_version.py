from django.conf import settings
from django.core.management.base import BaseCommand

from portfolio.models import SystemConfiguration

class Command(BaseCommand):
    help = 'Updates website_version and last_website_version.'

    def handle(self, *args, **kwargs):
        config = SystemConfiguration.objects.first()
        if config:
            config.last_website_version = config.website_version
            config.website_version = settings.ENV_WEBSITE_VERSION
            config.save()
            self.stdout.write(
                self.style.SUCCESS('Updated website_version and last_website_version')
            )
