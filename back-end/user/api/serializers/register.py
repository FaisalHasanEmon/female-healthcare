import re
from rest_framework import serializers
from  user.models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'confirm_password']

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        # Check if passwords match
        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match.")

        # Custom password rules
        if len(password) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        if not re.search(r'[A-Z]', password):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        if not re.search(r'[a-z]', password):
            raise serializers.ValidationError("Password must contain at least one lowercase letter.")
        if not re.search(r'\d', password):
            raise serializers.ValidationError("Password must contain at least one digit.")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise serializers.ValidationError("Password must contain at least one special character.")

        return data


    def create(self, validated_data):
        validated_data.pop('confirm_password')
        return CustomUser.objects.create_user(**validated_data)