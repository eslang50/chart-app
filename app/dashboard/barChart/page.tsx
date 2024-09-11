"use client";

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'
import { Chart } from '../lineChart/page';
import Spinner from '@/app/components/Spinner';

export default function Page() {
  const [barChartData, setBarChartData] = useState<Chart>();

  useEffect( () => {
    async function fetchData() {
      const response = await fetch('http://localhost:8000/api/bar-chart-data/')
      const data = await response.json();
      setBarChartData(data)
    }
    fetchData()
  }, []);

  if (!barChartData) {
    return <Spinner />;
  }

  const data = {
    labels: barChartData.labels,
    datasets: [
      {
        label: 'Bar Chart',
        data: barChartData.data,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bar Chart</h1>
      <Bar data={data} />
    </div>
  );
}
