import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getSiteData } from '../data/animateData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const links = [
  ['/', { en: 'Home', mr: 'होम' }],
  ['/about', { en: 'About', mr: 'माहिती' }],
  ['/courses', { en: 'Courses', mr: 'कोर्सेस' }],
  ['/gallery', { en: 'Gallery', mr: 'गॅलरी' }],
  ['/results', { en: 'Results', mr: 'निकाल' }],
  ['/toppers', { en: 'Toppers', mr: 'टॉपर्स' }],
  ['/testimonials', { en: 'Testimonials', mr: 'अभिप्राय' }],
  ['/contact', { en: 'Contact', mr: 'संपर्क' }]
];

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const { brand } = getSiteData(language);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const chooseLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    closeMenu();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/" onClick={closeMenu}>
          <img className="brand-logo" src={brand.logo} alt="Animate Coaching Classes logo" />
          <span>{brand.name}</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNavbar"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            {links.map(([to, label]) => (
              <li className="nav-item" key={to}>
                <NavLink className="nav-link" to={to} onClick={closeMenu}>
                  {label[language]}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="language-toggle ms-lg-3" aria-label="Choose website language">
            <button className={language === 'en' ? 'active' : ''} type="button" onClick={() => chooseLanguage('en')}>EN</button>
            <button className={language === 'mr' ? 'active' : ''} type="button" onClick={() => chooseLanguage('mr')}>मराठी</button>
          </div>
          <a className="btn btn-warning nav-cta ms-lg-3" href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer" onClick={closeMenu}>
            <i className="bi bi-whatsapp me-2" />{language === 'mr' ? 'चौकशी' : 'Enquire'}
          </a>
        </div>
      </div>
    </nav>
  );
}
