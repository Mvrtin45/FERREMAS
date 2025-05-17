from django.contrib import admin
from .models import Categoria,Herramienta,Pedido,DetallePedido,Cliente

# Register your models here.
admin.site.register(Categoria)
admin.site.register(Herramienta)
admin.site.register(Pedido)
admin.site.register(DetallePedido)
admin.site.register(Cliente)