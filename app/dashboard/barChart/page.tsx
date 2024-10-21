import Chart from "@/app/components/Chart";

export default function Page() {
  return (
    <div>
      <Chart
        chartType="bar"
        apiEndpoint="http://localhost:8000/api/bar-chart-data/"
      />
    </div>
  );
}
