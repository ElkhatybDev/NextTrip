import React from "react";
import "./PackageCard.css";

export default function PackageCard({ item, onViewDetails, onBookNow }) {
  return (
    <article className="shared-package-card">
      <div className="shared-package-image-wrap">
        <img src={item.image} alt={item.title} className="shared-package-image" />
        <div className="shared-package-category">{item.category}</div>
        <div className="shared-package-deal">{item.dealTag}</div>
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

        <div className="shared-package-agency">
          <span>Agency</span>
          <strong>{item.agency}</strong>
        </div>

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
            Book Now ->
          </button>
        </div>
      </div>
    </article>
  );
}
