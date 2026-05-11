import { Children, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchSheetData, getCachedSheetData } from '../api/googleSheetApi.js';
import Hero from '../components/Hero.jsx';
import ResultCard from '../components/ResultCard.jsx';
import TopperCard from '../components/TopperCard.jsx';
import TestimonialCard from '../components/TestimonialCard.jsx';
import AnnouncementCard from '../components/AnnouncementCard.jsx';
import { getSiteData } from '../data/animateData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Home() {
  const { language } = useLanguage();
  const { announcements, brand, courses, galleryImages, highlights, latestResult } = getSiteData(language);
  const [sheetData, setSheetData] = useState(() => ({
    results: getCachedSheetData('getResults'),
    testimonials: getCachedSheetData('getTestimonials'),
    announcements: getCachedSheetData('getAnnouncements')
  }));
  const [loading, setLoading] = useState(false);
  const text = {
    en: {
      storyEyebrow: 'Real classroom moments',
      storyTitle: 'A coaching class parents can actually see and trust.',
      storyLink: 'Our Story',
      unitsEyebrow: 'Under Animate',
      unitsTitle: 'All classes under one trusted coaching name',
      coursesEyebrow: 'Courses',
      coursesTitle: 'Batches for English, Maths and Science',
      supportEyebrow: 'Learning support',
      supportTitle: 'What every Animate student receives',
      supportItems: [
        ['bi-journal-check', 'Regular Tests', 'Chapter-wise tests help students stay prepared and parents see progress clearly.'],
        ['bi-person-check', 'Personal Guidance', 'Doubt solving, revision planning and answer-writing support for every batch.'],
        ['bi-clipboard-data', 'Progress Follow-up', 'Focused feedback for school basics, HSC English and HSC Maths preparation.']
      ],
      resultsEyebrow: 'Student achievements',
      resultsTitle: 'Latest Results',
      toppersEyebrow: 'Toppers',
      toppersTitle: 'Top Achievers',
      testimonialsEyebrow: 'Families say',
      testimonialsTitle: 'Testimonials',
      admissionsEyebrow: 'Admissions',
      admissionsTitle: 'Announcements',
      viewAll: 'View all',
      galleryCta: 'Full Gallery',
      loading: 'Loading latest data...',
      emptyResults: 'New results will appear here soon.',
      emptyTestimonials: 'Testimonials will appear here soon.',
      emptyAnnouncements: 'Announcements will appear here soon.',
      ctaTitle: 'Admissions are open at Animate Coaching Classes.',
      whatsapp: 'WhatsApp Now',
      visit: 'Visit Centres'
    },
    mr: {
      storyEyebrow: 'खरे वर्ग क्षण',
      storyTitle: 'पालकांना स्पष्ट दिसेल आणि विश्वास वाटेल असा क्लास.',
      storyLink: 'आमची माहिती',
      unitsEyebrow: 'ॲनिमेट अंतर्गत',
      unitsTitle: 'एकाच विश्वासार्ह नावाखाली सर्व क्लासेस',
      coursesEyebrow: 'कोर्सेस',
      coursesTitle: 'इंग्रजी, गणित आणि विज्ञानासाठी बॅचेस',
      supportEyebrow: 'शिक्षण सहाय्य',
      supportTitle: 'प्रत्येक ॲनिमेट विद्यार्थ्याला काय मिळते',
      supportItems: [
        ['bi-journal-check', 'नियमित टेस्ट', 'अध्यायनिहाय टेस्टमुळे विद्यार्थी तयार राहतात आणि पालकांना प्रगती स्पष्ट दिसते.'],
        ['bi-person-check', 'वैयक्तिक मार्गदर्शन', 'प्रत्येक बॅचसाठी शंका निरसन, रिव्हिजन प्लॅनिंग आणि उत्तर लेखन सहाय्य.'],
        ['bi-clipboard-data', 'प्रगती फॉलो-अप', 'शालेय पाया, HSC इंग्रजी आणि HSC गणित तयारीसाठी केंद्रित फीडबॅक.']
      ],
      resultsEyebrow: 'विद्यार्थी यश',
      resultsTitle: 'नवीन निकाल',
      toppersEyebrow: 'टॉपर्स',
      toppersTitle: 'यशस्वी विद्यार्थी',
      testimonialsEyebrow: 'पालक म्हणतात',
      testimonialsTitle: 'अभिप्राय',
      admissionsEyebrow: 'प्रवेश',
      admissionsTitle: 'सूचना',
      viewAll: 'सर्व पहा',
      galleryCta: 'पूर्ण गॅलरी',
      loading: 'नवीन माहिती लोड होत आहे...',
      emptyResults: 'नवीन निकाल लवकरच येथे दिसतील.',
      emptyTestimonials: 'अभिप्राय लवकरच येथे दिसतील.',
      emptyAnnouncements: 'सूचना लवकरच येथे दिसतील.',
      ctaTitle: 'ॲनिमेट कोचिंग क्लासेसमध्ये प्रवेश सुरू आहेत.',
      whatsapp: 'WhatsApp करा',
      visit: 'सेंटरला भेट द्या'
    }
  }[language];

  useEffect(() => {
    const updateSection = (key, action) => {
      fetchSheetData(action)
        .then((data) => setSheetData((current) => ({ ...current, [key]: data })))
        .finally(() => setLoading(false));
    };

    updateSection('results', 'getResults');
    updateSection('testimonials', 'getTestimonials');
    updateSection('announcements', 'getAnnouncements');
  }, []);

  const displayTestimonials = sheetData.testimonials;
  const displayAnnouncements = sheetData.announcements.length ? sheetData.announcements : announcements;
  const topResults = [...sheetData.results].sort((a, b) => Number(a.rank) - Number(b.rank)).slice(0, 3);

  return (
    <>
      <Hero />
      <section className="section-padding pt-0">
        <div className="container">
          <div className="row g-4">
            {highlights.map(([value, label, icon]) => (
              <div className="col-6 col-lg-3" key={label}>
                <div className="stat-card">
                  <i className={`bi ${icon}`} />
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container">
          <div className="latest-result-showcase">
            <div className="latest-result-copy">
              <span className="eyebrow">{latestResult.eyebrow}</span>
              <h2>{latestResult.title}</h2>
              <p>{latestResult.intro}</p>
              <div className="latest-result-actions">
                <Link className="btn btn-primary" to="/results">
                  <i className="bi bi-list-stars me-2" />{latestResult.cta}
                </Link>
                <span className="badge-soft"><i className="bi bi-megaphone me-2" />{latestResult.badge}</span>
              </div>
            </div>
            <Link className="latest-result-poster" to="/results" aria-label={latestResult.cta}>
              <img src={latestResult.poster} alt={latestResult.title} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding section-muted photo-story">
        <div className="container">
          <div className="section-title-row">
            <div>
              <span className="eyebrow">{text.storyEyebrow}</span>
              <h2 className="fw-bold mt-2">{text.storyTitle}</h2>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <Link className="btn btn-outline-primary" to="/about">{text.storyLink}</Link>
              <Link className="btn btn-primary" to="/gallery">{text.galleryCta}</Link>
            </div>
          </div>
          <div className="photo-grid">
            {galleryImages.slice(0, 8).map((image) => (
              <figure className="photo-tile" key={image.src}>
                <img src={image.src} alt={image.title} />
                <figcaption>{image.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <HomeSection eyebrow={text.unitsEyebrow} title={text.unitsTitle}>
        {getSiteData(language).academyUnits.map((unit) => (
          <div className="col-md-6 col-xl-4" key={unit.name}>
            <article className="unit-card h-100">
              <i className="bi bi-building-check" />
              <h3>{unit.name}</h3>
              <p className="fw-bold mb-2">{unit.classes}</p>
              <p>{unit.subjects}</p>
              <span><i className="bi bi-geo-alt me-2" />{unit.address}</span>
            </article>
          </div>
        ))}
      </HomeSection>

      <HomeSection eyebrow={text.coursesEyebrow} title={text.coursesTitle} link="/courses" viewAll={text.viewAll}>
        {courses.map((course) => (
          <div className="col-md-6 col-xl-4" key={course.id}>
            <article className="subject-card h-100">
              <i className={`bi ${course.id === 'school' ? 'bi-book' : course.id === 'english-hsc' ? 'bi-pencil-square' : 'bi-calculator'}`} />
              <p className="badge-soft mb-3">{course.className}</p>
              <h3>{course.courseName}</h3>
              <p>{course.description}</p>
            </article>
          </div>
        ))}
      </HomeSection>

      <HomeSection eyebrow={text.supportEyebrow} title={text.supportTitle} alt>
        {text.supportItems.map(([icon, title, description]) => (
          <div className="col-md-6 col-xl-4" key={title}>
            <article className="support-card h-100">
              <i className={`bi ${icon}`} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          </div>
        ))}
      </HomeSection>

      <HomeSection eyebrow={text.resultsEyebrow} title={text.resultsTitle} link="/results" loading={loading} loadingText={text.loading} emptyText={text.emptyResults} viewAll={text.viewAll}>
        {sheetData.results.slice(0, 3).map((result) => (
          <div className="col-md-6 col-xl-4" key={result.id}>
            <ResultCard result={result} />
          </div>
        ))}
      </HomeSection>

      <HomeSection eyebrow={text.toppersEyebrow} title={text.toppersTitle} link="/toppers" alt loading={loading} loadingText={text.loading} emptyText={text.emptyResults} viewAll={text.viewAll}>
        {topResults.map((topper) => (
          <div className="col-md-6 col-xl-4" key={topper.id}>
            <TopperCard topper={topper} />
          </div>
        ))}
      </HomeSection>

      <HomeSection eyebrow={text.testimonialsEyebrow} title={text.testimonialsTitle} link="/testimonials" loading={loading} loadingText={text.loading} emptyText={text.emptyTestimonials} viewAll={text.viewAll}>
        {displayTestimonials.slice(0, 3).map((testimonial) => (
          <div className="col-md-6 col-xl-4" key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </HomeSection>

      <HomeSection eyebrow={text.admissionsEyebrow} title={text.admissionsTitle} loading={loading} loadingText={text.loading} emptyText={text.emptyAnnouncements}>
        {displayAnnouncements.slice(0, 3).map((announcement) => (
          <div className="col-md-6 col-xl-4" key={announcement.id}>
            <AnnouncementCard announcement={announcement} />
          </div>
        ))}
      </HomeSection>

      <section className="contact-cta">
        <div className="container text-center">
          <h2 className="fw-bold">{text.ctaTitle}</h2>
          <p className="mb-4">{brand.addresses[0]} • {brand.addresses[1]}</p>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-warning btn-lg fw-semibold">
              <i className="bi bi-whatsapp me-2" />{text.whatsapp}
            </a>
            <Link to="/contact" className="btn btn-outline-light btn-lg fw-semibold">
              <i className="bi bi-geo-alt me-2" />{text.visit}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function HomeSection({ eyebrow = 'Animate updates', title, link, children, loading, loadingText = 'Loading latest data...', emptyText, alt, viewAll = 'View all' }) {
  const hasChildren = Children.count(children) > 0;
  return (
    <section className={`section-padding ${alt ? 'section-muted' : ''}`}>
      <div className="container">
        <div className="section-title-row">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="fw-bold mt-2">{title}</h2>
          </div>
          {link && <Link className="btn btn-outline-primary" to={link}>{viewAll}</Link>}
        </div>
        {loading && !hasChildren ? <p className="text-muted">{loadingText}</p> : hasChildren ? <div className="row g-4">{children}</div> : <div className="empty-state">{emptyText}</div>}
      </div>
    </section>
  );
}
