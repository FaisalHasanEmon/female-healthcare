# views.py
from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView,
    RetrieveAPIView
)
from rest_framework.permissions import IsAuthenticated
from user.api.serializers import OnboardingSettingsSerializer
from user.models import Onboarding


class OnboardingSettingsCreateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OnboardingSettingsSerializer

    def perform_create(self, serializer):
        serializer.save()


class OnboardingSettingsUpdateAPIView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OnboardingSettingsSerializer

    def get_object(self):
        try:
            return Onboarding.objects.get(profile=self.request.user.profile)
        except Onboarding.DoesNotExist:
            from rest_framework.exceptions import NotFound
            raise NotFound("Onboarding data not found")


class OnboardingSettingsDetailsAPIView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OnboardingSettingsSerializer

    def get_object(self):
        try:
            return Onboarding.objects.get(profile=self.request.user.profile)
        except Onboarding.DoesNotExist:
            from rest_framework.exceptions import NotFound
            raise NotFound("Onboarding data not found")