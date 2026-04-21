"use client"

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Modern icon set
import {navLinks} from "@/constants/navigation"
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  return (
  <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        {/* Logo */}
        <div className="shrink-0 font-bold text-2xl">TECHNO WEARS</div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
            key={link.name}
            href={link.href}
            className={`${
              pathname === link.href ? "text-blue-600" : "text-gray-600"
            } hover:text-blue-500 transition-colors font-medium`}
            >
            {link.name}
          </Link>
          ))}
        </div>
        
        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </div>
    
    {/* Mobile Menu */}
    {isOpen && (
      <div className="md:hidden bg-white border-b border-gray-200 p-4 space-y-4">
        {navLinks.map((link) => (
          <Link
          key={link.name}
          href={link.href}
          onClick={() => setIsOpen(false)}
          className="block text-gray-600 hover:text-blue-600"
          >
          {link.name}
        </Link>
        ))}
      </div>
      )}
    </nav>
    );
  }