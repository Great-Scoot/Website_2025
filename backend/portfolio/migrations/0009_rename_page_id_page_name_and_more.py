# Generated by Django 5.1.3 on 2024-12-31 14:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0008_page_slider_page'),
    ]

    operations = [
        migrations.RenameField(
            model_name='page',
            old_name='page_id',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='slider',
            old_name='slider_id',
            new_name='name',
        ),
    ]