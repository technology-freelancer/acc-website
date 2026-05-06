export default function TestimonialCard({ testimonial }) {
  const stars = Array.from({ length: Number(testimonial.rating) || 5 });
  const photoUrl = testimonial.photoUrl || '/animate-assets/image-28.jpeg';

  return (
    <article className="testimonial-card-pro h-100">
      <i className="bi bi-quote quote-mark" />
      <div className="stars mb-3" aria-label={`${testimonial.rating} star rating`}>
        {stars.map((_, index) => <i className="bi bi-star-fill" key={index} />)}
      </div>
      <p className="testimonial-message">“{testimonial.message}”</p>
      <div className="testimonial-person">
        <img className="avatar" src={photoUrl} alt={`${testimonial.studentName} testimonial`} />
        <div>
          <h2>{testimonial.studentName}</h2>
          <p>{testimonial.batch} • {testimonial.year}</p>
        </div>
      </div>
    </article>
  );
}
