from rest_framework import serializers
from user.models import (
    Onboarding
)
from user.onboarding.onboarding_model import (
    Symptom,
    DietaryStyle,
    Goal,
    ActivityLevel,
    StressLevel,
)


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
