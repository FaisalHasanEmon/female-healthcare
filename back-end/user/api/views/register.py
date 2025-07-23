from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from django.core.mail import send_mail
from user.api.serializers.register import RegisterSerializer
from user.models import User
from user.utils import send_verification_email


class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # ✅ Send HTML email
        send_verification_email(user, request)

        return Response({
            "message": "User registered successfully. Please check your inbox to verify your email.",
            "user": {"email": user.email}
        }, status=status.HTTP_201_CREATED)
