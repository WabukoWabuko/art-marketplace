from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import User

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_artist', 'bio', 'profile_picture', 'location', 'website']
        read_only_fields = ['id']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    user_type = serializers.ChoiceField(choices=['buyer', 'artist'], write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'user_type']
        extra_kwargs = {
            'username': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False},
        }

    def create(self, validated_data):
        user_type = validated_data.pop('user_type')
        validated_data['is_artist'] = user_type == 'artist'

        username = validated_data.get('username') or validated_data['email'].split('@')[0]
        base_username = username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1
        validated_data['username'] = username

        user = User.objects.create_user(**validated_data)
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_artist', 'bio', 'profile_picture', 'location', 'website']
        read_only_fields = ['id', 'email', 'username']