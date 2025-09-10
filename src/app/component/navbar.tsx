import React from 'react';
import Link from 'next/link';

function Navbar() {
  const links = [
    { name: 'home', href: '/' },
    { name: 'currency', href: '/currency' },
    { name: 'weight', href: '/weight' },
    { name: 'age', href: '/age' }
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-950 via-purple-900 to-indigo-950 shadow-xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Title */}
        <div className="text-2xl font-extrabold text-white tracking-wide">
          My Converter App
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-10 text-gray-300 text-lg font-medium">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="relative group transition transform duration-300 hover:scale-110">
              <span className="text-gray-300 group-hover:text-white transition duration-300">
                {link.name}
              </span>
              {/* Animated underline */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-500 ease-out"></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
