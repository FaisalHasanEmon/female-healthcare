from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from user.api.serializers import UserProfileUpdateSerializer

User = get_user_model()


class UserProfileUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Return the user object for the authenticated user
        return self.request.user
