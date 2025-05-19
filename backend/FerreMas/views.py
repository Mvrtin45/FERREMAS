import json 
import requests
from django.shortcuts import render,  redirect, get_object_or_404
from .serializers import UserSerializer, PedidoSerializer, HerramientaSerializer, CategoriaSerializer
from django.contrib.auth.models import User
from .models import Pedido, Herramienta, Categoria, Administrador, Pago, DetallePedido, OrdenDespacho
from rest_framework import viewsets
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.db import models
from django.contrib import messages
import uuid
from django.http import HttpResponseBadRequest
from transbank.webpay.webpay_plus.transaction import Transaction
from transbank.common.options import WebpayOptions
from transbank.common.integration_type import IntegrationType


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

# Lista de estados válidos para pedidos
ESTADOS_PEDIDO = [
    ('pendiente', 'Pendiente'),
    ('procesado', 'Procesado'),
    ('pagado', 'Pagado'),
]

# VISTA PARA ADMIN 1
def admin1_view(request):
    pedidos = Pedido.objects.all().order_by('-fecha_pedido')
    Herramientas = Herramienta.objects.all()
    ordenes = OrdenDespacho.objects.all().select_related('pedido', 'pedido__cliente')
    context = {
        'pedidos': pedidos,
        'estados': ESTADOS_PEDIDO,
        'ordenes': ordenes,
        'herramientas': Herramientas,   
    }
    return render(request, 'admin1.html', context)

def actualizar_estado_pedido(request, pedido_id):
    pedido = get_object_or_404(Pedido, id=pedido_id)

    if request.method == 'POST':
        nuevo_estado = request.POST.get('estado')
        if nuevo_estado in ['pendiente', 'procesado', 'pagado']:
            pedido.estado = nuevo_estado
            pedido.save()
    return redirect('admin1')

def confirmar_pago(request, pedido_id):
    pedido = get_object_or_404(Pedido, id=pedido_id)
    pago, created = Pago.objects.get_or_create(pedido=pedido, defaults={'monto': pedido.detalles.aggregate(
        total=models.Sum('total'))['total'] or 0})

    if request.method == 'POST':
        pago.confirmado = True
        pago.save()
        pedido.estado = 'pagado'
        pedido.save()

    return redirect('admin1')

@require_POST
def crear_orden_despacho(request):
    pedido_id = request.POST.get('pedido_id')
    pedido = get_object_or_404(Pedido, id=pedido_id)

    # Crear orden solo si no existe aún
    if not hasattr(pedido, 'ordendespacho'):
        OrdenDespacho.objects.create(pedido=pedido)

    return redirect('admin1')

@require_POST
def editar_herramienta_inline(request, herramienta_id):
    herramienta = get_object_or_404(Herramienta, id=herramienta_id)
    herramienta.nombre_herramienta = request.POST.get('nombre')
    herramienta.precio = request.POST.get('precio')
    herramienta.stock = request.POST.get('stock')
    herramienta.save()
    messages.success(request, 'Herramienta editada correctamente.')
    return redirect('admin1')

@require_POST
def eliminar_herramienta_inline(request, herramienta_id):
    herramienta = get_object_or_404(Herramienta, id=herramienta_id)
    herramienta.delete()
    messages.success(request, 'Herramienta eliminada correctamente.')
    return redirect('admin1')

#VISTA PARA ADMIN 3
def admin3_view(request):
    pagos = Pago.objects.all()
    entregas_realizadas = OrdenDespacho.objects.filter(estado='entregado')
    entregas_pendientes = OrdenDespacho.objects.exclude(estado='entregado')

    return render(request, 'admin3.html', {
        'pagos': pagos,
        'entregas_realizadas': entregas_realizadas,
        'entregas_pendientes': entregas_pendientes,
    })

def confirmar_pago_admin3(request, pago_id):
    pago = get_object_or_404(Pago, id=pago_id)
    
    if request.method == 'POST':
        pago.confirmado = True
        pago.save()
        
        pedido = pago.pedido
        pedido.estado = 'pagado'
        pedido.save()

    return redirect('admin3')

def registrar_entrega(request, pedido_id):
    if request.method == 'POST':
        orden = get_object_or_404(OrdenDespacho, pedido__id=pedido_id)
        orden.estado = 'entregado'
        orden.save()
    return redirect('admin3')

def admin2_view(request):
    ordenes = OrdenDespacho.objects.select_related('pedido', 'pedido__cliente')
    context = {'ordenes': ordenes}
    return render(request, 'admin2.html', context)

#VISTA PARA ORDENES DE DESPACHO
def obtener_ordenes_despacho(request):
    ordenes = OrdenDespacho.objects.select_related('pedido__cliente').prefetch_related('pedido__detalles__herramienta')

    data = []
    for orden in ordenes:
        detalles = [
            {
                'nombre': detalle.herramienta.nombre_herramienta,
                'cantidad': detalle.cantidad
            }
            for detalle in orden.pedido.detalles.all()
        ]
        data.append({
            'id': orden.id,
            'estado': orden.estado,
            'cliente': f"{orden.pedido.cliente.nombre} {orden.pedido.cliente.apellido}",
            'productos': detalles
        })

    return JsonResponse({'ordenes': data})

#VISTA PARA ACTUALIZAR ESTADO DE ORDEN
@csrf_exempt
@require_POST
def actualizar_estado_orden(request):
    try:
        data = json.loads(request.body)
        orden_id = data.get('id')
        nuevo_estado = data.get('estado')

        orden = OrdenDespacho.objects.get(id=orden_id)
        orden.estado = nuevo_estado
        orden.save()

        return JsonResponse({'success': True, 'mensaje': 'Estado actualizado correctamente'})
    except OrdenDespacho.DoesNotExist:
        return JsonResponse({'success': False, 'mensaje': 'Orden no encontrada'}, status=404)
    except Exception as e:
        return JsonResponse({'success': False, 'mensaje': str(e)}, status=500)
    
#VISTA PARA VER DETALLE DE LOS PRODUCTOS
def detalle_view(request):
    return render(request, 'detalle.html')

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

# VISTA ADMIN LOGIN
def login_admin(request):
    if request.method == 'POST':
        usuario = (request.POST.get('usuario') or '').strip()
        rut_o_pass = (request.POST.get('contraseña') or '').strip()

        if not usuario or not rut_o_pass:
            return render(request, 'Adminlogin.html', {'error': 'Debe ingresar todos los campos.'})

        try:
            admin = Administrador.objects.get(nombre=usuario)

            if admin.primera_vez:
                # Validar con el RUT
                if rut_o_pass == admin.rut:
                    request.session['admin_id'] = admin.id
                    return redirect('cambiar_contraseña_admin')
                else:
                    return render(request, 'Adminlogin.html', {'error': 'RUT incorrecto.'})
            else:
                # Validar con la contraseña
                if rut_o_pass == admin.contraseña:
                    request.session['admin_id'] = admin.id

                    # Redirigir según el tipo
                    if admin.tipo == 'vendedor':
                        return redirect('admin1')
                    elif admin.tipo == 'bodeguero':
                        return redirect('admin2')
                    elif admin.tipo == 'contador':
                        return redirect('admin3')
                    else:
                        return render(request, 'Adminlogin.html', {'error': 'Tipo de administrador desconocido.'})
                else:
                    return render(request, 'Adminlogin.html', {'error': 'Contraseña incorrecta.'})

        except Administrador.DoesNotExist:
            return render(request, 'Adminlogin.html', {'error': 'Usuario no encontrado.'})

    return render(request, 'Adminlogin.html')

# CAMBIAR CONTRASEÑA ADMIN
def cambiar_contraseña_admin(request):
    admin_id = request.session.get('admin_id')
    if not admin_id:
        return redirect('login_admin')

    try:
        admin = Administrador.objects.get(id=admin_id)
    except Administrador.DoesNotExist:
        return redirect('login_admin')

    if request.method == 'POST':
        nueva = request.POST.get('nuevaContraseña', '').strip()
        confirmar = request.POST.get('confirmarContraseña', '').strip()

        if not nueva or not confirmar:
            return render(request, 'Adminlogin.html', {
                'mostrar_cambio': True,
                'error_cambio': 'Todos los campos son obligatorios.'
            })

        if nueva != confirmar:
            return render(request, 'Adminlogin.html', {
                'mostrar_cambio': True,
                'error_cambio': 'Las contraseñas no coinciden.'
            })

        # Cambiar contraseña y actualizar estado
        admin.contraseña = nueva
        admin.primera_vez = False
        admin.save()

        # Eliminar sesión temporal
        request.session.pop('admin_id', None)

        # Redirigir al login con un mensaje opcional
        return redirect('login_admin')  # puedes agregar un mensaje vía querystring si lo deseas

    return render(request, 'Adminlogin.html', {
        'mostrar_cambio': True,
        'nombre_admin': admin.nombre
    })

#CERRAR SESION
def cerrar_sesion(request):
    logout(request)
    return redirect('index')

def detalle(request):
    producto_id = request.GET.get('id')  
    return render(request, 'detalle.html', {'id': producto_id})


def herramienta_detalle(request, pk):  # cambia id por pk para claridad
    try:
        herramienta = Herramienta.objects.get(pk=pk)  # usa pk porque es la clave primaria
        data = {
            'id': herramienta.pk,  # o herramienta.id si así está definido el campo
            'nombre': herramienta.nombre_herramienta,
            'precio': float(herramienta.precio),
            'categoria': herramienta.categoria.nombre_categoria if herramienta.categoria else None,
        }
        return JsonResponse(data)
    except Herramienta.DoesNotExist:
        return JsonResponse({'error': 'Herramienta no encontrada'}, status=404)


def carrito_view(request):
    carrito = request.session.get('carrito', {})
    herramientas = []
    total = 0

    for producto_id, cantidad in carrito.items():
        try:

            herramienta = Herramienta.objects.get(pk=producto_id)
            herramienta.cantidad = cantidad
            herramienta.subtotal = herramienta.precio * cantidad
            herramientas.append(herramienta)
            total += herramienta.subtotal
        except Herramienta.DoesNotExist:
            continue

    return render(request, 'carrito.html', {
    'productos_en_carrito': herramientas,  # <- nombre que espera tu HTML
    'total': total
    })

@csrf_exempt
@require_POST
def agregar_al_carrito(request):
    try:
        data = json.loads(request.body)
        producto_id = data.get('producto_id')

        if not producto_id:
            return JsonResponse({'error': 'ID de producto no proporcionado'}, status=400)

        carrito = request.session.get('carrito', {})
        carrito[producto_id] = carrito.get(producto_id, 0) + 1
        request.session['carrito'] = carrito
        return JsonResponse({'mensaje': 'Producto agregado al carrito'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def actualizar_carrito(request):
    if request.method == 'POST':
        producto_id = str(request.POST.get('producto_id'))
        cantidad = int(request.POST.get('cantidad', 1))

        carrito = request.session.get('carrito', {})

        if cantidad > 0:
            carrito[producto_id] = cantidad
        else:
            carrito.pop(producto_id, None)

        request.session['carrito'] = carrito
        return redirect('carrito')

@require_POST
def eliminar_del_carrito(request):
    producto_id = str(request.POST.get('producto_id'))

    carrito = request.session.get('carrito', {})
    if producto_id in carrito:
        del carrito[producto_id]

    request.session['carrito'] = carrito
    return redirect('carrito')

def redireccionar_view(request):
    return render(request, 'redireccionar.html')
