from django.urls import path

from user.api.views import (
    RegisterView,
    LoginView,
    LogoutView,
    PasswordResetConfirmView,
    PasswordResetRequestView,
    ChangePasswordView,
    VerifyEmailView,
    ProfileCreateView,
    ProfileDetailView,
    ProfileUpdateView,
    ProfileDeleteView
    
)


urlpatterns = [
    path(
        'register/',
        RegisterView.as_view(),
        name='register'
    ),
    path(
        'login/',
        LoginView.as_view(),
        name='login'
    ),
    path(
        'logout/',
        LogoutView.as_view(),
        name='logout'
    ),
    path(
        'password-reset/',
        PasswordResetRequestView.as_view(),
        name='password_reset'
    ),
    path(
        'password-reset-confirm/<uidb64>/<token>/',
        PasswordResetConfirmView.as_view(),
        name='password_reset_confirm'
    ),
    path(
        'change-password/',
        ChangePasswordView.as_view(),
        name='change_password'
    ),
    path(
        'verify-email/<uidb64>/<token>/',
        VerifyEmailView.as_view(),
        name='verify-email'
    ),
    path(
        'profile/create/',
        ProfileCreateView.as_view(),
        name='profile-create'
    ),
    path(
        'profile/me/',
        ProfileDetailView.as_view(),
        name='profile-detail'
    ),
    path(
        'profile/me/update/',
        ProfileUpdateView.as_view(),
        name='profile-update'
    ),
    path(
        'profile/me/delete/',
        ProfileDeleteView.as_view(),
        name='profile-delete'
    ),


]