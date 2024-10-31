from django.db import models
from django.contrib.auth.models import User

class Cliente(models.Model):
    nombre = models.CharField(max_length=200)
    contacto = models.CharField(max_length=200)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    direccion = models.TextField()
    tipo = models.CharField(max_length=20, choices=[
        ('empresa', 'Empresa'),
        ('individual', 'Individual')
    ])
    estado = models.CharField(max_length=20, choices=[
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo')
    ])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    sku = models.CharField(max_length=50, unique=True)
    cantidad = models.IntegerField()
    ubicacion = models.CharField(max_length=50)
    peso = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    unidad = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Pedido(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=[
        ('pendiente', 'Pendiente'),
        ('en_proceso', 'En Proceso'),
        ('completado', 'Completado'),
        ('cancelado', 'Cancelado')
    ])
    prioridad = models.CharField(max_length=20, choices=[
        ('baja', 'Baja'),
        ('media', 'Media'),
        ('alta', 'Alta')
    ])
    preparador = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    notas = models.TextField(blank=True)
    tracking = models.CharField(max_length=100, blank=True)
    fecha_estimada = models.DateTimeField(null=True, blank=True)
    tiempo_preparacion = models.IntegerField(null=True, blank=True)

class PedidoProducto(models.Model):
    pedido = models.ForeignKey(Pedido, related_name='productos', on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()

class Empleado(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cargo = models.CharField(max_length=100)
    departamento = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    fecha_contratacion = models.DateField()
    estado = models.CharField(max_length=20, choices=[
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo'),
        ('vacaciones', 'Vacaciones')
    ])
    foto = models.URLField(blank=True)
    pedidos_completados = models.IntegerField(default=0)
    eficiencia_promedio = models.DecimalField(max_digits=5, decimal_places=2, default=0)