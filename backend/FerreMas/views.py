from django.shortcuts import render
from .serializers import UserSerializer
from django.contrib.auth.models import User
from .models import Herramienta

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    