import { useState } from 'react';
import { submitEnquiry } from '../api/googleSheetApi.js';
import { getSiteData } from '../data/animateData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const initialForm = { name: '', phone: '', className: '', message: '' };

const contactText = {
  en: {
    eyebrow: 'Admissions and enquiries',
    title: 'Talk to Animate Coaching Classes',
    intro: 'For admissions, batch timing, fees or centre visits, send a quick enquiry or contact us directly.',
    quickTitle: 'Fast contact',
    call: 'Call office',
    whatsapp: 'WhatsApp enquiry',
    visit: 'Visit locations',
    formTitle: 'Send admission enquiry',
    formHint: 'Share the student details and we will call back with the right batch information.',
    fields: {
      name: 'Student / Parent name',
      phone: 'Phone number',
      className: 'Interested class',
      message: 'Message'
    },
    placeholders: {
      name: 'Enter full name',
      phone: 'Enter mobile number',
      className: 'Select a batch',
      message: 'Example: Need admission details for Class 10 Maths and Science.'
    },
    classOptions: [
      '5th to 10th English, Maths, Science',
      "11th and 12th Shakil Kazi Sir's English Class",
      '11th and 12th Atik Kazi - Lingayat Maths Classes'
    ],
    sending: 'Sending...',
    submit: 'Submit enquiry',
    locationsTitle: 'Class locations',
    map: 'Open in Maps',
    hoursTitle: 'Best time to contact',
    hours: 'Morning to evening for admissions and batch details',
    noteTitle: 'What to keep ready',
    note: 'Student class, board, subject requirement and preferred batch timing.',
    success: 'Thank you. We will contact you shortly.',
    error: 'Something went wrong. Please try again.'
  },
  mr: {
    eyebrow: 'प्रवेश आणि चौकशी',
    title: 'ॲनिमेट कोचिंग क्लासेसशी संपर्क करा',
    intro: 'प्रवेश, बॅच वेळा, फी किंवा सेंटर भेटीसाठी चौकशी पाठवा किंवा थेट संपर्क करा.',
    quickTitle: 'जलद संपर्क',
    call: 'ऑफिसला कॉल',
    whatsapp: 'WhatsApp चौकशी',
    visit: 'ठिकाणे पहा',
    formTitle: 'प्रवेश चौकशी पाठवा',
    formHint: 'विद्यार्थ्याची माहिती पाठवा; योग्य बॅचची माहिती देण्यासाठी आम्ही संपर्क करू.',
    fields: {
      name: 'विद्यार्थी / पालक नाव',
      phone: 'फोन नंबर',
      className: 'कोणत्या बॅचसाठी चौकशी',
      message: 'मेसेज'
    },
    placeholders: {
      name: 'पूर्ण नाव लिहा',
      phone: 'मोबाईल नंबर लिहा',
      className: 'बॅच निवडा',
      message: 'उदा. इयत्ता १०वी गणित आणि विज्ञान प्रवेश माहिती हवी आहे.'
    },
    classOptions: [
      '५वी ते १०वी इंग्रजी, गणित, विज्ञान',
      '११वी व १२वी शकील काजी सर इंग्लिश क्लास',
      '११वी व १२वी अतिक काजी - लिंगायत मॅथ्स क्लासेस'
    ],
    sending: 'पाठवत आहे...',
    submit: 'चौकशी पाठवा',
    locationsTitle: 'क्लासची ठिकाणे',
    map: 'Maps मध्ये उघडा',
    hoursTitle: 'संपर्कासाठी योग्य वेळ',
    hours: 'प्रवेश आणि बॅच माहितीसाठी सकाळपासून संध्याकाळपर्यंत',
    noteTitle: 'काय माहिती तयार ठेवा',
    note: 'विद्यार्थ्याची इयत्ता, बोर्ड, विषयाची गरज आणि पसंतीची बॅच वेळ.',
    success: 'धन्यवाद. आम्ही लवकरच संपर्क करू.',
    error: 'काहीतरी चुकले. कृपया पुन्हा प्रयत्न करा.'
  }
};

export default function Contact() {
  const { language } = useLanguage();
  const { academyUnits, brand } = getSiteData(language);
  const text = contactText[language];
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const whatsappMessage = encodeURIComponent(`${text.formTitle}: ${form.className || text.placeholders.className}`);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      const response = await submitEnquiry({ ...form, date: new Date().toISOString().slice(0, 10) });
      if (response.success === false) throw new Error(response.message || 'Unable to submit enquiry.');
      setStatus({ type: 'success', message: response.message || text.success });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: 'danger', message: error.message || text.error });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="contact-page section-padding page-top">
      <div className="container">
        <div className="contact-hero">
          <div>
            <span className="eyebrow">{text.eyebrow}</span>
            <h1>{text.title}</h1>
            <p>{text.intro}</p>
          </div>
          <div className="contact-hero-actions">
            <a className="btn btn-warning fw-bold" href={`tel:+91${brand.phonePrimary}`}>
              <i className="bi bi-telephone-fill me-2" />{text.call}
            </a>
            <a className="btn btn-success fw-bold" href={`https://wa.me/${brand.whatsapp}?text=${whatsappMessage}`} target="_blank" rel="noreferrer">
              <i className="bi bi-whatsapp me-2" />{text.whatsapp}
            </a>
          </div>
        </div>

        <div className="contact-methods">
          <ContactMethod icon="bi-telephone-fill" title={text.call} value={`+91 ${brand.phonePrimary} / +91 ${brand.phoneSecondary}`} href={`tel:+91${brand.phonePrimary}`} />
          <ContactMethod icon="bi-whatsapp" title={text.whatsapp} value={`+91 ${brand.phonePrimary}`} href={`https://wa.me/${brand.whatsapp}?text=${whatsappMessage}`} external />
          <ContactMethod icon="bi-geo-alt-fill" title={text.visit} value={brand.addresses.join(' • ')} href="#locations" />
        </div>

        <div className="row g-4 mt-4 align-items-start">
          <div className="col-lg-7">
            <form className="contact-form contact-form-elevated" onSubmit={handleSubmit}>
              <div className="mb-4">
                <h2 className="h4 fw-bold mb-2">{text.formTitle}</h2>
                <p className="text-muted mb-0">{text.formHint}</p>
              </div>
              {status.message && <div className={`alert alert-${status.type}`}>{status.message}</div>}
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">{text.fields.name}</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder={text.placeholders.name}
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">{text.fields.phone}</label>
                  <input
                    required
                    type="tel"
                    className="form-control"
                    placeholder={text.placeholders.phone}
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">{text.fields.className}</label>
                  <select
                    required
                    className="form-control"
                    value={form.className}
                    onChange={(event) => setForm((current) => ({ ...current, className: event.target.value }))}
                  >
                    <option value="">{text.placeholders.className}</option>
                    {text.classOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">{text.fields.message}</label>
                  <textarea
                    required
                    className="form-control"
                    rows="5"
                    placeholder={text.placeholders.message}
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  />
                </div>
              </div>
              <button disabled={submitting} className="btn btn-primary btn-lg mt-4 w-100" type="submit">
                <i className="bi bi-send me-2" />{submitting ? text.sending : text.submit}
              </button>
            </form>
          </div>

          <div className="col-lg-5">
            <aside className="contact-side-panel">
              <img src={brand.logo} alt={`${brand.name} logo`} />
              <h2>{brand.name}</h2>
              <p>{brand.tagline}</p>
              <div className="contact-side-detail">
                <i className="bi bi-clock-fill" />
                <div>
                  <strong>{text.hoursTitle}</strong>
                  <span>{text.hours}</span>
                </div>
              </div>
              <div className="contact-side-detail">
                <i className="bi bi-journal-check" />
                <div>
                  <strong>{text.noteTitle}</strong>
                  <span>{text.note}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <section className="locations-section" id="locations">
          <div className="section-title-row">
            <div>
              <span className="eyebrow">{text.visit}</span>
              <h2 className="fw-bold mt-2">{text.locationsTitle}</h2>
            </div>
          </div>
          <div className="row g-4">
            {academyUnits.map((unit) => (
              <div className="col-md-6 col-xl-4" key={unit.name}>
                <article className="location-card h-100">
                  <i className="bi bi-building-check" />
                  <h3>{unit.name}</h3>
                  <p className="fw-bold">{unit.classes}</p>
                  <p>{unit.subjects}</p>
                  <span><i className="bi bi-geo-alt me-2" />{unit.address}</span>
                  <a className="btn btn-outline-primary w-100 mt-3" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(unit.address)}`} target="_blank" rel="noreferrer">
                    <i className="bi bi-map me-2" />{text.map}
                  </a>
                </article>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function ContactMethod({ icon, title, value, href, external }) {
  return (
    <a className="contact-method" href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
      <i className={`bi ${icon}`} />
      <span>
        <strong>{title}</strong>
        <small>{value}</small>
      </span>
    </a>
  );
}
