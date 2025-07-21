from django.contrib import admin
from user.models import CustomUser


# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'username', 'is_staff')
    search_fields = ('email', 'username')
    list_filter = ('is_staff',)
    ordering = ('email',)
