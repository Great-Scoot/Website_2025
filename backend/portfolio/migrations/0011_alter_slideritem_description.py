# Generated by Django 5.1.3 on 2025-01-02 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0010_slideritem_description_slideritem_external_url_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slideritem',
            name='description',
            field=models.TextField(blank=True, max_length=1000, null=True),
        ),
    ]
