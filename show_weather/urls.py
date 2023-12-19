from django.contrib import admin
from django.urls import path, include

from .views import GetWeather

urlpatterns = [
    path("get-weather", GetWeather.as_view()),
]
