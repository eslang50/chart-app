import Chart from "@/app/components/Chart";

export default function Page() {
  return (
    <div>
      <Chart
        chartType="pie"
        apiEndpoint="http://localhost:8000/api/pie-chart-data/"
        title="Pie Chart"
      />
    </div>
  );
}
