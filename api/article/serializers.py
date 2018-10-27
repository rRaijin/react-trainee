from rest_framework import serializers

from api.users.serializers import UserSerializer
from apps.article.models import Article


class ArticleSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only=True)
    created = serializers.DateTimeField(format="%Y-%m-%d", required=False, read_only=True)
    updated = serializers.DateTimeField(format="%Y-%m-%d", required=False, read_only=True)
    short_description = serializers.SerializerMethodField()
    img_name = serializers.SerializerMethodField()

    def get_img_name(self, obj):
        if obj.image:
            return obj.image.name.split('/')[-1]
        else:
            return False

    def get_short_description(self, obj):
        if obj.description:
            return obj.description[:100]
        else:
            return False

    class Meta:
        model = Article
        fields = (
            'id',
            'author',
            'headline',
            'description',
            'short_description',
            'img_name',
            'created',
            'updated',
        )
        read_only_fields = (
            'id',
            'created',
            'author',
            'short_description',
        )
