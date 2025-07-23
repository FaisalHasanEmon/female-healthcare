from django.db import models
from Core.models import BaseModel
from django.conf import settings
from datetime import date
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
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


class Gender(models.Model, BaseModel):
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
        return self.name


class Lifestyle(models.Model, BaseModel):
    name = models.CharField(
        max_length=100,
        unique=True,
        null=True,
        blank=True
    )
    valu = models.CharField(
        max_length=10,
        unique=True,
        null=True,
        blank=True
    )
    discription = models.TextField(
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name


class DietType(models.Model, BaseModel):
    name = models.CharField(
        max_length=100,
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
    discription = models.TextField(
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name


class Profile(models.Mode, BaseModel):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    name = models.CharField(max_length=200, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
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
        related_name='user_profiles'
    )
    height = models.PositiveIntegerField(blank=True, null=True)
    weight = models.PositiveIntegerField(blank=True, null=True)
    lifestyle = models.ForeignKey(
        Lifestyle,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name="users"
    )
    diet_type = models.ForeignKey(
        DietType,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name="users"
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
            return today.year - self.date_of_birth.year - (
                (
                    today.month, today.day
                ) < (
                    self.date_of_birth.month, self.date_of_birth.day
                )
            )
        return None
