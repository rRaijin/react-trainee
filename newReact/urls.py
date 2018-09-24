"""
newReact URL Configuration
"""
from django.contrib import admin
from django.conf.urls import include
from django.urls import path

from api import urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(urls)),
    path('api/auth/', include('knox.urls')),
]
