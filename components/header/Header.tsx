'use client';

import './Header.css';
import Image from 'next/image';
import defaultProfileImg from '../../public/default-profile-img.png';
import { usePathname } from 'next/navigation';

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
        <i className="fa-regular fa-house"></i>
        <span className='header__title'>HandCrafted Haven</span>
        <i className="fa-solid fa-leaf"></i>
      </div>
      {isAuthenticated ? (
        <>
          <div className='header__settings-container'>
            <button className={`header__settings-button ${isOnProfilePage ? ' active' : ''}`}>
              <a href="/profile">Settings</a>
            </button>
            <Image className='header__profile-image' src={userProfileImg || defaultProfileImg} alt="Profile Image" width={44} height={44} />
          </div>
        </>
      ) : <button className='signin-btn'>
        <a href="/login">Sign In</a>
      </button>}
    </header>
  );
}

