# Generated by Django 5.1.3 on 2024-12-03 22:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio_app', '0002_systemconfiguration_staged_version'),
    ]

    operations = [
        migrations.DeleteModel(
            name='SystemConfiguration',
        ),
    ]