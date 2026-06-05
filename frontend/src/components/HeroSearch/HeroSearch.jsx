import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Church,
  Gem,
  HandHeart,
  Heart,
  Landmark,
  MapPin,
  Mountain,
  Palette,
  Search,
  Tags,
  Trees,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";
import GuestPicker from "../GuestPicker/GuestPicker";
import {
  buildCalendarDays,
  formatMonthTitle,
  formatTravelDate,
  getMonthStart,
  getTodayDate,
  parseDateValue,
} from "../../utils/travelSearch";
import { getDestinationDisplayParts } from "../../utils/destinationLabels";
import "./HeroSearch.css";

const tripTypeIcons = {
  Individual: UserRound,
  Family: UsersRound,
  Couple: Heart,
  Group: Users,
  Honeymoon: HandHeart,
  Religion: Church,
  Adventure: Mountain,
  Luxury: Gem,
  Cultural: Landmark,
};

const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function HeroSearch({
  searchForm,
  onSearchFormChange,
  destinationOptions,
  tripTypes = [],
  guestCounts,
  isGuestMenuOpen,
  onGuestMenuToggle,
  onGuestCountChange,
  onSearch,
}) {
  const initialCalendarDate = parseDateValue(searchForm.date) || parseDateValue(getTodayDate());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isTripTypeOpen, setIsTripTypeOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => getMonthStart(initialCalendarDate));
  const destinationFieldRef = useRef(null);
  const destinationInputRef = useRef(null);
  const dateFieldRef = useRef(null);
  const dateTriggerRef = useRef(null);
  const guestFieldRef = useRef(null);
  const tripTypeFieldRef = useRef(null);
  const tripTypeTriggerRef = useRef(null);
  const selectedTripType = searchForm.tripType || tripTypes[0] || "Select type";
  const SelectedTripTypeIcon = tripTypeIcons[selectedTripType] || Palette;
  const travelDateLabel = formatTravelDate(searchForm.date);
  const todayValue = getTodayDate();
  const calendarDays = buildCalendarDays(visibleMonth);
  const visibleMonthLabel = formatMonthTitle(visibleMonth);
  const filteredDestinations = useMemo(() => {
    const query = searchForm.destination.trim().toLowerCase();
    const matches = query
      ? destinationOptions.filter((destination) => destination.toLowerCase().includes(query))
      : destinationOptions;

    return matches.slice(0, 14);
  }, [destinationOptions, searchForm.destination]);

  const updateSearchForm = (field, value) => {
    onSearchFormChange({ ...searchForm, [field]: value });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  const focusDestination = () => {
    const destinationInput = destinationInputRef.current;

    if (!destinationInput) {
      return;
    }

    setIsDatePickerOpen(false);
    setIsTripTypeOpen(false);
    setIsDestinationOpen(true);
    destinationInput.focus({ preventScroll: true });
    destinationInput.select();
  };

  const selectDestination = (destination) => {
    updateSearchForm("destination", destination);
    setIsDestinationOpen(false);
    destinationInputRef.current?.focus({ preventScroll: true });
  };

  const openDatePicker = () => {
    const nextVisibleDate = parseDateValue(searchForm.date) || parseDateValue(todayValue);

    if (nextVisibleDate) {
      setVisibleMonth(getMonthStart(nextVisibleDate));
    }

    setIsDestinationOpen(false);
    setIsTripTypeOpen(false);
    setIsDatePickerOpen(true);
    dateTriggerRef.current?.focus({ preventScroll: true });
  };

  const selectTravelDate = (dateValue) => {
    updateSearchForm("date", dateValue);
    setIsDatePickerOpen(false);
    dateTriggerRef.current?.focus({ preventScroll: true });
  };

  const moveCalendarMonth = (change) => {
    setVisibleMonth((currentMonth) => {
      return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + change, 1);
    });
  };

  const selectToday = () => {
    const todayDate = parseDateValue(todayValue);

    if (todayDate) {
      setVisibleMonth(getMonthStart(todayDate));
    }

    selectTravelDate(todayValue);
  };

  const clearTravelDate = () => {
    updateSearchForm("date", "");
    setIsDatePickerOpen(false);
    dateTriggerRef.current?.focus({ preventScroll: true });
  };

  const focusTripType = () => {
    setIsDestinationOpen(false);
    setIsDatePickerOpen(false);
    setIsTripTypeOpen(true);
    tripTypeTriggerRef.current?.focus({ preventScroll: true });
  };

  const selectTripType = (tripType) => {
    updateSearchForm("tripType", tripType);
    setIsTripTypeOpen(false);
    tripTypeTriggerRef.current?.focus({ preventScroll: true });
  };

  const toggleGuestPicker = () => {
    setIsDestinationOpen(false);
    setIsDatePickerOpen(false);
    setIsTripTypeOpen(false);
    onGuestMenuToggle();
  };

  useEffect(() => {
    if (!isTripTypeOpen) {
      return undefined;
    }

    const closeOnOutsideClick = (event) => {
      if (!tripTypeFieldRef.current?.contains(event.target)) {
        setIsTripTypeOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsTripTypeOpen(false);
        tripTypeTriggerRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isTripTypeOpen]);

  useEffect(() => {
    if (!isDestinationOpen) {
      return undefined;
    }

    const closeOnOutsideClick = (event) => {
      if (!destinationFieldRef.current?.contains(event.target)) {
        setIsDestinationOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsDestinationOpen(false);
        destinationInputRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isDestinationOpen]);

  useEffect(() => {
    if (!isDatePickerOpen) {
      return undefined;
    }

    const closeOnOutsideClick = (event) => {
      if (!dateFieldRef.current?.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsDatePickerOpen(false);
        dateTriggerRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isDatePickerOpen]);

  useEffect(() => {
    if (!isGuestMenuOpen) {
      return undefined;
    }

    const closeOnOutsideClick = (event) => {
      if (!guestFieldRef.current?.contains(event.target)) {
        onGuestMenuToggle();
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        onGuestMenuToggle();
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isGuestMenuOpen, onGuestMenuToggle]);

  return (
    <form className="hero-search-box" onSubmit={handleSearchSubmit}>
      <div className="hero-search-grid">
        <div className="hero-search-item hero-search-where">
          <button
            type="button"
            className="hero-search-icon hero-search-icon-button"
            aria-label="Focus destination field"
            onClick={focusDestination}
          >
            <MapPin size={22} />
          </button>
          <div className="destination-field" ref={destinationFieldRef}>
            <p>Where to?</p>
            <input
              ref={destinationInputRef}
              aria-label="Destination"
              value={searchForm.destination}
              onChange={(event) => {
                updateSearchForm("destination", event.target.value);
                setIsDestinationOpen(true);
              }}
              onFocus={(event) => {
                event.target.select();
                setIsDatePickerOpen(false);
                setIsTripTypeOpen(false);
                setIsDestinationOpen(true);
              }}
              placeholder="Casablanca - Anywhere"
            />
            {isDestinationOpen ? (
              <div className="destination-menu" role="listbox" aria-label="Destination options">
                {filteredDestinations.length ? (
                  filteredDestinations.map((destination) => {
                    const destinationParts = getDestinationDisplayParts(destination);
                    const isSelected = searchForm.destination === destination;

                    return (
                      <button
                        key={destination}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={isSelected ? "destination-option active" : "destination-option"}
                        onClick={() => selectDestination(destination)}
                      >
                        <span className="destination-option-icon">
                          <Trees size={16} />
                        </span>
                        <span>
                          <strong>{destinationParts.primary}</strong>
                          <small>{destinationParts.details}</small>
                        </span>
                        <span className="destination-option-meta">
                          <span>{destinationParts.typeLabel}</span>
                          {isSelected ? <Check size={15} /> : null}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="destination-empty">No destination found</div>
                )}
              </div>
            ) : null}
          </div>
        </div>

        <div className="hero-search-item hero-search-date">
          <button
            type="button"
            className="hero-search-icon hero-search-icon-button"
            aria-label="Open travel date picker"
            onClick={openDatePicker}
          >
            <CalendarDays size={21} />
          </button>
          <div className="date-field" ref={dateFieldRef}>
            <p>When?</p>
            <button
              type="button"
              ref={dateTriggerRef}
              className="date-trigger"
              aria-haspopup="dialog"
              aria-expanded={isDatePickerOpen}
              onClick={() => {
                if (isDatePickerOpen) {
                  setIsDatePickerOpen(false);
                } else {
                  openDatePicker();
                }
              }}
            >
              <span>{travelDateLabel}</span>
              <ChevronDown size={15} />
            </button>

            {isDatePickerOpen ? (
              <div className="date-menu" role="dialog" aria-label="Choose travel date">
                <div className="date-menu-head">
                  <button type="button" aria-label="Previous month" onClick={() => moveCalendarMonth(-1)}>
                    <ChevronLeft size={18} />
                  </button>
                  <strong>{visibleMonthLabel}</strong>
                  <button type="button" aria-label="Next month" onClick={() => moveCalendarMonth(1)}>
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="date-weekdays" aria-hidden="true">
                  {weekdayLabels.map((weekday) => (
                    <span key={weekday}>{weekday}</span>
                  ))}
                </div>

                <div className="date-grid">
                  {calendarDays.map((day) => {
                    const isSelected = searchForm.date === day.value;
                    const isToday = todayValue === day.value;
                    const isPast = day.value < todayValue;
                    const classNames = [
                      "date-day",
                      day.isCurrentMonth ? "" : "muted",
                      isSelected ? "selected" : "",
                      isToday ? "today" : "",
                    ]
                      .filter(Boolean)
                      .join(" ");

                    return (
                      <button
                        key={day.value}
                        type="button"
                        className={classNames}
                        disabled={isPast}
                        aria-pressed={isSelected}
                        onClick={() => selectTravelDate(day.value)}
                      >
                        {day.date.getDate()}
                      </button>
                    );
                  })}
                </div>

                <div className="date-menu-actions">
                  <button type="button" onClick={clearTravelDate}>
                    Clear
                  </button>
                  <button type="button" onClick={selectToday}>
                    Today
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="hero-search-item hero-search-trip">
          <button
            type="button"
            className="hero-search-icon hero-search-icon-button"
            aria-label="Focus trip type field"
            onClick={focusTripType}
          >
            <Tags size={20} />
          </button>
          <div className="trip-type-field" ref={tripTypeFieldRef}>
            <p>Trip type</p>
            <button
              type="button"
              ref={tripTypeTriggerRef}
              className="trip-type-trigger"
              aria-haspopup="listbox"
              aria-expanded={isTripTypeOpen}
              onClick={() => setIsTripTypeOpen((isOpen) => !isOpen)}
            >
              <span>
                <SelectedTripTypeIcon size={15} />
                {selectedTripType}
              </span>
              <ChevronDown size={15} />
            </button>

            {isTripTypeOpen ? (
              <div className="trip-type-menu" role="listbox" aria-label="Trip type options">
                {tripTypes.map((tripType) => {
                  const isSelected = selectedTripType === tripType;
                  const TripTypeIcon = tripTypeIcons[tripType] || Tags;

                  return (
                    <button
                      key={tripType}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={isSelected ? "trip-type-option active" : "trip-type-option"}
                      onClick={() => selectTripType(tripType)}
                    >
                      <span>
                        <i className="trip-type-option-icon">
                          <TripTypeIcon size={15} />
                        </i>
                        {tripType}
                      </span>
                      {isSelected ? <Check size={15} /> : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <div className="hero-search-item hero-search-guests" ref={guestFieldRef}>
          <button
            type="button"
            className="hero-search-icon hero-search-icon-button"
            aria-label="Open travelers menu"
            onClick={toggleGuestPicker}
          >
            <Users size={21} />
          </button>
          <GuestPicker
            guestCounts={guestCounts}
            isOpen={isGuestMenuOpen}
            onToggle={toggleGuestPicker}
            onGuestCountChange={onGuestCountChange}
          />
        </div>

        <button type="submit" className="hero-search-btn">
          <Search size={18} />
          Search
        </button>
      </div>
    </form>
  );
}
