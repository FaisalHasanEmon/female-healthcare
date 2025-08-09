from django.db import models
from django.conf import settings
from Core.models import BaseModel


class Symptom(BaseModel):
    name = models.CharField(
        max_length=50,
        unique=True,
        help_text="Name of the symptom (e.g., Fatigue, Mood, Sleep)"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Symptom"
        verbose_name_plural = "Symptoms"


class DietaryStyle(BaseModel):
    name = models.CharField(
        max_length=50,
        unique=True,
        help_text="Name of the dietary style (e.g., Vegan, Pescatarian)"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Dietary Style"
        verbose_name_plural = "Dietary Styles"


class Goal(BaseModel):
    name = models.CharField(
        max_length=100,
        unique=True,
        help_text="Name of the goal (e.g., Balance hormones, Track my cycle)"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Goal"
        verbose_name_plural = "Goals"


class Reminder(BaseModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reminders',
        help_text="User associated with this reminder"
    )
    is_active = models.BooleanField(
        default=False,
        help_text="Indicates whether the daily reminder is active"
    )
    reminder_time = models.TimeField(
        blank=True,
        null=True,
        help_text="Time for the daily reminder"
    )

    def __str__(self):
        return f"Reminder for {self.user.email} at {self.reminder_time or 'N/A'}"

    class Meta:
        verbose_name = "Reminder"
        verbose_name_plural = "Reminders"


class ActivityLevel(BaseModel):
    name = models.CharField(
        max_length=20,
        unique=True,
        help_text="Activity level (e.g., Low, Moderate, High)"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Activity Level"
        verbose_name_plural = "Activity Levels"


class StressLevel(BaseModel):
    name = models.CharField(
        max_length=20,
        unique=True,
        help_text="Stress level (e.g., Low, Medium, High)"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Stress Level"
        verbose_name_plural = "Stress Levels"


