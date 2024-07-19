from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminViewSet, TramiteCedulaViewSet, TramiteViewSet, NumeroAtencionViewSet, UserViewSet, TramiteVisaViewSet, TramiteVisaDetail, TramiteCedulaDetail
from . import views

router = DefaultRouter()
router.register(r'tramites', TramiteViewSet)
router.register(r'admins', AdminViewSet)
router.register(r'numero-atenciones', NumeroAtencionViewSet)
router.register(r'users', UserViewSet)
router.register(r'tramite-visas', TramiteVisaViewSet)
router.register(r'tramite-cedulas', TramiteCedulaViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]