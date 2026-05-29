import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Bed,
  Bus,
  CalendarDays,
  Car,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Heart,
  MapPin,
  Mountain,
  Plane,
  Route,
  Send,
  Tags,
  Train,
  UsersRound,
} from "lucide-react";
import TripFilters from "../TripFilters/TripFilters";
import { formatTripPrice } from "../../utils/tripPricing";
import {
  buildCalendarDays,
  formatMonthTitle,
  formatTravelDate,
  getMonthStart,
  getTodayDate,
  parseDateValue,
} from "../../utils/travelSearch";

const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const tripTypeOptions = [
  { value: "Custom Trip", label: "Custom Trip", description: "Build your route", icon: Route },
  { value: "Luxury Trip", label: "Luxury Trip", description: "Premium hotels and comfort", icon: Tags },
  { value: "Family Trip", label: "Family Trip", description: "Easy flow for families", icon: UsersRound },
  { value: "Adventure Trip", label: "Adventure Trip", description: "Activities and movement", icon: Mountain },
  { value: "Honeymoon", label: "Honeymoon", description: "Romantic and calm", icon: Heart },
];

const mealPlanOptions = [
  { value: "Breakfast Included", label: "Breakfast Included", description: "Simple morning plan", icon: Coffee },
  { value: "Half Board", label: "Half Board", description: "Breakfast and dinner", icon: Coffee },
  { value: "Full Board", label: "Full Board", description: "All main meals", icon: Coffee },
  { value: "No Meal Plan", label: "No Meal Plan", description: "Keep meals flexible", icon: Coffee },
];

const hotelOptions = [
  { value: "3 Stars", label: "3 Stars", description: "Good budget comfort", icon: Bed },
  { value: "4 Stars", label: "4 Stars", description: "Balanced comfort", icon: Bed },
  { value: "5 Stars", label: "5 Stars", description: "Premium stay", icon: Bed },
  { value: "Luxury Riad", label: "Luxury Riad", description: "Local boutique stay", icon: Bed },
  { value: "Villa", label: "Villa", description: "Private group stay", icon: Bed },
];

const transportOptions = [
  { value: "Flight", label: "Flight", description: "Fast long-distance option", icon: Plane },
  { value: "Train", label: "Train", description: "Comfortable city transfer", icon: Train },
  { value: "Private Car", label: "Private Car", description: "Flexible door-to-door", icon: Car },
  { value: "Bus", label: "Bus", description: "Simple budget movement", icon: Bus },
];

function CustomSelect({
  name,
  label,
  value,
  placeholder,
  options,
  isOpen,
  onToggle,
  onSelect,
}) {
  const selectedOption = options.find((option) => option.value === value);
  const TriggerIcon = selectedOption?.icon || Tags;

  return (
    <div className={`trip-field trip-picker-field ${isOpen ? "trip-field-open" : ""}`} data-trip-picker>
      <label>{label}</label>
      <button
        type="button"
        className={`trip-select-trigger ${isOpen ? "active" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="trip-select-leading-icon">
          <TriggerIcon size={18} />
        </span>
        <span className="trip-select-copy">
          <strong>{selectedOption?.label || placeholder}</strong>
          <small>{selectedOption?.description || "Choose one option"}</small>
        </span>
        <ChevronDown size={18} />
      </button>

      {isOpen ? (
        <div className="trip-select-menu" role="listbox" aria-label={`${label} options`}>
          {options.map((option) => {
            const OptionIcon = option.icon || Tags;
            const isSelected = option.value === value;

            return (
              <button
                key={`${name}-${option.value}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={isSelected ? "trip-select-option active" : "trip-select-option"}
                onClick={() => onSelect(option.value)}
              >
                <span className="trip-select-option-icon">
                  <OptionIcon size={16} />
                </span>
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.description}</small>
                </span>
                {isSelected ? <Check size={15} /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function DatePickerField({
  name,
  label,
  value,
  visibleMonth,
  isOpen,
  todayValue,
  onOpen,
  onSelect,
  onClear,
  onToday,
  onMoveMonth,
}) {
  const days = buildCalendarDays(visibleMonth);
  const visibleMonthLabel = formatMonthTitle(visibleMonth);

  return (
    <div className={`trip-field trip-date-picker-field ${isOpen ? "trip-field-open" : ""}`} data-trip-picker>
      <label>{label}</label>
      <button
        type="button"
        className={`trip-date-trigger ${isOpen ? "active" : ""}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={onOpen}
      >
        <span className="trip-select-leading-icon">
          <CalendarDays size={18} />
        </span>
        <span className="trip-select-copy">
          <strong>{formatTravelDate(value)}</strong>
          <small>{value ? "Selected travel date" : "Choose a travel date"}</small>
        </span>
        <ChevronDown size={18} />
      </button>

      {isOpen ? (
        <div className="trip-date-menu" role="dialog" aria-label={`Choose ${label.toLowerCase()}`}>
          <div className="trip-date-menu-head">
            <button type="button" aria-label="Previous month" onClick={() => onMoveMonth(-1)}>
              <ChevronLeft size={18} />
            </button>
            <strong>{visibleMonthLabel}</strong>
            <button type="button" aria-label="Next month" onClick={() => onMoveMonth(1)}>
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="trip-date-weekdays" aria-hidden="true">
            {weekdayLabels.map((weekday) => (
              <span key={`${name}-${weekday}`}>{weekday}</span>
            ))}
          </div>

          <div className="trip-date-grid">
            {days.map((day) => {
              const isSelected = value === day.value;
              const isToday = todayValue === day.value;
              const isPast = day.value < todayValue;
              const classNames = [
                "trip-date-day",
                day.isCurrentMonth ? "" : "muted",
                isSelected ? "selected" : "",
                isToday ? "today" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <button
                  key={`${name}-${day.value}`}
                  type="button"
                  className={classNames}
                  disabled={isPast}
                  aria-pressed={isSelected}
                  onClick={() => onSelect(day.value)}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="trip-date-actions">
            <button type="button" onClick={onClear}>
              Clear
            </button>
            <button type="button" onClick={onToday}>
              Today
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function TripForm({
  form,
  extras,
  travelStyles,
  serviceOptions,
  destinationOptions = [],
  priceEstimate,
  inspirationItems,
  tripFilterGroups,
  onChange,
  onFilterChange,
  onToggleExtra,
  onTravelStyleChange,
  onDestinationPick,
  onSubmit,
}) {
  const todayValue = getTodayDate();
  const initialCalendarDate = parseDateValue(form.departureDate) || parseDateValue(todayValue) || new Date();
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [openPicker, setOpenPicker] = useState(null);
  const [visibleMonths, setVisibleMonths] = useState(() => ({
    departureDate: getMonthStart(initialCalendarDate),
    returnDate: getMonthStart(initialCalendarDate),
  }));
  const destinationFieldRef = useRef(null);

  const filteredDestinations = useMemo(() => {
    const query = form.destination.trim().toLowerCase();
    const matches = query
      ? destinationOptions.filter((destination) => destination.toLowerCase().includes(query))
      : destinationOptions;

    return matches.slice(0, 10);
  }, [destinationOptions, form.destination]);

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
    if (!openPicker) {
      return undefined;
    }

    const closeOnOutsideClick = (event) => {
      if (event.target instanceof Element && event.target.closest("[data-trip-picker]")) {
        return;
      }

      setOpenPicker(null);
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpenPicker(null);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [openPicker]);

  const updateField = (name, value) => {
    onChange({ target: { name, value } });
  };

  const handleDestinationChange = (event) => {
    onChange(event);
    setOpenPicker(null);
    setIsDestinationOpen(true);
  };

  const handleDestinationSelect = (destination) => {
    onDestinationPick(destination);
    setIsDestinationOpen(false);
  };

  const togglePicker = (name) => {
    setIsDestinationOpen(false);
    setOpenPicker((currentPicker) => (currentPicker === name ? null : name));
  };

  const selectPickerValue = (name, value) => {
    updateField(name, value);
    setOpenPicker(null);
  };

  const openDatePicker = (name) => {
    const nextVisibleDate = parseDateValue(form[name]) || parseDateValue(todayValue) || new Date();

    setIsDestinationOpen(false);
    setVisibleMonths((currentMonths) => ({
      ...currentMonths,
      [name]: getMonthStart(nextVisibleDate),
    }));
    setOpenPicker((currentPicker) => (currentPicker === name ? null : name));
  };

  const moveDateMonth = (name, change) => {
    setVisibleMonths((currentMonths) => ({
      ...currentMonths,
      [name]: new Date(
        currentMonths[name].getFullYear(),
        currentMonths[name].getMonth() + change,
        1
      ),
    }));
  };

  const selectDate = (name, dateValue) => {
    updateField(name, dateValue);
    setOpenPicker(null);
  };

  const clearDate = (name) => {
    updateField(name, "");
    setOpenPicker(null);
  };

  const selectToday = (name) => {
    const todayDate = parseDateValue(todayValue) || new Date();

    setVisibleMonths((currentMonths) => ({
      ...currentMonths,
      [name]: getMonthStart(todayDate),
    }));
    selectDate(name, todayValue);
  };

  const summaryItems = [
    ["Destination", form.destination || "Not selected"],
    ["Trip Type", form.tripType],
    ["Mood", form.tripMood],
    ["Budget Level", form.budgetLevel],
    ["Pace", form.pace],
    ["Stay", form.accommodation],
    ["Travel Style", form.travelStyle],
    ["Travelers", form.travelers],
    ["Meal Plan", form.mealPlan],
    ["Season", priceEstimate?.season?.label || "Auto"],
    ["Estimated Price", priceEstimate?.totalLabel || "Calculating"],
    ["Per Traveler", priceEstimate?.perTravelerLabel || "-"],
    ["Target Budget", form.budget || "Not set"],
    ["Extras", extras.length > 0 ? extras.join(", ") : "None"],
  ];

  return (
    <section className="trip-form-card">
      <div className="trip-steps">
        <div className="trip-step">
          <p>STEP 1</p>
          <h4>Trip Basics</h4>
        </div>
        <div className="trip-step">
          <p>STEP 2</p>
          <h4>Preferences</h4>
        </div>
        <div className="trip-step">
          <p>STEP 3</p>
          <h4>Extras</h4>
        </div>
        <div className="trip-step">
          <p>STEP 4</p>
          <h4>Submit Request</h4>
        </div>
      </div>

      <TripFilters
        filterGroups={tripFilterGroups}
        form={form}
        onFilterChange={onFilterChange}
      />

      <div className="trip-form-head">
        <div>
          <p className="trip-section-label">TRIP REQUEST</p>
          <h2>Plan your trip</h2>
        </div>
        <p className="trip-form-text">
          Choose destination, dates, travelers, and preferences. Agencies can
          reply with clear offers.
        </p>
      </div>

      <form onSubmit={onSubmit} className="trip-form-grid">
        <div
          className={`trip-field trip-destination-field ${
            isDestinationOpen ? "trip-field-open" : ""
          }`}
          ref={destinationFieldRef}
        >
          <label>Destination</label>
          <div className="trip-destination-control">
            <input
              type="text"
              name="destination"
              value={form.destination}
              onChange={handleDestinationChange}
              onFocus={() => {
                setOpenPicker(null);
                setIsDestinationOpen(true);
              }}
              placeholder="Example: Marrakech, Bali, Kyoto..."
              autoComplete="off"
              required
            />

            {isDestinationOpen ? (
              <div className="trip-destination-menu" role="listbox" aria-label="Destination options">
                {filteredDestinations.length ? (
                  filteredDestinations.map((destination) => {
                    const [primary, ...details] = destination.split(",");
                    const isSelected = form.destination === destination;

                    return (
                      <button
                        key={destination}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={isSelected ? "trip-destination-option active" : "trip-destination-option"}
                        onClick={() => handleDestinationSelect(destination)}
                      >
                        <span className="trip-destination-icon">
                          <MapPin size={15} />
                        </span>
                        <span>
                          <strong>{primary}</strong>
                          <small>{details.join(",").trim() || "Popular destination"}</small>
                        </span>
                        {isSelected ? <Check size={15} /> : null}
                      </button>
                    );
                  })
                ) : (
                  <div className="trip-destination-empty">No destination found</div>
                )}
              </div>
            ) : null}
          </div>
        </div>

        <CustomSelect
          name="tripType"
          label="Trip Type"
          value={form.tripType}
          placeholder="Select trip type"
          options={tripTypeOptions}
          isOpen={openPicker === "tripType"}
          onToggle={() => togglePicker("tripType")}
          onSelect={(value) => selectPickerValue("tripType", value)}
        />

        <DatePickerField
          name="departureDate"
          label="Departure Date"
          value={form.departureDate}
          visibleMonth={visibleMonths.departureDate}
          todayValue={todayValue}
          isOpen={openPicker === "departureDate"}
          onOpen={() => openDatePicker("departureDate")}
          onSelect={(dateValue) => selectDate("departureDate", dateValue)}
          onClear={() => clearDate("departureDate")}
          onToday={() => selectToday("departureDate")}
          onMoveMonth={(change) => moveDateMonth("departureDate", change)}
        />

        <DatePickerField
          name="returnDate"
          label="Return Date"
          value={form.returnDate}
          visibleMonth={visibleMonths.returnDate}
          todayValue={todayValue}
          isOpen={openPicker === "returnDate"}
          onOpen={() => openDatePicker("returnDate")}
          onSelect={(dateValue) => selectDate("returnDate", dateValue)}
          onClear={() => clearDate("returnDate")}
          onToday={() => selectToday("returnDate")}
          onMoveMonth={(change) => moveDateMonth("returnDate", change)}
        />

        <div className="trip-field">
          <label>Travelers</label>
          <input
            type="number"
            min="1"
            name="travelers"
            value={form.travelers}
            onChange={onChange}
          />
        </div>

        <div className="trip-field">
          <label>Budget (MAD)</label>
          <input
            type="text"
            name="budget"
            value={form.budget}
            onChange={onChange}
            placeholder="Example: 12000 MAD"
          />
        </div>

        <CustomSelect
          name="mealPlan"
          label="Meal Plan"
          value={form.mealPlan}
          placeholder="Select meal plan"
          options={mealPlanOptions}
          isOpen={openPicker === "mealPlan"}
          onToggle={() => togglePicker("mealPlan")}
          onSelect={(value) => selectPickerValue("mealPlan", value)}
        />

        <CustomSelect
          name="hotel"
          label="Hotel Preference"
          value={form.hotel}
          placeholder="Select hotel category"
          options={hotelOptions}
          isOpen={openPicker === "hotel"}
          onToggle={() => togglePicker("hotel")}
          onSelect={(value) => selectPickerValue("hotel", value)}
        />

        <CustomSelect
          name="transport"
          label="Transport Preference"
          value={form.transport}
          placeholder="Select transport type"
          options={transportOptions}
          isOpen={openPicker === "transport"}
          onToggle={() => togglePicker("transport")}
          onSelect={(value) => selectPickerValue("transport", value)}
        />

        <div className="trip-field trip-field-full">
          <label>Travel Style</label>
          <div className="trip-style-wrap">
            {travelStyles.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => onTravelStyleChange(style)}
                className={form.travelStyle === style ? "style-chip active" : "style-chip"}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div className="trip-field trip-field-full">
          <label>Extra Services</label>
          <div className="trip-services-grid">
            {serviceOptions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onToggleExtra(item)}
                className={extras.includes(item) ? "service-chip active" : "service-chip"}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="trip-double-block trip-field-full">
          <div className="trip-field">
            <label>Additional Details</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={onChange}
              placeholder="Describe your ideal trip, activities, food preferences, special requests, etc."
              rows="6"
            />
          </div>

          <div className="trip-info-box">
            <h3>Why agencies love clear briefs</h3>
            <div className="trip-info-list">
              <p>- Faster replies with better tailored offers</p>
              <p>- More accurate pricing based on your needs</p>
              <p>- Easier comparison between agencies</p>
              <p>- Better hotel and activity suggestions</p>
            </div>
          </div>
        </div>

        <div className="trip-double-block trip-field-full">
          <div className="trip-upload-box">
            <label>Optional inspiration image</label>
            <p>
              Upload a screenshot or travel inspiration image to help agencies
              understand your style.
            </p>
            <input type="file" accept="image/*" />
          </div>

          <div className="trip-budget-box trip-price-box">
            <div className="trip-price-head">
              <span>
                <Tags size={16} />
                Auto estimate
              </span>
              <strong>{priceEstimate?.season?.label || "Season auto"}</strong>
            </div>
            <h3>Trip price preview</h3>
            <p className="trip-price-total">{priceEstimate?.totalLabel || "Calculating"}</p>
            <p className="trip-price-meta">
              {priceEstimate?.perTravelerLabel || "-"} · {priceEstimate?.days || 1} day(s) ·{" "}
              {priceEstimate?.region || "Global"}
            </p>
            <div className="trip-budget-list">
              {(priceEstimate?.breakdown || []).map((item) => (
                <div className="trip-budget-item" key={item.label}>
                  <span>
                    {item.label}
                    <small>{item.detail}</small>
                  </span>
                  <strong>{formatTripPrice(item.value)} MAD</strong>
                </div>
              ))}
            </div>
            <p className="trip-price-note">
              This estimate updates automatically when destination, dates, travelers,
              trip type, hotel, transport, meals, or extras change.
            </p>
          </div>
        </div>

        <div className="trip-field trip-field-full">
          <label>Popular inspiration</label>
          <div className="trip-inspiration-grid">
            {inspirationItems.map((item) => (
              <button
                key={item.name}
                type="button"
                className="trip-inspiration-card"
                onClick={() => onDestinationPick(item.name)}
              >
                <img src={item.image} alt={item.name} />
                <div className="trip-inspiration-content">
                  <p>{item.name}</p>
                  <span>Click to use this destination</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="trip-summary trip-field-full">
          <div className="trip-summary-head">
            <span>
              <CheckCircle2 size={17} />
              Review
            </span>
            <h3>Trip summary</h3>
            <p>Check the main details before sending the request.</p>
          </div>
          <div className="trip-summary-grid">
            {summaryItems.map(([label, value]) => (
              <div key={label} className="trip-summary-item">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="trip-actions">
          <button type="submit" className="trip-submit-btn">
            <Send size={18} />
            Send request
          </button>
        </div>
      </form>
    </section>
  );
}
