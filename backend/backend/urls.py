from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views
from api.views import CustomAuthToken

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api-token-auth/', CustomAuthToken.as_view()),
]
