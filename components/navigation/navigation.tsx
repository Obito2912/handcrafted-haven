import Link from 'next/link';

const links = ['Home', 'Artisans', 'Purchases', 'Products', 'Support'];

export default function Navigation() {
  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <Link href={`/${link.toLowerCase()}`}>{link}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}


