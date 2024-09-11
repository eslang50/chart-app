"use client";

import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'
import {Chart} from '../lineChart/page';
import Spinner from '@/app/components/Spinner';

export default function Page() {
  const [pieChartData, setPieChartData] = useState<Chart>();

  useEffect( () => {
    async function fetchData() {
      const response = await fetch('http://localhost:8000/api/pie-chart-data/')
      const data = await response.json();
      setPieChartData(data)
    }
    fetchData()
  }, []);


  if (!pieChartData) {
    return <Spinner />;
  }

  const data = {
    labels: pieChartData.labels,
    datasets: [
      {
        label: 'Pie Chart',
        data: pieChartData.data,
        backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pie Chart</h1>
      <Pie data={data} />
    </div>
  );
}
