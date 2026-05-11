import { useEffect, useMemo, useState } from 'react';
import { fetchSheetData, getCachedSheetData } from '../api/googleSheetApi.js';
import ResultCard from '../components/ResultCard.jsx';
import WeeklyResultCard from '../components/WeeklyResultCard.jsx';
import { getSiteData } from '../data/animateData.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const resultsText = {
  en: {
    eyebrow: 'Student achievements',
    title: 'Results and Toppers',
    intro: 'Recent toppers from Animate Coaching Classes across Maths, English and Science batches.',
    loading: 'Loading results...',
    empty: 'No results found.',
    weeklyTitle: 'Weekly Test Result PDFs',
    weeklyIntro: 'Download subject-wise weekly test result PDFs, arranged by the latest week first.',
    weeklyEmpty: 'No weekly result PDFs have been added yet.',
    labels: { className: 'Class', subject: 'Subject', testName: 'Test Name' },
    table: ['Student', 'Class', 'Subject', 'Test', 'Marks', 'Percentage', 'Rank'],
    search: 'Search',
    summary: {
      topScore: 'Top score',
      achievers: 'Achievers listed',
      subjects: 'Subjects covered',
      practice: 'Regular tests',
      weekly: 'Weekly'
    }
  },
  mr: {
    eyebrow: 'विद्यार्थी यश',
    title: 'निकाल आणि टॉपर्स',
    intro: 'ॲनिमेट कोचिंग क्लासेसमधील गणित, इंग्रजी आणि विज्ञान बॅचेसचे अलीकडील यशस्वी विद्यार्थी.',
    loading: 'निकाल लोड होत आहेत...',
    empty: 'कोणतेही निकाल सापडले नाहीत.',
    weeklyTitle: 'साप्ताहिक टेस्ट निकाल PDF',
    weeklyIntro: 'विषयानुसार साप्ताहिक टेस्ट निकाल PDF नवीन आठवड्यानुसार पहा.',
    weeklyEmpty: 'सध्या साप्ताहिक निकाल PDF उपलब्ध नाहीत.',
    labels: { className: 'इयत्ता', subject: 'विषय', testName: 'परीक्षा' },
    table: ['विद्यार्थी', 'इयत्ता', 'विषय', 'परीक्षा', 'गुण', 'टक्केवारी', 'रँक'],
    search: 'शोधा',
    summary: {
      topScore: 'सर्वोच्च गुण',
      achievers: 'यशस्वी विद्यार्थी',
      subjects: 'विषय',
      practice: 'नियमित टेस्ट',
      weekly: 'साप्ताहिक'
    }
  }
};

export default function Results() {
  const { language } = useLanguage();
  const text = resultsText[language];
  const { latestResult } = getSiteData(language);
  const [results, setResults] = useState(() => getCachedSheetData('getResults'));
  const [weeklyResults, setWeeklyResults] = useState(() => getCachedSheetData('getWeeklyResults'));
  const [filters, setFilters] = useState({ className: '', subject: '', testName: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSheetData('getResults').then((data) => setResults(data)).finally(() => setLoading(false));
    fetchSheetData('getWeeklyResults').then((data) => setWeeklyResults(data));
  }, []);

  const filteredResults = useMemo(() => {
    return results.filter((result) =>
      ['className', 'subject', 'testName'].every((key) =>
        !filters[key] || String(result[key]).toLowerCase().includes(filters[key].toLowerCase())
      )
    );
  }, [filters, results]);

  const resultStats = useMemo(() => {
    const percentages = results.map((result) => Number(result.percentage)).filter((value) => !Number.isNaN(value));
    const subjectCount = new Set(results.flatMap((result) => String(result.subject).split(/,|and/).map((subject) => subject.trim()).filter(Boolean))).size;

    return [
      { value: percentages.length ? `${Math.max(...percentages).toFixed(2)}%` : '0%', label: text.summary.topScore, icon: 'bi-trophy-fill' },
      { value: results.length, label: text.summary.achievers, icon: 'bi-people-fill' },
      { value: subjectCount, label: text.summary.subjects, icon: 'bi-journal-bookmark-fill' },
      { value: text.summary.weekly, label: text.summary.practice, icon: 'bi-calendar-check-fill' }
    ];
  }, [results, text.summary]);

  const groupedWeeklyResults = useMemo(() => {
    return weeklyResults.reduce((groups, result) => {
      const label = result.weekLabel || result.date || 'Weekly Results';
      return { ...groups, [label]: [...(groups[label] || []), result] };
    }, {});
  }, [weeklyResults]);

  return (
    <section className="section-padding page-top">
      <div className="container">
        <span className="eyebrow">{text.eyebrow}</span>
        <h1 className="fw-bold mt-3">{text.title}</h1>
        <p className="lead text-slate">{text.intro}</p>

        <div className="result-poster-panel">
          <div>
            <span className="eyebrow">{latestResult.eyebrow}</span>
            <h2>{latestResult.title}</h2>
            <p>{latestResult.intro}</p>
          </div>
          <img src={latestResult.poster} alt={latestResult.title} />
        </div>

        <div className="weekly-results-panel">
          <div className="section-title-row">
            <div>
              <span className="eyebrow">Weekly tests</span>
              <h2 className="fw-bold mt-2">{text.weeklyTitle}</h2>
              <p className="text-slate mb-0">{text.weeklyIntro}</p>
            </div>
          </div>
          {weeklyResults.length === 0 && <div className="empty-state mt-3">{text.weeklyEmpty}</div>}
          {Object.entries(groupedWeeklyResults).map(([weekLabel, items]) => (
            <div className="weekly-result-group" key={weekLabel}>
              <h3>{weekLabel}</h3>
              <div className="row g-4">
                {items.map((item) => (
                  <div className="col-md-6 col-xl-4" key={item.id}>
                    <WeeklyResultCard result={item} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="results-summary-band">
          {resultStats.map((stat) => (
            <div className="results-summary-item" key={stat.label}>
              <i className={`bi ${stat.icon}`} />
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="filter-panel row g-3">
          {['className', 'subject', 'testName'].map((key) => (
            <div className="col-md-4" key={key}>
              <label className="form-label fw-semibold">{text.labels[key]}</label>
              <input
                className="form-control"
                value={filters[key]}
                onChange={(event) => setFilters((current) => ({ ...current, [key]: event.target.value }))}
                placeholder={`${text.search} ${text.labels[key]}`}
              />
            </div>
          ))}
        </div>

        {loading && <p className="text-muted mt-4">{text.loading}</p>}
        {!loading && filteredResults.length === 0 && <div className="empty-state mt-4">{text.empty}</div>}
        <div className="row g-4 mt-2">
          {filteredResults.map((result) => (
            <div className="col-md-6 col-xl-4" key={result.id}>
              <ResultCard result={result} />
            </div>
          ))}
        </div>

        {filteredResults.length > 0 && (
          <div className="table-responsive mt-5">
            <table className="table table-hover align-middle results-table">
              <thead>
                <tr>
                  {text.table.map((label) => <th key={label}>{label}</th>)}
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result) => {
                  const percentage = result.percentage || ((Number(result.marks) / Number(result.totalMarks)) * 100).toFixed(2);
                  return (
                    <tr key={`${result.id}-row`}>
                      <td>{result.studentName}</td>
                      <td>{result.className}</td>
                      <td>{result.subject}</td>
                      <td>{result.testName}</td>
                      <td>{result.marks}/{result.totalMarks}</td>
                      <td>{Number(percentage).toFixed(2)}%</td>
                      <td>{result.rank}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
