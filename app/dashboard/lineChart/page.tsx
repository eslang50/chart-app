'use client'

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Spinner from '@/app/components/Spinner';
import 'chart.js/auto'

export interface Chart {
  labels : Array<string>,
  data : Array<number>
}

export default function Page() {
  const [lineChartData, setLineChartData] = useState<Chart>();

  useEffect( () => {
    async function fetchData() {
      const response = await fetch('http://localhost:8000/api/line-chart-data/')
      const data = await response.json();
      setLineChartData(data)
    }
    fetchData()
  }, []);

  if (!lineChartData) {
    return <Spinner />;
  }

  const data = {
    labels: lineChartData.labels,
    datasets: [
      {
        label: 'Line Chart',
        data: lineChartData.data,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">Line Chart</h1>
      <Line data={data} />
    </div>
  );
}
