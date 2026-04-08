from rest_framework import serializers
from .models import Artwork, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ArtworkSerializer(serializers.ModelSerializer):
    artist_name = serializers.CharField(source='artist.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Artwork
        fields = '__all__'
        read_only_fields = ['artist', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['artist'] = self.context['request'].user
        return super().create(validated_data)