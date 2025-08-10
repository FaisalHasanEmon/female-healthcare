# views.py
from rest_framework.generics import (
    CreateAPIView,
    RetrieveUpdateAPIView,
    RetrieveAPIView,
    ListAPIView
)
from rest_framework.exceptions import NotFound

from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from user.api.serializers import OnboardingSettingsSerializer
from user.models import Onboarding


class OnboardingSettingsCreateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OnboardingSettingsSerializer

    def perform_create(self, serializer):
        serializer.save()


class OnboardingSettingsUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OnboardingSettingsSerializer
    queryset = Onboarding.objects.all()

    def get_object(self):
        # Get the authenticated user's profile
        profile = self.request.user.profile
        # Try to get the Onboarding object using pk from the URL and the profile
        try:
            onboarding = Onboarding.objects.get(pk=self.kwargs['pk'], profile=profile)
            return onboarding
        except Onboarding.DoesNotExist:
            raise NotFound("Onboarding data not found for the user with the given pk")
        except Onboarding.MultipleObjectsReturned:
            raise serializers.ValidationError("Multiple onboarding records found for the user.")

    def update(self, request, *args, **kwargs):
        # Update logic here, based on the provided data
        return super().update(request, *args, **kwargs)


class OnboardingSettingsDetailsAPIView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OnboardingSettingsSerializer
    queryset = Onboarding.objects.all()

    def get_object(self):
        try:
            profile = self.request.user.profile
            return Onboarding.objects.get(pk=self.kwargs['pk'], profile=profile)
        except Onboarding.DoesNotExist:
            from rest_framework.exceptions import NotFound
            raise NotFound("Onboarding data not found")
        

class OnboardingSettingsListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OnboardingSettingsSerializer

    def get_queryset(self):
        return Onboarding.objects.filter(profile=self.request.user.profile)