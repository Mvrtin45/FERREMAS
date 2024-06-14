from django.contrib import admin
from django.urls import path, include
from TramiFast.views import TramiteVisaSet, TramiteVisaListView, NumeroAtencionViewSet, TramiteViewSet, TramiteListView

urlpatterns = [
    path('admin/', admin.site.urls),    
    path('api/tramite/', TramiteViewSet.as_view(), name='tramite'),
    path('api/listatramite/', TramiteListView.as_view(), name='listatramite'),
    path('api/numeroatencion/', NumeroAtencionViewSet.as_view(), name='numeroatencion'),
    path('api/tramitevisa/', TramiteVisaSet.as_view(), name='tramitevisa'),
    path('api/listatramitevisa/', TramiteVisaListView.as_view(), name='listatramitevisa'),
]
