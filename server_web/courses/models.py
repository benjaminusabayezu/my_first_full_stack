from django.db import models
from django.conf import settings

# Create your models here.

class Course(models.Model):

    title =models.CharField(max_length=255)
    duration= models.CharField(max_length=50)

    video= models.URLField()
    instructor= models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="courses"
    )

    views = models.PositiveBigIntegerField(default=0)
    likes =models.PositiveBigIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at =models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title