'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'

const Navbar = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className={`handwriting logo`}>
          <Link href="/" className="hover:text-blue-600">
            Handcrafted Haven
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className={`hidden md:flex flex-1 justify-center space-x-6 text-gray-700`}>
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link href="/" className="hover:text-blue-600">About Us</Link></li>
          <li><Link href="/" className="hover:text-blue-600">Products</Link></li>
          <li><Link href="/" className="hover:text-blue-600">Contact</Link></li>
          <li>
          {user ? (
              <>
                <span className="text-blue-600 font-semibold">Welcome, {user.name}!</span>&nbsp;
                [ <Link href="/dashboard" className="hover:text-blue-600">Go to dashboard</Link>
                &nbsp;|&nbsp;
                <Link href="/" className="hover:text-blue-600" onClick={handleSignOut}>Sign Out</Link> ]
              </>
            ) : (
              <>
                [ <Link href="/login" className="hover:text-blue-600">Sign In</Link>
                &nbsp;|&nbsp;
                <Link href="/" className="hover:text-blue-600">Sign Up</Link> ]
              </>
            )}
          </li>
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
          {user ? (
            <>
              <li>
                <span className="text-blue-600 font-semibold">Welcome, {user.name}!</span>
                <Link href="/dashboard" className="block" onClick={() => setIsOpen(false)}>Go to dashboard</Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-600" onClick={handleSignOut}>Sign Out</Link>
              </li>
            </>
          ) : (
            <>
              <li><Link href="/login" className="block" onClick={() => setIsOpen(false)}>Sign In</Link></li>
              <li><Link href="/" className="block" onClick={() => setIsOpen(false)}>Sign Up</Link></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
