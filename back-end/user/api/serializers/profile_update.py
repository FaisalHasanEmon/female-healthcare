from rest_framework import serializers
from django.contrib.auth import get_user_model
from user.models import Profile, User


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['name', 'age', 'date_of_birth']


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    profile = ProfileUpdateSerializer()

    class Meta:
        model = User
        fields = ['email', 'email_verified', 'profile']
    
    def validate_email(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        
        # Update User email
        instance.email = validated_data.get('email', instance.email)
        instance.email_verified = validated_data.get(
            'email_verified', instance.email_verified
        )
        instance.save()

        # Update Profile fields
        profile = instance.profile
        profile.name = profile_data.get('name', profile.name)
        profile.age = profile_data.get('age', profile.age)
        profile.date_of_birth = profile_data.get(
            'date_of_birth', profile.date_of_birth
        )
        profile.save()

        return instance
