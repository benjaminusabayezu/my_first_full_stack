from rest_framework import generics
from .models import User
from .serializers import RegisterSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
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

        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                "email": email,
                "role": "admin"
            }
        )

        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save()

        return Response({
            "message": "Admin password reset",
            "username": user.username,
            "created": created
        })
    
class DebugLoginView(APIView):
    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(
            username=username,
            password=password
        )

        return Response({
            "authenticated": user is not None,
            "username_received": username,
            "user": str(user)
        })
    
class PasswordCheckView(APIView):
           def post(self, request):

              username = request.data.get("username")
              password = request.data.get("password")

              user = User.objects.get(username=username)

              return Response({
               "username": user.username,
               "stored_password": user.password[:20],
               "check_password": user.check_password(password),
               "is_active": user.is_active,
        })
class CheckUserRoleView(APIView):
    def get(self, request):

        user = User.objects.get(username="superuser")

        return Response({
            "username": user.username,
            "role": user.role,
            "is_superuser": user.is_superuser,
            "database": user._state.db
        })
