from rest_framework import viewsets, generics
from .models import Tramite, Admin, NumeroAtencion, TramiteVisa
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import TramiteSerializer, AdminSerializer, NumeroAtencionSerializer, UserSerializer, TramiteVisaSerializer

# Create your views here.
class TramiteViewSet(viewsets.ModelViewSet):
    queryset = Tramite.objects.all()
    serializer_class = TramiteSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class TramiteListView(viewsets.ViewSet):
    def list(self, request):
        queryset = Tramite.objects.all()
        serializer = TramiteSerializer(queryset, many=True)
        return Response(serializer.data)

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class NumeroAtencionViewSet(viewsets.ModelViewSet):
    queryset = NumeroAtencion.objects.all()
    serializer_class = NumeroAtencionSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TramiteVisaViewSet(viewsets.ModelViewSet):
    queryset = TramiteVisa.objects.all()
    serializer_class = TramiteVisaSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class TramiteVisaListView(generics.ListAPIView):
    queryset = TramiteVisa.objects.all()
    serializer_class = TramiteVisaSerializer

    def get_queryset(self):
        nombreV = self.request.query_params.get('nombreV', None)
        if nombreV is not None:
            return TramiteVisa.objects.filter(nombreV=nombreV)
        return TramiteVisa.objects.all()