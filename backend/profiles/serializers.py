from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserSettings, Wishlist

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_artist', 'bio', 'profile_picture', 'location', 'website']
        read_only_fields = ['id', 'email', 'username', 'is_artist']

class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = ['currency', 'notifications_enabled', 'email_notifications', 'public_profile', 'theme']

class WishlistSerializer(serializers.ModelSerializer):
    artwork_title = serializers.CharField(source='artwork.title', read_only=True)
    artwork_image = serializers.ImageField(source='artwork.image', read_only=True)
    artwork_price = serializers.DecimalField(source='artwork.price', max_digits=10, decimal_places=2, read_only=True)
    artwork_currency = serializers.CharField(source='artwork.currency', read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'artwork', 'artwork_title', 'artwork_image', 'artwork_price', 'artwork_currency', 'added_at']
        read_only_fields = ['id', 'added_at']
