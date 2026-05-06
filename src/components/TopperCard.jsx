import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function TopperCard({ topper }) {
  const { language } = useLanguage();
  const percentage = topper.percentage || ((Number(topper.marks) / Number(topper.totalMarks)) * 100).toFixed(2);
  const photoUrl = topper.photoUrl || '/animate-assets/image-28.jpeg';
  const text = {
    en: { rank: 'Rank', marks: 'marks', score: 'Score' },
    mr: { rank: 'रँक', marks: 'गुण', score: 'स्कोअर' }
  }[language];

  return (
    <article className="topper-card topper-card-pro h-100">
      <div className="topper-card-head">
        <div className="rank-medal">{text.rank} {topper.rank}</div>
        <span>{topper.date}</span>
      </div>
      <div className="topper-profile">
        <img className="topper-photo" src={photoUrl} alt={`${topper.studentName} topper`} />
        <div>
          <h2>{topper.studentName}</h2>
          <p>{topper.className} • {topper.subject}</p>
        </div>
      </div>
      <div className="topper-score-row">
        <div>
          <span>{text.score}</span>
          <strong>{Number(percentage).toFixed(2)}%</strong>
        </div>
        <div>
          <span>{topper.testName}</span>
          <strong>{topper.marks}/{topper.totalMarks} {text.marks}</strong>
        </div>
      </div>
    </article>
  );
}
