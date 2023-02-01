import React from "react";
import Link from 'next/link'
import Image from "next/image";

import logo  from  "../public/purple-flower.png";

export const NavBar = () => {
  return (
    <nav className="nav-container">
      <div className="nav-item-container">
         <Link href="/">
         <Image
            src={logo}
            alt="Travel Blog Logo"
            width={140}
            height={140}
          />
        </Link> 
      </div>
      <div className="nav-item-container">
        <p className="nav-socials">XXX</p>
      </div>
    </nav>
  );
};

