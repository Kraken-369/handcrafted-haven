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
    <div className="nav-links">
      {links.map((link) => {
        return (
          <Link key={link.linkName} href={link.href} className="nav-link">
            <p>{link.linkName}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default NavLinks;
