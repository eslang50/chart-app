import Chart from "@/app/components/Chart";

export default function Page() {
  const apiEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/bar-chart-data/`;

  return (
    <div>
      <Chart chartType="bar" apiEndpoint={apiEndpoint} />
    </div>
  );
}
