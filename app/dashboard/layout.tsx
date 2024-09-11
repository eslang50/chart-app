"use client";

import Link from 'next/link';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Charts Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <Link href="/dashboard/line-chart" className="hover:underline">Candlestick Chart</Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/line-chart" className="hover:underline">Line Chart</Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/bar-chart" className="hover:underline">Bar Chart</Link>
            </li>
            <li>
              <Link href="/dashboard/pie-chart" className="hover:underline">Pie Chart</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
