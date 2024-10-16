from django.shortcuts import render
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
import yfinance as yf
import finnhub

finnhub_client = finnhub.Client(api_key=settings.FINNHUB_API_KEY)

# Symbol Lookup API using Finnhub
@api_view(['GET'])
def symbol_lookup(request):
    symbol = request.query_params.get('q', None)
    exchange = 'US'

    if not symbol:
        return Response({"error": "Query parameter 'q' (symbol) is required."}, status=400)

    try:
        result = finnhub_client.stock_symbols(exchange=exchange)

        filtered_symbols = [
            s for s in result 
            if symbol.upper() in s['displaySymbol'].upper() or symbol.upper() in s['description'].upper()
        ]

        if not filtered_symbols:
            return Response({"error": f"No symbols found for '{symbol}' in the US exchange."}, status=404)

        return Response(filtered_symbols)
    
    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=500)



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
    symbol = request.query_params.get('symbol', 'TSLA')
    
    stock = yf.Ticker(symbol)
    financials = stock.financials

    if financials.empty:
        return Response({"error": "No financial data found for the given symbol."}, status=404)
    
    try:
        revenue = (financials.loc['Total Revenue'].fillna(0) / 1e9).tolist()  
        gross_profit = (financials.loc['Gross Profit'].fillna(0) / 1e9).tolist()
        net_income = (financials.loc['Net Income'].fillna(0) / 1e9).tolist()
    except KeyError as e:
        return Response({"error": f"Missing financial data: {str(e)}"}, status=404)

    years = [str(year)[:4] for year in financials.columns.tolist()]
    
    chart_data = {
        "labels": years, 
        "data": {
            "revenue": revenue,
            "gross_profit": gross_profit,
            "net_income": net_income,
        },
        "symbol": symbol
    }
    
    return Response(chart_data)

@api_view(['GET'])
def company_news(request):
    symbol = request.query_params.get('symbol', None)
    from_date = request.query_params.get('from', None)
    to_date = request.query_params.get('to', None)

    if not symbol or not from_date or not to_date:
        return Response({"error": "Parameters 'symbol', 'from', and 'to' are required."}, status=400)

    try:
        news = finnhub_client.company_news(symbol, _from=from_date, to=to_date)
        return Response(news)
    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=500)