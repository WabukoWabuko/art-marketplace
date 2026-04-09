from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Artwork, Category

User = get_user_model()

class ArtworkModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='artist', email='artist@example.com', password='password')
        self.category = Category.objects.create(name='Test Category')

    def test_artwork_creation(self):
        artwork = Artwork.objects.create(
            title='Test Art',
            description='Test description',
            price=100.00,
            currency='USD',
            artist=self.user,
            category=self.category,
        )
        self.assertEqual(str(artwork), 'Test Art')
        self.assertTrue(artwork.is_available)
