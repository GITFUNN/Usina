# Generated by Django 5.0.3 on 2024-03-16 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_remove_user_is_staff'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_staff',
            field=models.BooleanField(default=True),
        ),
    ]