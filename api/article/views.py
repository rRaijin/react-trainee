from rest_framework import viewsets, permissions
from rest_framework.decorators import detail_route


from api.article import serializers
from apps.article.models import Article


class ArticleViewSet(viewsets.ModelViewSet):
    permission_classes = permissions.IsAuthenticatedOrReadOnly,

    serializer_class_map = {
        'retrieve': serializers.ArticleSerializer,
        'list': serializers.ArticleSerializer,
        'create': serializers.ArticleSerializer,
        'self_articles': serializers.ArticleSerializer,
        'partial_update': serializers.ArticleSerializer,
    }

    def get_serializer_class(self):
        return self.serializer_class_map[self.action]

    ordering = '-created'

    def get_queryset(self):
        author = self.request.user
        articles = Article.objects.prefetch_related('author')
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

    def perform_update(self, serializer):
        if self.request.data.get('image') is not None:
            image = self.request.data.get('image')
            serializer.save(image=image)
        else:
            serializer.save()

    # TODO permissions author only
    @detail_route(methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def self_articles(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
