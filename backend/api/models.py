from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
class User(AbstractUser):
    USER_TYPES = (
        ('admin', 'Admin'),
        ('provider', 'Provider'),
        ('user', 'User'),
    )

    email = models.EmailField(unique=True)
    username = None  # remove username

    user_type = models.CharField(max_length=20, choices=USER_TYPES)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
class ProviderProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    service_type = models.CharField(max_length=100)
    rating = models.FloatField(default=0)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    latitude = models.FloatField()
    longitude = models.FloatField()
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    provider = models.ForeignKey(ProviderProfile, on_delete=models.CASCADE)
    service_date = models.DateTimeField()
    status = models.CharField(max_length=20, default='pending')
    price = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.id} by {self.user.email} for {self.provider.name}"