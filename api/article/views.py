from rest_framework import viewsets, permissions

from apps.article.models import Article
from api.article.serializers import ArticleSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    permission_classes = permissions.AllowAny,

    # TODO set permissions for list -> allowany, for update/delete -> custom owner, for create -> isauthenticated

    def get_queryset(self):
        return Article.objects.prefetch_related('author')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
