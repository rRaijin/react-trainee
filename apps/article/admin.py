from django.contrib import admin

from apps.article.models import Article


@admin.register(Article)
class ArticlesAdmin(admin.ModelAdmin):
    list_display = ['id', 'headline', 'author', 'created', 'updated']
