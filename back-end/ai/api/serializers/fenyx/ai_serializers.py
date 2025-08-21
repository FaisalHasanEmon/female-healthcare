from rest_framework import serializers
from user.models import Onboarding, Profile, CycleInfo
from user.onboarding.onboarding_model import (
    Symptom,
    ActivityLevel,
    DietaryStyle,
    StressLevel,
    Goal
)


class OnboardingSerializer(serializers.ModelSerializer):
    profile = serializers.PrimaryKeyRelatedField(
        queryset=Profile.objects.all()
    )
    symptoms = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Symptom.objects.all()
    )
    dietary_styles = serializers.PrimaryKeyRelatedField(
        many=True, queryset=DietaryStyle.objects.all()
    )
    activity_level = serializers.PrimaryKeyRelatedField(
        queryset=ActivityLevel.objects.all(), allow_null=True
    )
    stress_level = serializers.PrimaryKeyRelatedField(
        queryset=StressLevel.objects.all(), allow_null=True
    )
    goals = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Goal.objects.all()
    )

    class Meta:
        model = Onboarding
        fields = [
            'profile',
            'has_regular_cycle',
            'symptoms',
            'dietary_styles',
            'activity_level',
            'stress_level',
            'goals'
        ]

    def create(self, validated_data):
        # Extract related fields
        profile = validated_data.pop('profile')
        symptoms = validated_data.pop('symptoms', [])
        dietary_styles = validated_data.pop('dietary_styles', [])
        goals = validated_data.pop('goals', [])

        # Create the Onboarding instance
        onboarding = Onboarding.objects.create(
            profile=profile, **validated_data
        )

        # Set many-to-many fields
        onboarding.symptoms.set(symptoms)
        onboarding.dietary_styles.set(dietary_styles)
        onboarding.goals.set(goals)

        return onboarding
    

class CycleInfoSerializer(serializers.ModelSerializer):
    profile = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all())

    class Meta:
        model = CycleInfo
        fields = ['profile', 'current_phase']

    def create(self, validated_data):
        profile = validated_data.pop('profile')
        return CycleInfo.objects.create(profile=profile, **validated_data)