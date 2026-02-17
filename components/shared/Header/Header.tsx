"use client";

import "./Header.css";
import Image from "next/image";
import defaultProfileImg from "../../../public/default-profile-img.png";
import { usePathname } from "next/navigation";
import Link from "next/link";

type HeaderProps = {
  isAuthenticated?: boolean;
  userProfileImg?: string | null;
  showSignIn?: boolean;
}

export default function Header({ isAuthenticated, userProfileImg, showSignIn }: HeaderProps) {
  const pathname = usePathname();
  const isOnProfilePage = pathname === "/profile";

  return (
    <header className="header" role="banner">
      <div className='header__logo-container'>
        <Link href="/" className="header__link" aria-label="Home">
          <i className="fa-regular fa-house" aria-hidden="true"></i>
        </Link>
        <span className='header__title'>HandCrafted Haven</span>
        <i className="fa-solid fa-leaf" aria-hidden="true"></i>
      </div>
      {isAuthenticated ? (
        <nav className='header__settings-container' aria-label="User navigation">
          <Link href="/profile" className={`header__settings-button ${isOnProfilePage ? " active" : ""}`} aria-label="User settings">Settings</Link>
          <Image className='header__profile-image' src={userProfileImg || defaultProfileImg} alt="Your profile picture" width={44} height={44} />
        </nav>
      ) :
        (showSignIn &&
          <Link href="/login" className='signin-btn' aria-label="Sign In">
            Sign In
          </Link>
        )
      }
    </header>
  );
}

