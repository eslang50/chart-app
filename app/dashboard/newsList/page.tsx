"use client";
import Spinner from "@/app/components/Spinner";
import { useSelectedSymbol } from "@/app/SelectedSymbolContext";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Article {
  url: string;
  headline: string;
  summary: string;
  datetime: number;
  image: string;
  source: string;
}

export default function Page() {
  const { selectedSymbol } = useSelectedSymbol();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 7);

        const formattedFromDate = fromDate.toISOString().split("T")[0];
        const today = new Date().toISOString().split("T")[0];

        const url = `${process.env.NEXT_PUBLIC_API_URL}/company-news/?symbol=${selectedSymbol}&from=${formattedFromDate}&to=${today}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error fetching news: ${response.statusText}`);
        }

        const data = await response.json();

        const filteredArticles = data.filter(function filterArticles(
          article: Article
        ) {
          if (!article.image) return;
          else if (article.source === "SeekingAlpha") return;
          else return article;
        });
        setNews(filteredArticles.slice(0, 5));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedSymbol]);

  return (
    <div className="company-news-section p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Company News for {selectedSymbol}
      </h2>
      {loading ? (
        <Spinner />
      ) : (
        <ul className="space-y-6">
          {news.map((article: Article, index) => (
            <li key={index}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-4 max-w-[1000px] mx-auto h-[200px]" // Set a fixed height for the article container
              >
                {article.image && (
                  <div className="md:w-1/3 w-full">
                    <Image
                      src={article.image}
                      width={600}
                      height={200} // Maintain the height
                      alt="News article image"
                      className="rounded-lg object-cover h-full" // Use object-cover to maintain aspect ratio
                    />
                  </div>
                )}
                <div className="md:w-2/3 w-full md:pl-4 mt-4 md:mt-0 overflow-hidden">
                  <h3 className="font-semibold text-lg text-blue-600 hover:text-blue-800">
                    {article.headline}
                  </h3>
                  <p className="text-gray-600 mt-2 w-full">
                    {article.summary.split(". ").slice(0, 2).join(". ")}.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Source:{" "}
                    <span className="font-medium">
                      {article.source.split(". ").slice(0, 3).join(". ")}
                    </span>
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
