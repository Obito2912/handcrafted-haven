import './Navigation.css';
import Link from 'next/link';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Artisans', href: '/artisans' },
  { name: 'Purchases', href: '/purchases' },
  { name: 'Products', href: '/products' },
  { name: 'Support', href: '/support' },
];

export default function Navigation() {
  return (
    <nav className='nav'>
      <ul className='nav__list'>
        {links.map((link) => (
          <li key={link.name} className='nav__list-item'>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}


