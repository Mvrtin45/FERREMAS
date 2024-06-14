from django.contrib import admin
from django.urls import path, include
from TramiFast.views import TramiteVisaViewSet, TramiteVisaListView, NumeroAtencionViewSet, TramiteViewSet, TramiteListView, UserViewSet

urlpatterns = [
    path('admin/', admin.site.urls), 
    path('api/tramite/', TramiteViewSet.as_view({'get': 'list', 'post': 'create'}), name='tramite'),
    path('api/tramitelist/', TramiteListView.as_view({'get': 'list'}), name='tramitelist'),
    path('api/numeroatencion/', NumeroAtencionViewSet.as_view({'get': 'list', 'post': 'create'}), name='numeroatencion'),
    path('api/users/', UserViewSet.as_view({'get': 'list', 'post': 'create'}), name='users'),
    path('api/tramitevisa/', TramiteVisaViewSet.as_view({'get': 'list', 'post': 'create'}), name='tramitevisa'),
    path('api/listatramitevisa/', TramiteVisaListView.as_view(), name='listatramitevisa'),
]
