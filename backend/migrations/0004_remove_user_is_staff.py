# Generated by Django 5.0.3 on 2024-03-16 19:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_remove_user_name_user_is_staff'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_staff',
        ),
    ]
