import { Link } from 'react-router-dom';
import { getSiteData } from '../data/animateData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Hero() {
  const { language } = useLanguage();
  const { brand } = getSiteData(language);
  const text = {
    en: {
      eyebrow: 'Maths • English • Science coaching in Parbhani',
      title: 'Animate Coaching Classes for students who want results, confidence and discipline.',
      intro: "From 5th to 10th English, Maths and Science to 11th-12th English and Maths, all batches come under Animate Coaching Classes with regular tests, personal guidance and visible student progress.",
      enquiry: 'Admission Enquiry',
      results: 'View Results',
      row1: '5th-10th English, Maths and Science',
      row2: "Shakil Kazi Sir's English Class for 11th and 12th",
      row3: 'Atik Kazi - Lingayat Maths Classes for 11th and 12th',
      call: 'Call'
    },
    mr: {
      eyebrow: 'परभणीमध्ये गणित • इंग्रजी • विज्ञान कोचिंग',
      title: 'निकाल, आत्मविश्वास आणि शिस्तीसाठी ॲनिमेट कोचिंग क्लासेस.',
      intro: '५वी ते १०वी इंग्रजी, गणित आणि विज्ञान तसेच ११वी-१२वी इंग्रजी व गणिताच्या सर्व बॅचेस ॲनिमेट कोचिंग क्लासेस अंतर्गत चालतात.',
      enquiry: 'प्रवेश चौकशी',
      results: 'निकाल पहा',
      row1: '५वी-१०वी इंग्रजी, गणित आणि विज्ञान',
      row2: '११वी व १२वीसाठी शकील काजी सर इंग्लिश क्लास',
      row3: '११वी व १२वीसाठी अतिक काजी - लिंगायत मॅथ्स क्लासेस',
      call: 'कॉल करा'
    }
  }[language];

  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <span className="eyebrow">{text.eyebrow}</span>
            <h1 className="display-4 fw-bold mt-3">
              {text.title}
            </h1>
            <p className="lead text-slate mt-3">
              {text.intro}
            </p>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-warning btn-lg fw-semibold">
                <i className="bi bi-whatsapp me-2" />{text.enquiry}
              </a>
              <Link to="/results" className="btn btn-outline-light btn-lg fw-semibold">
                <i className="bi bi-trophy me-2" />{text.results}
              </Link>
            </div>
            <div className="hero-address mt-4">
              <i className="bi bi-geo-alt-fill" />
              <span>{brand.addresses[0]}</span>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="hero-panel">
              <div className="text-center">
                <img className="hero-logo" src={brand.logo} alt="Animate Coaching Classes" />
              </div>
              <div className="d-grid gap-3 mt-4">
                <div className="mini-row"><i className="bi bi-award text-warning" />{text.row1}</div>
                <div className="mini-row"><i className="bi bi-journal-check text-success" />{text.row2}</div>
                <div className="mini-row"><i className="bi bi-calculator text-primary" />{text.row3}</div>
                <div className="mini-row"><i className="bi bi-telephone text-primary" />{text.call} {brand.phonePrimary} / {brand.phoneSecondary}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
