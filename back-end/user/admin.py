from django.contrib import admin
from django import forms
from user.models import (
    User,
    Gender,
    Profile,
    Onboarding
)
from user.onboarding.onboarding_model import (
    Symptom,
    DietaryStyle,
    Goal,
    Reminder,
    ActivityLevel,
    StressLevel,
    BasicQuestion,
    BasicAnswer,
    
)


class OnboardingAdminForm(forms.ModelForm):
    class Meta:
        model = Onboarding
        fields = '__all__'

    def clean_symptoms(self):
        symptoms = self.cleaned_data.get('symptoms')
        if symptoms and len(symptoms) >= 4:
            raise forms.ValidationError("You can select fewer than 4 symptoms.")
        return symptoms


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'username', 'email_verified', 'is_staff')
    search_fields = ('email', 'username')
    list_filter = ('is_staff',)
    ordering = ('email',)


@admin.register(Gender)
class GenderAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'value')
    search_fields = ('name', 'value')
    ordering = ('id',)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'name',
        'date_of_birth',
        'gender',
        'height',
        'weight',
        'adderess',
        'discription',
        'calculated_age_display',
    )
    search_fields = ('user__email', 'name', 'adderess')
    ordering = ('user__email',)
    readonly_fields = ('calculated_age_display',)

    @admin.display(ordering='date_of_birth', description='Age')
    def calculated_age_display(self, obj):
        return obj.calculated_age


@admin.register(Onboarding)
class OnboardingAdmin(admin.ModelAdmin):
    form = OnboardingAdminForm
    list_display = (
        'id',
        'profile_name',
        'has_regular_cycle',
        'is_menopausal',
        'on_hormonal_treatment',
        'get_symptoms',
        'dietary_styles',
        'activity_level',
        'stress_level',
        'supplements_medications',
        'get_goals',
        'daily_reminder',
    )
    search_fields = ('profile__user__email', 'profile__name')
    list_filter = (
        'has_regular_cycle',
        'is_menopausal',
        'on_hormonal_treatment',
        'activity_level',
        'stress_level',
        'daily_reminder',
    )
    autocomplete_fields = ['profile', 'symptoms', 'dietary_styles', 'goals']
    ordering = ('-id',)

    def profile_name(self, obj):
        return obj.profile.name
    profile_name.short_description = "Profile"

    def get_symptoms(self, obj):
        return ", ".join([s.name for s in obj.symptoms.all()])
    get_symptoms.short_description = "Symptoms"

    def get_goals(self, obj):
        return ", ".join([g.name for g in obj.goals.all()])
    get_goals.short_description = "Goals"



@admin.register(Symptom)
class SymptomAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('id',)


@admin.register(DietaryStyle)
class DietaryStyleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('id',)


@admin.register(Goal)
class GoalAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('id',)


@admin.register(Reminder)
class ReminderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'is_active', 'reminder_time')
    search_fields = ('user__email',)
    ordering = ('id',)
    search_fields = ('user__email',)
    ordering = ('id',)


@admin.register(ActivityLevel)
class ActivityLevelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('id',)


@admin.register(StressLevel)
class StressLevelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('id',)


@admin.register(BasicQuestion)
class BasicQuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'key', 'question_text')
    search_fields = ('question',)
    ordering = ('id',)


@admin.register(BasicAnswer)
class BasicAnswerAdmin(admin.ModelAdmin):
    list_display = ('id','onboarding', 'question', 'answer')
    search_fields = ('answer',)
    ordering = ('id',)
