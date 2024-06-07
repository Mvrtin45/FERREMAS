from django.contrib import admin
from .models import Tramite, Admin, NumeroAtencion

# Register your models here.
admin.site.register(Tramite)
admin.site.register(Admin)
admin.site.register(NumeroAtencion)