import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";

export default function ExperienceCarouselSection({ experiences, onOpenExperience }) {
  const carouselItems = [...experiences, ...experiences];

  return (
    <section id="home-experiences" className="home-experiences-section">
      <SectionHeading
        label="Experiences"
        title="Real traveler stories"
        desc="Cards move like reviews, and every experience opens its detail page."
        centered
      />

      <div className="experience-marquee" aria-label="Featured experiences carousel">
        <div className="experience-track">
          {carouselItems.map((item, index) => (
            <button
              key={`${item.id}-${index}`}
              type="button"
              className="experience-slide-card"
              onClick={() => onOpenExperience(item.id)}
            >
              <img src={item.image} alt={item.title} />
              <span>
                <MapPin size={14} />
                {item.location}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <strong>
                View detail
                <ArrowRight size={15} />
              </strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
