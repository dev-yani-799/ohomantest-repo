from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import User, ProviderProfile, Booking
from .serializers import UserSerializer, ProviderProfileSerializer, BookingSerializer
import math

def calculate_distance(lat1, lon1, lat2, lon2):
    # Rough approximation for distance
    R = 6371  # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2) * math.sin(dlat/2) + math.cos(math.radians(lat1)) \
        * math.cos(math.radians(lat2)) * math.sin(dlon/2) * math.sin(dlon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    distance = R * c
    return distance

from django.conf import settings

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProviderProfileViewSet(viewsets.ModelViewSet):
    queryset = ProviderProfile.objects.all()
    serializer_class = ProviderProfileSerializer

    def get_queryset(self):
        queryset = ProviderProfile.objects.all()
        service_type = self.request.query_params.get('service_type')
        available_now = self.request.query_params.get('available_now')
        
        if service_type:
            queryset = queryset.filter(service_type__icontains=service_type)
        if available_now == 'true':
            queryset = queryset.filter(is_available=True)
            
        return queryset

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def search(self, request):
        queryset = self.get_queryset()
        
        user_lat = request.query_params.get('lat')
        user_lon = request.query_params.get('lon')
        sort_by = request.query_params.get('sort_by')
        
        providers_data = []
        for provider in queryset:
            data = ProviderProfileSerializer(provider).data
            if user_lat and user_lon:
                distance = calculate_distance(float(user_lat), float(user_lon), provider.latitude, provider.longitude)
                data['distance'] = round(distance, 2)
            else:
                data['distance'] = None
            providers_data.append(data)
            
        if sort_by == 'rating':
            providers_data.sort(key=lambda x: x['rating'], reverse=True)
        elif sort_by == 'distance' and user_lat and user_lon:
            providers_data.sort(key=lambda x: x['distance'])
            
        return Response(providers_data)

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
