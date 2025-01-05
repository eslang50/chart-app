"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSelectedSymbol } from "../SelectedSymbolContext";

interface StockSymbol {
  symbol: string;
  description: string;
}

export default function SearchBar() {
  const { setSelectedSymbol } = useSelectedSymbol();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<StockSymbol[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current !== event.target
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchSuggestions = async (searchTerm: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
            ? process.env.NEXT_PUBLIC_API_URL
            : "https://stocksnap-backend.onrender.com/api"
        }/search/?q=${searchTerm}&exchange=US`
      );
      const data = await response.json();
      setSuggestions(data.slice(0, 10) || []);
    } catch (error) {
      console.error("Error fetching stock suggestions:", error);
    }
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (symbol: string) => {
    setQuery(symbol);
    setSuggestions([]);
    setSelectedSymbol(symbol);
  };

  const handleInputFocus = () => {
    if (query.length > 1) {
      fetchSuggestions(query);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 100);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative w-full max-w-md mx-auto text-black"
    >
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Search for a stock symbol or ticker..."
        className="w-full p-2 border border-gray-300 rounded"
      />

      {isLoading && <p className="text-gray-500">Loading...</p>}

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-2 rounded shadow-lg text-black">
          {suggestions.map((stock) => (
            <li
              key={stock.symbol}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(stock.symbol)}
            >
              {stock.symbol} - {stock.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
