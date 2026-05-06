import { useEffect, useState } from 'react';
import { fetchSheetData } from '../api/googleSheetApi.js';
import TopperCard from '../components/TopperCard.jsx';
import { results as defaultResults } from '../data/animateData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Toppers() {
  const { language } = useLanguage();
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);
  const text = {
    en: {
      eyebrow: 'Student achievers',
      title: 'Toppers Wall',
      intro: 'Rank holders and high scorers from Animate Coaching Classes.',
      loading: 'Loading toppers...',
      empty: 'No topper data is available yet.',
      topScore: 'Top score',
      listed: 'Achievers listed',
      rankers: 'Rank holders'
    },
    mr: {
      eyebrow: 'विद्यार्थी यशस्वी',
      title: 'टॉपर्स वॉल',
      intro: 'ॲनिमेट कोचिंग क्लासेसमधील रँक होल्डर्स आणि उच्च गुण मिळवणारे विद्यार्थी.',
      loading: 'टॉपर्स लोड होत आहेत...',
      empty: 'सध्या टॉपर माहिती उपलब्ध नाही.',
      topScore: 'सर्वोच्च गुण',
      listed: 'यशस्वी विद्यार्थी',
      rankers: 'रँक होल्डर्स'
    }
  }[language];

  useEffect(() => {
    fetchSheetData('getResults')
      .then((data) => setToppers([...(data.length ? data : defaultResults)].sort((a, b) => Number(a.rank) - Number(b.rank))))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding page-top">
      <div className="container">
        <span className="eyebrow">{text.eyebrow}</span>
        <h1 className="fw-bold mt-3">{text.title}</h1>
        <p className="lead text-slate">{text.intro}</p>
        <div className="page-summary-strip">
          <SummaryItem icon="bi-trophy-fill" value={toppers.length ? `${Math.max(...toppers.map((topper) => Number(topper.percentage) || 0)).toFixed(0)}%` : '99%'} label={text.topScore} />
          <SummaryItem icon="bi-people-fill" value={toppers.length || defaultResults.length} label={text.listed} />
          <SummaryItem icon="bi-award-fill" value="1-3" label={text.rankers} />
        </div>
        {loading && <p className="text-muted">{text.loading}</p>}
        {!loading && toppers.length === 0 && <div className="empty-state">{text.empty}</div>}
        <div className="row g-4 mt-2">
          {toppers.map((topper) => (
            <div className="col-md-6 col-xl-4" key={topper.id}>
              <TopperCard topper={topper} />
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
