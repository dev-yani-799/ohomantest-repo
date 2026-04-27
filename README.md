# Service Discovery & Booking Platform

I built this web application to help users discover local service professionals (like plumbers, electricians, cleaners, etc.) and book them easily. The app calculates the distance between the user's actual location and the provider to show the closest options first.

## Tech Stack
- **Frontend:** React.js, Bootstrap 5, React 
- **Backend:** Python, Django, Django REST Framework, SQLite

## Core Features
- Search for local providers by location and service type.
- Automatically calculates live distance using the browser's Geolocation API.
- Filter providers by "Available Now" status.
- Sort results dynamically by Rating or Distance.
- User Authentication (Login / Sign Up) with Token Auth.
- Booking confirmation flow.

---

## How to run the project locally

You will need two terminal windows to run both the backend and frontend at the same time.

### 1. Backend Setup (Django)

Open your first terminal and navigate into the backend folder:
```bash
cd backend
```

**Environment Setup:**
To keep things clean, it's best to set up a Python virtual environment. You can create a fresh one right inside your backend folder by running:
```bash
python -m venv venv
```

Activate the environment:
- **Windows (Command Prompt):** `.\venv\Scripts\activate`

Once activated, install all the required dependencies I used for this project:
```bash
pip install django djangorestframework django-cors-headers
```

Apply the database migrations to set up SQLite:
```bash
python manage.py migrate
```

Run the setup script to populate the database with providers:
```bash
python seed.py
```

Start the backend server:
```bash
python manage.py runserver
```

### 2. Frontend Setup (React)

Open your second terminal and navigate into the frontend folder:
```bash
cd frontend
```

Install the required Node modules:
```bash
npm install
```

Start the React development server:
```bash
npm start
```
"While searching the providers allow location for taking exact distance"

The application will automatically open in your browser at `http://localhost:3000`. You can create a test account on the "Sign Up" page and start searching for providers!