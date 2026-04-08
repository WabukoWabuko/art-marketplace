from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Tutorial(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    content = models.TextField()
    video_url = models.URLField(blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tutorials')
    image = models.ImageField(upload_to='tutorials/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
