"use client";

import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

interface IStock {
  data: Array<ICandle>;
}

interface ICandle {
  x: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export default function CandlestickChart() {
  const [candlestickData, setCandlestickData] = useState<IStock>();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:8000/api/candlestick-data/"
      );
      const data = await response.json();
      setCandlestickData(data);
    }
    fetchData();
  }, []);

  if (!candlestickData) {
    return <div>Loading...</div>;
  }

  const data = candlestickData.data.map((d) => [
    d.open,     
    d.close,    
    d.low,     
    d.high 
  ]);

  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["Candlestick"],
    },
    xAxis: {
      type: "category",
      data: candlestickData.data.map((d) => d.x),
      scale: true,
    },
    yAxis: {
      scale: true,
    },
    series: [
      {
        type: "candlestick",
        data: data,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">Candlestick Chart</h1>
      <ReactECharts
        option={options}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
}
