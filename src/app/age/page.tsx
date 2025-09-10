"use client";

import React, { useState } from "react";
import Navbar from "../component/navbar";

export default function Age() {
  const [bornYear, setBornYear] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [age, setAge] = useState("");

  const handleCalculate = () => {
    if (!bornYear || !currentYear) {
      alert("Please fill both years");
      return;
    }

    const born = parseInt(bornYear);
    const current = parseInt(currentYear);

    if (isNaN(born) || isNaN(current)) {
      alert("Enter valid years");
      return;
    }

    if (current < born) {
      alert("Current year must be greater than born year");
      return;
    }

    const calculatedAge = current - born;
    setAge(calculatedAge.toString());
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
            Age Calculator
          </h2>

          {/* Born Year */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Born Year</label>
            <input
              type="number"
              value={bornYear}
              onChange={(e) => setBornYear(e.target.value)}
              className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6a85f1] transition"
              placeholder="Enter born year"
            />
          </div>

          {/* Current Year */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">Current Year</label>
            <input
              type="number"
              value={currentYear}
              onChange={(e) => setCurrentYear(e.target.value)}
              className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b690f1] transition"
              placeholder="Enter current year"
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
          {age && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center text-lg font-medium text-[#b690f1] animate-pulse">
              Your Age: <strong>{age} years</strong>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
