"use client";

import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import Spinner from "@/app/components/Spinner";

interface ChartProps {
  chartType: "line" | "candlestick" | "pie" | "bar";
  apiEndpoint: string;
  title: string;
}

interface IChart {
  labels: Array<string>; // Used for bar chart labels
  data: {
    revenue: Array<number>;
    gross_profit: Array<number>;
    net_income: Array<number>;
  };
  symbol: string;
}

interface ICandle {
  date: string;  // Date of the candlestick
  open: number;
  close: number;
  low: number;
  high: number;
}

const timePeriods = [
  { label: "D", value: "1d" },
  { label: "W", value: "1wk" },
  { label: "M", value: "1mo" },
  { label: "Y", value: "1y" },
];

export default function Chart(chartProps: ChartProps) {
  const [chartData, setChartData] = useState<IChart | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1d"); // Default period
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${chartProps.apiEndpoint}?period=${selectedPeriod}`);
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    }
    fetchData();
  }, [chartProps.apiEndpoint, selectedPeriod]);  // Re-fetch when period changes

  if (!chartData) {
    return <Spinner />;
  }

  const generateOptions = () => {
    switch (chartProps.chartType) {
      case "candlestick":
        const candleData: Array<[number, number, number, number]> = (chartData.data as unknown as ICandle[]).map((candle) => [
          candle.open,
          candle.close,
          candle.low,
          candle.high,
        ]);

        const isHourlyData = selectedPeriod === "1d"; 

        
        return {
          title: {
            text: chartData.symbol,
          },
          tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
          xAxis: {
            type: "category",
            data: (chartData.data as unknown as ICandle[]).map((d) => {
              const date = new Date(d.date);
              return isHourlyData 
                ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                : date.toISOString().split('T')[0];  
            }),        
            scale: true,
          },
          yAxis: { scale: true },
          series: [{ type: "candlestick", data: candleData }],
        };

      case "bar":
        return {
          title: {
            text: chartData.symbol,
          },
          tooltip: { trigger: "axis" },
          legend: { data: ["Revenue", "Gross Profit", "Net Income"] },
          xAxis: {
            type: "category",
            data: chartData.labels,
            inverse: true,
          },
          yAxis: { type: "value" },
          series: [
            { name: "Revenue", type: "bar", data: chartData.data.revenue },
            { name: "Gross Profit", type: "bar", data: chartData.data.gross_profit },
            { name: "Net Income", type: "bar", data: chartData.data.net_income },
          ],
        };

      default:
        return {};
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">{chartProps.title}</h1>
      <ReactECharts
        option={generateOptions()}
        style={{ height: "400px", width: "100%" }}
      />
      <div className="mb-4">
        <ul
          id="timePeriod"
          className="p-2 flex gap-4 justify-end mr-12"
        >
          {timePeriods.map((period) => (
            <li key={period.value} value={period.value} className="hover:opacity-50 text-black cursor-pointer" onClick={() => setSelectedPeriod(period.value)}>
              {period.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
