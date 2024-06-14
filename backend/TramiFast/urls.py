from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminViewSet, TramiteViewSet, TramiteListView, NumeroAtencionViewSet, UserViewSet, TramiteVisaViewSet, TramiteVisaListView

router = DefaultRouter()
router.register(r'admin', AdminViewSet)
router.register(r'tramite', TramiteViewSet, basename='tramite')
router.register(r'numeroatencion', NumeroAtencionViewSet)
router.register(r'users', UserViewSet)
router.register(r'tramitevisa', TramiteVisaViewSet)

urlpatterns = [
    path('api/', include(router.urls)),  # Incluimos las rutas generadas por el router
    path('api/tramitelist/', TramiteListView.as_view(), name='tramitelist'),
    path('api/listatramitevisa/', TramiteVisaViewSet.as_view(), name='listatramitevisa'),
    path('api/numeroatencion/', NumeroAtencionViewSet.as_view(), name='numeroatencion'),
]