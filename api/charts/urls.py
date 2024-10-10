from django.urls import path
from . import views

urlpatterns = [
    path('api/candlestick-data/', views.candlestick_data, name='candlestick_data'),
    path('api/bar-chart-data/', views.bar_chart_data, name='bar_chart_data'),
]
