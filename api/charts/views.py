from django.shortcuts import render
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
import yfinance as yf

# Candle stick data for ticker
@api_view(['GET'])
def candlestick_data(request):
    symbol = request.query_params.get('symbol', 'AAPL')
    period = request.query_params.get('period', '1d')  # Default to 1 day
    interval = '1h' if period == '1d' else '1d'  # Use 1-hour interval for 1-day period

    # Fetch data based on the selected period
    data = yf.download(symbol, period=period, interval=interval)

    if data.empty:
        return Response({"error": "No data found for the given symbol."}, status=404)

    candlestick_data = data[['Open', 'High', 'Low', 'Close']].reset_index()
    candlestick_data.columns = ['date', 'open', 'high', 'low', 'close']
    
    # Remove the line that formats the date to only show the day
    candlestick_data['date'] = candlestick_data['date'].astype(str)  # Retain full timestamp
    
    response_data = {
        'data': candlestick_data.to_dict(orient='records'),
        'symbol': symbol
    }

    return Response(response_data)



# Bar chart data including profit, revenue, etc for ticker
@api_view(['GET'])
def bar_chart_data(request):
    symbol = request.query_params.get('symbol', 'AAPL')
    
    # Fetch financial data
    stock = yf.Ticker(symbol)
    financials = stock.financials
    
    if financials.empty:
        return Response({"error": "No financial data found for the given symbol."}, status=404)
    
    years = [str(year)[:4] for year in financials.columns.tolist()] 
    revenue = financials.loc['Total Revenue'].tolist()
    gross_profit = financials.loc['Gross Profit'].tolist()
    net_income = financials.loc['Net Income'].tolist()
    
    chart_data = {
        "labels": years,  # X-axis labels (years)
        "data": {
            "revenue": revenue,
            "gross_profit": gross_profit,
            "net_income": net_income,
        },
        "symbol" : symbol
    }
    
    return Response(chart_data)
