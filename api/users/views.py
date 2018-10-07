from rest_framework import mixins, permissions, viewsets

from . import serializers


class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):

    permission_classes = [permissions.IsAuthenticated, ]

    serializer_class_map = {
        'retrieve': serializers.UserSerializer,
        'partial_update': serializers.UpdateUsernameSerializer,
    }

    def get_serializer_class(self):
        return self.serializer_class_map[self.action]

    def get_object(self):
        return self.request.user
