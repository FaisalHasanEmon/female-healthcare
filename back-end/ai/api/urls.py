from django.urls import path
from ai.api.views import (
    AICoachView,
    DashboardView,
    InsightView,
    GoalView,
    FoodView,
    SupplementView
)


urlpatterns = [
    path('ai-coach/', AICoachView.as_view(), name='ai_coach'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path("insight/", InsightView.as_view(), name="insight"),
    path("goal/", GoalView.as_view(), name="goal"),
    path("food/", FoodView.as_view(), name="food"),
    path("supplement/", SupplementView.as_view(), name="supplement"),
]