from django.urls import path
from . import views

urlpatterns = [
    path('api/candlestick-data/', views.candlestick_data, name='candlestick_data'),
    path('api/bar-chart-data/', views.bar_chart_data, name='bar_chart_data'),
    path('api/search/', views.symbol_lookup, name='symbol_lookup'),
    path('api/company-news/', views.company_news, name='company-news'),
]
