// src/app/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './globals.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 Handcrafted-Haven</p>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/page1">Page1</Link>
        <Link href="/page2">Page2</Link>
      </nav>
      <div className="social-media">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <Facebook size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <Twitter size={24} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram size={24} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
