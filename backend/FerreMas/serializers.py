from .models import Herramienta, Categoria, Pedido, DetallePedido, Cliente
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'password','first_name', 'last_name', 'email', 'is_active']

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
    detalles = DetallePedidoSerializer(many=True)
    class Meta:
        model = Pedido
        fields = ['id', 'cliente', 'fecha_pedido','direccion','comuna','region', 'estado', 'detalles']

    def create(self, validated_data):
        detalles_data = validated_data.pop('detalles')
        pedido = Pedido.objects.create(**validated_data)
        for detalle_data in detalles_data:
            DetallePedido.objects.create(pedido=pedido, **detalle_data)
        return pedido

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class HerramientaDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Herramienta
        fields = ['id', 'nombre_herramienta', 'categoria', 'categoria_nombre', 'precio', 'stock', 'imagen_herramienta']

