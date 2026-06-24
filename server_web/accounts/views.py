from rest_framework import generics
from .models import User
from .serializers import RegisterSerializer

from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import LoginSerializer

from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        return Response(
            serializer.validated_data
        )


# TEMPORARY: create admin on Render without Shell
class CreateAdminView(APIView):

    def post(self, request):

        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")


        if User.objects.filter(username=username).exists():
            return Response({
                "message": "User already exists"
            })


        user = User.objects.create_superuser(
            username=username,
            email=email,
            password=password
        )


        return Response({
            "message": "Admin created",
            "username": user.username
        })