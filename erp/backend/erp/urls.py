from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet, ProductoViewSet, PedidoViewSet, EmpleadoViewSet

router = DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'empleados', EmpleadoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]