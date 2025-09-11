"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";

export default function Currency() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [fromCurrency, setFromCurrency] = useState("USD"); // default USD
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  const API_KEY = "447f52773979a27d535033b1";

  // ✅ useEffect should be here, not inside handleCalculate
  useEffect(() => {
    if (!fromCurrency) return;

    const fetchRates = async () => {
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
        );
        const data = await res.json();

        if (data && data.conversion_rates) {
          setRates(data.conversion_rates);
        } else {
          alert("Failed to fetch rates");
        }
      } catch (error) {
        console.error("Error fetching rates:", error);
        alert("Error fetching rates, please try again later.");
      }
    };

    fetchRates();
  }, [fromCurrency]);

  const handleCalculate = () => {
    if (!fromCurrency || !toCurrency) {
      alert("Please select both currencies");
      return;
    }

    if (!amount || isNaN(Number(amount))) {
      alert("Enter a valid number");
      return;
    }

    if (!rates[toCurrency]) {
      alert("Conversion rate not available");
      return;
    }

    const converted = parseFloat(amount) * rates[toCurrency];
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
            Currency Converter
          </h2>

          {/* From Currency */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">From</label>
           <select
  value={fromCurrency}
  onChange={(e) => setFromCurrency(e.target.value)}
  className="w-full border border-gray-700 rounded-lg px-4 py-2 
             bg-gray-900 text-white focus:outline-none 
             focus:ring-2 focus:ring-[#6a85f1] transition"
>
  <option value="">Select currency</option>
  {Object.keys(rates).map((cur) => (
    <option key={cur} value={cur} className="bg-gray-900 text-white">
      {cur}
    </option>
  ))}
</select>

          </div>

          {/* To Currency */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">To</label>
            <select
    value={toCurrency}
    onChange={(e) => setToCurrency(e.target.value)}
    className="w-full border border-gray-700 rounded-lg px-4 py-2 
               bg-gray-900 text-white focus:outline-none 
               focus:ring-2 focus:ring-[#b690f1] transition"
  >
    <option value="">Select currency</option>
    {Object.keys(rates).map((cur) => (
      <option key={cur} value={cur} className="bg-gray-900 text-white">
        {cur}
      </option>
    ))}
  </select>
          </div>

          {/* Amount */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8f9bb3] transition"
              placeholder="Enter amount"
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
              Converted Amount:{" "}
              <strong>
                {result} {toCurrency}
              </strong>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
