from rest_framework import serializers

from api.users.serializers import UserSerializer
from apps.comment.models import Comment


class CommentSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only=True)
    created = serializers.DateTimeField(format="%Y-%m-%d", required=False, read_only=True)
    updated = serializers.DateTimeField(format="%Y-%m-%d", required=False, read_only=True)

    class Meta:
        model = Comment
        fields = (
            'id',
            'article',
            'author',
            'description',
            'created',
            'updated',
        )
        read_only_fields = (
            'id',
            'article',
            'created',
            'author',
        )
