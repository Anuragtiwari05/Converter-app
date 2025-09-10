"use client";

import React, { useState } from "react";
import Navbar from "../component/navbar";

const weightUnits: Record<string, number> = {
  KG: 1,
  G: 0.001,
  LB: 0.453592,
  OZ: 0.0283495,
};

export default function Weight() {
  const [fromUnit, setFromUnit] = useState(" ");
  const [toUnit, setToUnit] = useState(" ");
  const [weight, setWeight] = useState(" ");
  const [result, setResult] = useState(" ");

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
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="bg-black/50 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-[#6a85f1] to-[#b690f1] text-transparent bg-clip-text">
            Weight Converter
          </h2>

          {/* From Unit */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-300 font-medium">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full border border-gray-600 rounded px-3 py-2 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-[#6a85f1] transition"
            >
              <option value=" ">Select unit</option>
              {Object.keys(weightUnits).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          {/* To Unit */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-300 font-medium">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full border border-gray-600 rounded px-3 py-2 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-[#b690f1] transition"
            >
              <option value=" ">Select unit</option>
              {Object.keys(weightUnits).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          {/* Weight Input */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-300 font-medium">Weight</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
              className="w-full border border-gray-600 rounded px-3 py-2 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-[#8f9bb3] transition"
            />
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-[#6a85f1] to-[#b690f1] py-2 rounded-xl font-semibold shadow-lg hover:shadow-[#6a85f1]/50 hover:scale-105 transition-transform duration-300"
          >
            Calculate
          </button>

          {/* Result Section */}
          {result && (
            <div className="mt-4 p-3 rounded-lg bg-black/30 text-center text-gray-200 font-medium">
              Converted Weight:{" "}
              <span className="font-bold text-[#6a85f1]">
                {result} {toUnit}
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 text-gray-400 backdrop-blur-lg border-t border-white/10">
        {/* Reuse your Footer component if needed */}
      </footer>
    </div>
  );
}
