import { getSiteData } from '../data/animateData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Gallery() {
  const { language } = useLanguage();
  const { galleryImages } = getSiteData(language);
  const text = {
    en: {
      eyebrow: 'Events gallery',
      title: 'Animate Coaching Classes photo gallery',
      intro: 'Photos from classes, results, events, student felicitation and admission updates.',
      badge: 'All uploaded photos'
    },
    mr: {
      eyebrow: 'कार्यक्रम गॅलरी',
      title: 'ॲनिमेट कोचिंग क्लासेस फोटो गॅलरी',
      intro: 'क्लासेस, निकाल, कार्यक्रम, विद्यार्थी सत्कार आणि प्रवेश अपडेट्समधील फोटो.',
      badge: 'सर्व अपलोड केलेले फोटो'
    }
  }[language];

  return (
    <section className="section-padding page-top gallery-page">
      <div className="container">
        <div className="section-title-row align-items-start">
          <div>
            <span className="eyebrow">{text.eyebrow}</span>
            <h1 className="fw-bold mt-3">{text.title}</h1>
            <p className="lead text-slate mb-0">{text.intro}</p>
          </div>
          <span className="gallery-count">{galleryImages.length} {text.badge}</span>
        </div>
        <div className="gallery-wall">
          {galleryImages.map((image, index) => (
            <figure className={`gallery-card ${index % 9 === 0 ? 'feature' : ''}`} key={image.src}>
              <img src={image.src} alt={image.title} loading="lazy" />
              <figcaption>
                <strong>{String(index + 1).padStart(2, '0')}</strong>
                <span>{image.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
