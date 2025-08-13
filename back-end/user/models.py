from django.db import models
from Core.models import BaseModel
from django.conf import settings
from datetime import date
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save, pre_delete
from datetime import date, timedelta
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

    new_email = models.EmailField(
        blank=True,
        null=True
    )
    email_change_token = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )
    email_change_requested_at = models.DateTimeField(
        blank=True,
        null=True
    )

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
    age = models.PositiveIntegerField(
        blank=True,
        null=True,
        help_text="Calculated age based on date of birth"
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
    address = models.TextField(
        blank=True,
        null=True,
        help_text="Your current address"
    )
    discription = models.TextField(
        blank=True,
        null=True,
        help_text="A brief description about yourself"
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
    dietary_styles = models.ManyToManyField(
        DietaryStyle,
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
    goals = models.ManyToManyField(
        Goal,
        blank=True,
        related_name='profiles',
        help_text="User's health and wellness goals"
    )
    supplements_medications = models.TextField(
        blank=True,
        null=True,
        help_text="Supplements or medications the user is taking"
    )
    daily_reminder = models.BooleanField(
        default=False,
        help_text="Would you like a daily reminder?"
    )
    reminder_time = models.TimeField(
        null=True,
        blank=True,
        help_text="Time for the daily reminder"
    )
    show_fenyx_insights = models.BooleanField(
        default=True,
        help_text="Show Fenyx insights in the app"
    )
    has_uterus = models.BooleanField(
        null=True,
        blank=True,
        help_text="Does the user have a uterus?"
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


class CycleInfo(BaseModel):
    CYCLE_CHOICES = [
        ('Menstrual', 'menstrual'),
        ('Early Follicular', 'early_follicular'),
        ('Late Follicular', 'late_follicular'),
        ('Ovulatory', 'ovulatory'),
        ('Early Luteal', 'early_luteal'),
        ('Late Luteal', 'late_luteal'),
    ]
    profile = models.OneToOneField(
        Profile,
        on_delete=models.CASCADE,
        related_name='cycle_info'
    )
    start_date = models.DateField(
        blank=True,
        null=True,
        help_text="Start date of the last menstrual cycle"
    )
    end_date = models.DateField(
        blank=True,
        null=True,
        help_text="End date of the last menstrual cycle"
    )
    cycle_length = models.PositiveIntegerField(default=28)
    period_length = models.PositiveIntegerField(
        blank=True,
        null=True,
        help_text="Length of the menstrual period in days"
    )
    current_phase = models.CharField(
        max_length=50,
        choices=CYCLE_CHOICES,
        default='menstrual',
        help_text="Current menstrual cycle phase",
    )

    def calculate_period_length(self):
        """Calculate the period length based on start_date and today."""
        if self.start_date:
            today = date.today()
            days = (today - self.start_date).days
            print(f"Calculating period length: {days} days since start date {self.start_date}")
            # days = (self.start_date - today).days
            # Ensure period_length is non-negative
            self.period_length = max(days, 0)
            print(f"Period length calculated: {self.period_length}")
        else:
            self.period_length = None
            print("Period length not calculated: start_date is missing")

    def check_and_reset_cycle(self):
        """If period_length exceeds cycle_length, start a new cycle."""
        if not self.start_date:
            return

        today = date.today()
        days_since_start = (today - self.start_date).days

        if days_since_start >= self.cycle_length:
            # Calculate how many cycles have passed
            cycles_passed = days_since_start // self.cycle_length
            # Move start_date forward to the new cycle start
            self.start_date = self.start_date + timedelta(
                days=self.cycle_length * cycles_passed
            )
            self.save()
            print(f"Cycle reset: New start date = {self.start_date}")

    def calculate_current_phase(self, target_date=None):
        self.check_and_reset_cycle()

        if not self.start_date:
            return 'menstrual'

        today = target_date or date.today()
        days_since_start = (today - self.start_date).days

        cycle_day = (days_since_start % self.cycle_length) 

        if 1 <= cycle_day <= 5:
            return 'menstrual'
        elif 6 <= cycle_day <= 9:
            return 'early_follicular'
        elif 10 <= cycle_day <= 13:
            return 'late_follicular'
        elif cycle_day == 14:
            return 'ovulatory'
        elif 15 <= cycle_day <= 21:
            return 'early_luteal'
        elif 22 <= cycle_day <= self.cycle_length:
            return 'late_luteal'
        return 'menstrual'

    def update_current_phase(self, save=False):
        """Update the current phase if the user has a regular cycle."""
        if hasattr(self.profile, 'onboarding'):
            onboarding = self.profile.onboarding.first()
            if onboarding and onboarding.has_regular_cycle:
                phase = self.calculate_current_phase()
                self.current_phase = phase
                print(f"Current phase updated to: {self.current_phase}")
                if save:
                    super(CycleInfo, self).save()  # Avoid recursion
            else:
                print("No regular cycle, current phase not updated")
        else:
            print("No onboarding data, current phase not updated")

    def save(self, *args, **kwargs):
        """Override save to calculate period length and current phase."""
        self.calculate_period_length()  # Calculate period_length
        self.update_current_phase(save=False)  # Update current_phase
        print(f"Saving CycleInfo - Period length: {self.period_length}, Current phase: {self.current_phase}")
        super().save(*args, **kwargs)  # Save the model

    def __str__(self):
        return f"CycleInfo for {self.profile.name}"

    class Meta:
        verbose_name = "Cycle Info"
        verbose_name_plural = "Cycle Infos"
        ordering = ['-id']


@receiver(post_save, sender=Onboarding)
def create_cycle_info_if_regular(sender, instance, created, **kwargs):
    if instance.has_regular_cycle:
        cycle_info, created = CycleInfo.objects.get_or_create(
            profile=instance.profile
        )
        print(
            f"CycleInfo created: {created} for profile: {instance.profile.name}")

        if created and not cycle_info.start_date:
            cycle_info.start_date = date.today()
            print(f"Start date set to today: {cycle_info.start_date}")

        # Calculate and set period_length and current_phase
        cycle_info.calculate_period_length()
        cycle_info.update_current_phase(save=False)
        print(f"Period length: {cycle_info.period_length}, Current phase: {cycle_info.current_phase}")
        cycle_info.save()
        print(f"CycleInfo saved: {cycle_info}")


@receiver(pre_save, sender=Onboarding)
def delete_cycle_info_if_no_longer_regular(sender, instance, **kwargs):
    """
    Before saving Onboarding, if has_regular_cycle changes from True to False,
    delete the related CycleInfo.
    """
    if not instance.pk:
        # New onboarding object — nothing to check yet
        return

    try:
        old_instance = Onboarding.objects.get(pk=instance.pk)
        print(f"Old Onboarding instance found: {old_instance.has_regular_cycle}")
    except Onboarding.DoesNotExist:
        return

    # Check if has_regular_cycle was True before and is now False
    if old_instance.has_regular_cycle and not instance.has_regular_cycle:
        CycleInfo.objects.filter(profile=instance.profile).delete()
        print(f"CycleInfo deleted for profile: {instance.profile.name}")


@receiver(pre_delete, sender=Onboarding)
def delete_cycle_info_if_regular_cycle(sender, instance, **kwargs):
    """
    Deletes CycleInfo if the Onboarding has a regular cycle.
    """
    if instance.has_regular_cycle:
        CycleInfo.objects.filter(profile=instance.profile).delete()
