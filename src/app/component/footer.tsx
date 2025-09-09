import React from "react";

export default function Footer() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-300">
      {/* Left side */}
      <div className="text-center md:text-left">
        <h2 className="text-xl font-bold text-white mb-2">My Converter App</h2>
        <p className="text-sm">
          Helping you convert weights, currencies, and more with ease.
        </p>
      </div>

      {/* Links */}
      <div className="flex gap-6">
        <a href="/" className="hover:text-white transition">
          Home
        </a>
        <a href="/about" className="hover:text-white transition">
          About
        </a>
        <a href="/contact" className="hover:text-white transition">
          Contact
        </a>
        <a href="/privacy" className="hover:text-white transition">
          Privacy
        </a>
      </div>

      {/* Copyright */}
      <div className="text-sm text-center md:text-right">
        &copy; {new Date().getFullYear()} My Converter App. All rights reserved.
      </div>
    </div>
  );
}
