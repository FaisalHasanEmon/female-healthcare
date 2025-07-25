
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
from user.models import User
from user.api.serializers.reset_password import (
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer
)
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives


class PasswordResetRequestView(CreateAPIView):
    serializer_class = PasswordResetRequestSerializer

    def perform_create(self, serializer):
        email = serializer.validated_data['email']
        user = User.objects.get(email=email)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = PasswordResetTokenGenerator().make_token(user)
        if not user:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)
        
        reset_link = f"http://127.0.0.1:8000/api/v1/password-reset-confirm/{uid}/{token}/"

        # ✅ Render HTML email content
        html_message = render_to_string('email/password_reset_email.html', {
            'reset_link': reset_link,
        })

        subject = "Reset Your Password"
        from_email = settings.DEFAULT_FROM_EMAIL
        to = [email]

        # ✅ Email with plain text and HTML
        email_message = EmailMultiAlternatives(
            subject=subject,
            body="Click the link to reset your password: " + reset_link,  # plain text fallback
            from_email=from_email,
            to=to
        )
        email_message.attach_alternative(html_message, "text/html")
        email_message.send()



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