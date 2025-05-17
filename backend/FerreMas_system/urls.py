from django.contrib import admin
from django.urls import path, include
from FerreMas.views import pedidos_View, detalle_view, carrito_view, productos_view, index_view,contacto_view
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', index_view, name='index'),
    path('admin/', admin.site.urls),
    path('api/', include('FerreMas.urls')),
    path('pedidos/', pedidos_View, name='pedidos'),
    path('detalle/', detalle_view, name='detalle'),
    path('carrito/', carrito_view, name='carrito'),
    path('productos/', productos_view, name='productos'),
    path('contacto/', contacto_view, name='contacto'),

   
]


