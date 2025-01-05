"use client";

import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import Spinner from "@/app/components/Spinner";
import { useSelectedSymbol } from "../SelectedSymbolContext";

interface ChartProps {
  chartType: "candlestick" | "bar";
  apiEndpoint: string;
}

interface IChart {
  labels: Array<string>;
  data: {
    revenue: Array<number>;
    gross_profit: Array<number>;
    net_income: Array<number>;
    total_assets: Array<number>;
    total_debt: Array<number>;
    cash_and_cash_equivalents: Array<number>;
    operating_cash_flow: Array<number>;
    capex: Array<number>;
    free_cash_flow: Array<number>;
  };
  symbol: string;
}

interface ICandle {
  date: string;
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

const formatNumber = (value: number) => {
  if (value >= 1) return value.toFixed(1) + "B"; // Billions
  if (value >= 1e-3) return (value * 1e3).toFixed(1) + "M"; // Millions (1B = 1000M)
  if (value >= 1e-6) return (value * 1e6).toFixed(1) + "K"; // Thousands (1M = 1000K)
  return value.toFixed(2); // Format as a decimal for values below 1,000
};

export default function Chart({ chartType, apiEndpoint }: ChartProps) {
  const { selectedSymbol } = useSelectedSymbol();
  const [chartData, setChartData] = useState<IChart | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1y");
  const [financialPeriod, setFinancialPeriod] = useState<string>("annual");

  console.log("Current selected symbol:", selectedSymbol);

  useEffect(() => {
    async function fetchData() {
      try {
        const url =
          chartType === "bar"
            ? `${apiEndpoint}?symbol=${selectedSymbol}&period=${financialPeriod}`
            : `${apiEndpoint}?symbol=${selectedSymbol}&period=${selectedPeriod}`;

        const response = await fetch(url);
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    }
    fetchData();
  }, [apiEndpoint, chartType, selectedPeriod, selectedSymbol, financialPeriod]);

  if (!chartData) {
    return <Spinner />;
  }

  const generateOptions = () => {
    switch (chartType) {
      case "candlestick":
        const candleData: Array<[number, number, number, number]> = (
          chartData.data as unknown as ICandle[]
        ).map((candle) => [
          parseFloat(candle.open.toFixed(2)),
          parseFloat(candle.close.toFixed(2)),
          parseFloat(candle.low.toFixed(2)),
          parseFloat(candle.high.toFixed(2)),
        ]);
        const isHourlyData = selectedPeriod === "1d";

        return [
          {
            title: {
              text: chartData.symbol,
            },
            tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
            xAxis: {
              type: "category",
              data: (chartData.data as unknown as ICandle[]).map((d) => {
                const date = new Date(d.date);
                return isHourlyData
                  ? date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : date.toISOString().split("T")[0];
              }),
              scale: true,
            },
            yAxis: {
              scale: true,
            },
            series: [
              {
                type: "candlestick",
                data: candleData,
                itemStyle: {
                  color: "#26a69a",
                  color0: "#ef5350",
                  borderColor: "#1b5e20",
                  borderColor0: "#b71c1c",
                },
              },
            ],
          },
        ];

      case "bar":
        const profitChartOptions = {
          title: {
            text: `${chartData.symbol} - Profit`,
          },
          tooltip: { trigger: "axis" },
          legend: { data: ["Revenue", "Gross Profit", "Net Income"] },
          xAxis: {
            type: "category",
            data: chartData.labels,
            inverse: true,
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: formatNumber,
            },
          },
          series: [
            { name: "Revenue", type: "bar", data: chartData.data.revenue },
            {
              name: "Gross Profit",
              type: "bar",
              data: chartData.data.gross_profit,
            },
            {
              name: "Net Income",
              type: "bar",
              data: chartData.data.net_income,
            },
          ],
        };

        const balanceSheetChartOptions = {
          title: {
            text: `${chartData.symbol} - Balance Sheet`,
          },
          tooltip: { trigger: "axis" },
          legend: { data: ["Total Assets", "Total Debt", "Cash"] },
          xAxis: {
            type: "category",
            data: chartData.labels,
            inverse: true,
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: formatNumber,
            },
          },
          series: [
            {
              name: "Total Assets",
              type: "bar",
              data: chartData.data.total_assets,
            },
            {
              name: "Total Debt",
              type: "bar",
              data: chartData.data.total_debt,
              itemStyle: { color: "#FF5722" },
            },
            {
              name: "Cash",
              type: "bar",
              data: chartData.data.cash_and_cash_equivalents,
            },
          ],
        };

        const cashFlowChartOptions = {
          title: {
            text: `${chartData.symbol} - Cash Flow`,
          },
          tooltip: { trigger: "axis" },
          legend: { data: ["Operating Cash Flow", "CapEx", "Free Cash Flow"] },
          xAxis: {
            type: "category",
            data: chartData.labels,
            inverse: true,
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: formatNumber,
            },
          },
          series: [
            {
              name: "Operating Cash Flow",
              type: "bar",
              data: chartData.data.operating_cash_flow,
            },
            {
              name: "CapEx",
              type: "bar",
              data: chartData.data.capex,
              itemStyle: { color: "#FF5722" },
            },
            {
              name: "Free Cash Flow",
              type: "bar",
              data: chartData.data.free_cash_flow,
            },
          ],
        };

        return [
          profitChartOptions,
          balanceSheetChartOptions,
          cashFlowChartOptions,
        ];

      default:
        return [];
    }
  };

  return (
    <div>
      {chartType === "bar" && (
        <>
          <h2 className="text-2xl text-gray-600 text-center font-bold">
            {selectedSymbol}
          </h2>
          <div className="flex justify-end mb-4">
            <label className="mr-2">Financial Period:</label>
            <select
              className="border border-gray-300 rounded p-2 text-black"
              value={financialPeriod}
              onChange={(e) => setFinancialPeriod(e.target.value)}
            >
              <option value="annual">Annual</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>
          {chartType === "bar" && (
            <div>
              {generateOptions().map((options, index) => (
                <ReactECharts
                  key={index}
                  option={{
                    ...options,
                    title: {
                      ...options.title,
                      text:
                        index === 0
                          ? "Income Statement"
                          : index === 1
                          ? "Balance Sheet"
                          : "Cash Flow",
                    },
                  }}
                  style={{
                    height: "400px",
                    width: "100%",
                    marginBottom: "20px",
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}
      {chartType === "candlestick" && (
        <div className="mb-4">
          <ReactECharts
            option={generateOptions()[0]}
            style={{ height: "400px", width: "100%" }}
          />
          <ul id="timePeriod" className="p-2 flex gap-4 justify-end mr-12">
            {timePeriods.map((period) => (
              <li
                key={period.value}
                value={period.value}
                className="hover:opacity-50 text-black cursor-pointer"
                onClick={() => setSelectedPeriod(period.value)}
              >
                {period.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
