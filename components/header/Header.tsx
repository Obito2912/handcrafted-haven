'use client';

import './Header.css';
import Image from 'next/image';
import defaultProfileImg from '../../public/default-profile-img.png';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type HeaderProps = {
  isAuthenticated?: boolean;
  userProfileImg?: string | null;

}

export default function Header({ isAuthenticated, userProfileImg }: HeaderProps) {
  const pathname = usePathname();
  const isOnProfilePage = pathname === '/profile';

  return (
    <header className="header">
      <div className='header__logo-container'>
        <Link href="/" className="header__link">
          <i className="fa-regular fa-house"></i>
        </Link>
        <span className='header__title'>HandCrafted Haven</span>
        <i className="fa-solid fa-leaf"></i>
      </div>
      {isAuthenticated ? (
        <div className='header__settings-container'>
          <Link href="/profile" className={`header__settings-button ${isOnProfilePage ? ' active' : ''}`}>Settings</Link>
          <Image className='header__profile-image' src={userProfileImg || defaultProfileImg} alt="Profile Image" width={44} height={44} />
        </div>
      ) :
        <Link href="/login" className='signin-btn'>Sign In</Link>
      }
    </header>
  );
}

