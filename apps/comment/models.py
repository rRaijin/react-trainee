from django.db import models

from apps.article.models import Article
from apps.user.models import User


class Comment(models.Model):

    article = models.ForeignKey(Article, related_name='comments', on_delete=models.CASCADE, null=False)
    author = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE, null=True)
    text = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text
