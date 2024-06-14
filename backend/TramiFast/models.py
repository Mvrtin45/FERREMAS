from django.db import models

# Create your models here.
class Tramite(models.Model):
    id = models.CharField(max_length=20, primary_key=True, unique=True)
    nombreTramite = models.CharField(max_length=30)
    fecha = models.DateField()

    def __str__(self):
        return f"{self.id} : {self.nombreTramite} : {self.fecha}"
    
class Admin(models.Model):
    UserAdmin = models.CharField(max_length=10, primary_key=True, unique=True)
    contrasenaAdmin = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.UserAdmin} : {self.contrasenaAdmin}"
    
class NumeroAtencion(models.Model):
    numero = models.CharField(max_length=2)
    ubicacion = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.numero} : {self.ubicacion}"

class TramiteVisa(models.Model):
    nombreV = models.CharField(max_length=20)
    apellidoV = models.CharField(max_length=30)
    paisV = models.CharField(max_length=30)
    motivodeV = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.nombreV} : {self.apellidoV} : {self.paisV} : {self.motivodeV}"

    

    

