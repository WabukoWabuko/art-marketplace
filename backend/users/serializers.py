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

    def create(self, validated_data):
        user_type = validated_data.pop('user_type')
        validated_data['is_artist'] = user_type == 'artist'
        user = User.objects.create_user(**validated_data)
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_artist', 'bio', 'profile_picture', 'location', 'website']
        read_only_fields = ['id', 'email', 'username']