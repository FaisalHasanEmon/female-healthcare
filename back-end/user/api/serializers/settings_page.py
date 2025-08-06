# user/api/serializers.py
from rest_framework import serializers
from user.models import Onboarding, CycleInfo, DietaryStyle, ActivityLevel, StressLevel
from datetime import datetime

class OnboardingSettingsSerializer(serializers.ModelSerializer):
    hormonalInfo = serializers.SerializerMethodField()
    dailyReminders = serializers.SerializerMethodField()
    aiInsights = serializers.SerializerMethodField()
    lifestylePreferences = serializers.SerializerMethodField()

    class Meta:
        model = Onboarding
        fields = [
            'hormonalInfo',
            'dailyReminders',
            'aiInsights',
            'lifestylePreferences'
        ]

    def get_hormonalInfo(self, obj):
        cycle_info = getattr(obj.profile, 'cycle_info', None)
        return {
            'regularCycle': obj.has_regular_cycle,
            'currentPhase': cycle_info.current_phase if cycle_info else None,
            'cycleLength': cycle_info.cycle_length if cycle_info else 28,
            'periodLength': cycle_info.period_length if cycle_info else 5,
            'birthControlHRT': obj.on_hormonal_treatment,
            'hasUterus': obj.has_uterus
        }

    def get_dailyReminders(self, obj):
        return {
            'dailyReminder': obj.daily_reminder,
            'reminderTime': obj.reminder_time.strftime('%H:%M') if obj.reminder_time else None
        }

    def get_aiInsights(self, obj):
        return {
            'showFENYXInsights': obj.show_fenyx_insights
        }

    def get_lifestylePreferences(self, obj):
        return {
            'dietaryStyles': obj.dietary_styles.id if obj.dietary_styles else None,
            'activityLevel': obj.activity_level.id if obj.activity_level else None,
            'stressLevel': obj.stress_level.id if obj.stress_level else None,
            'medications': obj.supplements_medications
        }

    def validate(self, data):
        incoming_data = self.initial_data
        hormonal_info = incoming_data.get('hormonalInfo', {})
        daily_reminders = incoming_data.get('dailyReminders', {})
        ai_insights = incoming_data.get('aiInsights', {})
        lifestyle_prefs = incoming_data.get('lifestylePreferences', {})

        # Validate currentPhase
        current_phase = hormonal_info.get('currentPhase')
        if current_phase and current_phase not in ['Menstrual', 'Follicular', 'Ovulatory', 'Luteal']:
            raise serializers.ValidationError({"hormonalInfo.currentPhase": "Invalid phase"})

        # Validate reminderTime
        reminder_time = daily_reminders.get('reminderTime')
        if reminder_time:
            try:
                datetime.strptime(reminder_time, '%H:%M')
            except ValueError:
                raise serializers.ValidationError({"dailyReminders.reminderTime": "Invalid time format, use HH:MM"})

        # Validate cycleLength and periodLength
        cycle_length = hormonal_info.get('cycleLength', 28)
        period_length = hormonal_info.get('periodLength', 5)
        if not isinstance(cycle_length, int) or cycle_length < 1:
            raise serializers.ValidationError({"hormonalInfo.cycleLength": "Must be a positive integer"})
        if not isinstance(period_length, int) or period_length < 1:
            raise serializers.ValidationError({"hormonalInfo.periodLength": "Must be a positive integer"})

        # Validate foreign keys
        dietary_style_id = lifestyle_prefs.get('dietaryStyles')
        if dietary_style_id:
            try:
                DietaryStyle.objects.get(id=dietary_style_id)
            except DietaryStyle.DoesNotExist:
                raise serializers.ValidationError({"lifestylePreferences.dietaryStyles": "Invalid DietaryStyle ID"})

        activity_level_id = lifestyle_prefs.get('activityLevel')
        if activity_level_id:
            try:
                ActivityLevel.objects.get(id=activity_level_id)
            except ActivityLevel.DoesNotExist:
                raise serializers.ValidationError({"lifestylePreferences.activityLevel": "Invalid ActivityLevel ID"})

        stress_level_id = lifestyle_prefs.get('stressLevel')
        if stress_level_id:
            try:
                StressLevel.objects.get(id=stress_level_id)
            except StressLevel.DoesNotExist:
                raise serializers.ValidationError({"lifestylePreferences.stressLevel": "Invalid StressLevel ID"})

        return incoming_data

    def create(self, validated_data):
        profile = self.context['request'].user.profile
        hormonal_info = validated_data.get('hormonalInfo', {})
        daily_reminders = validated_data.get('dailyReminders', {})
        ai_insights = validated_data.get('aiInsights', {})
        lifestyle_prefs = validated_data.get('lifestylePreferences', {})

        # Fetch foreign key instances
        dietary_style = None
        if lifestyle_prefs.get('dietaryStyles'):
            dietary_style = DietaryStyle.objects.get(id=lifestyle_prefs.get('dietaryStyles'))

        activity_level = None
        if lifestyle_prefs.get('activityLevel'):
            activity_level = ActivityLevel.objects.get(id=lifestyle_prefs.get('activityLevel'))

        stress_level = None
        if lifestyle_prefs.get('stressLevel'):
            stress_level = StressLevel.objects.get(id=lifestyle_prefs.get('stressLevel'))

        # Convert reminder_time to TimeField format
        reminder_time = daily_reminders.get('reminderTime')
        if reminder_time:
            reminder_time = datetime.strptime(reminder_time, '%H:%M').time()

        onboarding, _ = Onboarding.objects.update_or_create(
            profile=profile,
            defaults={
                'has_regular_cycle': hormonal_info.get('regularCycle'),
                'has_uterus': hormonal_info.get('hasUterus'),
                'on_hormonal_treatment': hormonal_info.get('birthControlHRT'),
                'dietary_styles': dietary_style,
                'activity_level': activity_level,
                'stress_level': stress_level,
                'supplements_medications': lifestyle_prefs.get('medications'),
                'daily_reminder': daily_reminders.get('dailyReminder', False),
                'reminder_time': reminder_time,
                'show_fenyx_insights': ai_insights.get('showFENYXInsights', True),
            }
        )
        CycleInfo.objects.update_or_create(
            profile=profile,
            defaults={
                'current_phase': hormonal_info.get('currentPhase'),
                'cycle_length': hormonal_info.get('cycleLength', 28),
                'period_length': hormonal_info.get('periodLength', 5),
            }
        )
        return onboarding

    def update(self, instance, validated_data):
        hormonal_info = validated_data.get('hormonalInfo', {})
        daily_reminders = validated_data.get('dailyReminders', {})
        ai_insights = validated_data.get('aiInsights', {})
        lifestyle_prefs = validated_data.get('lifestylePreferences', {})

        # Fetch foreign key instances
        dietary_style = instance.dietary_styles
        if lifestyle_prefs.get('dietaryStyles'):
            dietary_style = DietaryStyle.objects.get(id=lifestyle_prefs.get('dietaryStyles'))

        activity_level = instance.activity_level
        if lifestyle_prefs.get('activityLevel'):
            activity_level = ActivityLevel.objects.get(id=lifestyle_prefs.get('activityLevel'))

        stress_level = instance.stress_level
        if lifestyle_prefs.get('stressLevel'):
            stress_level = StressLevel.objects.get(id=lifestyle_prefs.get('stressLevel'))

        # Convert reminder_time to TimeField format
        reminder_time = daily_reminders.get('reminderTime', instance.reminder_time)
        if reminder_time and isinstance(reminder_time, str):
            reminder_time = datetime.strptime(reminder_time, '%H:%M').time()

        instance.has_regular_cycle = hormonal_info.get('regularCycle', instance.has_regular_cycle)
        instance.has_uterus = hormonal_info.get('hasUterus', instance.has_uterus)
        instance.on_hormonal_treatment = hormonal_info.get('birthControlHRT', instance.on_hormonal_treatment)
        instance.dietary_styles = dietary_style
        instance.activity_level = activity_level
        instance.stress_level = stress_level
        instance.supplements_medications = lifestyle_prefs.get('medications', instance.supplements_medications)
        instance.daily_reminder = daily_reminders.get('dailyReminder', instance.daily_reminder)
        instance.reminder_time = reminder_time
        instance.show_fenyx_insights = ai_insights.get('showFENYXInsights', instance.show_fenyx_insights)
        instance.save()

        cycle_info, _ = CycleInfo.objects.get_or_create(profile=instance.profile)
        cycle_info.current_phase = hormonal_info.get('currentPhase', cycle_info.current_phase)
        cycle_info.cycle_length = hormonal_info.get('cycleLength', cycle_info.cycle_length)
        cycle_info.period_length = hormonal_info.get('periodLength', cycle_info.period_length)
        cycle_info.save()

        return instance