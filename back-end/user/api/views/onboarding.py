from rest_framework import permissions
from rest_framework import serializers
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
    CycleInfoSerializer,
    SymptomActivityLevelSerializer
)

from user.models import (
    Profile,
    Onboarding,
    CycleInfo,
    SymptomActivityLevel
)
from user.onboarding.onboarding_model import (
    Symptom,
    DietaryStyle,
    Goal,
    ActivityLevel,
    StressLevel
)
from rest_framework.response import Response
from rest_framework import status




class OnboardingCreateAPIView(CreateAPIView):
    serializer_class = OnboardingSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        profile = Profile.objects.get(user=self.request.user)
        if Onboarding.objects.filter(profile=profile).exists():
            raise serializers.ValidationError("Onboarding already exists.")
        onboarding = serializer.save(profile=profile)

        cycle_info = None

        if onboarding.has_regular_cycle:
            cycle_info = CycleInfo.objects.create(
                profile=profile,
                start_date=None,
                end_date=None,
                cycle_length=28,
                period_length=5,
                current_phase='Menstrual'
                
            )
        
        cycle_info_data = None
        if cycle_info:
            cycle_info_data = CycleInfoSerializer(cycle_info).data

        responce_data = serializer.data
        if cycle_info_data:
            responce_data['cycle_info'] = cycle_info_data

        return Response(responce_data)


class OnboardingDetailAPIView(RetrieveAPIView):
    serializer_class = OnboardingSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfOnboarding]

    def get_queryset(self):
        return Onboarding.objects.filter(profile__user=self.request.user)
    

class CycleInfoDetailAPIView(RetrieveAPIView):
    serializer_class = CycleInfoSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfOnboarding]

    def get_queryset(self):
        return CycleInfo.objects.filter(profile__user=self.request.user)


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
        dietary_styles = DietaryStyleSerializer(
            DietaryStyle.objects.all(),
            many=True
        ).data
        activity_levels = ActivityLevelSerializer(
            ActivityLevel.objects.all(),
            many=True
        ).data
        stress_levels = StressLevelSerializer(
            StressLevel.objects.all(),
            many=True
        ).data
        return Response({
            "dietary_style": dietary_styles,
            "activity_level": activity_levels,
            "stress_level": stress_levels
        })


class SymptomActivityLevelChartView(APIView):
    def get(self, request, profile_id=None):
        # Map activity levels to numeric values for chart
        activity_map = {'None': 0, 'Low': 1, 'Moderate': 2, 'High': 3}

        # Fetch data for the given profile
        try:
            queryset = SymptomActivityLevel.objects.filter(
                profile_id=profile_id
            ).select_related('symptom', 'activity_level')
            serializer = SymptomActivityLevelSerializer(queryset, many=True)

            # Transform data for chart
            chart_data = {
                'days': [item['day'] for item in serializer.data],
                'activity_levels': [activity_map.get(item['activity_level_name'], 0) for item in serializer.data],
                'symptoms': [item['symptom_name'] for item in serializer.data],
                'days_order': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                'activity_levels_order': ['None', 'Low', 'Moderate', 'High']
            }

            return Response(chart_data, status=status.HTTP_200_OK)
        except SymptomActivityLevel.DoesNotExist:
            return Response({'error': 'No data found for this profile'}, status=status.HTTP_404_NOT_FOUND)