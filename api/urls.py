from django.conf.urls import include
from django.urls import path
from rest_framework import routers

from api.article.views import ArticleViewSet
from api.auth.views import RegistrationAPI, LoginAPI, UserAPI
from api.comment.views import CommentViewSet
from api.notes.views import NoteViewSet
from api.users.views import UserViewSet

# API Registration
router = routers.DefaultRouter()
router.register(r'notes', NoteViewSet, base_name='notes')
router.register(r'users', UserViewSet, base_name='users')
router.register(r'articles', ArticleViewSet, base_name='articles')
router.register(r'comments', CommentViewSet, base_name='comments')


urlpatterns = [
    path('auth/register/', RegistrationAPI.as_view()),
    path('auth/login/', LoginAPI.as_view()),
    path('auth/user/', UserAPI.as_view()),
    path('', include(router.urls)),
]
