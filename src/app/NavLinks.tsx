'use client';

import Link from 'next/link';
import React from 'react';

const links = [
  { linkName: 'Home', href: '/' },
  { linkName: 'Products', href: '/products' },
  { linkName: 'Contact Us', href: '/contact' },
];

function NavLinks() {
  return (
    <div className="container mx-auto flex justify-between items-center gap-4">
      {links.map((link) => {
        return (
          <Link
            key={link.linkName}
            href={link.href}
            className="text-gray-300 hover:text-white"
          >
            <p>{link.linkName}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default NavLinks;
