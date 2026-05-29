import { fallbackDestinations } from "../data/homeContent";

const REST_COUNTRIES_URL = "https://restcountries.com/v3.1/all?fields=name,capital";

export async function fetchDestinationOptions(signal) {
  const response = await fetch(REST_COUNTRIES_URL, { signal });

  if (!response.ok) {
    throw new Error("Unable to load destinations");
  }

  const countries = await response.json();
  const apiDestinations = countries
    .flatMap((country) => {
      const countryName = country.name?.common;
      const capitalName = country.capital?.[0];

      return [
        countryName,
        capitalName && countryName ? `${capitalName}, ${countryName}` : null,
      ];
    })
    .filter(Boolean);

  return [...new Set([...fallbackDestinations, ...apiDestinations])].sort((a, b) =>
    a.localeCompare(b)
  );
}
