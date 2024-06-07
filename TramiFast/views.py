from rest_framework import viewsets
from .models import Tramite, Admin, NumeroAtencion
from django.contrib.auth.models import User
from .serializers import TramiteSerializer, AdminSerializer, NumeroAtencionSerializer, UserSerializer

# Create your views here.
class TramiteViewSet(viewsets.ModelViewSet):
    queryset = Tramite.objects.all()
    serializer_class = TramiteSerializer

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class NumeroAtencionViewSet(viewsets.ModelViewSet):
    queryset = NumeroAtencion.objects.all()
    serializer_class = NumeroAtencionSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer