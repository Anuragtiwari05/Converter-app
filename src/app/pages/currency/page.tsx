import React, { useState } from "react";
import Navbar from "@/app/component/navbar";

const rates: Record<string, number> = {
  USD: 1,
  INR: 83,
  EUR: 0.83,
  GBP: 0.72,
};

export default function Currency() {
  const [fromCurrency, setFromCurrency] = useState(" ");
  const [toCurrency, setToCurrency] = useState(" ");
  const [amount, setAmount] = useState(" ");
  const [result, setResult] = useState(" ");

  const handleCalculate = () => {
    if (!fromCurrency || !toCurrency) {
      alert("Please select both currencies");
      return;
    }

    if (!amount || isNaN(Number(amount))) {
      alert("enter a valid number");
    }

    const converted =
      (parseFloat(amount) * rates[toCurrency]) / rates[fromCurrency];
    setResult(converted.toFixed(2));
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="lex-grow flex items-center justify-center p-6">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Currency Converter
            </h2>

            <div className="mb-4">
              <label className="block mb-1">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value=" ">Select currency</option>
                {Object.keys(rates).map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value=" ">Select currency</option>
                {Object.keys(rates).map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
                <label className="block mb-1">Amount</label>
                <input
                type="number"
                value={amount}
                onChange={(e)=> setAmount(e.target.value)}
                className="w-full border rounded px-3 py-2"
                />
            </div>

            <button onClick={handleCalculate} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                Calculate
                
            </button>

            {result && (
            <div className="mt-4 p-3 bg-gray-100 rounded text-center">
              Converted Amount: <strong>{result} {toCurrency}</strong>
            </div>
          )}

          </div>
        </div>
      </div>
    </div>
  );
}
