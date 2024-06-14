from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminViewSet, TramiteViewSet, NumeroAtencionViewSet, UserViewSet, TramiteListView, TramiteVisaSet, TramiteVisaListView

router = DefaultRouter()
router.register(r'admin', AdminViewSet, basename='admin')
router.register(r'api/tramite', TramiteViewSet, basename='tramite')
router.register(r'api/tramitelist', TramiteListView, basename='tramitelist')
router.register(r'api/numeroatencion', NumeroAtencionViewSet, basename='numeroatencion')
router.register(r'api/users', UserViewSet, basename='users')
router.register(r'api/tramitevisa', TramiteVisaSet, basename='tramitevisa')
router.register(r'api/listatramitevisa', TramiteVisaListView, basename='listatramitevisa') 

tramite_list = TramiteListView.as_view({
    'get': 'list',  # Ejemplo: permitir el método GET para listar
})

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/listatramite/', tramite_list, name='listatramite'),
]