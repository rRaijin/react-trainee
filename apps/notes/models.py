from django.db import models

from apps.user.models import User


class Note(models.Model):
    owner = models.ForeignKey(User, related_name="notes",
                              on_delete=models.CASCADE, null=True)
    text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text
