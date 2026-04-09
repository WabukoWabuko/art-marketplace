from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class UserModelTest(TestCase):
    def test_user_creation(self):
        user = User.objects.create_user(username='collector', email='collector@example.com', password='securepass')
        self.assertEqual(user.email, 'collector@example.com')
        self.assertFalse(user.is_artist)
        self.assertTrue(user.check_password('securepass'))
