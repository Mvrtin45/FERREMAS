from django.contrib import admin
from django.urls import path
from TramiFast.views import TramiteVisaViewSet, TramiteVisaListView, NumeroAtencionViewSet, TramiteCedulaViewSet, UserViewSet, TramiteVisaDetail, TramiteCedulaDetail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/tramitecedula/<int:id>/', TramiteCedulaDetail.as_view(), name='tramitecedula-detail'),
    path('api/tramitevisa/<int:pk>/', TramiteVisaDetail.as_view(), name='tramitevisa-detail'),
    path('api/tramitecedula/', TramiteCedulaViewSet.as_view({'get': 'list', 'post': 'create'}), name='tramitecedula'),
    path('api/numeroatencion/', NumeroAtencionViewSet.as_view({'get': 'list', 'post': 'create'}), name='numeroatencion'),
    path('api/users/', UserViewSet.as_view({'get': 'list', 'post': 'create'}), name='users'),
    path('api/tramitevisa/', TramiteVisaViewSet.as_view({'get': 'list', 'post': 'create'}), name='tramitevisa'),
    path('api/listatramitevisa/', TramiteVisaListView.as_view(), name='listatramitevisa'),
]


