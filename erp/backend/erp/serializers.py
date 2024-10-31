from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Cliente, Producto, Pedido, PedidoProducto, Empleado

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class PedidoProductoSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='producto.nombre', read_only=True)
    
    class Meta:
        model = PedidoProducto
        fields = ('id', 'producto', 'producto_nombre', 'cantidad')

class PedidoSerializer(serializers.ModelSerializer):
    productos = PedidoProductoSerializer(many=True, read_only=True)
    cliente_nombre = serializers.CharField(source='cliente.nombre', read_only=True)
    preparador_nombre = serializers.CharField(source='preparador.get_full_name', read_only=True)
    
    class Meta:
        model = Pedido
        fields = '__all__'

class EmpleadoSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.CharField(source='user.get_full_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = Empleado
        fields = '__all__'