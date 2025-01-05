import Chart from "@/app/components/Chart";

export default function Page() {
  const apiEndpoint = `${
    process.env.NEXT_PUBLIC_API_URL
      ? process.env.NEXT_PUBLIC_API_URL
      : "https://stocksnap-backend.onrender.com/api"
  }/bar-chart-data/`;
  return (
    <div>
      <Chart chartType="candlestick" apiEndpoint={apiEndpoint} />
    </div>
  );
}
