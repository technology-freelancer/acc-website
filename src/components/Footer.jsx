import { Link } from 'react-router-dom';
import { getSiteData } from '../data/animateData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Footer() {
  const { language } = useLanguage();
  const { brand } = getSiteData(language);
  const text = {
    en: {
      summary: 'English, Maths and Science coaching for focused students in Parbhani.',
      explore: 'Explore',
      contact: 'Contact',
      links: ['Courses', 'Gallery', 'Results', 'Toppers', 'Testimonials'],
      rights: 'All rights reserved.'
    },
    mr: {
      summary: 'परभणीतील विद्यार्थ्यांसाठी इंग्रजी, गणित आणि विज्ञान कोचिंग.',
      explore: 'पहा',
      contact: 'संपर्क',
      links: ['कोर्सेस', 'गॅलरी', 'निकाल', 'टॉपर्स', 'अभिप्राय'],
      rights: 'सर्व हक्क राखीव.'
    }
  }[language];
  const footerLinks = [
    ['/courses', text.links[0]],
    ['/gallery', text.links[1]],
    ['/results', text.links[2]],
    ['/toppers', text.links[3]],
    ['/testimonials', text.links[4]]
  ];

  return (
    <footer className="footer-section text-white">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="d-flex align-items-center gap-3 mb-3">
              <img className="footer-logo" src={brand.logo} alt="Animate Coaching Classes" />
              <h2 className="h4 fw-bold mb-0">{brand.name}</h2>
            </div>
            <p className="text-white-75 mb-3">
              {text.summary}
            </p>
            <div className="d-flex gap-3 fs-5">
              <i className="bi bi-facebook" aria-label="Facebook" />
              <i className="bi bi-instagram" aria-label="Instagram" />
              <i className="bi bi-youtube" aria-label="YouTube" />
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <h3 className="h6 text-uppercase text-warning fw-bold">{text.explore}</h3>
            <ul className="list-unstyled footer-links">
              {footerLinks.map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}
            </ul>
          </div>
          <div className="col-sm-6 col-lg-4">
            <h3 className="h6 text-uppercase text-warning fw-bold">{text.contact}</h3>
            <p className="mb-2"><i className="bi bi-geo-alt me-2" />{brand.addresses[0]}</p>
            <p className="mb-2"><i className="bi bi-geo-alt me-2" />{brand.addresses[1]}</p>
            <p className="mb-0"><i className="bi bi-telephone me-2" />+91 {brand.phonePrimary} / +91 {brand.phoneSecondary}</p>
          </div>
        </div>
        <hr className="border-light-subtle my-4" />
        <p className="small mb-0 text-white-75">© {new Date().getFullYear()} {brand.name}. {text.rights}</p>
      </div>
    </footer>
  );
}
