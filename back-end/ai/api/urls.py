from django.urls import path
from ai.api.views import AICoachView, DashboardView


urlpatterns = [
    path('ai-coach/', AICoachView.as_view(), name='ai_coach'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]