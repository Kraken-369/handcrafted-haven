'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { handlee, jost } from '@/app/ui/fonts';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className={`${handlee.className} logo`}>
          <Link href="/" className="hover:text-blue-600">
            Handcrafted Haven
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className={`${jost.className} hidden md:flex flex-1 justify-center space-x-6 text-gray-700`}>
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link href="/" className="hover:text-blue-600">About Us</Link></li>
          <li><Link href="/" className="hover:text-blue-600">Products</Link></li>
          <li><Link href="/" className="hover:text-blue-600">Contact</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white shadow-md p-4 space-y-4 text-gray-700">
          <li><Link href="/" className="block" onClick={() => setIsOpen(false)}>Inicio</Link></li>
          <li><Link href="/" className="block" onClick={() => setIsOpen(false)}>Nosotros</Link></li>
          <li><Link href="/" className="block" onClick={() => setIsOpen(false)}>Productos</Link></li>
          <li><Link href="/" className="block" onClick={() => setIsOpen(false)}>Contacto</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
