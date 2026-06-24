
from rest_framework import generics
from .models import User
from .serializers import RegisterSerializer

#for login 
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import LoginSerializer


# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset =User.objects.all()
    serializer_class =RegisterSerializer

class LoginView(APIView):
    def post(self ,request):
        serializer = LoginSerializer(
            data=request.data
        )
        serializer.is_valid(
            raise_exception=True
        )
        return Response(
            serializer.validated_data
        )