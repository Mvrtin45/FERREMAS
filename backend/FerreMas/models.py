from django.db import models

# Create your models here.
from django.db import models

class Categoria(models.Model):
    id = models.AutoField(primary_key=True)
    nombre_categoria = models.CharField(max_length=100)

class Herramienta(models.Model):
    id = models.CharField(max_length=20, primary_key=True, unique=True)
    nombre_herramienta = models.CharField(max_length=100)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='herramientas')
    precio = models.DecimalField(max_digits=10, decimal_places=2)

class Pedido(models.Model):
    id = models.CharField(max_length=20, primary_key=True, unique=True)
    fecha_pedido = models.DateTimeField(auto_now_add=True)

class DetallePedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='detalles')
    herramienta = models.ForeignKey(Herramienta, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)
