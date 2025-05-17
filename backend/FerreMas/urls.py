from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import contacto_view, PedidoViewSet, HerramientaViewSet, CategoriaViewSet, pedidos_View, detalle_view, carrito_view,productos_view, index_view, login_view, UserViewSet, register_view
from . import views
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'Pedido', PedidoViewSet)
router.register(r'Herramienta', HerramientaViewSet)
router.register(r'Categoria', CategoriaViewSet)



urlpatterns = [
    path('', index_view, name='index'),
    path('api/', include(router.urls)),
    path('login/', login_view, name='login'),
    path('pedidos/', pedidos_View, name='pedidos'),
    path('detalle/', detalle_view, name='detalle'),
    path('carrito/', carrito_view, name='carrito'),
    path('productos/', productos_view, name='productos'),
    path('contacto/', contacto_view, name='contacto'),
    path('register/', register_view, name='register'),
   
]




##from django.urls import path, include
##from rest_framework.routers import DefaultRouter
##from .views import AdminViewSet, TramiteCedulaViewSet, TramiteViewSet, NumeroAtencionViewSet, UserViewSet, TramiteVisaViewSet, TramiteVisaDetail, TramiteCedulaDetail
##from . import views

##router = DefaultRouter()
##router.register(r'tramites', TramiteViewSet)
##router.register(r'admins', AdminViewSet)
##router.register(r'numero-atenciones', NumeroAtencionViewSet)
##router.register(r'users', UserViewSet)
##router.register(r'tramite-visas', TramiteVisaViewSet)
##router.register(r'tramite-cedulas', TramiteCedulaViewSet)

##urlpatterns = [
##path('api/', include(router.urls)),]

