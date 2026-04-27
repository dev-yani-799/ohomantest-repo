from rest_framework import serializers
from .models import User, ProviderProfile, Booking

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'user_type']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            user_type=validated_data.get('user_type', 'user')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class ProviderProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProviderProfile
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source='user.email')
    provider_name = serializers.ReadOnlyField(source='provider.name')

    class Meta:
        model = Booking
        fields = '__all__'
