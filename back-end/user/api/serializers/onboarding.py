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
    BasicQuestion,
    BasicAnswer,
    Reminder,
)

class OnboardingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Onboarding
        fields = '__all__'
        read_only_fields = ['profile']


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



