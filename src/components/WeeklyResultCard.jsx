export default function WeeklyResultCard({ result }) {
  const pdfUrl = result.pdfUrl || '#';

  return (
    <article className="weekly-result-card h-100">
      {result.pdfUrl && (
        <iframe
          className="weekly-result-pdf"
          src={pdfUrl}
          title={`${result.className} ${result.subject} result PDF`}
        />
      )}
      <div>
        <p className="weekly-result-week">{result.weekLabel}</p>
        <h3>{result.subject}</h3>
        <p className="mb-2">{result.className}</p>
        <strong>{result.testName}</strong>
        {result.notes && <p className="text-muted mt-2 mb-0">{result.notes}</p>}
      </div>
      <a className="btn btn-primary w-100 mt-3" href={pdfUrl} target="_blank" rel="noreferrer">
        <i className="bi bi-file-earmark-pdf me-2" />Open PDF
      </a>
    </article>
  );
}
