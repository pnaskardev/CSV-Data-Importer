# Generated by Django 4.2.3 on 2023-07-18 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0002_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data',
            name='instrument',
            field=models.CharField(max_length=100),
        ),
    ]
