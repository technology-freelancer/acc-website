import { useEffect, useState } from 'react';
import { fetchSheetData } from '../api/googleSheetApi.js';
import CourseCard from '../components/CourseCard.jsx';
import { getSiteData } from '../data/animateData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Courses() {
  const { language } = useLanguage();
  const { courses: defaultCourses } = getSiteData(language);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const text = {
    en: {
      eyebrow: 'Academic programs',
      title: 'Courses for English, Maths and Science',
      intro: 'Choose structured batches for 5th-10th, HSC English and HSC Maths under Animate Coaching Classes.',
      loading: 'Loading courses...',
      empty: 'No courses are available yet.'
    },
    mr: {
      eyebrow: 'शैक्षणिक प्रोग्राम',
      title: 'इंग्रजी, गणित आणि विज्ञानासाठी कोर्सेस',
      intro: '५वी-१०वी, एचएससी इंग्रजी आणि एचएससी गणितासाठी ॲनिमेट कोचिंग क्लासेस अंतर्गत बॅचेस निवडा.',
      loading: 'कोर्सेस लोड होत आहेत...',
      empty: 'सध्या कोणतेही कोर्स उपलब्ध नाहीत.'
    }
  }[language];

  useEffect(() => {
    fetchSheetData('getCourses').then((data) => setCourses(data.length ? data : defaultCourses)).finally(() => setLoading(false));
  }, [defaultCourses]);

  return (
    <section className="section-padding page-top">
      <div className="container">
        <span className="eyebrow">{text.eyebrow}</span>
        <h1 className="fw-bold mt-3">{text.title}</h1>
        <p className="lead text-slate">{text.intro}</p>
        {loading && <p className="text-muted">{text.loading}</p>}
        {!loading && courses.length === 0 && <EmptyState label={text.empty} />}
        <div className="row g-4 mt-2">
          {courses.map((course) => (
            <div className="col-md-6 col-xl-4" key={course.id}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmptyState({ label }) {
  return <div className="empty-state">{label}</div>;
}
