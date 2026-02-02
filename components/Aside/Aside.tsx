'use client';

import './Aside.css';
import Navigation from "../Navigation/Navigation";
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Aside() {
    const pathname = usePathname();

    return <aside className="sidebar">
        <Navigation />
        <button className='sign-out' onClick={() => signOut({ callbackUrl: pathname })}>Sign Out</button>
    </aside>;
}