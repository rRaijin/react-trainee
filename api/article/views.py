from rest_framework import viewsets, permissions
from rest_framework.decorators import detail_route


from api.article.serializers import *


class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    permission_classes = permissions.IsAuthenticatedOrReadOnly,

    serializer_class_map = {
        'retrieve': ArticleSerializer,
        'list': ArticleSerializer,
        'create': ArticleSerializer,
        'self_articles': ArticleSerializer,
    }

    def get_serializer_class(self):
        return self.serializer_class_map[self.action]

    def get_queryset(self):
        author = self.request.user
        articles = Article.objects.prefetch_related('author').order_by('-created')
        if self.action == 'self_articles':
            return articles.filter(author=author)
        return articles

    def perform_create(self, serializer, format=None):
        author = self.request.user
        if self.request.data.get('image') is not None:
            image = self.request.data.get('image')
            serializer.save(author=author, image=image)
        else:
            serializer.save(author=author)

    # TODO permissions author only
    @detail_route(methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def self_articles(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
