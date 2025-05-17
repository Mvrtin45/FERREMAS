from .models import Herramienta, Categoria, Pedido, DetallePedido, Cliente
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'
class HerramientaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Herramienta
        fields = '__all__'
class DetallePedidoSerializer(serializers.ModelSerializer):
    herramienta_nombre = serializers.CharField(source='herramienta.nombre', read_only=True)

    class Meta:
        model = DetallePedido
        fields = ['id', 'herramienta', 'herramienta_nombre', 'cantidad', 'precio', 'total']
class PedidoSerializer(serializers.ModelSerializer):
    detalles = DetallePedidoSerializer(many=True, read_only=True)

    class Meta:
        model = Pedido
        fields = ['id', 'fecha_pedido', 'detalles']

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'