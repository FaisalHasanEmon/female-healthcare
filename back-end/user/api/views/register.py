from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from django.core.mail import send_mail
from user.api.serializers.register import RegisterSerializer
from user.models import User
from user.utils import generate_verification_link


class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # SAVE THE USER FIRST
        user = serializer.save()

        # THEN generate token
        verification_link = generate_verification_link(user, request)

        # Send email
        send_mail(
            subject='Verify Your Email',
            message=f'Click the link to verify your email: {verification_link}',
            from_email=None,
            recipient_list=[user.email],
        )

        return Response({
            "message": "User registered successfully. Please check your email to verify your account.",
            "user": {"email": user.email}
        }, status=status.HTTP_201_CREATED)
