from django.shortcuts import render
from .serializers import UserSerializer, PedidoSerializer, HerramientaSerializer, CategoriaSerializer
from django.contrib.auth.models import User
from .models import Pedido , Herramienta, Categoria
from rest_framework import viewsets
from django.http import HttpResponse

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class HerramientaViewSet(viewsets.ModelViewSet):
    queryset = Herramienta.objects.all()
    serializer_class = HerramientaSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

# VISTA PARA VER LOS PEDIDOS.
def pedidos_View(request):
    return render(request, 'indexs/Bodeguero/admin2.html')
