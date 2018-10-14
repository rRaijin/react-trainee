from rest_framework import serializers

from apps.user.models import User


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
            'username',
            'first_name',
            'last_name',
            'birth_date',
            'joined',
            'avatar_name'
        )
        read_only_fields = (
            'birthdate',
            'created',
        )


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
