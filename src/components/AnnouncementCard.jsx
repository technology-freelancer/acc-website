export default function AnnouncementCard({ announcement }) {
  return (
    <article className="announcement-card h-100">
      <div className="d-flex justify-content-between gap-3">
        <span className="badge-soft">{announcement.type}</span>
        <span className="small text-muted">{announcement.date}</span>
      </div>
      <h2 className="h5 fw-bold mt-3">{announcement.title}</h2>
      <p className="text-muted mb-0">{announcement.description}</p>
    </article>
  );
}
