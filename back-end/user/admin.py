from django.contrib import admin
from user.forms import OnboardingAdminForm
from user.models import (
    User,
    Gender,
    Profile,
    Onboarding,
    CycleInfo
)
from user.onboarding.onboarding_model import (
    Symptom,
    DietaryStyle,
    Goal,
    Reminder,
    ActivityLevel,
    StressLevel,
)


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
        'age',
        'blood_group',
        'date_of_birth',
        'gender',
        'height',
        'weight',
        'address',
        'discription',
    )
    search_fields = ('user__email', 'name', 'address')
    ordering = ('user__email',)

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
        # 'get_dietary_styles',
        'activity_level',
        'stress_level',
        'supplements_medications',
        'get_goals',
        'daily_reminder',
        'reminder_time',
        'show_fenyx_insights',
        'has_uterus'
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
    list_display = ('id', 'name', 'created_at', 'updated_at')
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


@admin.register(CycleInfo)
class CycleInfoAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'profile',
        'cycle_length',
        'start_date',
        'end_date',
        'period_length',
        'get_current_phase'
    )
    search_fields = ('profile__user__email', 'profile__name')
    ordering = ('-id',)
    autocomplete_fields = ['profile']
    
    def profile(self, obj):
        return obj.profile.name
    profile.short_description = "Profile"

    def get_current_phase(self, obj):
        return obj.current_phase.capitalize() if obj.current_phase else "-"