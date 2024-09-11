// Page.tsx
export default function Page() {
  return (
    <div className="relative w-full h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/graphPicture.jpg)' }}>
      <div className="flex items-center justify-center w-full h-full bg-opacity-50 bg-black">
        <h1 className="text-2xl font-bold text-white">
          Please select one of the charts in the side panel!
        </h1>
      </div>
    </div>
  );
}
