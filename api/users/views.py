from rest_framework import permissions, viewsets

from api.users.serializers import UserSerializer
from apps.user.models import User


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    queryset = User.objects.all()

    # TODO incorrect, temp
    def get_object(self):
        return self.request.user
