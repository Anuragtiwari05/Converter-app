"use client";

import Card from "@/app/component/card";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ConversionsPage() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a1f3c] via-[#141824] to-[#0d0f17] text-white">
      {/* Top Section with buttons */}
      <div className="flex justify-between items-center px-6 py-4">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-[#6a85f1] to-[#b690f1] shadow-lg hover:scale-105 transition-transform"
        >
          Home
        </button>
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-[#6a85f1] to-[#b690f1] shadow-lg hover:scale-105 transition-transform"
        >
          Logout
        </button>
      </div>

      {/* Grid of Cards */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-10">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <Card
      title="Currency Converter"
      href="/currency"
      
      img="/images/currency-ai.jpg"
      borderColor="hover:border-[#6a85f1]/80"
    />
    <Card
      title="Weight Converter"
      href="/weight"
      
      img="/images/weight.webp"
      borderColor="hover:border-green-400/80"
    />
    <Card
      title="Age Calculator"
      href="/age"
     
      img="/images/age.jpg"
      borderColor="hover:border-pink-400/80"
    />
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
    <Card
      title="Temperature Converter"
      href="/temperature"
      
      img="/images/temp-ai.jpg"
      borderColor="hover:border-orange-400/80"
    />
    <Card
      title="Distance Converter"
      href="/distance"
      
      img="/images/dist-ai.jpg"
      borderColor="hover:border-yellow-400/80"
    />
  </div>
</main>

    </div>
  );
}
