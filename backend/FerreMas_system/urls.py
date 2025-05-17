from django.contrib import admin
from django.urls import path, include
from FerreMas.views import pedidos_View

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('FerreMas.urls')),
    path('pedidos/', pedidos_View, name='pedidos'),
]


