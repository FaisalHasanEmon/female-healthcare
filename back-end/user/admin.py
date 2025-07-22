from django.contrib import admin
from user.models import User


# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'username', 'email_verified', 'is_staff')
    search_fields = ('email', 'username')
    list_filter = ('is_staff',)
    ordering = ('email',)
