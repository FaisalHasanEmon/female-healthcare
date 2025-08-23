from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from django.db import transaction
from rest_framework.response import Response
from rest_framework import status
from user.api.serializers.register import RegisterSerializer
from user.utils import send_verification_email
from user.models import User, Profile


class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        with transaction.atomic():
            profile_data = {
                'user': user,
                'name': request.data.get('name', user.email.split('@')[0]),
            }

            profile = Profile.objects.create(**profile_data)
            print(f"Profile created for user: {profile.name}")

        # ✅ Send HTML email
        send_verification_email(user, request)

        return Response({
            "message": "User registered successfully. Please check your inbox to verify your email.",
            # "user": {"email": user.email},
            # "profile": {"name": profile.name},
        }, status=status.HTTP_201_CREATED)
