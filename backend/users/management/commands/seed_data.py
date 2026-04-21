from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from artworks.models import Category, Artwork
from events.models import Event
from tutorials.models import Tutorial
from orders.models import Order
from reviews.models import Review

User = get_user_model()

class Command(BaseCommand):
    help = 'Seed initial application data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding initial data...')

        if not User.objects.filter(username='urbankreative').exists():
            User.objects.create_superuser(
                username='urbankreative',
                email='urbankreative@gmail.com',
                password='UrbanKreative123',
                first_name='Urban',
                last_name='Kreative',
            )

        if not User.objects.filter(username='artist1').exists():
            artist = User.objects.create_user(
                username='artist1',
                email='artist1@example.com',
                password='password123',
                is_artist=True,
                bio='Contemporary artist focused on digital and mixed media.',
                location='New York, NY',
                website='https://artist1.example.com'
            )
        else:
            artist = User.objects.get(username='artist1')

        if not User.objects.filter(username='collector1').exists():
            collector = User.objects.create_user(
                username='collector1',
                email='collector1@example.com',
                password='password123',
                is_artist=False,
                bio='Collector of modern art and unique experiences.',
                location='San Francisco, CA'
            )
        else:
            collector = User.objects.get(username='collector1')

        category, _ = Category.objects.get_or_create(name='Digital Art', defaults={'description': 'Modern digital works'})
        artwork, _ = Artwork.objects.get_or_create(
            title='Neon Dream',
            artist=artist,
            defaults={
                'description': 'A vibrant digital piece celebrating neon geometry.',
                'price': 450.00,
                'currency': 'USD',
                'category': category,
                'is_limited_edition': True,
                'edition_number': 3,
                'total_editions': 25,
                'is_available': True,
            }
        )

        Event.objects.get_or_create(
            title='Gallery Opening',
            organizer=artist,
            defaults={
                'description': 'Join us for an evening of art and live music.',
                'date': '2026-05-10T19:00:00Z',
                'location': 'Downtown Gallery',
            }
        )

        Tutorial.objects.get_or_create(
            title='Intro to Digital Painting',
            author=artist,
            defaults={
                'description': 'Learn the basics of digital painting workflows.',
                'content': 'Step-by-step digital painting techniques.',
                'video_url': 'https://www.example.com/tutorial',
            }
        )

        order, _ = Order.objects.get_or_create(
            user=collector,
            artwork=artwork,
            defaults={
                'quantity': 1,
                'total_price': artwork.price,
                'currency': artwork.currency,
                'status': 'pending',
                'shipping_address': '123 Market St, San Francisco, CA',
            }
        )

        Review.objects.get_or_create(
            user=collector,
            artwork=artwork,
            defaults={
                'rating': 5,
                'comment': 'Amazing piece with incredible detail!',
            }
        )

        self.stdout.write(self.style.SUCCESS('Seed data created successfully.'))
