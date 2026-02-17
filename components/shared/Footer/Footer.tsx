import "./Footer.css";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialMediaArr = [
    { name: "Facebook", url: "https://www.facebook.com", icon: "fa-brands fa-facebook" },
    { name: "Instagram", url: "https://www.instagram.com", icon: "fa-brands fa-instagram" },
    { name: "Twitter", url: "https://www.twitter.com", icon: "fa-brands fa-twitter" }
  ];


  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__image_container">
        <Image className='footer__img' width={100} height={100} src="/footer-img.png" alt="Handcrafted Haven logo featuring artisan crafts" />
        <div className="footer__logo" aria-label="Handcrafted Haven logo">
          <i className="fa-regular fa-house" aria-hidden="true"></i>
          <span className='footer__company_name'>HandCrafted Haven</span>
          <i className="fa-solid fa-leaf" aria-hidden="true"></i>
        </div>
      </div>
      <nav className="footer__social-media_container" aria-label="Handcrafted Haven social media links">
        {socialMediaArr.map((social) => (

          <a className='footer__social_link' key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit our ${social.name} page (Opens in new tab)`}>
            <i className={social.icon} aria-hidden="true"></i><span className='footer__social_name'>{social.name}</span>
          </a>
        ))}
      </nav>
      <p className="footer__copyright">&copy; {currentYear} Handcrafted Haven. All rights reserved.</p>
    </footer>
  );
}

