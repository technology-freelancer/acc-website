const asset = (name) => `/animate-assets/${name}.jpeg`;
const founderAsset = (name) => `/animate-assets/${name}.jpeg`;
const latestResultPoster = '/animate-assets/class-10-result-2025-2026.jpeg';

const class10ResultStudents = [
  ['गायत्री कोठारी', 97.20],
  ['वेदिका गरड', 97.00],
  ['धनश्री रेंगे', 96.80],
  ['समर्थ बावच', 96.60],
  ['निरंजन देशमुख', 95.80],
  ['नेहा दराडे', 95.60],
  ['व्यंकटेश गिराम', 95.40],
  ['वेदिका देशमुख', 95.20],
  ['सोनल गव्हेराव', 95.20],
  ['तृप्ती देशमुख', 95.00],
  ['अमरनाथ देवडे', 95.00],
  ['प्रतिक्षा तिथे', 93.20],
  ['अस्तिता काळे', 92.80],
  ['पूर्वा जोशी', 92.60],
  ['साईनाथ देवकते', 92.60],
  ['ऐश्वर्या कदम', 92.40],
  ['श्रद्धा पांढरे', 92.00],
  ['श्रुतिका जाधव', 91.60],
  ['श्रावणी राठोड', 91.40],
  ['हनुमान कराळे', 91.20],
  ['सचिन शेवाळे', 90.80],
  ['ऋतुजा समुद्रे', 90.60],
  ['वैष्णवी रेंगे', 89.60],
  ['अदनान काजी', 89.40],
  ['शिवम शिंदे', 88.80],
  ['श्रेया मगर', 88.40],
  ['सृष्टी कदम', 88.40],
  ['अतुल खिस्ते', 88.20],
  ['तनवी सरनाईक', 88.00],
  ['पल्लवी भाले', 87.80],
  ['तनुजा कदम', 87.60],
  ['वैष्णवी कुटे', 87.60],
  ['हरीओम भुतेकर', 86.00],
  ['गजानन शिंदे', 86.00],
  ['ऋतुजा टेहरे', 85.60],
  ['चेतन भोके', 85.00],
  ['संकेत अंभोरे', 84.80],
  ['गजानन नेमाने', 84.80],
  ['समृद्धी मिसाळ', 84.80],
  ['यास्मिन शेख', 84.00],
  ['सायली कदम', 83.40],
  ['आरती भाले', 83.00],
  ['श्रुती सामाले', 82.80],
  ['सिद्धांत नाईक', 82.80],
  ['नियुती कंठाळे', 82.80],
  ['अधीरा गायकवाड', 82.60],
  ['श्रावणी हजारे', 82.00],
  ['सोहम शिनगारे', 81.00],
  ['पार्थ पवार', 81.00],
  ['मनोज नंदुये', 80.60],
  ['तनुजा सामाले', 79.20],
  ['अल्फिया खान', 78.00]
].map(([studentName, percentage], index) => ({
  id: `class-10-result-2025-2026-${index + 1}`,
  studentName,
  className: 'Class 10',
  subject: 'All Subjects',
  testName: 'SSC Board Result 2025-2026',
  marks: percentage.toFixed(2),
  totalMarks: 100,
  percentage: percentage.toFixed(2),
  rank: index + 1,
  date: '2025-2026',
  photoUrl: asset('image-28')
}));

const galleryTitles = {
  en: [
    'Classroom practice session', 'Parent meeting and guidance', 'Student group activity', 'Prize distribution',
    'Exam preparation batch', 'Active classroom learning', 'Doubt solving session', 'Student felicitation',
    'English grammar practice', 'Board exam guidance', '11th and 12th batches', 'English class poster',
    'Admissions notice', 'Focused study group', 'HSC achiever', 'Science learning moment',
    'Batch celebration', 'Student felicitation', 'Campus moment', 'Event gathering',
    'Achievement celebration', 'Class 10 achiever', 'Maths topper', 'NMMS achievers',
    'Maths entrance coaching', 'Class event', 'Learning with confidence', 'Animate family',
    'Result announcement', 'Class 10 toppers', 'Student success wall', 'Board achiever',
    'Maths high scorer', 'Board topper', 'Kazi Sir guidance', 'Animate classroom'
  ],
  mr: [
    'वर्गातील सराव सत्र', 'पालक बैठक व मार्गदर्शन', 'विद्यार्थी समूह उपक्रम', 'बक्षीस वितरण',
    'परीक्षा तयारी बॅच', 'सक्रिय वर्ग शिक्षण', 'शंका निरसन सत्र', 'विद्यार्थी सत्कार',
    'इंग्रजी व्याकरण सराव', 'बोर्ड परीक्षा मार्गदर्शन', '११वी व १२वी बॅचेस', 'इंग्रजी क्लास पोस्टर',
    'प्रवेश सूचना', 'अभ्यास गट', 'एचएससी यशस्वी विद्यार्थी', 'विज्ञान शिक्षण क्षण',
    'बॅच सेलिब्रेशन', 'विद्यार्थी सत्कार', 'कॅम्पस क्षण', 'कार्यक्रमातील क्षण',
    'यशाचा आनंद', 'इयत्ता १०वी यशस्वी विद्यार्थी', 'गणित टॉपर', 'NMMS यशस्वी विद्यार्थी',
    'गणित प्रवेश परीक्षा मार्गदर्शन', 'क्लास कार्यक्रम', 'आत्मविश्वासाने शिक्षण', 'ॲनिमेट परिवार',
    'निकाल घोषणा', 'इयत्ता १०वी टॉपर्स', 'विद्यार्थी यश भिंत', 'बोर्ड यशस्वी विद्यार्थी',
    'गणित उच्च गुण', 'बोर्ड टॉपर', 'काजी सरांचे मार्गदर्शन', 'ॲनिमेट वर्ग'
  ]
};

const makeGallery = (language = 'en') =>
  Array.from({ length: 36 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    return {
      src: asset(`image-${number}`),
      title: galleryTitles[language][index] || galleryTitles.en[index]
    };
  });

export const dataByLanguage = {
  en: {
    brand: {
      name: 'Animate Coaching Classes',
      shortName: 'ACC',
      owner: 'Atik Kazi Sir',
      phonePrimary: '9921383815',
      phoneSecondary: '9503107210',
      whatsapp: '919921383815',
      logo: asset('image-28'),
      teacher: asset('image-35'),
      addresses: [
        'Prabhavati Pati, Old Pedgaon Road, Parbhani',
        'In front of Patil Hospital, Old Pedgaon Road, Parbhani'
      ],
      tagline: 'We believe in quality'
    },
    academyUnits: [
      {
        name: 'Animate Coaching Classes',
        classes: 'Classes 5th to 10th',
        subjects: 'English, Maths and Science',
        address: 'Prabhavati Pati, Old Pedgaon Road, Parbhani'
      },
      {
        name: "Shakil Kazi Sir's English Class",
        classes: 'For 11th and 12th',
        subjects: 'Arts, Commerce and Science',
        address: 'Animate Coaching Classes'
      },
      {
        name: 'Kazi - Lingayat Maths Classes',
        classes: 'For 11th and 12th',
        subjects: 'Maths for Board, JEE and MHT-CET',
        address: 'In front of Patil Hospital, Old Pedgaon Road, Parbhani'
      }
    ],
    founders: [
      {
        name: 'Atik Kazi Sir',
        role: 'Founder, Animate Coaching Classes',
        photo: founderAsset('founder-atik-kazi'),
        focus: 'School foundation and disciplined academic progress',
        vision: 'Atik Kazi Sir started Animate with a simple promise: students from Parbhani should get clear teaching, regular practice and honest guidance without leaving their local environment. His vision is to build strong basics from 5th to 10th, make every child comfortable with English, Maths and Science, and keep parents informed through visible progress.'
      },
      {
        name: 'Shakil Kazi Sir',
        role: "Founder, Shakil Kazi Sir's English Class",
        photo: founderAsset('founder-shakil-kazi'),
        focus: 'English confidence for 11th and 12th students',
        vision: 'Shakil Kazi Sir focuses on making English practical, exam-ready and confidence-building for Arts, Commerce and Science students. His vision is that students should not fear grammar, writing or literature; they should learn how to express answers clearly, improve presentation and score with discipline.'
      }
    ],
    galleryImages: makeGallery('en'),
    posterImages: [
      { src: latestResultPoster, title: 'Class 10 result 2025-2026' },
      { src: asset('image-30'), title: 'Class 10 toppers' },
      { src: asset('image-12'), title: 'English classes' },
      { src: asset('image-11'), title: '11th and 12th batches' },
      { src: asset('image-09'), title: 'HSC English results' },
      { src: asset('image-25'), title: 'JEE and MHT-CET maths' },
      { src: asset('image-13'), title: 'Admission notice' }
    ],
    courses: [
      {
        id: 'school',
        className: 'Classes 5th to 10th',
        courseName: 'Animate Coaching Classes',
        description: 'Clear classroom coaching for English, Maths and Science with tests, writing practice and personal attention.',
        subjects: 'English, Maths, Science',
        duration: 'Year-round batches',
        fees: 'Contact office',
        address: 'Prabhavati Pati, Old Pedgaon Road, Parbhani',
        idealFor: 'Students who need strong basics, regular practice and board-oriented preparation from middle school to Class 10.',
        focusAreas: ['Concept clarity in Maths and Science', 'English grammar and writing practice', 'Chapter-wise tests and revision', 'Doubt solving and parent progress updates'],
        outcome: 'Students build disciplined study habits, stronger answer writing and confidence for school and board exams.'
      },
      {
        id: 'english-hsc',
        className: '11th and 12th',
        courseName: "Shakil Kazi Sir's English Class",
        description: 'English coaching for Arts, Commerce and Science students with grammar, prose, poetry and exam writing practice.',
        subjects: 'English for Arts, Commerce and Science',
        duration: 'Regular and crash batches',
        fees: 'Contact office',
        address: 'Animate Coaching Classes',
        idealFor: '11th and 12th Arts, Commerce and Science students who want simple, exam-focused English preparation.',
        focusAreas: ['Grammar and vocabulary basics', 'Prose, poetry and writing skills', 'Board paper pattern practice', 'Presentation and answer framing'],
        outcome: 'Students learn to write clearer answers, reduce fear of English and prepare steadily for HSC exams.'
      },
      {
        id: 'maths-hsc',
        className: '11th and 12th',
        courseName: 'Kazi - Lingayat Maths Classes',
        description: 'Maths coaching for 11th and 12th students with board-focused practice and entrance exam support.',
        subjects: 'Maths, JEE, MHT-CET',
        duration: 'Regular and crash batches',
        fees: 'Contact office',
        address: 'In front of Patil Hospital, Old Pedgaon Road, Parbhani',
        idealFor: '11th and 12th students preparing for board Maths with additional support for JEE and MHT-CET problem practice.',
        focusAreas: ['Formula understanding and application', 'Step-by-step problem solving', 'Board pattern examples and tests', 'Entrance-level practice where required'],
        outcome: 'Students improve speed, accuracy and confidence in Maths through repeated practice and guided doubt solving.'
      }
    ],
    highlights: [
      ['97.20%', 'Top Class 10 result', 'bi-trophy-fill'],
      ['52', 'Class 10 achievers listed', 'bi-people-fill'],
      ['3', 'Classes under Animate', 'bi-buildings-fill'],
      ['5-12', 'School to HSC support', 'bi-mortarboard-fill']
    ],
    latestResult: {
      poster: latestResultPoster,
      eyebrow: 'Recent result',
      title: 'Class 10 students performed very well in 2025-2026',
      intro: 'Animate Coaching Classes congratulates every Class 10 achiever. Gayatri Kothari secured 97.20% and Vedika Garad secured 97.00%, with 52 students listed from the recent result poster.',
      badge: 'Admissions open',
      cta: 'View complete list'
    },
    results: class10ResultStudents,
    testimonials: [],
    alumni: [],
    announcements: [
      {
        id: 'admissions-open',
        type: 'Admissions',
        date: 'Open now',
        title: 'Admissions are open',
        description: 'Admissions are open for Classes 5th to 10th, 11th-12th English and 11th-12th Maths.'
      }
    ]
  },
  mr: {
    brand: {
      name: 'ॲनिमेट कोचिंग क्लासेस',
      shortName: 'ACC',
      owner: 'अतिक काजी सर',
      phonePrimary: '9921383815',
      phoneSecondary: '9503107210',
      whatsapp: '919921383815',
      logo: asset('image-28'),
      teacher: asset('image-35'),
      addresses: [
        'प्रभावती पाटी, जुना पेडगाव रोड, परभणी',
        'पाटील हॉस्पिटल समोर, जुना पेडगाव रोड, परभणी'
      ],
      tagline: 'आमचा विश्वास गुणवत्तेवर'
    },
    academyUnits: [
      {
        name: 'ॲनिमेट कोचिंग क्लासेस',
        classes: 'इयत्ता ५वी ते १०वी',
        subjects: 'इंग्रजी, गणित आणि विज्ञान',
        address: 'प्रभावती पाटी, जुना पेडगाव रोड, परभणी'
      },
      {
        name: 'शकील काजी सर इंग्लिश क्लास',
        classes: 'इयत्ता ११वी व १२वी',
        subjects: 'कला, वाणिज्य आणि विज्ञान',
        address: 'ॲनिमेट कोचिंग क्लासेस'
      },
      {
        name: 'काजी - लिंगायत मॅथ्स क्लासेस',
        classes: 'इयत्ता ११वी व १२वी',
        subjects: 'बोर्ड, JEE आणि MHT-CET साठी गणित',
        address: 'पाटील हॉस्पिटल समोर, जुना पेडगाव रोड, परभणी'
      }
    ],
    founders: [
      {
        name: 'अतिक काजी सर',
        role: 'संस्थापक, ॲनिमेट कोचिंग क्लासेस',
        photo: founderAsset('founder-atik-kazi'),
        focus: 'शालेय पाया आणि शिस्तबद्ध शैक्षणिक प्रगती',
        vision: 'अतिक काजी सरांनी ॲनिमेटची सुरुवात एका स्पष्ट विचाराने केली: परभणीतील विद्यार्थ्यांना आपल्या शहरातच स्पष्ट अध्यापन, नियमित सराव आणि प्रामाणिक मार्गदर्शन मिळाले पाहिजे. ५वी ते १०वीच्या विद्यार्थ्यांचा पाया मजबूत करणे, इंग्रजी, गणित आणि विज्ञानात आत्मविश्वास वाढवणे आणि पालकांना विद्यार्थ्यांची प्रगती स्पष्ट दिसावी हे त्यांचे ध्येय आहे.'
      },
      {
        name: 'शकील काजी सर',
        role: 'संस्थापक, शकील काजी सर इंग्लिश क्लास',
        photo: founderAsset('founder-shakil-kazi'),
        focus: '११वी व १२वी विद्यार्थ्यांसाठी इंग्रजी आत्मविश्वास',
        vision: 'शकील काजी सर इंग्रजी विषय सोपा, परीक्षाभिमुख आणि आत्मविश्वास वाढवणारा करण्यावर भर देतात. कला, वाणिज्य आणि विज्ञान शाखेतील विद्यार्थ्यांनी व्याकरण, लेखन आणि साहित्याला घाबरू नये; त्यांनी उत्तर मांडणी, भाषेची स्पष्टता आणि गुण मिळवण्याची पद्धत शिकावी हे त्यांचे उद्दिष्ट आहे.'
      }
    ],
    galleryImages: makeGallery('mr'),
    posterImages: [
      { src: latestResultPoster, title: 'इयत्ता १०वी निकाल २०२५-२०२६' },
      { src: asset('image-30'), title: 'इयत्ता १०वी टॉपर्स' },
      { src: asset('image-12'), title: 'इंग्रजी क्लासेस' },
      { src: asset('image-11'), title: '११वी व १२वी बॅचेस' },
      { src: asset('image-09'), title: 'एचएससी इंग्रजी निकाल' },
      { src: asset('image-25'), title: 'JEE आणि MHT-CET गणित' },
      { src: asset('image-13'), title: 'प्रवेश सूचना' }
    ],
    courses: [
      {
        id: 'school',
        className: 'इयत्ता ५वी ते १०वी',
        courseName: 'ॲनिमेट कोचिंग क्लासेस',
        description: 'इंग्रजी, गणित आणि विज्ञानासाठी स्पष्ट अध्यापन, नियमित टेस्ट, लेखन सराव आणि वैयक्तिक लक्ष.',
        subjects: 'इंग्रजी, गणित, विज्ञान',
        duration: 'वर्षभर बॅचेस',
        fees: 'ऑफिसशी संपर्क साधा',
        address: 'प्रभावती पाटी, जुना पेडगाव रोड, परभणी',
        idealFor: '५वी ते १०वी विद्यार्थ्यांसाठी मजबूत पाया, नियमित सराव आणि बोर्ड-केंद्रित तयारी.',
        focusAreas: ['गणित आणि विज्ञानातील संकल्पना स्पष्टता', 'इंग्रजी व्याकरण आणि लेखन सराव', 'अध्यायनिहाय टेस्ट आणि रिव्हिजन', 'शंका निरसन आणि पालकांना प्रगती माहिती'],
        outcome: 'विद्यार्थ्यांमध्ये अभ्यासाची शिस्त, चांगले उत्तर लेखन आणि शाळा व बोर्ड परीक्षेसाठी आत्मविश्वास वाढतो.'
      },
      {
        id: 'english-hsc',
        className: 'इयत्ता ११वी व १२वी',
        courseName: 'शकील काजी सर इंग्लिश क्लास',
        description: 'कला, वाणिज्य आणि विज्ञान शाखेतील विद्यार्थ्यांसाठी व्याकरण, गद्य, पद्य आणि परीक्षा लेखन सरावासह इंग्रजी कोचिंग.',
        subjects: 'कला, वाणिज्य आणि विज्ञानासाठी इंग्रजी',
        duration: 'नियमित आणि क्रॅश बॅचेस',
        fees: 'ऑफिसशी संपर्क साधा',
        address: 'ॲनिमेट कोचिंग क्लासेस',
        idealFor: '११वी आणि १२वी कला, वाणिज्य व विज्ञान शाखेतील विद्यार्थ्यांसाठी सोपी आणि परीक्षाभिमुख इंग्रजी तयारी.',
        focusAreas: ['व्याकरण आणि शब्दसंग्रहाचा पाया', 'गद्य, पद्य आणि लेखन कौशल्य', 'बोर्ड पेपर पॅटर्न सराव', 'उत्तर मांडणी आणि प्रेझेंटेशन'],
        outcome: 'विद्यार्थी इंग्रजीची भीती कमी करून स्पष्ट उत्तर लेखन आणि HSC परीक्षेची नियमित तयारी करू शकतात.'
      },
      {
        id: 'maths-hsc',
        className: 'इयत्ता ११वी व १२वी',
        courseName: 'काजी - लिंगायत मॅथ्स क्लासेस',
        description: '११वी व १२वी विद्यार्थ्यांसाठी बोर्ड-केंद्रित सराव आणि प्रवेश परीक्षेच्या तयारीसह गणित कोचिंग.',
        subjects: 'गणित, JEE, MHT-CET',
        duration: 'नियमित आणि क्रॅश बॅचेस',
        fees: 'ऑफिसशी संपर्क साधा',
        address: 'पाटील हॉस्पिटल समोर, जुना पेडगाव रोड, परभणी',
        idealFor: '११वी आणि १२वी विद्यार्थ्यांसाठी बोर्ड गणितासोबत JEE आणि MHT-CET सरावाची गरज असलेल्या विद्यार्थ्यांसाठी.',
        focusAreas: ['सूत्रांचे समज आणि उपयोग', 'टप्प्याटप्प्याने उदाहरणे सोडवणे', 'बोर्ड पॅटर्न उदाहरणे आणि टेस्ट', 'गरजेनुसार प्रवेश परीक्षा पातळीचा सराव'],
        outcome: 'नियमित सराव आणि मार्गदर्शित शंका निरसनातून विद्यार्थ्यांचा वेग, अचूकता आणि गणितातील आत्मविश्वास वाढतो.'
      }
    ],
    highlights: [
      ['97.20%', 'इयत्ता १०वी सर्वोच्च निकाल', 'bi-trophy-fill'],
      ['52', 'इयत्ता १०वी यशस्वी विद्यार्थी', 'bi-people-fill'],
      ['3', 'ॲनिमेट अंतर्गत क्लासेस', 'bi-buildings-fill'],
      ['5-12', 'शाळेपासून एचएससीपर्यंत मार्गदर्शन', 'bi-mortarboard-fill']
    ],
    latestResult: {
      poster: latestResultPoster,
      eyebrow: 'अलीकडील निकाल',
      title: '२०२५-२०२६ मध्ये इयत्ता १०वी विद्यार्थ्यांची उत्कृष्ट कामगिरी',
      intro: 'ॲनिमेट कोचिंग क्लासेस सर्व यशस्वी विद्यार्थ्यांचे हार्दिक अभिनंदन करते. गायत्री कोठारी ९७.२०% आणि वेदिका गरड ९७.००% मिळवून आघाडीवर आहेत.',
      badge: 'प्रवेश सुरू',
      cta: 'संपूर्ण यादी पहा'
    },
    results: class10ResultStudents,
    testimonials: [],
    alumni: [],
    announcements: [
      {
        id: 'admissions-open',
        type: 'प्रवेश',
        date: 'सुरू आहेत',
        title: 'नवीन प्रवेश सुरू',
        description: 'इयत्ता ५वी ते १०वी, ११वी-१२वी इंग्रजी आणि ११वी-१२वी गणितासाठी प्रवेश सुरू आहेत.'
      }
    ]
  }
};

export const results = class10ResultStudents;

export const getSiteData = (language = 'en') => dataByLanguage[language] || dataByLanguage.en;

export const {
  brand,
  academyUnits,
  galleryImages,
  posterImages,
  courses,
  highlights,
  latestResult,
  testimonials,
  alumni,
  announcements
} = dataByLanguage.en;
