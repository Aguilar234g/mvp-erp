from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Cliente, Producto, Pedido, Empleado
from .serializers import (
    ClienteSerializer, ProductoSerializer, PedidoSerializer, EmpleadoSerializer
)

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['tipo', 'estado']
    search_fields = ['nombre', 'email', 'telefono']
    ordering_fields = ['nombre', 'created_at']

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['unidad']
    search_fields = ['nombre', 'sku', 'ubicacion']
    ordering_fields = ['nombre', 'cantidad']

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['estado', 'prioridad', 'preparador']
    search_fields = ['cliente__nombre', 'tracking']
    ordering_fields = ['fecha', 'fecha_estimada']

class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['departamento', 'estado']
    search_fields = ['user__first_name', 'user__last_name', 'cargo']
    ordering_fields = ['fecha_contratacion', 'pedidos_completados']