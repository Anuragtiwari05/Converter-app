"use client";

import Link from "next/link";
import Image from "next/image";

interface CardProps {
  title: string;
  href: string;
  
  img: string;
  borderColor?: string; // <-- add this
}

export default function Card({ title, href, img, borderColor }: CardProps) {
  return (
    <Link
      href={href}
      className={`relative w-60 h-80 rounded-xl overflow-hidden 
                 bg-gradient-to-br from-[#1e223d] to-[#12141f] shadow-lg 
                 transform transition-all duration-300 
                 hover:scale-105 hover:shadow-2xl 
                 border border-transparent ${borderColor || ""}`}
    >
      {/* Background Image */}
      <Image
        src={img}
        alt={title}
        fill
        className="object-cover opacity-30"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
        <Image src={img} alt={`${title} icon`} width={40} height={40} />
        <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      </div>
    </Link>
  );
}
