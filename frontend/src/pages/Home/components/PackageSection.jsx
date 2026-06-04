import React from "react";
import { ChevronRight } from "lucide-react";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";

export default function PackageSection({
  id = "packages",
  label = "Ready offers",
  title = "Packages and offers from agencies",
  desc = "These offers sit right under the custom trip builder so users can choose fast or build something personal.",
  packages,
  badgeText = "Agency offer",
  showOfferSign = true,
  onSelectPackage,
}) {
  return (
    <section id={id} className="home-package-section">
      <SectionHeading
        label={label}
        title={title}
        desc={desc}
      />

      <div className="packages-grid">
        {packages.map((item) => (
          <article key={item.title} className="package-card">
            <div className="package-image-wrap">
              <img
                src={item.image}
                alt={item.title}
                className="package-image"
                loading="lazy"
                decoding="async"
              />
              <span className="package-tag">{item.tag}</span>
              {showOfferSign ? (
                <span className="package-offer-sign">{badgeText}</span>
              ) : null}
            </div>

            <div className="package-content">
              <div className="package-top">
                <div>
                  <span className="package-type">{item.type}</span>
                  <h3>{item.title}</h3>
                </div>
                <span className="package-price">{item.price}</span>
              </div>

              <p className="package-desc">{item.desc}</p>

              <div className="package-bottom">
                <span>{item.meta}</span>
                <button
                  type="button"
                  onClick={(event) => {
                    event.currentTarget.blur();
                    onSelectPackage(item);
                  }}
                  className="details-btn"
                >
                  Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
