from django.contrib.auth.models import User
from rest_framework import generics, permissions, viewsets

from api.users.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    queryset = User.objects.all()

    def get_object(self):
        return self.request.user
