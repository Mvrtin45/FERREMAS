from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, PedidoViewSet, HerramientaViewSet, CategoriaViewSet, pedidos_View
from . import views
from rest_framework import routers


router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'Pedido', PedidoViewSet)
router.register(r'Herramienta', HerramientaViewSet)
router.register(r'Categoria', CategoriaViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
     path('pedidos/', pedidos_View, name='pedidos'),
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

