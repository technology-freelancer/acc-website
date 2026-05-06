import { Link, useParams } from 'react-router-dom';
import { getSiteData } from '../data/animateData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const pageText = {
  en: {
    back: 'Back to courses',
    overview: 'Course overview',
    idealFor: 'Ideal for',
    focus: 'What we focus on',
    outcome: 'Expected outcome',
    details: 'Batch details',
    subjects: 'Subjects',
    duration: 'Duration',
    fees: 'Fees',
    address: 'Address',
    enquire: 'Admission enquiry',
    whatsapp: 'WhatsApp now',
    notFoundTitle: 'Course not found',
    notFoundText: 'The course you are looking for is not available right now.'
  },
  mr: {
    back: 'कोर्सेसकडे परत जा',
    overview: 'कोर्सची माहिती',
    idealFor: 'कोणासाठी योग्य',
    focus: 'आमचा भर',
    outcome: 'अपेक्षित परिणाम',
    details: 'बॅच तपशील',
    subjects: 'विषय',
    duration: 'कालावधी',
    fees: 'फी',
    address: 'पत्ता',
    enquire: 'प्रवेश चौकशी',
    whatsapp: 'WhatsApp करा',
    notFoundTitle: 'कोर्स सापडला नाही',
    notFoundText: 'तुम्ही शोधत असलेला कोर्स सध्या उपलब्ध नाही.'
  }
};

export default function CourseDetail() {
  const { courseId } = useParams();
  const { language } = useLanguage();
  const { brand, courses } = getSiteData(language);
  const text = pageText[language];
  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    return (
      <section className="section-padding page-top">
        <div className="container">
          <Link className="btn btn-outline-primary mb-4" to="/courses">
            <i className="bi bi-arrow-left me-2" />{text.back}
          </Link>
          <div className="empty-state">
            <h1 className="h4 fw-bold">{text.notFoundTitle}</h1>
            <p className="mb-0">{text.notFoundText}</p>
          </div>
        </div>
      </section>
    );
  }

  const whatsappText = encodeURIComponent(`${text.enquire}: ${course.courseName} - ${course.className}`);

  return (
    <section className="course-detail-page section-padding page-top">
      <div className="container">
        <Link className="btn btn-outline-primary mb-4" to="/courses">
          <i className="bi bi-arrow-left me-2" />{text.back}
        </Link>

        <div className="course-detail-hero">
          <div>
            <span className="eyebrow">{course.className}</span>
            <h1>{course.courseName}</h1>
            <p>{course.description}</p>
          </div>
          <div className="course-detail-logo">
            <img src={brand.logo} alt={brand.name} />
            <strong>{brand.tagline}</strong>
          </div>
        </div>

        <div className="row g-4 mt-4 align-items-start">
          <div className="col-lg-8">
            <article className="course-detail-section">
              <span className="eyebrow">{text.overview}</span>
              <h2>{text.idealFor}</h2>
              <p>{course.idealFor}</p>
            </article>

            <article className="course-detail-section mt-4">
              <span className="eyebrow">{text.focus}</span>
              <h2>{text.focus}</h2>
              <div className="course-detail-focus">
                {course.focusAreas.map((item) => (
                  <span key={item}><i className="bi bi-check2-circle" />{item}</span>
                ))}
              </div>
            </article>

            <article className="course-detail-section mt-4">
              <span className="eyebrow">{text.outcome}</span>
              <h2>{text.outcome}</h2>
              <p>{course.outcome}</p>
            </article>
          </div>

          <div className="col-lg-4">
            <aside className="course-detail-side">
              <h2>{text.details}</h2>
              <DetailItem icon="bi-book" label={text.subjects} value={course.subjects} />
              <DetailItem icon="bi-clock" label={text.duration} value={course.duration} />
              <DetailItem icon="bi-cash-coin" label={text.fees} value={course.fees} />
              <DetailItem icon="bi-geo-alt" label={text.address} value={course.address} />
              <a className="btn btn-warning w-100 fw-bold mt-3" href={`https://wa.me/${brand.whatsapp}?text=${whatsappText}`} target="_blank" rel="noreferrer">
                <i className="bi bi-whatsapp me-2" />{text.whatsapp}
              </a>
              <Link className="btn btn-primary w-100 fw-bold mt-2" to="/contact">
                <i className="bi bi-send me-2" />{text.enquire}
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="course-detail-item">
      <i className={`bi ${icon}`} />
      <div>
        <strong>{label}</strong>
        <span>{value}</span>
      </div>
    </div>
  );
}
