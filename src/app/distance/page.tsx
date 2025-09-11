"use client";

import React, { useState } from "react";
import Navbar from "../component/navbar";

export default function Distance() {
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [distance, setDistance] = useState("");
  const [result, setResult] = useState("");

  // Hardcoded conversion factors relative to meters
  const distanceUnits: Record<string, number> = {
    m: 1,           // meter
    km: 1000,       // kilometer
    cm: 0.01,       // centimeter
    mm: 0.001,      // millimeter
    mi: 1609.34,    // mile
    yd: 0.9144,     // yard
    ft: 0.3048,     // foot
    in: 0.0254      // inch
  };

  const handleCalculate = () => {
    if (!fromUnit || !toUnit) {
      alert("Please select both units");
      return;
    }
    if (!distance || isNaN(Number(distance))) {
      alert("Enter a valid distance");
      return;
    }

    const converted = (Number(distance) * distanceUnits[fromUnit]) / distanceUnits[toUnit];
    setResult(converted.toFixed(4));
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
            Distance Converter
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
              {Object.keys(distanceUnits).map((unit) => (
                <option key={unit} value={unit}>
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
              {Object.keys(distanceUnits).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          {/* Distance Input */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">Distance</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full border border-gray-700 rounded-lg px-4 py-2 
                         bg-transparent text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-[#8f9bb3] transition"
              placeholder="Enter distance"
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
              Converted Distance:{" "}
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
