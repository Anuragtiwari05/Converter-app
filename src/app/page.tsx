import React from "react";
import Navbar from "./component/navbar";
import Footer from "./component/footer";


export default function Home(){
  return(

     <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-20 text-center bg-gray-50">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to My Website
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-700 mb-8">
          This website helps users convert weights, currencies, and temperatures
          easily. It's fast, responsive, and simple to use.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Get Started
          </a>
          <a
            href="#"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Learn More
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <Footer />
      </footer>
    </div>
  




  )
}