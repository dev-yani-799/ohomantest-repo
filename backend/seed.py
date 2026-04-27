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
    
    # Create providers
    services = ['Electrician', 'Plumber', 'Cleaning', 'Carpenter', 'Painter']
    
    # Kerala Coordinates approx (Trivandrum)
    base_lat = 8.5241
    base_lon = 76.9366
    
    for i in range(15):
        email = f"provider{i}@test.com"
        user = User(email=email, user_type='provider')
        user.set_password('password123')
        user.save()
        
        ProviderProfile.objects.create(
            user=user,
            name=f"Pro Service {i}",
            service_type=random.choice(services),
            rating=round(random.uniform(3.5, 5.0), 1),
            price=round(random.uniform(300.0, 1500.0), 2),
            latitude=base_lat + random.uniform(-0.5, 0.5),
            longitude=base_lon + random.uniform(-0.5, 0.5),
            is_available=random.choice([True, True, False])
        )
        
    # Add Hyderabad plumber specifically
    hyd_user = User(email="hydplumber@test.com", user_type='provider')
    hyd_user.set_password('password123')
    hyd_user.save()
    ProviderProfile.objects.create(
        user=hyd_user,
        name="Madhapur Hyderabad Pro Plumber",
        service_type="Plumber",
        rating=5.0,
        price=500.0,
        latitude=17.4483,  # Madhapur approx coords
        longitude=78.3915,
        is_available=True
    )
    print("Database seeded successfully with Hyderabad provider included!")
        
    print("Database seeded successfully!")

if __name__ == '__main__':
    run()
