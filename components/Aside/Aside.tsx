'use client';

import './Aside.css';
import Navigation from "../navigation/Navigation";
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

type AsideProps = {
    isAuthenticated: boolean;
}

export default function Aside({ isAuthenticated }: AsideProps) {
    const pathname = usePathname();

    return <aside className="sidebar">
        <Navigation />
        {/* Show sign out only if user is authenticated */}
        {isAuthenticated &&
            <button className='sign-out' onClick={() => signOut({ redirect: true, callbackUrl: pathname })}>Sign Out</button>
        }
    </aside>;
}