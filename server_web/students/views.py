from django.shortcuts import render
from rest_framework import generics
from .serializers import StudentSerializer
from accounts.models import User 

# Create your views here.

class StudentListView(generics.ListAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        return User.objects.filter(role="student")