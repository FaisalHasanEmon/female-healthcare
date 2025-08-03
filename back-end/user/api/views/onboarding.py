from rest_framework import serializers
from rest_framework import permissions
from datetime import date
from rest_framework.views import APIView
from rest_framework.generics import (
    CreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView,
    ListCreateAPIView,
)
from user.api.views.permissions import IsOwnerOfOnboarding
from user.api.serializers import (
    OnboardingSerializer,
    SymptomSerializer,
    DietaryStyleSerializer,
    GoalSerializer,
    ActivityLevelSerializer,
    StressLevelSerializer,
)
from user.models import (
    Profile,
    Onboarding,
    CycleInfo
)
from user.onboarding.onboarding_model import (
    Symptom,
    DietaryStyle,
    Goal,
    ActivityLevel,
    StressLevel
)
from rest_framework.response import Response


class OnboardingCreateAPIView(CreateAPIView):
    serializer_class = OnboardingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        profile = Profile.objects.get(user=self.request.user)
        if Onboarding.objects.filter(profile=profile).exists():
            raise serializers.ValidationError("Onboarding already exists.")
        onboarding = serializer.save(profile=profile)

        if onboarding.has_regular_cycle:
            CycleInfo.objects.get_or_create(
                profile=profile,
                defaults={
                    "start_date": date.today(),        # You can customize this
                    "end_date": date.today(),          # or leave as None
                    "cycle_length": 28,                # default or user input
                    "period_length": 5,                # default or user input
                    "current_phase": "Menstrual",      # or leave blank
                }
            )


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


class LifeStyleListAPIView(APIView):

    def get(self, request):
        dietary_styles = DietaryStyleSerializer(DietaryStyle.objects.all(), many=True).data
        activity_levels = ActivityLevelSerializer(ActivityLevel.objects.all(), many=True).data
        stress_levels = StressLevelSerializer(StressLevel.objects.all(), many=True).data
        return Response([
            {
                "dietary_style": dietary_styles,
                "activity_level": activity_levels,
                "stress_level": stress_levels
            },
        ])