'use client';

import './Navigation.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/', loggedIn: false },
  { name: 'Artisans', href: '/artisans', loggedIn: false },
  { name: 'Shopping Cart', href: '/cart', loggedIn: true },
  { name: 'My Favorites', href: '/products/favorites', loggedIn: true },
  { name: 'Support', href: '/support', loggedIn: false },
];

export default function Navigation({
  loggedIn,
  userType
}: {
  loggedIn: boolean;
  userType: 'buyer' | 'seller' | null; // Adjust the type as needed
}) {
  const pathname = usePathname();

  return (
    <nav className='nav' aria-label="Main Navigation">
      <ul className='nav__list'>
        {links.map((link) => {
          const shouldShow = loggedIn ? true : !link.loggedIn;

          return shouldShow && (
            <li key={link.name} className='nav__list-item'>
              <Link href={link.href} className={pathname === link.href ? 'active' : ''} aria-current={pathname === link.href ? 'page' : undefined}>
                {link.name}
              </Link>
            </li>
          );
        })}

        {/* Artisans link - only show to sellers */}
        {userType === 'seller' && (
          <li className='nav__list-item'>
            <Link href="/products" className={pathname === '/products' ? 'active' : ''} aria-current={pathname === '/products' ? 'page' : undefined}>
              Manage Shop
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}


