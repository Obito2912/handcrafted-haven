import './Footer.css';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialMediaArr = [
    { name: 'Facebook', url: 'https://www.facebook.com', icon: 'fa-brands fa-facebook' },
    { name: 'Instagram', url: 'https://www.instagram.com', icon: 'fa-brands fa-instagram' },
    { name: 'Twitter', url: 'https://www.twitter.com', icon: 'fa-brands fa-twitter' }
  ];


  return (
    <footer className="footer">
      <div className="footer__image_container">
        <Image className='footer__img' width={100} height={100} src="/footer-img.png" alt="Handcrafted Haven Footer" />
        <div className="footer__logo">
          <i className="fa-regular fa-house"></i>
          <span className='header__title'>HandCrafted Haven</span>
          <i className="fa-solid fa-leaf"></i>
        </div>
      </div>
      <div className="footer__social-media_container">
        {socialMediaArr.map((social) => (
          <a className='footer__social_link' key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
            <i className={social.icon}></i><span className='footer__social_name'>{social.name}</span>
          </a>
        ))}
      </div>
      <p className="footer__copyright">&copy; {currentYear} Handcrafted Haven. All rights reserved.</p>
    </footer>
  );
}

