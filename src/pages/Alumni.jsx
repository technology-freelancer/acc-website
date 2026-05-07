import { useEffect, useState } from 'react';
import { fetchSheetData } from '../api/googleSheetApi.js';
import AlumniCard from '../components/AlumniCard.jsx';
import { getSiteData } from '../data/animateData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Alumni() {
  const { language } = useLanguage();
  const { alumni: defaultAlumni } = getSiteData(language);
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const text = {
    en: {
      eyebrow: 'Alumni network',
      title: 'Animate Alumni',
      intro: 'Former students and achievers who continue to represent Animate Coaching Classes with confidence.',
      loading: 'Loading alumni...',
      empty: 'No alumni profiles have been added yet.',
      achievers: 'Alumni listed',
      batches: 'Batches represented',
      years: 'Result years'
    },
    mr: {
      eyebrow: 'माजी विद्यार्थी',
      title: 'ॲनिमेट Alumni',
      intro: 'ॲनिमेट कोचिंग क्लासेसचे माजी विद्यार्थी आणि यशस्वी विद्यार्थी.',
      loading: 'Alumni माहिती लोड होत आहे...',
      empty: 'सध्या Alumni प्रोफाइल उपलब्ध नाहीत.',
      achievers: 'Alumni प्रोफाइल',
      batches: 'बॅचेस',
      years: 'निकाल वर्षे'
    }
  }[language];

  useEffect(() => {
    fetchSheetData('getAlumni')
      .then((data) => setAlumni(data.length ? data : defaultAlumni))
      .finally(() => setLoading(false));
  }, [defaultAlumni]);

  const batchCount = new Set(alumni.map((item) => item.batch).filter(Boolean)).size || defaultAlumni.length;
  const yearCount = new Set(alumni.map((item) => item.year).filter(Boolean)).size || 1;

  return (
    <section className="section-padding page-top">
      <div className="container">
        <span className="eyebrow">{text.eyebrow}</span>
        <h1 className="fw-bold mt-3">{text.title}</h1>
        <p className="lead text-slate">{text.intro}</p>
        <div className="page-summary-strip">
          <SummaryItem icon="bi-mortarboard-fill" value={alumni.length || defaultAlumni.length} label={text.achievers} />
          <SummaryItem icon="bi-collection-fill" value={batchCount} label={text.batches} />
          <SummaryItem icon="bi-calendar2-check-fill" value={yearCount} label={text.years} />
        </div>
        {loading && <p className="text-muted">{text.loading}</p>}
        {!loading && alumni.length === 0 && <div className="empty-state">{text.empty}</div>}
        <div className="row g-4 mt-2">
          {alumni.map((item) => (
            <div className="col-md-6 col-xl-4" key={item.id}>
              <AlumniCard alumni={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SummaryItem({ icon, value, label }) {
  return (
    <div className="page-summary-item">
      <i className={`bi ${icon}`} />
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
