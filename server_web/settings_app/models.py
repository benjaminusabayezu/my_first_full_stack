from django.db import models


class PlatformSettings(models.Model):

    platform_name = models.CharField(max_length=200)
    platform_describtion = models.TextField(blank=True)

    company_name = models.CharField(
        max_length=100,
        default="BEN"
    )

    company_suffix = models.CharField(
        max_length=100,
        default="VISUAL"
    )

    support_email = models.EmailField(default="lms.support@benvisual.com")

    smtp_host = models.CharField(max_length=255, blank=True)
    smtp_port = models.IntegerField(default=587)

    # users
    allow_registration = models.BooleanField(default=True)
    default_role = models.CharField(
        max_length=20,
        default="student"
    )

    # courses
    auto_publish_courses = models.BooleanField(default=False)
    require_course_approval = models.BooleanField(default=True)

    # settings
    session_timeout = models.IntegerField(default=60)
    password_min_length = models.IntegerField(default=8)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.platform_name