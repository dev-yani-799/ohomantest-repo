from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProviderProfileViewSet, BookingViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'providers', ProviderProfileViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
