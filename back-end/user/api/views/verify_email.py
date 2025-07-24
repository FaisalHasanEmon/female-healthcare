from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from user.models import User


class VerifyEmailView(APIView):

    def get(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {"error": "Invalid verification link."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not default_token_generator.check_token(user, token):
            return Response(
                {"error": "Invalid or expired token"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if user.email_verified:
            return Response(
                {"message": "Email already verified."},
                status=status.HTTP_200_OK
            )

        user.email_verified = True
        user.save()

        return Response(
            {"message": "Email verified successfully."},
            status=status.HTTP_200_OK
        )
