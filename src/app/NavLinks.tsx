import Link from "next/link";
import React from "react";

const links = [
  { linkName: "Home", url: "/" },
  { linkName: "Products", url: "/products" },
  { linkName: "Contact Us", url: "/contact" },
];

function NavLinks() {
  return (
    <div>
      {links.map((link) => {
        <Link key={linkName}></Link>;
      })}
    </div>
  );
}

export default NavLinks;
