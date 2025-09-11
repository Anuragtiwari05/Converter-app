"use client";

import React, { useState } from "react";
import Navbar from "../component/navbar";

const weightUnits: Record<string, number> = {
  // Metric
  KG: 1, // Kilogram
  G: 0.001, // Gram
  MG: 0.000001, // Milligram
  TONNE: 1000, // Metric ton

  // Imperial / US
  LB: 0.453592, // Pound
  OZ: 0.0283495, // Ounce
  ST: 6.35029, // Stone
  CWT: 50.8023, // Hundredweight (UK, 112 lb)
  US_TON: 907.185, // US Ton (2000 lb)
  UK_TON: 1016.05, // UK Ton (2240 lb)

  // Others
  CARAT: 0.0002, // Carat (200 mg)
  GRAIN: 0.0000648, // Grain
};

export default function Weight() {
  const [fromUnit, setFromUnit] = useState(" ");
  const [toUnit, setToUnit] = useState(" ");
  const [weight, setWeight] = useState(" ");
  const [result, setResult] = useState("");

  const handleCalculate = () => {
    if (!fromUnit || !toUnit) {
      alert("Please select both units");
      return;
    }

    if (!weight || isNaN(Number(weight))) {
      alert("Enter a valid number");
      return;
    }

    const converted =
      (parseFloat(weight) * weightUnits[fromUnit]) / weightUnits[toUnit];
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
            Weight Converter
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
              <option value=" ">Select unit</option>
              {Object.keys(weightUnits).map((unit) => (
                <option
                  key={unit}
                  value={unit}
                  className="bg-gray-900 text-white"
                >
                  {unit}
                </option>
              ))}
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
              <option value=" ">Select unit</option>
              {Object.keys(weightUnits).map((unit) => (
                <option
                  key={unit}
                  value={unit}
                  className="bg-gray-900 text-white"
                >
                  {unit}
                </option>
              ))}
            </select>
          </div>

          {/* Weight Input */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">Weight</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
              className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8f9bb3] transition"
            />
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-[#6a85f1] to-[#b690f1] shadow-lg hover:scale-105 hover:shadow-[#6a85f1]/50 transition-transform duration-300"
          >
            Calculate
          </button>

          {/* Result Section */}
          {result && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center text-lg font-medium text-[#b690f1] animate-pulse">
              Converted Weight:{" "}
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
