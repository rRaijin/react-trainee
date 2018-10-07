from django.conf.urls import include
from django.urls import path
from rest_framework import routers

from api.article.views import ArticleViewSet
from api.auth.views import RegistrationAPI, LoginAPI, UserAPI
from api.notes.views import NoteViewSet

# API Registration
from api.users.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'notes', NoteViewSet, base_name='notes')
router.register(r'users', UserViewSet, base_name='users')
router.register(r'articles', ArticleViewSet, base_name='articles')


urlpatterns = [
    path('auth/register/', RegistrationAPI.as_view()),
    path('auth/login/', LoginAPI.as_view()),
    path('auth/user/', UserAPI.as_view()),
    path('', include(router.urls)),
]
