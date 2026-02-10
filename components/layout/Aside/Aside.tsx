'use client';

import './Aside.css';
import Navigation from "../Navigation/Navigation";
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

type AsideProps = {
    isAuthenticated: boolean;
    userType: "buyer" | "seller";
}

export default function Aside({ isAuthenticated, userType }: AsideProps) {
    const pathname = usePathname();

    return <aside className="sidebar">
        <Navigation
            loggedIn={isAuthenticated}
            userType={userType} />
        {/* Show sign out only if user is authenticated */}
        {isAuthenticated &&
            <button className='sign-out' onClick={() => signOut({ redirect: true, callbackUrl: pathname })}>Sign Out</button>
        }
    </aside>;
}