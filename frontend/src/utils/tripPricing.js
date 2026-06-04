import { getSavedLanguageCode } from "../i18n/siteLanguage";

const DEFAULT_TRIP_DAYS = 4;
const languageLocales = {
  eng: "en",
  fra: "fr",
  ara: "ar",
};

function getCurrentPriceLocale() {
  const code = typeof window === "undefined" ? "eng" : getSavedLanguageCode();

  return languageLocales[code] || languageLocales.eng;
}

const budgetDailyRates = {
  Smart: 850,
  Comfort: 1250,
  Premium: 1900,
  Luxury: 2900,
};

const tripTypeMultipliers = {
  "Custom Trip": 1,
  "Luxury Trip": 1.35,
  "Family Trip": 1.12,
  "Adventure Trip": 1.18,
  Honeymoon: 1.22,
};

const hotelDailyRates = {
  "3 Stars": 250,
  "4 Stars": 450,
  "5 Stars": 800,
  "Luxury Riad": 700,
  Villa: 950,
};

const transportRates = {
  Flight: 2400,
  Train: 450,
  "Private Car": 1200,
  Bus: 250,
};

const mealDailyRates = {
  "Breakfast Included": 120,
  "Half Board": 260,
  "Full Board": 420,
  "No Meal Plan": 0,
};

const extraRates = {
  "Airport Transfer": 350,
  "Local Guide": 650,
  Excursions: 900,
  "Travel Insurance": 300,
  "Visa Support": 450,
  "Restaurant Booking": 180,
};

const paceMultipliers = {
  Relaxed: 0.95,
  Balanced: 1,
  "Full Program": 1.16,
};

const accommodationMultipliers = {
  Hotel: 1,
  Riad: 1.08,
  Villa: 1.2,
  Resort: 1.18,
  Apartment: 0.9,
};

const regionMultipliers = {
  "Destination pending": 1,
  Morocco: 1,
  Africa: 1.08,
  Europe: 1.35,
  Asia: 1.25,
  Global: 1.18,
};

const africaDestinations = [
  "cairo",
  "zanzibar",
  "tanzania",
  "egypt",
  "ghana",
  "kenya",
  "senegal",
  "south africa",
  "tunisia",
];

const europeDestinations = [
  "paris",
  "france",
  "rome",
  "italy",
  "barcelona",
  "spain",
  "santorini",
  "greece",
  "istanbul",
  "turkiye",
  "turkey",
  "lisbon",
  "london",
  "amsterdam",
];

const asiaDestinations = [
  "kyoto",
  "japan",
  "dubai",
  "emirates",
  "bali",
  "indonesia",
  "thailand",
  "malaysia",
  "china",
  "korea",
  "saudi",
];

function parseDate(dateValue) {
  if (!dateValue) {
    return null;
  }

  const [year, month, day] = dateValue.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function getTripDays(departureDate, returnDate) {
  const departure = parseDate(departureDate);
  const arrival = parseDate(returnDate);

  if (!departure || !arrival || arrival <= departure) {
    return DEFAULT_TRIP_DAYS;
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.max(1, Math.round((arrival - departure) / millisecondsPerDay));
}

function getSeason(dateValue) {
  const date = parseDate(dateValue);

  if (!date) {
    return {
      key: "pending",
      label: "Choose dates",
      multiplier: 1,
      note: "Select a departure date to apply the right season price.",
    };
  }

  const month = date.getMonth() + 1;

  if ([7, 8, 12].includes(month)) {
    return {
      key: "peak",
      label: "Peak season",
      multiplier: 1.28,
      note: "July, August, and December usually cost more.",
    };
  }

  if ([4, 5, 6, 9, 10].includes(month)) {
    return {
      key: "high",
      label: "High season",
      multiplier: 1.15,
      note: "Good weather months with stronger demand.",
    };
  }

  if ([3, 11].includes(month)) {
    return {
      key: "shoulder",
      label: "Shoulder season",
      multiplier: 1,
      note: "Balanced season with better value.",
    };
  }

  return {
    key: "low",
    label: "Low season",
    multiplier: 0.88,
    note: "Usually calmer dates with lower prices.",
  };
}

function getDestinationRegion(destination) {
  if (!destination.trim()) {
    return "Destination pending";
  }

  const value = destination.toLowerCase();

  if (["morocco", "marrakech", "casablanca", "chefchaouen", "rabat", "agadir", "fes"].some((item) => value.includes(item))) {
    return "Morocco";
  }

  if (africaDestinations.some((item) => value.includes(item))) {
    return "Africa";
  }

  if (europeDestinations.some((item) => value.includes(item))) {
    return "Europe";
  }

  if (asiaDestinations.some((item) => value.includes(item))) {
    return "Asia";
  }

  return "Global";
}

function roundToNearest(value, step = 50) {
  const roundedValue = Math.round(value / step) * step;

  return Object.is(roundedValue, -0) ? 0 : roundedValue;
}

export function formatTripPrice(value) {
  return new Intl.NumberFormat(getCurrentPriceLocale(), {
    maximumFractionDigits: 0,
  }).format(value);
}

export function calculateTripPrice(form, extras = []) {
  const travelers = Math.max(1, Number.parseInt(form.travelers, 10) || 1);
  const days = getTripDays(form.departureDate, form.returnDate);
  const season = getSeason(form.departureDate);
  const region = getDestinationRegion(form.destination || "");
  const regionMultiplier = regionMultipliers[region] || regionMultipliers.Global;
  const budgetRate = budgetDailyRates[form.budgetLevel] || budgetDailyRates.Comfort;
  const tripTypeMultiplier = tripTypeMultipliers[form.tripType] || 1;
  const paceMultiplier = paceMultipliers[form.pace] || 1;
  const accommodationMultiplier = accommodationMultipliers[form.accommodation] || 1;

  const baseStay = budgetRate * travelers * days;
  const hotel = (hotelDailyRates[form.hotel] || 0) * travelers * days;
  const meal = (mealDailyRates[form.mealPlan] || 0) * travelers * days;
  const transport = (transportRates[form.transport] || 0) * travelers;
  const services = extras.reduce((total, item) => total + (extraRates[item] || 250), 0) * travelers;
  const subtotal = baseStay + hotel + meal + transport + services;
  const multiplier = season.multiplier * regionMultiplier * tripTypeMultiplier * paceMultiplier * accommodationMultiplier;
  const total = roundToNearest(subtotal * multiplier);
  const perTraveler = roundToNearest(total / travelers);

  return {
    total,
    totalLabel: `${formatTripPrice(total)} MAD`,
    perTraveler,
    perTravelerLabel: `${formatTripPrice(perTraveler)} MAD / traveler`,
    travelers,
    days,
    region,
    season,
    multiplier,
    breakdown: [
      { label: "Base stay", value: roundToNearest(baseStay), detail: `${days} day(s) x ${travelers} traveler(s)` },
      { label: "Hotel", value: roundToNearest(hotel), detail: form.hotel || "No hotel category selected" },
      { label: "Meals", value: roundToNearest(meal), detail: form.mealPlan || "No meal plan" },
      { label: "Transport", value: roundToNearest(transport), detail: form.transport || "No transport selected" },
      { label: "Extra services", value: roundToNearest(services), detail: extras.length ? extras.join(", ") : "No extras" },
      { label: "Season and route", value: roundToNearest(total - subtotal), detail: `${season.label} | ${region}` },
    ],
  };
}
