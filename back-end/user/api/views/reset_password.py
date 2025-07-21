
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.conf import settings
from user.models import CustomUser
from user.api.serializers.reset_password import (
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer
)


class PasswordResetRequestView(CreateAPIView):
    serializer_class = PasswordResetRequestSerializer

    def perform_create(self, serializer):
        email = serializer.validated_data['email']
        user = CustomUser.objects.get(email=email)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = PasswordResetTokenGenerator().make_token(user)

        reset_link = f"http://127.0.0.1:8000/api/v1/password-reset-confirm/{uid}/{token}/"
        print(reset_link)
        # Send the reset link to the user's email

        send_mail(
            subject="Password Reset Request",
            message=f"Click the link to reset your password:\n{reset_link}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False
        )


class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save(uidb64, token)
                return Response({"message": "Password has been reset successfully."}, status=200)
            except serializers.ValidationError as e:
                return Response({"error": str(e.detail[0])}, status=400)
        return Response(serializer.errors, status=400)