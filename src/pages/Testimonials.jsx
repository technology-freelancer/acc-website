import { useEffect, useState } from 'react';
import { fetchSheetData, getCachedSheetData } from '../api/googleSheetApi.js';
import TestimonialCard from '../components/TestimonialCard.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Testimonials() {
  const { language } = useLanguage();
  const [testimonials, setTestimonials] = useState(() => getCachedSheetData('getTestimonials'));
  const [loading, setLoading] = useState(false);
  const text = {
    en: {
      eyebrow: 'Success stories',
      title: 'Testimonials',
      intro: 'Student and parent feedback from recent batches.',
      loading: 'Loading testimonials...',
      empty: 'No testimonials have been posted yet.',
      rating: 'Average rating',
      voices: 'Student voices',
      trust: 'Parent trust'
    },
    mr: {
      eyebrow: 'यशोगाथा',
      title: 'अभिप्राय',
      intro: 'अलीकडील बॅचेसमधील विद्यार्थी आणि पालकांचा अभिप्राय.',
      loading: 'अभिप्राय लोड होत आहेत...',
      empty: 'सध्या कोणतेही अभिप्राय पोस्ट झालेले नाहीत.',
      rating: 'सरासरी रेटिंग',
      voices: 'विद्यार्थी अनुभव',
      trust: 'पालकांचा विश्वास'
    }
  }[language];

  useEffect(() => {
    fetchSheetData('getTestimonials').then((data) => setTestimonials(data)).finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding page-top">
      <div className="container">
        <span className="eyebrow">{text.eyebrow}</span>
        <h1 className="fw-bold mt-3">{text.title}</h1>
        <p className="lead text-slate">{text.intro}</p>
        <div className="page-summary-strip">
          <SummaryItem icon="bi-star-fill" value="5.0" label={text.rating} />
          <SummaryItem icon="bi-chat-heart-fill" value={testimonials.length} label={text.voices} />
          <SummaryItem icon="bi-shield-check" value="100%" label={text.trust} />
        </div>
        {loading && <p className="text-muted">{text.loading}</p>}
        {!loading && testimonials.length === 0 && <div className="empty-state">{text.empty}</div>}
        <div className="row g-4 mt-2">
          {testimonials.map((testimonial) => (
            <div className="col-md-6 col-xl-4" key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
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
