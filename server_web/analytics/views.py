from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from courses.models import Course
from accounts.models import User
from rest_framework.views import APIView

# Create your views here.
class AnalyticsView(APIView):
    def get(self, request):

        data={
            "courses": Course.objects.count(),
            "students": User.objects.filter(
                role ="student"
            ).count(),

            "instructors": User.objects.filter(
                role="instructor"
            ).count(),

            "views": sum(
                Course.objects.values_list(
                    "views", flat=True
                )
            )
        }

        return Response(data)