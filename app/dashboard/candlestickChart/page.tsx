import Chart from "@/app/components/Chart";

export default function Page() {
  return (
    <div>
      <Chart chartType="candlestick" apiEndpoint="http://localhost:8000/api/candlestick-data/" title="" />
    </div>
  );
}
