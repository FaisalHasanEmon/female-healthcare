from rest_framework import serializers
from user.models import (
    Onboarding,
    CycleInfo,
    SymptomActivityLevel
)
from user.onboarding.onboarding_model import (
    Symptom,
    DietaryStyle,
    Goal,
    ActivityLevel,
    StressLevel,
)
from datetime import date


class OnboardingSerializer(serializers.ModelSerializer):
    def validate_symptoms(self, value):
        if len(value) >= 4:
            raise serializers.ValidationError(
                "You can select fewer than 4 symptoms."
            )
        return value

    class Meta:
        model = Onboarding
        fields = (
            'id',
            'has_regular_cycle',
            'is_menopausal',
            'on_hormonal_treatment',
            'symptoms',
            'dietary_styles',
            'activity_level',
            'stress_level',
            'supplements_medications',
            'goals',
            'daily_reminder'
        )
        read_only_fields = ['profile']


class CycleInfoSerializer(serializers.ModelSerializer):
    # day_in_cycle = serializers.SerializerMethodField()
    # phase_distribution = serializers.SerializerMethodField()
    class Meta:
        model = CycleInfo
        fields = (
            'id',
            'profile',
            'start_date',
            'end_date',
            'cycle_length',
            'period_length',
            'current_phase',
            # 'day_in_cycle',
            # 'phase_distribution'
        )
        read_only_fields = ['profile']

    # def get_day_in_cycle(self, obj):
    #     if not obj.start_date:
    #         return None
    #     today = date.today()
    #     delta = (today - obj.start_date).days % obj.cycle_length
    #     return delta + 1  # Day count starts from 1

    # def get_phase_distribution(self, obj):
    #     """
    #     Returns a dict with phase names and lengths (in days) for the donut chart.
    #     This is an example; adjust based on your medical logic.
    #     """
    #     period_days = obj.period_length or 5
    #     follicular_days = 9  # early + late follicular
    #     ovulatory_days = 4
    #     luteal_days = obj.cycle_length - (period_days + follicular_days + ovulatory_days)

    #     return {
    #         "menstrual": period_days,
    #         "follicular": follicular_days,
    #         "ovulatory": ovulatory_days,
    #         "luteal": luteal_days
    #     }


class BasicQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Onboarding
        fields = (
            'id',
            'has_regular_cycle',
            'is_menopausal',
            'on_hormonal_treatment',
        )


class SymptomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptom
        fields = ('id', 'name')


class DietaryStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DietaryStyle
        fields = ('id', 'name')


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ('id', 'name')


class ActivityLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityLevel
        fields = ('id', 'name')


class StressLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = StressLevel
        fields = ('id', 'name')


class SymptomActivityLevelSerializer(serializers.ModelSerializer):
    symptom_name = serializers.CharField(source='symptom.name')
    activity_level_name = serializers.CharField(source='activity_level.name')

    class Meta:
        model = SymptomActivityLevel
        fields = ['day', 'symptom_name', 'activity_level_name']