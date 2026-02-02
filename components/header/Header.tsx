import './Header.css';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="header">
      <div className='header__logo-container'>
        <i className="fa-regular fa-house"></i>
        <span className='header__title'>HandCrafted Haven</span>
        <i className="fa-solid fa-leaf"></i>
      </div>
      <div className='header__settings-container'>
        <button className='header__settings-button'>
          <a href="/settings">Settings</a>
        </button>
        <Image className='header__profile-image' src="" alt="Profile Image" width={24} height={24} />
      </div>
    </header>
  );
}

