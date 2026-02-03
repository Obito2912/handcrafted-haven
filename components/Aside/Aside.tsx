'use client';

import './Aside.css';
import Navigation from "../navigation/Navigation";
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Aside({ loggedIn }: { loggedIn: boolean }) {
    const pathname = usePathname();

    return <aside className="sidebar">
        <Navigation loggedIn={loggedIn} />
        {loggedIn && <button className='sign-out' onClick={() => signOut({ callbackUrl: pathname })}>Sign Out</button>}
    </aside>;
}