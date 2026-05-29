import React, { useEffect, useRef } from "react";
import { Baby, Minus, PawPrint, Plus, UserRound, UsersRound } from "lucide-react";
import { guestTypes } from "../../data/homeContent";
import { formatGuestSummary } from "../../utils/travelSearch";
import "./GuestPicker.css";

const guestIcons = {
  adults: UserRound,
  children: UsersRound,
  infants: Baby,
  pets: PawPrint,
};

export default function GuestPicker({
  guestCounts,
  isOpen,
  onToggle,
  onClose,
  onGuestCountChange,
}) {
  const guestPickerRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !onClose) {
      return undefined;
    }

    const closeOnOutsideClick = (event) => {
      if (!guestPickerRef.current?.contains(event.target)) {
        onClose();
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div className="guest-picker" ref={guestPickerRef}>
      <p>Travelers</p>
      <button type="button" className="guest-trigger" aria-expanded={isOpen} onClick={onToggle}>
        <span>{formatGuestSummary(guestCounts)}</span>
        <UsersRound size={15} />
      </button>

      {isOpen ? (
        <div className="guest-menu">
          {guestTypes.map((guestType) => {
            const count = guestCounts[guestType.key];
            const GuestIcon = guestIcons[guestType.key] || UserRound;

            return (
              <div key={guestType.key} className="guest-row">
                <div className="guest-info">
                  <span className="guest-icon">
                    <GuestIcon size={17} />
                  </span>
                  <div>
                    <h3>{guestType.title}</h3>
                    <span>{guestType.subtitle}</span>
                  </div>
                </div>

                <div className="guest-controls">
                  <button
                    type="button"
                    aria-label={`Remove ${guestType.title}`}
                    disabled={count === 0}
                    onClick={() => onGuestCountChange(guestType.key, -1)}
                  >
                    <Minus size={16} />
                  </button>
                  <strong>{count}</strong>
                  <button
                    type="button"
                    aria-label={`Add ${guestType.title}`}
                    onClick={() => onGuestCountChange(guestType.key, 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
