from django.shortcuts import render
from .serializers import CourseSerializer
from rest_framework import generics
from .models import Course
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.db.models import  Sum
from accounts.models import User
from rest_framework.response import Response


class CourseListCreateView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Course.objects.all()

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)


class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

class DashboardStartsView(APIView):
    permission_classes =[IsAuthenticated]

    def get(self, request):
        total_courses =Course.objects.count()
        total_students =User.objects.filter(
            role="student"
        ).count()

        total_instructors = User.objects.filter(
            role="admin"
        ).count()
        total_views= Course.objects.aggregate(
                total=Sum("views")
               )["total"]or 0
        
        recent_courses =Course.objects.order_by(
            "-created_at"
        )[:5]
        recent_courses_data =[]
        for course in recent_courses:
            recent_courses_data.append({
                "id":course.id,
                "title":course.title,
                "duration":course.duration,
                "views":course.views,
                "instructor": course.instructor.username,
            })
        
        return  Response ({
           "stats":{
               "courses": total_courses,
               "students":total_students,
               "instructors": total_instructors,
               "views":total_views,
           },
           "recent_courses": recent_courses_data,
        })