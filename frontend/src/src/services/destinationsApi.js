import { fallbackDestinations } from "../data/homeContent";
import { cleanDestinationText } from "../utils/destinationLabels";

const REST_COUNTRIES_URL = "https://restcountries.com/v3.1/all?fields=name,capital";
const COUNTRIES_NOW_URL = "https://countriesnow.space/api/v0.1/countries";

function uniqueSortedDestinations(destinations) {
  return [...new Set(destinations.filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );
}

function normalizeDestinationName(name) {
  return cleanDestinationText(name);
}

function formatCityDestination(city, country) {
  const cityName = normalizeDestinationName(city);
  const countryName = normalizeDestinationName(country);

  if (!cityName || !countryName) {
    return "";
  }

  return cityName.toLowerCase() === countryName.toLowerCase()
    ? countryName
    : `${cityName}, ${countryName}`;
}

async function fetchCountryAndCityOptions(signal) {
  const response = await fetch(COUNTRIES_NOW_URL, { signal });

  if (!response.ok) {
    throw new Error("Unable to load country and city destinations");
  }

  const payload = await response.json();

  if (payload.error || !Array.isArray(payload.data)) {
    throw new Error(payload.msg || "Invalid country and city destination data");
  }

  return payload.data.flatMap((item) => {
    const countryName = normalizeDestinationName(item.country);
    const cities = Array.isArray(item.cities) ? item.cities : [];

    return [
      countryName,
      ...cities.map((city) => formatCityDestination(city, countryName)),
    ];
  });
}

async function fetchRestCountryOptions(signal) {
  const response = await fetch(REST_COUNTRIES_URL, { signal });

  if (!response.ok) {
    throw new Error("Unable to load destinations");
  }

  const countries = await response.json();
  return countries.flatMap((country) => {
    const countryName = normalizeDestinationName(country.name?.common);
    const capitalName = normalizeDestinationName(country.capital?.[0]);

    return [
      countryName,
      capitalName && countryName ? `${capitalName}, ${countryName}` : null,
    ];
  });
}

export async function fetchDestinationOptions(signal) {
  try {
    const cityDestinations = await fetchCountryAndCityOptions(signal);

    return uniqueSortedDestinations([...fallbackDestinations, ...cityDestinations]);
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }

    const countryDestinations = await fetchRestCountryOptions(signal);

    return uniqueSortedDestinations([...fallbackDestinations, ...countryDestinations]);
  }
}
