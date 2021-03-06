from django.contrib import admin

from apps.comment.models import Comment


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('article', 'author', 'text', 'created', 'updated')
