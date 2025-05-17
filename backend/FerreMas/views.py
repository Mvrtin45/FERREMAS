from django.shortcuts import render,  redirect
from .serializers import UserSerializer, PedidoSerializer, HerramientaSerializer, CategoriaSerializer
from django.contrib.auth.models import User
from .models import Pedido , Herramienta, Categoria
from rest_framework import viewsets
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

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

# proteger vistas con login
#@login_required
#def vista_privada(request):
    #return render(request, 'frontend/indexs/index.html')

# VISTA PARA VER LOS PEDIDOS.
def pedidos_View(request):
    return render(request, 'admin2.html')

#VISTA PARA VER DETALLE DE LOS PRODUCTOS
def detalle_view(request):
    return render(request, 'detalle.html')

#VISTA PARA VER EL CARRITO
def carrito_view(request):
    return render(request, 'carrito.html')
#vista para ver los productos
def productos_view(request):
    return render(request, 'productos.html')

#vista para ver los productos
def index_view(request):
    return render(request, 'index.html')

#vista para ver los productos
def contacto_view(request):
    return render(request, 'contacto.html')

#VISTA PARA LOGIN
def login_view(request):
    if request.method == 'POST':
        correo = request.POST.get('username')
        contraseña = request.POST.get('password')

        try:
            user = User.objects.get(email=correo)
        except User.DoesNotExist:
            return render(request, 'login.html', {'error': 'Correo no registrado.'})

        user = authenticate(request, username=user.username, password=contraseña)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            return render(request, 'login.html', {'error': 'Contraseña incorrecta.'})
    
    return render(request, 'login.html')

#VISTA PARA REGISTRO
def register_view(request):
    if request.method == 'POST':
        username = request.POST.get('username').strip()
        email = request.POST.get('email').strip()
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirmPassword')

        # Validaciones básicas
        if password != confirm_password:
            return render(request, 'registrar.html', {'error': 'Las contraseñas no coinciden.'})

        if User.objects.filter(username=username).exists():
            return render(request, 'registrar.html', {'error': 'El nombre de usuario ya existe.'})

        if User.objects.filter(email=email).exists():
            return render(request, 'registrar.html', {'error': 'El correo ya está registrado.'})

        # Crear el usuario
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        # Redirigir al login
        return redirect('login')

    return render(request, 'registrar.html')



