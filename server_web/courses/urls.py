from django.urls import path
from .views import  (
    CourseListCreateView,
    CourseDetailView,
    DashboardStartsView,
)

urlpatterns = [
    path('dashboard/stats/',DashboardStartsView.as_view(),name='dashboard_stats',),
    path('',CourseListCreateView.as_view(), name="course_list"),
    path('<int:pk>/', CourseDetailView.as_view(), name='corse_details'),

]
