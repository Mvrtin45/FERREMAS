from django.db import models

# Create your models here.
class Tramite(models.Model):
    id = models.CharField(max_length=20, primary_key=True, unique=True)
    nombreTramite = models.CharField(max_length=30)
    fecha = models.DateField()

    def __str__(self):
        return f"id : {self.id} | nombretramite: {self.nombreTramite} | fecha: {self.fecha}"
    
class Admin(models.Model):
    UserAdmin = models.CharField(max_length=10, primary_key=True, unique=True)
    contrasenaAdmin = models.CharField(max_length=10)

    def __str__(self):
        return f"Admin: {self.UserAdmin} | Contrasena: {self.contrasenaAdmin}"
    
class NumeroAtencion(models.Model):
    numero = models.CharField(max_length=2)
    ubicacion = models.CharField(max_length=30)

    def __str__(self):
        return f"numero: {self.numero} | ubicacion: {self.ubicacion}"

class TramiteVisa(models.Model):
    nombreV = models.CharField(max_length=20)
    apellidoV = models.CharField(max_length=30)
    paisV = models.CharField(max_length=30)
    motivodeV = models.CharField(max_length=300)

    def __str__(self):
        return f"nombrevisa : {self.nombreV} | apellidovisa : {self.apellidoV} | paisvisa : {self.paisV} | motivodevisa : {self.motivodeV}"
    
class TramiteCedula(models.Model):
    id = models.AutoField(primary_key=True)
    nombreC = models.CharField(max_length=100)
    apellidoC = models.CharField(max_length=100)
    rutC = models.CharField(max_length=10, unique=True)  
    fecha_nacimientoC = models.DateField()
    direccionC = models.TextField()

    def __str__(self):
        return f" nombre : {self.nombreC} | apellido : {self.apellidoC} | rut : {self.rutC} | fecha_nacimiento : {self.fecha_nacimientoC} | direccion : {self.direccionC}"

    

    

