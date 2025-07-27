from django.contrib import admin
from user.models import User, Gender, Profile


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
    # list_filter = ('gender')
    ordering = ('user__email',)
    readonly_fields = ('calculated_age',)
