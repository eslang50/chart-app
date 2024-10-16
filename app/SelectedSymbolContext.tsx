"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SelectedSymbolContextType {
  selectedSymbol: string;
  setSelectedSymbol: React.Dispatch<React.SetStateAction<string>>;
}

const SelectedSymbolContext = createContext<
  SelectedSymbolContextType | undefined
>(undefined);

export const SelectedSymbolProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL"); // Default value  

  return (
    <SelectedSymbolContext.Provider
      value={{ selectedSymbol, setSelectedSymbol }}
    >
      {children}
    </SelectedSymbolContext.Provider>
  );
};

export const useSelectedSymbol = () => {
  const context = useContext(SelectedSymbolContext);
  if (!context) {
    throw new Error(
      "useSelectedSymbol must be used within a SelectedSymbolProvider"
    );
  }
  return context;
};
