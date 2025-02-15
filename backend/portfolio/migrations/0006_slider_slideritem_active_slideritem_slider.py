# Generated by Django 5.1.3 on 2024-12-24 16:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0005_slideritem'),
    ]

    operations = [
        migrations.CreateModel(
            name='Slider',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name': 'Slider',
                'verbose_name_plural': 'Sliders',
            },
        ),
        migrations.AddField(
            model_name='slideritem',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='slideritem',
            name='slider',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='items', to='portfolio.slider'),
        ),
    ]
