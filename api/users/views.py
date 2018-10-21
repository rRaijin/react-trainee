from rest_framework import mixins, permissions, viewsets, response
from rest_framework.decorators import detail_route

from apps.user.models import User
from . import serializers


class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):

    permission_classes = [permissions.IsAuthenticated, ]

    serializer_class_map = {
        'retrieve': serializers.UserSerializer,
        'author': serializers.ArticleOwnerSerializer,
        'partial_update': serializers.UpdateUsernameSerializer,
    }

    def get_serializer_class(self):
        return self.serializer_class_map[self.action]


    def get_queryset(self):
        return User.objects.all()

    @detail_route(methods=['get'], permission_classes=[permissions.AllowAny])
    def author(self, request, *args, **kwargs):
        user = User.objects.get(id=self.kwargs['pk'])
        serializer = self.get_serializer(user)
        return response.Response(serializer.data)
