from django.contrib import admin
from django.urls import path, include
from FerreMas.views import herramienta_api_view, pedidos_View, detalle_view,pago_error, agregar_al_carrito, carrito_view, productos_view, index_view,contacto_view, login_admin, cambiar_contraseña_admin, admin1_view,  admin2_view, admin3_view, herramienta_detalle, cerrar_sesion, crear_orden_despacho, obtener_ordenes_despacho, actualizar_estado_orden, redireccionar_view, iniciar_pago, respuesta, perfil_view
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', index_view, name='index'),
    path('admin/', admin.site.urls),
    path('adminlogin/', login_admin, name='login_admin'),
    path('cambiar_contraseña_admin/', cambiar_contraseña_admin, name='cambiar_contraseña_admin'),
    path('logout/', cerrar_sesion, name='logout'),
    path('api/', include('FerreMas.urls')),
    path('pedidos/', pedidos_View, name='pedidos'),
    path('detalle/', detalle_view, name='detalle'),
    path('carrito/<str:producto_id>/', carrito_view, name='carrito'),
    path('productos/', productos_view, name='productos'),
    path('contacto/', contacto_view, name='contacto'),
    path('admin1/' , admin1_view, name='admin1'),
    path('admin2/' , admin2_view, name='admin2'),
    path('admin3/' , admin3_view, name='admin3'),
    path('redireccionar/', redireccionar_view, name='redireccionar'),
    path("herramienta/<str:pk>/", herramienta_detalle),
    path('api/agregar-carrito/', agregar_al_carrito, name='agregar_carrito'),
    path('agregar_carrito/', agregar_al_carrito, name='agregar_carrito'), 
    path('crear-orden/', crear_orden_despacho, name='crear_orden_despacho'),
    path('api/ordenes/', obtener_ordenes_despacho, name='obtener_ordenes_despacho'),
    path('api/ordenes/actualizar/', actualizar_estado_orden, name='actualizar_estado_orden'),
    path('pago/iniciar/', iniciar_pago, name='iniciar_pago'),
    path('pago/respuesta/', respuesta, name='respuesta_pago'),
    path('pago/error/', pago_error, name='pago_error'),
    path('perfil/', perfil_view, name='perfil'),
    path('api/Herramienta/<str:pk>/', herramienta_api_view, name='api_herramienta'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


