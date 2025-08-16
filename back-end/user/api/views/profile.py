from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView
)
from rest_framework.exceptions import PermissionDenied
from rest_framework import serializers
from user.models import Profile
from user.api.serializers import ProfileSerializer
from rest_framework.response import Response
from rest_framework import status


class ProfileCreateView(ListCreateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        if hasattr(request.user, 'profile'):
            return Response({"detail": "You have already created a profile."},
                            status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProfileDetailView(RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            profile = Profile.objects.get(user=self.request.user)
            if profile.is_active:
                return profile
            else:
                raise PermissionDenied("Profile not found.")
        except Profile.DoesNotExist:
            raise PermissionDenied("Profile not found.")


class ProfileUpdateView(UpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            return Profile.objects.get(user=self.request.user)
        except Profile.DoesNotExist:
            raise PermissionDenied("Profile not found.")

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class ProfileDeleteView(DestroyAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            profile = Profile.objects.get(user=self.request.user)
            profile.is_active = False
            profile.save()
            if profile.user != self.request.user:
                raise PermissionDenied("You do not have permission to delete this profile.")
            return profile
        except Profile.DoesNotExist:
            raise PermissionDenied("Profile not found.")
