export default function AlumniCard({ alumni }) {
  const photoUrl = alumni.photoUrl || '/animate-assets/image-28.jpeg';

  return (
    <article className="alumni-card h-100">
      <img src={photoUrl} alt={`${alumni.studentName} alumni`} />
      <div className="alumni-card-body">
        <span className="badge-soft">{alumni.year}</span>
        <h2>{alumni.studentName}</h2>
        <p className="alumni-status">{alumni.currentStatus}</p>
        <strong>{alumni.achievement}</strong>
        <p>{alumni.message}</p>
        <small>{alumni.batch}</small>
      </div>
    </article>
  );
}
