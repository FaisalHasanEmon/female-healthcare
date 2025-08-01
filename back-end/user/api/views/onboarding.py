from rest_framework import serializers
from rest_framework import permissions

from rest_framework.generics import (
    CreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView,
    ListCreateAPIView,
    ListAPIView
)
from user.api.views.permissions import IsOwnerOfOnboarding
from user.api.serializers import (
    OnboardingSerializer,
    SymptomSerializer,
    DietaryStyleSerializer,
    GoalSerializer,
    ActivityLevelSerializer,
    StressLevelSerializer,
    BasicQuestionSerializer
)
from user.models import (
    Profile,
    Onboarding
)
from user.onboarding.onboarding_model import (
    Symptom,
    DietaryStyle,
    Goal,
    ActivityLevel,
    StressLevel
)


class OnboardingCreateAPIView(CreateAPIView):
    serializer_class = OnboardingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        profile = Profile.objects.get(user=self.request.user)
        if Onboarding.objects.filter(profile=profile).exists():
            raise serializers.ValidationError("Onboarding already exists.")
        serializer.save(profile=profile)


class OnboardingDetailAPIView(RetrieveAPIView):
    serializer_class = OnboardingSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfOnboarding]

    def get_queryset(self):
        return Onboarding.objects.filter(profile__user=self.request.user)


class OnboardingUpdateAPIView(UpdateAPIView):
    serializer_class = OnboardingSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfOnboarding]

    def get_queryset(self):
        return Onboarding.objects.filter(profile__user=self.request.user)


class OnboardingDeleteAPIView(DestroyAPIView):
    serializer_class = OnboardingSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfOnboarding]

    def get_queryset(self):
        return Onboarding.objects.filter(profile__user=self.request.user)


class SymptomListCreateAPIView(ListCreateAPIView):
    serializer_class = SymptomSerializer
    queryset = Symptom.objects.all()


class DietaryStyleListCreateAPIView(ListCreateAPIView):
    serializer_class = DietaryStyleSerializer
    queryset = DietaryStyle.objects.all()


class GoalListCreateAPIView(ListCreateAPIView):
    serializer_class = GoalSerializer
    queryset = Goal.objects.all()


class ActivityLevelListCreateAPIView(ListCreateAPIView):
    serializer_class = ActivityLevelSerializer
    queryset = ActivityLevel.objects.all()


class StressLevelListCreateAPIView(ListCreateAPIView):
    serializer_class = StressLevelSerializer
    queryset = StressLevel.objects.all()


class BasicQuestionListCreateAPIView(ListAPIView):
    serializer_class = BasicQuestionSerializer
    queryset = Onboarding.objects.all()
