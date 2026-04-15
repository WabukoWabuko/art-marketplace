from django.db import models
from django.conf import settings

class UserSettings(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    currency = models.CharField(max_length=3, default='USD')
    notifications_enabled = models.BooleanField(default=True)
    email_notifications = models.BooleanField(default=True)
    public_profile = models.BooleanField(default=True)
    theme = models.CharField(max_length=10, default='light')  # light, dark

    def __str__(self):
        return f"{self.user.email} settings"

class Wishlist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    artwork = models.ForeignKey('artworks.Artwork', on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'artwork')

    def __str__(self):
        return f"{self.user.email} - {self.artwork.title}"
