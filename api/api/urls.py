"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('charts.urls')),  # Include the charts app URLs
    path('api/candlestick-data/', views.candlestick_data, name='candlestick_data'),
    path('api/bar-chart-data/', views.bar_chart_data, name='bar_chart_data'),
    path('api/search/', views.symbol_lookup, name='symbol_lookup'),
    path('api/company-news/', views.company_news, name='company-news'),
]
