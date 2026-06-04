import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, MapPin, Percent, ShieldCheck, Star } from "lucide-react";
import { getAgencyByName, getAgencySlug } from "../../data/agencyCatalog";
import "./PackageCard.css";

function getAgencyInitials(name) {
  return String(name || "Agency")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function PackageCard({
  item,
  onViewDetails,
  onBookNow,
  showOfferBadge = false,
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const agencyProfile = getAgencyByName(item.agency);
  const agencyName = agencyProfile?.name || item.agency;
  const agencyLocation = agencyProfile?.location || item.location;
  const agencyRating = agencyProfile?.rating || item.rating;
  const agencyProfilePath = `/agency/${agencyProfile?.id || getAgencySlug(agencyName)}`;

  return (
    <article
      className={`shared-package-card ${showOfferBadge ? "shared-package-card-offer" : ""}`}
    >
      <div className="shared-package-image-wrap">
        {item.image && !imageFailed ? (
          <img
            src={item.image}
            alt={item.title}
            className="shared-package-image"
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className="shared-package-image shared-package-image-fallback"
            role="img"
            aria-label={item.title}
          >
            <span>{item.category}</span>
            <strong>{item.title}</strong>
          </div>
        )}
        <div className="shared-package-category">{item.category}</div>
        <div className="shared-package-deal">{item.dealTag}</div>
        {showOfferBadge ? (
          <div className="shared-package-offer-badge">
            <Percent size={14} />
            <span>Offer</span>
          </div>
        ) : null}
      </div>

      <div className="shared-package-content">
        <div className="shared-package-top">
          <div>
            <h4>{item.title}</h4>
            <p className="shared-package-location">{item.location}</p>
          </div>

          <div className="shared-package-price">
            {item.price.toLocaleString()} MAD
          </div>
        </div>

        <p className="shared-package-description">{item.description}</p>

        <Link
          to={agencyProfilePath}
          className="shared-package-agency-profile"
          aria-label={`View ${agencyName} profile`}
        >
          <div className="shared-package-agency-avatar" aria-hidden="true">
            {agencyProfile?.cover ? (
              <img src={agencyProfile.cover} alt="" loading="lazy" decoding="async" />
            ) : (
              <span>{getAgencyInitials(agencyName)}</span>
            )}
          </div>
          <div className="shared-package-agency-copy">
            <span className="shared-package-agency-label">
              <ShieldCheck size={13} />
              Agency profile
            </span>
            <strong>{agencyName}</strong>
            <div className="shared-package-agency-meta">
              <span>
                <Star size={13} />
                {agencyRating}
              </span>
              <span>
                <MapPin size={13} />
                {agencyLocation}
              </span>
            </div>
          </div>
          <span className="shared-package-agency-link" aria-hidden="true">
            <ExternalLink size={16} />
          </span>
        </Link>

        <div className="shared-package-meta">
          <p>{item.duration}</p>
          <p>{item.groupSize}</p>
          <p>{"\u2605"} {item.rating}</p>
        </div>

        <div className="shared-package-actions">
          <button type="button" onClick={onViewDetails} className="shared-btn shared-btn-secondary">
            Details
          </button>
          <button type="button" onClick={onBookNow} className="shared-btn shared-btn-primary">
            Book now ->
          </button>
        </div>
      </div>
    </article>
  );
}
