from django.db import models
from Core.models import BaseModel
from django.conf import settings
from datetime import date
from django.core.exceptions import ValidationError
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
from user.onboarding.onboarding_model import (
    Symptom,
    DietaryStyle,
    ActivityLevel,
    StressLevel,
    Goal,
)


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    email = models.EmailField(unique=True)
    username = models.CharField(
        max_length=150,
        unique=True,
        blank=True,
        null=True
    )
    is_staff = models.BooleanField(default=False)
    email_verified = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class Gender(BaseModel):
    name = models.CharField(
        max_length=50,
        unique=True,
        null=True,
        blank=True
    )
    value = models.CharField(
        max_length=10,
        unique=True,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name or "unnamed Gender"

    class Meta:
        verbose_name = "Gender"
        verbose_name_plural = "Genders"


class Profile(BaseModel):
    BLOOD_GROUP_CHOICES = [

        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
    ]
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    name = models.CharField(
        max_length=200,
        blank=True,
        null=True
    )
    date_of_birth = models.DateField(
        blank=True,
        null=True
    )
    profile_picture = models.ImageField(
        upload_to='profile_pictures/',
        blank=True,
        null=True
    )
    gender = models.ForeignKey(
        Gender,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='profiles'
    )
    height = models.PositiveIntegerField(
        blank=True,
        null=True,
        help_text="Height in centimeters"
    )
    weight = models.PositiveIntegerField(
        blank=True,
        null=True,
        help_text="Weight in kilograms"
    )
    blood_group = models.CharField(
        max_length=3,
        choices=BLOOD_GROUP_CHOICES,
        blank=True,
        null=True,
        help_text="Select your blood group"
    )
    adderess = models.TextField(
        blank=True,
        null=True
    )
    discription = models.TextField(
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name

    @property
    def calculated_age(self):
        if self.date_of_birth:
            today = date.today()
            age = today.year - self.date_of_birth.year - (
                (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day) # noqa
            )
            print("================", age)
            return age
        return None

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"
        ordering = ['-created_at']


class Onboarding(BaseModel):
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name='onboarding'
    )
    has_regular_cycle = models.BooleanField(
        null=True,
        blank=True,
        help_text="Do you have a regular cycle?"
    )
    is_menopausal = models.BooleanField(
        null=True,
        blank=True,
        help_text="Are you in perimenopause, menopause, or post-menopause?"
    )
    on_hormonal_treatment = models.BooleanField(
        null=True,
        blank=True,
        help_text="Are you currently on hormonal birth control or HRT?"
    )
    symptoms = models.ManyToManyField(
        Symptom,
        blank=True,
        related_name='profiles',
        help_text="User's top health concerns"
    )
    dietary_styles = models.ForeignKey(
        DietaryStyle,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='profiles',
        help_text="User's dietary preferences"
    )
    activity_level = models.ForeignKey(
        ActivityLevel,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='profiles',
        help_text="User's activity level"
    )
    stress_level = models.ForeignKey(
        StressLevel,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='profiles',
        help_text="User's stress level"
    )
    supplements_medications = models.TextField(
        blank=True,
        null=True,
        help_text="Supplements or medications the user is taking"
    )
    goals = models.ManyToManyField(
        Goal,
        blank=True,
        related_name='profiles',
        help_text="User's health and wellness goals"
    )
    daily_reminder = models.BooleanField(
        default=False,
        help_text="Would you like a daily reminder?"
    )

    def clean(self):
        super().clean()

    def save(self, *args, **kwargs):
        # Handle mutual exclusivity of boolean fields
        if self.has_regular_cycle:
            self.is_menopausal = False
            self.on_hormonal_treatment = False
        elif self.is_menopausal:
            self.has_regular_cycle = False
            self.on_hormonal_treatment = False
        elif self.on_hormonal_treatment:
            self.has_regular_cycle = False
            self.is_menopausal = False

        super().save(*args, **kwargs)

        if self.pk and self.symptoms.count() >= 4:
            raise ValidationError(
                {'symptoms': 'You can select fewer than 4 symptoms.'}
            )

    def __str__(self):
        return f"Onboarding for {self.profile.name}"

    class Meta:
        verbose_name = "Onboarding"
        verbose_name_plural = "Onboardings"
        ordering = ['-id']
