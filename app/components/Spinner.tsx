// loading component when fetching data - trying to mock windows loading animation!
export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="border-t-transparent border-solid animate-spin border-blue-500 border-8 rounded-full h-16 w-16"></div>
    </div>
  );
}
