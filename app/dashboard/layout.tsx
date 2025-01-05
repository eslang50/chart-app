"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "../components/SearchBar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardPage = pathname === "/dashboard";

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <aside className="w-full md:w-1/6 p-4 bg-gray-800 md:h-screen md:sticky md:top-0">
        <Link href="/dashboard">
          <h2 className="text-xl font-bold mb-4 text-white text-center md:text-left">
            StockSnap
          </h2>
        </Link>
        <nav>
          <ul className="flex md:flex-col justify-between md:gap-4">
            <li>
              <Link
                href="/dashboard/priceAction"
                className="hover:underline text-white "
              >
                Price Action
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/financialPerformance"
                className="hover:underline text-white"
              >
                Financial Performance
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/newsList"
                className="hover:underline text-white"
              >
                Company News
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className={`flex-grow ${isDashboardPage ? "p-0" : "p-6 md:p-12"}`}>
        <header className="w-full flex justify-center py-4">
          <SearchBar />
        </header>
        {children}
      </div>
    </div>
  );
}
