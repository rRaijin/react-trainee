from rest_framework import serializers

from api.users.serializers import UserSerializer
from apps.article.models import Article


class ArticleSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only=True)

    class Meta:
        model = Article
        fields = (
            'id',
            'author',
            'headline',
            'description',
            'image',
            'created',
            'updated',
        )
        read_only_fields = (
            'id',
            'created',
            'author',
        )
