"use client";

import React, { useState } from "react";
import Navbar from "../component/navbar";

export default function Temperature() {
  const [fromUnit, setFromUnit] = useState("C");
  const [toUnit, setToUnit] = useState("F");
  const [temp, setTemp] = useState("");
  const [result, setResult] = useState("");

  // Hardcoded conversion functions
  const convertTemp = (value: number, from: string, to: string): number => {
    switch (from.toUpperCase()) {
      case "C":
        if (to.toUpperCase() === "C") return value;
        if (to.toUpperCase() === "F") return value * 9 / 5 + 32;
        if (to.toUpperCase() === "K") return value + 273.15;
        break;
      case "F":
        if (to.toUpperCase() === "C") return (value - 32) * 5 / 9;
        if (to.toUpperCase() === "F") return value;
        if (to.toUpperCase() === "K") return (value - 32) * 5 / 9 + 273.15;
        break;
      case "K":
        if (to.toUpperCase() === "C") return value - 273.15;
        if (to.toUpperCase() === "F") return (value - 273.15) * 9 / 5 + 32;
        if (to.toUpperCase() === "K") return value;
        break;
      default:
        return value;
    }
    return value;
  };

  const handleCalculate = () => {
    if (!fromUnit || !toUnit) {
      alert("Please select both units");
      return;
    }
    if (!temp || isNaN(Number(temp))) {
      alert("Enter a valid temperature");
      return;
    }
    const converted = convertTemp(Number(temp), fromUnit, toUnit);
    setResult(converted.toFixed(2));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a1f3c] via-[#141824] to-[#0d0f17] text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-20">
        <div className="bg-black/40 backdrop-blur-md rounded-xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-[#6a85f1] to-[#b690f1] text-transparent bg-clip-text text-center">
            Temperature Converter
          </h2>

          {/* From Unit */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full border border-gray-700 rounded-lg px-4 py-2 
                         bg-gray-900 text-white focus:outline-none 
                         focus:ring-2 focus:ring-[#6a85f1] transition"
            >
              <option value="C">Celsius (°C)</option>
              <option value="F">Fahrenheit (°F)</option>
              <option value="K">Kelvin (K)</option>
            </select>
          </div>

          {/* To Unit */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full border border-gray-700 rounded-lg px-4 py-2 
                         bg-gray-900 text-white focus:outline-none 
                         focus:ring-2 focus:ring-[#b690f1] transition"
            >
              <option value="C">Celsius (°C)</option>
              <option value="F">Fahrenheit (°F)</option>
              <option value="K">Kelvin (K)</option>
            </select>
          </div>

          {/* Temperature Input */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">Temperature</label>
            <input
              type="number"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              className="w-full border border-gray-700 rounded-lg px-4 py-2 
                         bg-transparent text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-[#8f9bb3] transition"
              placeholder="Enter temperature"
            />
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-[#6a85f1] to-[#b690f1] shadow-lg hover:scale-105 hover:shadow-[#6a85f1]/50 transition-transform duration-300"
          >
            Calculate
          </button>

          {/* Result */}
          {result && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center text-lg font-medium text-[#b690f1] animate-pulse">
              Converted Temperature:{" "}
              <strong>
                {result} {toUnit}
              </strong>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
