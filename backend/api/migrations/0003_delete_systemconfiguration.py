# Generated by Django 5.1.3 on 2024-12-24 14:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_systemconfiguration_staged_version_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='SystemConfiguration',
        ),
    ]
