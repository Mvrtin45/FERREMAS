from rest_framework import viewsets, generics
from .models import Tramite, Admin, NumeroAtencion, TramiteVisa
from django.contrib.auth.models import User
from .serializers import TramiteSerializer, AdminSerializer, NumeroAtencionSerializer, UserSerializer, TramiteVisaSerializer

# Create your views here.
class TramiteViewSet(generics.CreateAPIView):
    queryset = Tramite.objects.all()
    serializer_class = TramiteSerializer

class TramiteListView(generics.ListAPIView):
    queryset = Tramite.objects.all()
    serializer_class = TramiteSerializer

    def get_queryset(self):
        nombretramite = self.request.query_params.get('nombretramite', None)
        if nombretramite is not None:
            return Tramite.objects.filter(nombretramite=nombretramite)
        return Tramite.objects.all()

class AdminViewSet(generics.CreateAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class NumeroAtencionViewSet(generics.CreateAPIView):
    queryset = NumeroAtencion.objects.all()
    serializer_class = NumeroAtencionSerializer

class UserViewSet(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TramiteVisaSet(generics.CreateAPIView):
    queryset = TramiteVisa.objects.all()
    serializer_class = TramiteVisaSerializer

class TramiteVisaListView(generics.ListAPIView):
    queryset = TramiteVisa.objects.all()
    serializer_class = TramiteVisaSerializer

    def get_queryset(self):
        nombreV = self.request.query_params.get('nombreV', None)
        if nombreV is not None:
            return TramiteVisa.objects.filter(nombreV=nombreV)
        return TramiteVisa.objects.all()