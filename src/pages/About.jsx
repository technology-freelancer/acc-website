import { getSiteData } from '../data/animateData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function About() {
  const { language } = useLanguage();
  const { academyUnits, brand, founders, galleryImages } = getSiteData(language);
  const text = {
    en: {
      eyebrow: 'About Animate Coaching Classes',
      title: 'A result-focused coaching class built for Parbhani students.',
      intro: 'Animate Coaching Classes helps students build strong basics, disciplined study habits, and exam confidence through consistent teaching and practice.',
      mission: "Atik Kazi Sir's Mission",
      missionText: 'To make quality coaching approachable for every hardworking student and give parents confidence through clear progress.',
      story: 'Our Coaching Story',
      storyText: 'Animate brings school coaching, HSC English and HSC Maths classes under one trusted local name. The photos on this website are real milestones from batches, felicitation programs and classroom learning.',
      faculty: 'Faculty Highlights',
      facultyText: 'English, Maths and Science are taught with chapter practice, exam writing, doubt-solving and batch-wise result follow-up.',
      reasons: ['Regular tests with visible improvement', 'Strong focus on Maths, English and Science', 'Personal attention for Parbhani students', 'Clear addresses for every class']
    },
    mr: {
      eyebrow: 'ॲनिमेट कोचिंग क्लासेस बद्दल',
      title: 'परभणीच्या विद्यार्थ्यांसाठी निकाल-केंद्रित कोचिंग क्लास.',
      intro: 'ॲनिमेट कोचिंग क्लासेस नियमित अध्यापन आणि सरावाद्वारे विद्यार्थ्यांची पायाभूत तयारी, अभ्यासाची शिस्त आणि परीक्षेचा आत्मविश्वास वाढवते.',
      mission: 'अतिक काजी सरांचे ध्येय',
      missionText: 'प्रत्येक मेहनती विद्यार्थ्याला गुणवत्तापूर्ण कोचिंग मिळावे आणि पालकांना स्पष्ट प्रगतीद्वारे विश्वास मिळावा.',
      story: 'आमची कोचिंग स्टोरी',
      storyText: 'ॲनिमेट अंतर्गत शालेय कोचिंग, एचएससी इंग्रजी आणि एचएससी गणित क्लासेस एकाच विश्वासार्ह स्थानिक नावाखाली येतात. या वेबसाइटवरील फोटो बॅचेस, सत्कार कार्यक्रम आणि वर्गातील खरे क्षण आहेत.',
      faculty: 'फॅकल्टी वैशिष्ट्ये',
      facultyText: 'इंग्रजी, गणित आणि विज्ञान अध्याय सराव, परीक्षा लेखन, शंका निरसन आणि बॅचनुसार निकाल फॉलो-अपसह शिकवले जाते.',
      reasons: ['नियमित टेस्ट आणि स्पष्ट सुधारणा', 'इंग्रजी, गणित आणि विज्ञानावर मजबूत भर', 'परभणीतील विद्यार्थ्यांसाठी वैयक्तिक लक्ष', 'प्रत्येक क्लाससाठी स्पष्ट पत्ता']
    }
  }[language];
  const founderText = {
    en: {
      eyebrow: 'Founders and vision',
      title: 'Focused leadership behind Animate Coaching Classes',
      intro: 'Animate is built by teachers who stay close to students, parents and day-to-day learning. Their shared vision is quality coaching that feels personal, disciplined and practical for Parbhani students.'
    },
    mr: {
      eyebrow: 'संस्थापक आणि दृष्टी',
      title: 'ॲनिमेट कोचिंग क्लासेसमागील केंद्रित नेतृत्व',
      intro: 'ॲनिमेट हे विद्यार्थ्यांशी, पालकांशी आणि रोजच्या शिक्षणाशी जोडलेले शिक्षक घडवत आहेत. परभणीतील विद्यार्थ्यांसाठी वैयक्तिक, शिस्तबद्ध आणि उपयोगी गुणवत्तापूर्ण कोचिंग देणे ही त्यांची सामायिक दृष्टी आहे.'
    }
  }[language];

  return (
    <section className="section-padding page-top">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="eyebrow">{text.eyebrow}</span>
            <h1 className="fw-bold mt-3">{text.title}</h1>
            <p className="lead text-slate mt-3">
              {text.intro}
            </p>
          </div>
          <div className="col-lg-6">
            <div className="about-highlight teacher-card">
              <img src={brand.teacher} alt={brand.owner} />
              <h2 className="h4 fw-bold mt-3">{text.mission}</h2>
              <p className="mb-0">
                {text.missionText}
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-5">
          <div className="col-lg-7">
            <div className="info-card">
              <h2 className="h4 fw-bold">{text.story}</h2>
              <p className="text-muted mb-0">
                {text.storyText}
              </p>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="info-card">
              <h2 className="h4 fw-bold">{text.faculty}</h2>
              <p className="text-muted mb-0">
                {text.facultyText}
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-3">
          {text.reasons.map((reason) => (
            <div className="col-md-6 col-lg-3" key={reason}>
              <div className="reason-card"><i className="bi bi-check2-circle" />{reason}</div>
            </div>
          ))}
        </div>

        <div className="row g-4 mt-3">
          {academyUnits.map((unit) => (
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
        </div>

        <section className="founders-section mt-5">
          <div className="section-title-row">
            <div>
              <span className="eyebrow">{founderText.eyebrow}</span>
              <h2 className="fw-bold mt-2">{founderText.title}</h2>
              <p className="text-slate mb-0">{founderText.intro}</p>
            </div>
          </div>
          <div className="row g-4">
            {founders.map((founder) => (
              <div className="col-md-6" key={founder.role}>
                <article className="founder-card h-100">
                  <img src={founder.photo} alt={founder.name} />
                  <div className="founder-content">
                    <p className="badge-soft mb-2">{founder.focus}</p>
                    <h3>{founder.name}</h3>
                    <p className="founder-role">{founder.role}</p>
                    <p className="mb-0">{founder.vision}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        <div className="photo-grid mt-5">
          {galleryImages.slice(0, 4).map((image) => (
            <figure className="photo-tile" key={image.src}>
              <img src={image.src} alt={image.title} />
              <figcaption>{image.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
