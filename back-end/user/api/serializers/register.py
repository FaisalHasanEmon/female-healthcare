import re
from rest_framework import serializers
from  user.models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'confirm_password']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "user with this email already exists."
            )
        return value

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        if password != confirm_password:
            raise serializers.ValidationError(
                {"error": "Passwords do not match."}
            )

        if len(password) < 8:
            raise serializers.ValidationError(
                {"error": "Password must be at least 8 characters long."}
            )
        if not re.search(r'[A-Z]', password):
            raise serializers.ValidationError(
                {"error": "Password must contain at least one uppercase letter."} # noqa
            )
        if not re.search(r'[a-z]', password):
            raise serializers.ValidationError(
                {"error": "Password must contain at least one lowercase letter."} # noqa
            )
        if not re.search(r'\d', password):
            raise serializers.ValidationError(
                {"error": "Password must contain at least one digit."}
            )
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise serializers.ValidationError(
                {"error": "Password must contain at least one special character."} # noqa
            )

        return data


    def create(self, validated_data):
        validated_data.pop('confirm_password')
        return User.objects.create_user(**validated_data)