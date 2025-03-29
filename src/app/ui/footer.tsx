import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#082e21] text-white py-6">
      <div className="container mx-auto px-4">
        <p className="text-center">&copy; 2025 Handcrafted-Haven</p>
        <nav className="flex justify-center my-4 space-x-6">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/page1" className="hover:text-gray-300">Page1</Link>
          <Link href="/page2" className="hover:text-gray-300">Page2</Link>
        </nav>

        <div className="flex justify-center space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook size={24} className="hover:text-gray-300" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter size={24} className="hover:text-gray-300" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram size={24} className="hover:text-gray-300" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={24} className="hover:text-gray-300" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
