from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import contacto_view,agregar_al_carrito, PedidoViewSet, HerramientaViewSet, carrito_view, CategoriaViewSet, pedidos_View, detalle_view,  productos_view, index_view, login_view, UserViewSet, register_view, login_admin, cambiar_contraseña_admin, admin1_view,  admin3_view, admin2_view, herramienta_detalle, cerrar_sesion, actualizar_estado_pedido, confirmar_pago, editar_herramienta_inline, eliminar_herramienta_inline
from . import views
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path




router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'Pedido', PedidoViewSet)
router.register(r'Herramienta', HerramientaViewSet)
router.register(r'Categoria', CategoriaViewSet)



urlpatterns = [
    path('', index_view, name='index'),
    path('api/', include(router.urls)),
    path('login/', login_view, name='login'),
    path('adminlogin/', login_admin, name='login_admin'),
    path('cambiar_contraseña_admin/', cambiar_contraseña_admin, name='cambiar_contraseña_admin'),
    path('logout/', cerrar_sesion, name='logout'),
    path('pedidos/', pedidos_View, name='pedidos'),
    path('detalle/', detalle_view, name='detalle'),
    path('carrito/', carrito_view, name='carrito'),
    path('productos/', productos_view, name='productos'),
    path('contacto/', contacto_view, name='contacto'),
    path('register/', register_view, name='register'),
    path('admin1/' , admin1_view, name='admin1'),
    path('admin2/' , admin2_view, name='admin2'),
    path('admin3/' , admin3_view, name='admin3'),
    path('herramienta/<str:pk>/', herramienta_detalle, name='herramienta_detalle'),
    path('admin1/pedido/<int:pedido_id>/actualizar_estado/', actualizar_estado_pedido, name='actualizar_estado_pedido'),
    path('admin1/pedido/<int:pedido_id>/confirmar_pago/', confirmar_pago, name='confirmar_pago'),
    path('api/agregar-carrito/', agregar_al_carrito, name='agregar_carrito'),
    path('agregar_carrito/', views.agregar_al_carrito, name='agregar_carrito'),
    path('admin1/herramienta/<str:herramienta_id>/editar_inline/', editar_herramienta_inline, name='editar_herramienta_inline'),
    path('admin1/herramienta/<str:herramienta_id>/eliminar_inline/', eliminar_herramienta_inline, name='eliminar_herramienta_inline'),

]


