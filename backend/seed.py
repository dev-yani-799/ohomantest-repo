import os
import django
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import User, ProviderProfile
import random

def run():
    print("Seeding database...")
    User.objects.filter(user_type='provider').delete()
    
    services = ['Electrician', 'Plumber', 'Cleaning', 'Carpenter', 'Painter']
    
    districts = {
        'Kollam': {'lat': 8.8932, 'lon': 76.6141},
        'Trivandrum': {'lat': 8.5241, 'lon': 76.9366},
        'Kochi': {'lat': 9.9312, 'lon': 76.2673},
        'Thrissur': {'lat': 10.5276, 'lon': 76.2144},
        'Kozhikode': {'lat': 11.2588, 'lon': 75.7804},
        'Kannur': {'lat': 11.8745, 'lon': 75.3704},
        'Alappuzha': {'lat': 9.4981, 'lon': 76.3388},
        'Kottayam': {'lat': 9.5916, 'lon': 76.5222},
        'Palakkad': {'lat': 10.7867, 'lon': 76.6548},
        'Malappuram': {'lat': 11.0732, 'lon': 76.0740},
        'Kasaragod': {'lat': 12.4996, 'lon': 74.9869},
        'Pathanamthitta': {'lat': 9.2648, 'lon': 76.7870},
        'Idukki': {'lat': 9.8494, 'lon': 76.9803},
        'Wayanad': {'lat': 11.6854, 'lon': 76.1320}
    }
    
    provider_count = 0
    for district, coords in districts.items():
        for service in services:
            for i in range(4):
                provider_count += 1
                email = f"provider{provider_count}@test.com"
                user = User(email=email, user_type='provider')
                user.set_password('password123')
                user.save()
                
                ProviderProfile.objects.create(
                    user=user,
                    name=f"{district} Expert {service} {i+1}",
                    service_type=service,
                    rating=round(random.uniform(3.8, 5.0), 1),
                    price=round(random.uniform(300.0, 1500.0), 2),
                    latitude=coords['lat'] + random.uniform(-0.05, 0.05),
                    longitude=coords['lon'] + random.uniform(-0.05, 0.05),
                    is_available=random.choice([True, True, True, False])
                )
        
    hyd_user = User(email="hydplumber@test.com", user_type='provider')
    hyd_user.set_password('password123')
    hyd_user.save()
    ProviderProfile.objects.create(
        user=hyd_user,
        name="Madhapur Hyderabad Pro Plumber",
        service_type="Plumber",
        rating=5.0,
        price=500.0,
        latitude=17.4483,
        longitude=78.3915,
        is_available=True
    )
    print("Database seeded successfully!")

if __name__ == '__main__':
    run()
