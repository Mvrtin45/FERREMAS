from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminViewSet, TramiteViewSet, NumeroAtencionViewSet, UserViewSet

router = DefaultRouter()
router.register('admin', AdminViewSet)
router.register('tramite', TramiteViewSet)
router.register('numeroatencion', NumeroAtencionViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
