from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Tramite, Admin, NumeroAtencion, TramiteVisa , TramiteCedula

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class TramiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tramite 
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Admin 
        fields = '__all__'

class NumeroAtencionSerializer(serializers.ModelSerializer):
    class Meta: 
        model = NumeroAtencion 
        fields = '__all__'

class TramiteVisaSerializer(serializers.ModelSerializer):
    class Meta: 
        model = TramiteVisa 
        fields = '__all__'

class TramiteCedulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TramiteCedula
        fields = '__all__'