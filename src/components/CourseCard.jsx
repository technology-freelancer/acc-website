import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function CourseCard({ course }) {
  const { language } = useLanguage();
  const text = {
    en: 'View full details',
    mr: 'संपूर्ण माहिती पहा'
  }[language];

  return (
    <Link className={`info-card course-detail-card course-link-card course-${course.id} h-100`} to={`/courses/${course.id}`}>
      <div className="course-card-top">
        <div className="course-icon-badge">
          <i className={`bi ${course.id === 'school' ? 'bi-mortarboard-fill' : course.id === 'english-hsc' ? 'bi-pencil-square' : 'bi-calculator-fill'}`} />
        </div>
        <i className="bi bi-arrow-up-right course-arrow" />
      </div>
      <div className="course-card-body">
        <p className="badge-soft mb-2">{course.className}</p>
        <h2 className="h5 fw-bold">{course.courseName}</h2>
        <p className="text-muted mb-3">{course.description}</p>
        <div className="meta-grid course-card-meta">
          <span><i className="bi bi-book me-2" />{course.subjects}</span>
          <span><i className="bi bi-clock me-2" />{course.duration}</span>
          {course.address && <span><i className="bi bi-geo-alt me-2" />{course.address}</span>}
          <span><i className="bi bi-cash-coin me-2" />{course.fees}</span>
        </div>
      </div>
      <span className="course-toggle-text">{text}<i className="bi bi-arrow-right ms-2" /></span>
    </Link>
  );
}
