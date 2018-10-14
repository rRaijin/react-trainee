from django.db import models

from apps.article.manager import ArticleManager
from apps.user.models import User


class Article(models.Model):

    objects = ArticleManager()

    headline = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(null=True, blank=True)

    # TODO category, tags

    author = models.ForeignKey(User, related_name="articles",
                              on_delete=models.DO_NOTHING, null=False)

    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now_add=True)
