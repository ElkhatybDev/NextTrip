import React from "react";
import { Star } from "lucide-react";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";

export default function TestimonialsSection({ testimonials }) {
  const carouselItems = [...testimonials, ...testimonials];

  return (
    <section id="reviews" className="testimonials-section">
      <SectionHeading
        label="User reviews"
        title="What travelers say"
        desc="Reviews move automatically so the section feels alive instead of showing only three static cards."
        centered
      />

      <div className="testimonials-marquee" aria-label="Traveler reviews carousel">
        <div className="testimonials-track">
          {carouselItems.map((item, index) => (
            <article key={`${item.name}-${index}`} className="testimonial-card">
              <div className="testimonial-profile">
                <img src={item.avatar} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.role} | {item.location}</p>
                </div>
              </div>
              <div className="stars-row">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="testimonial-text">"{item.text}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
