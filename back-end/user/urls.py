from django.urls import path
from .views import PasswordResetConfirmPageView, test_view
from .chart_views import (
    chart_view
)

urlpatterns = [
    path(
        'password-reset-confirm/<uidb64>/<token>/',
        PasswordResetConfirmPageView.as_view(),
        name='password_reset_confirm_page'
    ),
    path(
        'test/',
        test_view,
        name='test_view'
    ),
    path(
        'chart/',
        chart_view,
        name='chart_view'
    ),
    
]

    
