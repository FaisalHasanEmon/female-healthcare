from django.urls import path
from .views import PasswordResetConfirmPageView

urlpatterns = [
    path(
        'password-reset-confirm/<uidb64>/<token>/',
        PasswordResetConfirmPageView.as_view(),
        name='password_reset_confirm_page'
    ),
    
]