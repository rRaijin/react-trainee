from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    readonly_fields = ('id', 'password')
    list_display = ('id', 'username', 'is_staff')
