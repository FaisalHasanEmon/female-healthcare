from django.urls import path
from .views import SymptomActivityLevelChartView

urlpatterns = [
    path(
        'symptom-activity-levels/<int:profile_id>/',
        SymptomActivityLevelChartView.as_view(),
        name='symptom-activity-level'
    ),
]

# url