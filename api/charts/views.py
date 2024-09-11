from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

# Candlestick Data
@api_view(['GET'])
def candlestick_data(request):
    data = {
        "data": [
            {"date": "2023-01-01", "open": 30, "high": 35, "low": 28, "close": 32},
            {"date": "2023-01-02", "open": 32, "high": 37, "low": 30, "close": 35},
            {"date": "2023-01-03", "open": 35, "high": 38, "low": 33, "close": 34},
            {"date": "2023-01-04", "open": 34, "high": 36, "low": 31, "close": 33},
            {"date": "2023-01-05", "open": 33, "high": 39, "low": 32, "close": 37},
            {"date": "2023-01-06", "open": 37, "high": 40, "low": 35, "close": 36},
            {"date": "2023-01-07", "open": 36, "high": 38, "low": 34, "close": 35},
            {"date": "2023-01-08", "open": 35, "high": 37, "low": 33, "close": 34},
            {"date": "2023-01-09", "open": 34, "high": 36, "low": 30, "close": 32},
            {"date": "2023-01-10", "open": 32, "high": 35, "low": 31, "close": 33}
        ]
    }
    return Response(data)

# Line Chart Data
@api_view(['GET'])
def line_chart_data(request):
    data = {
        "labels": ["Jan", "Feb", "Mar", "Apr"],
        "data": [10, 20, 30, 40]
    }
    return Response(data)

# Bar Chart Data
@api_view(['GET'])
def bar_chart_data(request):
    data = {
        "labels": ["Product A", "Product B", "Product C"],
        "data": [100, 150, 200]
    }
    return Response(data)

# Pie Chart Data
@api_view(['GET'])
def pie_chart_data(request):
    data = {
        "labels": ["Red", "Blue", "Yellow"],
        "data": [300, 50, 100]
    }
    return Response(data)
