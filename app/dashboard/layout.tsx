"use client"

import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Charts Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <Link href="/dashboard/candlestickChart" className="hover:underline">Candlestick Chart</Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/lineChart" className="hover:underline">Line Chart</Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/barChart" className="hover:underline">Bar Chart</Link>
            </li>
            <li>
              <Link href="/dashboard/pieChart" className="hover:underline">Pie Chart</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
