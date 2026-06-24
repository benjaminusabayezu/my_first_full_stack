
from rest_framework import serializers
from .models import User

#login serializer imports:

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields =[
            'id',
            'username',
            'email',
            'password',
            'role'
        ]

    def create(self, validate_data):
        user = User.objects.create_user(
            username= validate_data['username'],
            email= validate_data['email'],
            password= validate_data['password'],
            role = validate_data.get('role','student')
        )
        return user
    
#login class

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError("Incorrect credentials")

        refresh = RefreshToken.for_user(user)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        }