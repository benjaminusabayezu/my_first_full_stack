from django.urls import path
from rest_framework.response import Response
from .views import RegisterView,LoginView, CreateAdminView, DebugLoginView
from rest_framework_simplejwt.views import(
    
    TokenRefreshView
)

urlpatterns = [
     path('register/',RegisterView.as_view(), name='register'),
     path('login/',LoginView.as_view(), name='login'),
     path('refresh/',TokenRefreshView.as_view(), name='refresh'),
     path("create-admin/",CreateAdminView.as_view()),
     path("test/", lambda request: Response({"ok":"yes"}))

     path('debug-login/',DebugLoginView.as_view() ),
]
