from rest_framework import viewsets, permissions

from api.article.serializers import *


class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    permission_classes = permissions.IsAuthenticatedOrReadOnly,

    def get_queryset(self):
        return Article.objects.prefetch_related('author').order_by('-created')

    def perform_create(self, serializer, format=None):
        author = self.request.user
        if self.request.data.get('image') is not None:
            image = self.request.data.get('image')
            serializer.save(author=author, image=image)
        else:
            serializer.save(author=author)
