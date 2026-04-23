"use client"

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/constants/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    if (href.startsWith("#")) {
      return false;
    }

    return pathname === href;
  };
  
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
                isActiveLink(link.href) ? "text-white" : "text-gray-400"
              } hover:text-white transition-colors font-medium`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </div>
    
    {/* Mobile Menu */}
    {isOpen && (
      <div className="md:hidden bg-black border-b border-gray-800 p-4 space-y-4">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="block text-gray-400 hover:text-white"
          >
            {link.name}
          </Link>
        ))}
      </div>
      )}
    </nav>
    );
  }
