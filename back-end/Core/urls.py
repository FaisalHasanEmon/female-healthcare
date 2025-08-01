"""
URL configuration for Core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from calander.views import calendar_view



urlpatterns = [
    path(
        'admin/login',
        auth_views.LoginView.as_view(template_name='admin/login.html'),
        name='login'),
    path(
        'admin/',
        admin.site.urls,
        name='admin'
    ),
    path(
        'api/v1/',
        include('API.urls'),
        name='api'
    ),
    path(
        'user/',
        include('user.urls'),
        name='user'
    ),
    path(
        'calendar/',
        calendar_view,
        name='calendar'
    ),
    
]
