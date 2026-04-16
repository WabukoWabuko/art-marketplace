from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from artworks.models import Artwork, Category
from events.models import Event
from tutorials.models import Tutorial
from datetime import datetime, timedelta
import random

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate database with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')

        # Create categories
        categories = [
            {'name': 'Abstract Art', 'description': 'Non-representational art'},
            {'name': 'Landscape', 'description': 'Natural scenery and landscapes'},
            {'name': 'Portrait', 'description': 'Human portraits and figures'},
            {'name': 'Street Art', 'description': 'Urban and graffiti art'},
            {'name': 'Digital Art', 'description': 'Computer-generated artwork'},
            {'name': 'Photography', 'description': 'Photographic art'},
            {'name': 'Sculpture', 'description': 'Three-dimensional art'},
            {'name': 'Mixed Media', 'description': 'Combination of different mediums'},
        ]

        for cat_data in categories:
            Category.objects.get_or_create(
                name=cat_data['name'],
                defaults={'description': cat_data['description']}
            )

        # Create sample users
        users_data = [
            {'username': 'artist1', 'email': 'artist1@example.com', 'first_name': 'Maria', 'last_name': 'Silva', 'is_artist': True, 'specialty': 'Abstract Art', 'bio': 'Contemporary artist creating bold abstract expressions', 'location': 'Spain'},
            {'username': 'artist2', 'email': 'artist2@example.com', 'first_name': 'John', 'last_name': 'Doe', 'is_artist': True, 'specialty': 'Street Art', 'bio': 'Urban artist capturing city life and culture', 'location': 'USA'},
            {'username': 'artist3', 'email': 'artist3@example.com', 'first_name': 'Lena', 'last_name': 'Sparks', 'is_artist': True, 'specialty': 'Graffiti', 'bio': 'Pioneering graffiti artist with international recognition', 'location': 'Germany'},
            {'username': 'artist4', 'email': 'artist4@example.com', 'first_name': 'Anna', 'last_name': 'Green', 'is_artist': True, 'specialty': 'Landscape', 'bio': 'Nature-inspired painter capturing beautiful landscapes', 'location': 'Canada'},
            {'username': 'artist5', 'email': 'artist5@example.com', 'first_name': 'Marco', 'last_name': 'Rossi', 'is_artist': True, 'specialty': 'Digital Art', 'bio': 'Digital artist exploring virtual worlds', 'location': 'Italy'},
            {'username': 'artist6', 'email': 'artist6@example.com', 'first_name': 'Nina', 'last_name': 'Chen', 'is_artist': True, 'specialty': 'Photography', 'bio': 'Award-winning photographer capturing human stories', 'location': 'China'},
            {'username': 'artist7', 'email': 'artist7@example.com', 'first_name': 'David', 'last_name': 'Miller', 'is_artist': True, 'specialty': 'Sculpture', 'bio': 'Sculptor working with traditional and modern materials', 'location': 'UK'},
            {'username': 'artist8', 'email': 'artist8@example.com', 'first_name': 'Sophie', 'last_name': 'Laurent', 'is_artist': True, 'specialty': 'Mixed Media', 'bio': 'Mixed media artist combining various artistic techniques', 'location': 'France'},
            {'username': 'artist9', 'email': 'artist9@example.com', 'first_name': 'Carlos', 'last_name': 'Rodriguez', 'is_artist': True, 'specialty': 'Street Art', 'bio': 'Mural artist bringing color to urban spaces', 'location': 'Mexico'},
        ]

        users = []
        for user_data in users_data:
            user, created = User.objects.get_or_create(
                username=user_data['username'],
                defaults={
                    'email': user_data['email'],
                    'first_name': user_data['first_name'],
                    'last_name': user_data['last_name'],
                    'is_artist': user_data['is_artist'],
                    'specialty': user_data['specialty'],
                    'bio': user_data['bio'],
                    'location': user_data['location'],
                }
            )
            if created:
                user.set_password('password123')
                user.save()
            users.append(user)

        # Create artworks
        artworks_data = [
            {'title': 'Abstract Dreams', 'description': 'A vibrant exploration of color and form', 'price': 2500.00, 'currency': 'USD', 'category': 'Abstract Art', 'artist': users[0]},
            {'title': 'Mountain Vista', 'description': 'Majestic mountain landscape at sunset', 'price': 1800.00, 'currency': 'USD', 'category': 'Landscape', 'artist': users[3]},
            {'title': 'Urban Rebellion', 'description': 'Bold street art capturing city energy', 'price': 3200.00, 'currency': 'USD', 'category': 'Street Art', 'artist': users[1]},
            {'title': 'Digital Cosmos', 'description': 'AI-generated cosmic exploration', 'price': 1500.00, 'currency': 'USD', 'category': 'Digital Art', 'artist': users[4]},
            {'title': 'Golden Hour', 'description': 'Beautiful sunset photography', 'price': 1200.00, 'currency': 'USD', 'category': 'Photography', 'artist': users[5]},
            {'title': 'Bronze Warrior', 'description': 'Hand-crafted bronze sculpture', 'price': 4500.00, 'currency': 'USD', 'category': 'Sculpture', 'artist': users[6]},
            {'title': 'Mixed Emotions', 'description': 'Mixed media exploration of human feelings', 'price': 2800.00, 'currency': 'USD', 'category': 'Mixed Media', 'artist': users[7]},
            {'title': 'Mural Dreams', 'description': 'Large-scale mural artwork', 'price': 3800.00, 'currency': 'USD', 'category': 'Street Art', 'artist': users[8]},
            {'title': 'Portrait Study', 'description': 'Detailed charcoal portrait', 'price': 950.00, 'currency': 'USD', 'category': 'Portrait', 'artist': users[0]},
            {'title': 'Ocean Waves', 'description': 'Seascape with dramatic waves', 'price': 2100.00, 'currency': 'USD', 'category': 'Landscape', 'artist': users[3]},
            {'title': 'Neon Nights', 'description': 'Urban nightlife captured in neon', 'price': 2900.00, 'currency': 'USD', 'category': 'Street Art', 'artist': users[2]},
            {'title': 'Virtual Reality', 'description': 'Digital art exploring virtual worlds', 'price': 1800.00, 'currency': 'USD', 'category': 'Digital Art', 'artist': users[4]},
        ]

        for artwork_data in artworks_data:
            category = Category.objects.get(name=artwork_data['category'])
            Artwork.objects.get_or_create(
                title=artwork_data['title'],
                artist=artwork_data['artist'],
                defaults={
                    'description': artwork_data['description'],
                    'price': artwork_data['price'],
                    'currency': artwork_data['currency'],
                    'category': category,
                    'is_available': True,
                }
            )

        # Create events
        events_data = [
            {'title': 'Spring Art Expo 2026', 'description': 'Annual spring art exhibition featuring contemporary artists', 'date': datetime(2026, 5, 15, 10, 0), 'location': 'Metropolitan Art Center, New York', 'organizer': users[0], 'max_attendees': 200},
            {'title': 'Artist Masterclass', 'description': 'Learn advanced techniques from master artists', 'date': datetime(2026, 6, 1, 14, 0), 'location': 'Creative Studio, Los Angeles', 'organizer': users[1], 'max_attendees': 50},
            {'title': 'Graffiti Street Festival', 'description': 'Celebrating urban art and street culture', 'date': datetime(2026, 7, 20, 16, 0), 'location': 'Downtown Arts District, Chicago', 'organizer': users[2], 'max_attendees': 300},
            {'title': 'Photography Expo', 'description': 'Showcase of contemporary photography', 'date': datetime(2026, 8, 10, 11, 0), 'location': 'Photography Center, San Francisco', 'organizer': users[5], 'max_attendees': 150},
            {'title': 'Digital Art Summit', 'description': 'Exploring the future of digital creativity', 'date': datetime(2026, 9, 5, 9, 0), 'location': 'Tech Hub, Austin', 'organizer': users[4], 'max_attendees': 250},
            {'title': 'Sculpture Fair', 'description': 'Contemporary sculpture exhibition', 'date': datetime(2026, 10, 12, 13, 0), 'location': 'Sculpture Garden, Miami', 'organizer': users[6], 'max_attendees': 100},
        ]

        for event_data in events_data:
            Event.objects.get_or_create(
                title=event_data['title'],
                date=event_data['date'],
                defaults={
                    'description': event_data['description'],
                    'location': event_data['location'],
                    'organizer': event_data['organizer'],
                    'max_attendees': event_data['max_attendees'],
                }
            )

        # Create tutorials
        tutorials_data = [
            {'title': 'Introduction to Abstract Art', 'description': 'Learn the basics of abstract art techniques', 'content': 'Abstract art is a form of art that does not attempt to represent an accurate depiction of visual reality...', 'author': users[0]},
            {'title': 'Digital Art Fundamentals', 'description': 'Master the basics of digital art creation', 'content': 'Digital art encompasses all forms of art created using digital technology...', 'author': users[4]},
            {'title': 'Street Art Techniques', 'description': 'Learn spray paint and urban art methods', 'content': 'Street art has evolved from simple graffiti to complex urban expressions...', 'author': users[1]},
            {'title': 'Photography Composition', 'description': 'Master the rules of composition in photography', 'content': 'Composition is the arrangement of elements within a photograph...', 'author': users[5]},
            {'title': 'Sculpture Materials Guide', 'description': 'Understanding different sculpting materials', 'content': 'Sculpture can be created using various materials including clay, metal, wood...', 'author': users[6]},
            {'title': 'Color Theory for Artists', 'description': 'Understanding color relationships and harmony', 'content': 'Color theory is a framework for understanding how colors interact...', 'author': users[7]},
        ]

        for tutorial_data in tutorials_data:
            Tutorial.objects.get_or_create(
                title=tutorial_data['title'],
                author=tutorial_data['author'],
                defaults={
                    'description': tutorial_data['description'],
                    'content': tutorial_data['content'],
                }
            )

        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))