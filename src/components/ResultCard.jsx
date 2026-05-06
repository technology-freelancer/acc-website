export default function ResultCard({ result }) {
  const percentage = result.percentage || ((Number(result.marks) / Number(result.totalMarks)) * 100).toFixed(2);
  const photoUrl = result.photoUrl || '/animate-assets/image-28.jpeg';

  return (
    <article className="info-card h-100">
      <div className="d-flex align-items-center gap-3">
        <img className="avatar" src={photoUrl} alt={`${result.studentName} result`} />
        <div className="flex-grow-1">
          <h2 className="h5 fw-bold mb-1">{result.studentName}</h2>
          <p className="text-muted mb-0">{result.className} • {result.subject}</p>
        </div>
        <span className="rank-pill">#{result.rank}</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between gap-3">
        <div>
          <p className="small text-uppercase text-muted mb-1">{result.testName}</p>
          <strong>{result.marks}/{result.totalMarks} marks</strong>
        </div>
        <div className="text-end">
          <p className="small text-uppercase text-muted mb-1">Percentage</p>
          <strong className="text-success fs-5">{Number(percentage).toFixed(2)}%</strong>
        </div>
      </div>
      <p className="small text-muted mt-3 mb-0"><i className="bi bi-calendar-event me-2" />{result.date}</p>
    </article>
  );
}
