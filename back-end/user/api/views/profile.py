from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView
)
from rest_framework import serializers
from user.models import Profile
from user.api.serializers import ProfileSerializer


class ProfileCreateView(ListCreateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if Profile.objects.filter(user=self.request.user).exists():
            raise serializers.ValidationError("You already have a profile.")
        serializer.save(user=self.request.user)
    

class ProfileDetailView(RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Profile.objects.get(user=self.request.user)
    

class ProfileUpdateView(UpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Profile.objects.get(user=self.request.user)
    

class ProfileDeleteView(DestroyAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Profile.objects.get(user=self.request.user)
