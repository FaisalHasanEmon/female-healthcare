
from user.api.views.register import RegisterView
from user.api.views.login import LoginView
from user.api.views.logout import LogoutView
from .reset_password import (
    PasswordResetRequestView,
    PasswordResetConfirmView
)
from .change_pasasword import ChangePasswordView
from .verify_email import VerifyEmailView
from .profile import (
    ProfileCreateView,
    ProfileDetailView,
    ProfileUpdateView,
    ProfileDeleteView
)
from .onboarding import (
    OnboardingCreateAPIView,
    OnboardingDetailAPIView,
    OnboardingUpdateAPIView,
    OnboardingDeleteAPIView,
    SymptomListCreateAPIView,
    DietaryStyleListCreateAPIView,
    GoalListCreateAPIView,
    ActivityLevelListCreateAPIView,
    StressLevelListCreateAPIView,
    BasicQuestionListCreateAPIView
)

__all__ = [
    RegisterView,
    LoginView,
    LogoutView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
    ChangePasswordView,
    VerifyEmailView,
    ProfileCreateView,
    ProfileDetailView,
    ProfileUpdateView,
    ProfileDeleteView,
    OnboardingCreateAPIView,
    OnboardingDetailAPIView,
    OnboardingUpdateAPIView,
    OnboardingDeleteAPIView,
    SymptomListCreateAPIView,
    DietaryStyleListCreateAPIView,
    GoalListCreateAPIView,
    ActivityLevelListCreateAPIView,
    StressLevelListCreateAPIView,
    BasicQuestionListCreateAPIView
]
