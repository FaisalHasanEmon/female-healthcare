from django.contrib import admin
from django.urls import path
from user.api.views.register import RegisterView
from user.api.views.login import LoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/',  LoginView.as_view(), name="login"),
    
]