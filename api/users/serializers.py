from rest_framework import serializers

from apps.article.models import Article
from apps.user.models import User


# TODO ImportError: cannot import name 'Article1Serializer'
class ArticlePreviewSerializer(serializers.ModelSerializer):

    created = serializers.DateTimeField(format="%Y-%m-%d", required=False, read_only=True)
    updated = serializers.DateTimeField(format="%Y-%m-%d", required=False, read_only=True)

    # TODO костыль для получения имени картинки для получения полного пути в компоненте
    img_name = serializers.SerializerMethodField()

    def get_img_name(self, obj):
        if obj.image:
            return obj.image.name
        else:
            return False

    class Meta:
        model = Article
        fields = (
            'id',
            'headline',
            'description',
            'img_name',
            'created',
            'updated',
        )
        read_only_fields = (
            'id',
            'created',
        )


class UserSerializer(serializers.ModelSerializer):

    joined = serializers.DateTimeField(format="%Y-%m-%d", read_only=True, source='created')
    avatar_name = serializers.SerializerMethodField()

    def get_avatar_name(self, obj):
        if obj.avatar:
            return obj.avatar.name
        else:
            return None

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'birth_date',
            'joined',
            'avatar_name'
        )
        read_only_fields = (
            'id',
            'birthdate',
            'created',
        )


class ArticleOwnerSerializer(UserSerializer):

    articles = serializers.ListSerializer(child=ArticlePreviewSerializer(source='articles'))

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ('articles',)


class UpdateUsernameSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'birth_date',
            'avatar',
        )
