from django.contrib.auth import get_user_model
from django.db import migrations


def create_admin_user(apps, schema_editor):
    User = get_user_model()
    username = 'urbankreative'
    email = 'urbankreative@gmail.com'
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(
            username=username,
            email=email,
            password='UrbanKreative123',
            first_name='Urban',
            last_name='Kreative',
        )


def remove_admin_user(apps, schema_editor):
    User = get_user_model()
    User.objects.filter(username='urbankreative').delete()


class Migration(migrations.Migration):
    dependencies = [
        ('users', '0002_user_followers_user_specialty_alter_user_id'),
    ]

    operations = [
        migrations.RunPython(create_admin_user, remove_admin_user),
    ]
