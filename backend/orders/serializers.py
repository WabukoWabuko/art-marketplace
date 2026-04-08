from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    artwork_title = serializers.CharField(source='artwork.title', read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['user', 'total_price', 'created_at', 'updated_at']

    def create(self, validated_data):
        artwork = validated_data['artwork']
        quantity = validated_data['quantity']
        validated_data['total_price'] = artwork.price * quantity
        validated_data['currency'] = artwork.currency
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)