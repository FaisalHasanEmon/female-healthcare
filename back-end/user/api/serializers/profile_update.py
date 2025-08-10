from django.utils import timezone
from rest_framework import serializers
from user.models import Profile, User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['name', 'age', 'address']


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    profile = ProfileUpdateSerializer()

    class Meta:
        model = User
        fields = ['email', 'new_email', 'email_verified', 'profile']

    def validate_email(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        new_email = validated_data.pop('new_email', None)

        # Update profile
        if profile_data:
            profile_serializer = self.fields['profile']
            profile_serializer.update(instance.profile, profile_data)

        # Start email change process
        if new_email and new_email != instance.email:
            self._initiate_email_change(instance, new_email)

        return instance

    def _initiate_email_change(self, user, new_email):
        user.new_email = new_email
        user.email_change_token = default_token_generator.make_token(user)
        user.email_change_requested_at = timezone.now()
        user.save()
        self._send_old_email_verification(user)

    def _send_old_email_verification(self, user):
        print(f"Sending verification to old email: {user.email}")

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = user.email_change_token
        verification_url = self.context['request'].build_absolute_uri(
            reverse(
                'verify_email_change', kwargs={'uidb64': uid, 'token': token}
            )
        )

        subject = "Confirm Email Change"
        context = {
            'current_email': user.email,
            'new_email': user.new_email,
            'verification_url': verification_url,
        }

        text_content = render_to_string(
            'email/email_change_verification.txt',
            context
        )
        html_content = render_to_string(
            'email/email_change_verification.html',
            context
        )

        email = EmailMultiAlternatives(
            subject,
            text_content,
            settings.DEFAULT_FROM_EMAIL,
            [user.email]
        )
        email.attach_alternative(html_content, "text/html")
        email.send()
