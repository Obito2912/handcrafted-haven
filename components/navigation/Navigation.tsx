'use client';

import './Navigation.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/', loggedIn: false },
  { name: 'Artisans', href: '/artisans', loggedIn: false },
  { name: 'Purchases', href: '/purchases', loggedIn: true },
  { name: 'Products', href: '/products', loggedIn: true },
  { name: 'Support', href: '/support', loggedIn: false },
];

export default function Navigation(
  { loggedIn }: { loggedIn: boolean }
) {
  const pathname = usePathname();

  return (
    <nav className='nav'>
      <ul className='nav__list'>
        {links.map((link) => (
          (loggedIn ? link.loggedIn || !link.loggedIn : !link.loggedIn) &&
          <li key={link.name} className='nav__list-item'>
            <Link href={link.href} className={pathname === link.href ? 'active' : ''}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}


