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
  labels: Array<string>;
  data: Array<number> | Array<ICandle>;
}

interface ICandle {
  date: string;
  open: number;
  close: number;
  low: number;
  high: number;
}

interface IStyleParams {
  dataIndex: number;
}

export default function Chart(chartProps: ChartProps) {
  const [chartData, setChartData] = useState<IChart>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(chartProps.apiEndpoint);
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    }
    fetchData();
  }, [chartProps.apiEndpoint]);

  if (!chartData) {
    return <Spinner />;
  }

  const generateOptions = () => {
    switch (chartProps.chartType) {
      case "line":
        return {
          tooltip: { trigger: "axis" },
          legend: { data: ["Line Chart"] },
          xAxis: {
            type: "category",
            data: chartData.labels,
            name: "Month", 
            nameLocation: "center", 
            nameTextStyle: {
              color: "#333", 
              fontSize: 14, 
            },
            nameGap : 25
          },
          yAxis: { type: "value" },
          series: [
            {
              type: "line",
              data: chartData.data,
              smooth: true,
              lineStyle: { width: 1 },
            },
          ],
        };

      case "candlestick":
        const candleData = (chartData.data as ICandle[]).map((candle) => [
          candle.open,
          candle.close,
          candle.low,
          candle.high,
        ]);
        return {
          tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
          xAxis: {
            type: "category",
            data: (chartData.data as ICandle[]).map((d) => d.date),
            scale: true,
            
          },
          yAxis: { scale: true },
          series: [{ type: "candlestick", data: candleData }],
        };

      case "pie":
        return {
          tooltip: { trigger: "item" },
          legend: { orient: "vertical", left: "left" },
          series: [
            {
              name: "Pie Chart",
              type: "pie",
              radius: window.innerWidth < 768 ? "50%" : "90%",
              data: chartData.labels.map((label: string, index: number) => ({
                value: chartData.data[index],
                name: label,
              })),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
              itemStyle: {
                color: (params: IStyleParams) => {
                  const colors = ["#ff6384", "#36a2eb", "#ffce56"];
                  return colors[params.dataIndex % colors.length];
                },
              },
            },
          ],
        };

      case "bar":
        return {
          tooltip: { trigger: "axis" },
          legend: { data: ["Bar Chart"] },
          xAxis: {
            type: "category",
            data: chartData.labels,
          },
          yAxis: { type: "value" },
          series: [{ type: "bar", data: chartData.data }],
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
    </div>
  );
}
