import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function PackageModal({ packageItem, onClose, onBook, onContact }) {
  useEffect(() => {
    if (!packageItem) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, packageItem]);

  if (!packageItem) {
    return null;
  }

  return createPortal(
    <div className="package-modal-overlay" onClick={onClose}>
      <div
        className="package-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="package-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="package-modal-image-wrap">
          <img
            src={packageItem.image}
            alt={packageItem.title}
            className="package-modal-image"
          />
          <button type="button" className="package-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="package-modal-content">
          <div className="package-modal-top">
            <div>
              <span className="package-modal-tag">{packageItem.tag}</span>
              <h3 id="package-modal-title">{packageItem.title}</h3>
              <p>{packageItem.meta}</p>
            </div>
            <div className="package-modal-price-box">
              <span>Starting from</span>
              <strong>{packageItem.price}</strong>
            </div>
          </div>

          <p className="package-modal-details">{packageItem.details}</p>

          <div className="package-modal-actions">
            <button type="button" className="book-btn" onClick={onBook}>
              Book this package
            </button>
            <button type="button" className="contact-btn" onClick={onContact}>
              Contact agency
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
