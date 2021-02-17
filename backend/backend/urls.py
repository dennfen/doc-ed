"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from rest_framework import routers
from bugtracker import views

router = routers.DefaultRouter()

router.register(r'bugs', views.BugTrackerView, 'bugs')
router.register(r'visual', views.VisualView, 'visual')
router.register(r'sum-tech', views.SumTechView, 'sum-tech')
router.register(r'sum-otd', views.SumOtdView, 'sum-otd')
router.register(r'avg-close', views.AvgCloseView, 'avg-close')
router.register(r'bugs-filter', views.BugFilterView, 'bugs-filter')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]