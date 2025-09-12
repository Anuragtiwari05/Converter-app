"use client";

import React, { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signin failed");
        return;
      }

      alert("Signin successful ✅");
      // redirect to homepage
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a1f3c] via-[#141824] to-[#0d0f17] text-white">
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-20">
        <div className="bg-black/40 backdrop-blur-md rounded-xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-[#6a85f1] to-[#b690f1] text-transparent bg-clip-text text-center">
            Sign In
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6a85f1] transition"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b690f1] transition"
              placeholder="Enter your password"
            />
          </div>

          {/* Signin Button */}
          <button
            onClick={handleSignin}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-[#6a85f1] to-[#b690f1] shadow-lg hover:scale-105 hover:shadow-[#6a85f1]/50 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Redirect to signup */}
          <p className="mt-6 text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-[#b690f1] hover:underline font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
