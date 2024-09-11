import Chart from "@/app/components/Chart";

export default function Page() {
  return (
    <div>
      <Chart
        chartType="line"
        apiEndpoint="http://localhost:8000/api/line-chart-data/"
        title="Line Chart"
      />
    </div>
  );
}
