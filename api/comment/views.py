from rest_framework import viewsets, permissions

from apps.comment.models import Comment
from api.comment.serializers import CommentSerializer


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = permissions.AllowAny,

    # TODO set permissions for list -> allowany, for update/delete -> custom owner, for create -> isauthenticated

    def get_queryset(self):
        return Comment.objects.prefetch_related('author')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
