import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from firebase_admin import firestore

def add_plumber():
    db = firestore.client()
    provider_data = {
        'name': "Hyderabad Expert Plumber",
        'service_type': "Plumber",
        'rating': 4.9,
        'price': 450.0,
        # Hyderabad coordinates
        'latitude': 17.3850,
        'longitude': 78.4867,
        'is_available': True
    }
    db.collection('providers').add(provider_data)
    print("Added Hyderabad Plumber to Firebase!")

if __name__ == '__main__':
    add_plumber()
