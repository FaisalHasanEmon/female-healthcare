from rest_framework import serializers
from django.contrib.auth import password_validation


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user

        if not user.check_password(value):
            raise serializers.ValidationError(
                "Old password is incorrect."
            )
        return value

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError(
                "New passwords do not match."
            )
        password_validation.validate_password(
            data['new_password'], self.context['request'].user
        )
        return data
