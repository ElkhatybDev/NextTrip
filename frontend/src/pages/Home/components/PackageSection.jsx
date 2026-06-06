import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ExternalLink, MapPin, ShieldCheck, Star } from "lucide-react";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { getAgencyByName, getAgencySlug } from "../../../data/agencyCatalog";

function getAgencyInitials(name) {
  return String(name || "Agency")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

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
        {packages.map((item) => {
          const agencyProfile = getAgencyByName(item.agency);
          const agencyName = agencyProfile?.name || item.agency || "NextTrip agency";
          const agencyLocation = agencyProfile?.location || item.location || "NextTrip marketplace";
          const agencyRating = agencyProfile?.rating || item.rating || "4.8";
          const agencyProfilePath = `/agency/${agencyProfile?.id || getAgencySlug(agencyName)}`;

          return (
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

                <Link
                  to={agencyProfilePath}
                  className="home-package-agency-profile"
                  aria-label={`View ${agencyName} profile`}
                >
                  <span className="home-package-agency-avatar" aria-hidden="true">
                    {agencyProfile?.cover ? (
                      <img src={agencyProfile.cover} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <span>{getAgencyInitials(agencyName)}</span>
                    )}
                  </span>
                  <span className="home-package-agency-copy">
                    <span className="home-package-agency-label">
                      <ShieldCheck size={12} />
                      Agency profile
                    </span>
                    <strong>{agencyName}</strong>
                    <span className="home-package-agency-meta">
                      <span>
                        <Star size={12} />
                        {agencyRating}
                      </span>
                      <span>
                        <MapPin size={12} />
                        {agencyLocation}
                      </span>
                    </span>
                  </span>
                  <span className="home-package-agency-link" aria-hidden="true">
                    <ExternalLink size={15} />
                  </span>
                </Link>

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
          );
        })}
      </div>
    </section>
  );
}
