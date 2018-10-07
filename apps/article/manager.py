from django.db import models


class ArticleQuerySet(models.QuerySet):
    pass


class ArticleManager(models.Manager.from_queryset(ArticleQuerySet)):
    pass
