"""
newReact URL Configuration
"""
from django.contrib import admin
from django.conf.urls import include
from django.urls import path
from rest_framework_swagger.views import get_swagger_view

from api import urls


schema_view = get_swagger_view(title='Pastebin API')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(urls)),
    path('api/auth/', include('knox.urls')),
    path('schema/', schema_view),
]
