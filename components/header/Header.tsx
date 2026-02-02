import './Header.css';
import Image from 'next/image';
import defaultProfileImg from '../../public/default-profile-img.png';

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
          <a href="/profile">Settings</a>
        </button>
        <Image className='header__profile-image' src={defaultProfileImg} alt="Profile Image" width={60} height={60} />
      </div>
    </header>
  );
}

