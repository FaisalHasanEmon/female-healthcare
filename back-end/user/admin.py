from django.contrib import admin
from user.models import User, Gender, Profile
from onboarding.onboarding_model import (
    Symptom,
    DietaryStyle,
    Goal,
    Reminder,
    ActivityLevel,
    StressLevel,
    BasicQuestion,
    BasicAnswer,
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
    ordering = ('name',)


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
    )
    search_fields = ('user__email', 'name', 'adderess')
    ordering = ('user__email',)
    readonly_fields = ('calculated_age',)


@admin.register(Symptom)
class SymptomAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('id',)


@admin.register(DietaryStyle)
class DietaryStyleAdmin(admin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('id',)


@admin.register(Goal)
class GoalAdmin(admin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('id',)


@admin.register(Reminder)
class ReminderAdmin(admin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('id',)


@admin.register(ActivityLevel)
class ActivityLevelAdmin(admin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('id',)

@admin.register(StressLevel)
class StressLevelAdmin(admin)
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('id',)

@admin.register(BasicQuestion)
class BasicQuestionAdmin(admin):
    list_display = ('id', 'question')
    search_fields = ('question',)
    ordering = ('id',)

@admin.register(BasicAnswer)
class BasicAnswerAdmin(admin):
    list_display = ('id', 'answer')
    search_fields = ('answer',)
    ordering = ('id',)
