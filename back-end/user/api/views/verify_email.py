from rest_framework.views import APIView
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from user.models import User
from django.shortcuts import render
from rest_framework.permissions import AllowAny


class VerifyEmailView(APIView):

    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            context = {"message": "Invalid verification link."}
            return render(request, "email_verification_result.html", context)

        if not default_token_generator.check_token(user, token):
            context = {"message": "Invalid or expired token."}
            return render(request, "email_verification_result.html", context)

        if user.email_verified:
            context = {"message": "Email already verified."}
            return render(request, "email_verification_result.html", context)

        user.email_verified = True
        user.save()

        context = {"message": "Email verified successfully."}
        return render(request, "email_verification_result.html", context)
