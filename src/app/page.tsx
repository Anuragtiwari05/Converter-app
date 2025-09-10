import React from "react";
import Navbar from "./component/navbar";
import Footer from "./component/footer";


export default function Home(){
  return(

       <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a1f3c] via-[#141824] to-[#0d0f17] text-white">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#6a85f1] to-[#b690f1] text-transparent bg-clip-text">
          Welcome to My Website
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-12 leading-relaxed">
          Convert{" "}
          <span className="text-[#6a85f1]">Weights</span>,{" "}
          <span className="text-[#b690f1]">Currencies</span>, and{" "}
          <span className="text-[#8f9bb3]">Ages</span> instantly.  
          <br />Fast ⚡ | Elegant 🎨 | Reliable ✅
        </p>

        <div className="flex gap-6 justify-center">
          <a
            href="#"
            className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#6a85f1] to-[#b690f1] shadow-lg hover:shadow-[#6a85f1]/40 hover:scale-105 transition-transform duration-300"
          >
            Get Started
          </a>
          <a
            href="#"
            className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#434343] to-[#000000] text-gray-200 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Learn More
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 text-gray-400 backdrop-blur-lg border-t border-white/10">
        <Footer />
      </footer>
    </div>
  




  )
}