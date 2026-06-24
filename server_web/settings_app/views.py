from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PlatformSettingsSerializer
from .models import PlatformSettings


class PlatformSettingsView(APIView):

    def get(self, request):
        settings = PlatformSettings.objects.first()

        if not settings:
            settings = PlatformSettings.objects.create(
                platform_name="LMS",
                support_email="support.lms@support.com"
            )

        serializer = PlatformSettingsSerializer(settings)
        return Response(serializer.data)

    def put(self, request):
        settings = PlatformSettings.objects.first()

        if not settings:
            return Response(
                {"detail": "Settings not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = PlatformSettingsSerializer(
            settings,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)