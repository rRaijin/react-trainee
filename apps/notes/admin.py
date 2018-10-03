from django.contrib import admin

from apps.notes.models import Note


@admin.register(Note)
class NotesAdmin(admin.ModelAdmin):
    list_display = ('owner', 'text')
