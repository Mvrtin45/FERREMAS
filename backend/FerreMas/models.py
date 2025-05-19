from django.db import models
from django.shortcuts import get_object_or_404
from django.http import JsonResponse



class Categoria(models.Model):
    id = models.AutoField(primary_key=True)
    nombre_categoria = models.CharField(max_length=100)

class Herramienta(models.Model):
    id = models.CharField(max_length=20, primary_key=True, unique=True)
    nombre_herramienta = models.CharField(max_length=100)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='herramientas')
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    imagen_herramienta = models.ImageField(upload_to='images/', blank=True, null=True)

class Cliente(models.Model):
    rut = models.CharField(max_length=9, primary_key=True, unique=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    telefono = models.CharField(max_length=15)
    direccion = models.CharField(max_length=255)

class Pedido(models.Model):
    id = models.CharField(max_length=20, primary_key=True, unique=True)
    cliente = models.ForeignKey('Cliente', on_delete=models.CASCADE)
    fecha_pedido = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(
        max_length=20,
        choices=[
            ('pendiente', 'Pendiente'),
            ('procesado', 'Procesado'),
            ('pagado', 'Pagado'),
        ],
        default='pendiente'
    )

class DetallePedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='detalles')
    herramienta = models.ForeignKey(Herramienta, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)


class OrdenDespacho(models.Model):
    pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(
        max_length=20,
        choices=[
            ('pendiente', 'Pendiente'),
            ('preparando', 'Preparando'),
            ('entregado', 'Entregado'),
        ],
        default='pendiente'
    )

    def __str__(self):
        return f"Orden {self.pedido.id} - {self.estado}"
    
class Pago(models.Model):
    pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_pago = models.DateTimeField(auto_now_add=True)
    confirmado = models.BooleanField(default=False)


class Administrador(models.Model):
    TIPO_CHOICES = [
        ('vendedor', 'Vendedor'),
        ('bodeguero', 'Bodeguero'),
        ('contador', 'Contador'),
    ]

    nombre = models.CharField(max_length=100)
    rut = models.CharField(max_length=12, unique=True)
    contraseña = models.CharField(max_length=128)  # Se guarda en texto plano o cifrado
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    primera_vez = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nombre} ({self.tipo})"

