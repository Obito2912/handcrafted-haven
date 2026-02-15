"use client";

import "./Navigation.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { name: 'Home', href: '/', loggedIn: false },
  { name: 'Artisans', href: '/artisans', loggedIn: false },
  { name: 'Shopping Cart', href: '/cart', loggedIn: true },
  { name: 'My Favorites', href: '/products/favorites', loggedIn: true },
  { name: 'Support', href: '/support', loggedIn: false },
];

export default function Navigation({
  loggedIn,
  userType,
}: {
  loggedIn: boolean;
  userType: "buyer" | "seller" | null;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu open/closed state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className='nav' aria-label="Main Navigation">
      {/* Hamburger button - visible only on mobile */}
      <button
        className={`nav__hamburger ${isOpen ? "nav__hamburger--open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span className="nav__hamburger-line"></span>
        <span className="nav__hamburger-line"></span>
        <span className="nav__hamburger-line"></span>
      </button>

      {/* Navigation menu list - expands downward on mobile */}
      <ul className={`nav__list ${isOpen ? "nav__list--open" : ""}`}>
        {links.map((link) => {
          const shouldShow = loggedIn ? true : !link.loggedIn;

          return (
            shouldShow && (
              <li key={link.name} className="nav__list-item">
                <Link
                  href={link.href}
                  className={pathname === link.href ? "active" : ""}
                  onClick={closeMenu}
                 aria-current={pathname === link.href ? 'page' : undefined}>
                  {link.name}
                </Link>
              </li>
            )
          );
        })}

        {/* Manage Shop link - only visible to sellers */}
        {userType === "seller" && (
          <li className="nav__list-item">
            <Link
              href="/products"
              className={pathname === "/products" ? "active" : ""}
              onClick={closeMenu}
             aria-current={pathname === '/products' ? 'page' : undefined}>
              Manage Shop
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
