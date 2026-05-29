const REST_COUNTRIES_PREFERENCES_URL =
  "https://restcountries.com/v3.1/all?fields=name,cca2,currencies,languages";

function countryCodeToFlag(countryCode) {
  if (!countryCode || countryCode.length !== 2) {
    return "";
  }

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((character) => 127397 + character.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}

function withFlag(item) {
  return {
    ...item,
    flag: countryCodeToFlag(item.countryCode),
  };
}

export const fallbackCurrencies = [
  {
    code: "MAD",
    label: "Moroccan dirham",
    symbol: "MAD",
    countryCode: "MA",
    country: "Morocco",
  },
  {
    code: "EUR",
    label: "Euro",
    symbol: "EUR",
    countryCode: "EU",
    country: "Europe",
  },
  {
    code: "USD",
    label: "United States dollar",
    symbol: "USD",
    countryCode: "US",
    country: "United States",
  },
  {
    code: "GBP",
    label: "British pound",
    symbol: "GBP",
    countryCode: "GB",
    country: "United Kingdom",
  },
].map(withFlag);

export const fallbackLanguages = [
  {
    code: "eng",
    short: "EN",
    label: "English",
    countryCode: "GB",
    country: "United Kingdom",
  },
  {
    code: "fra",
    short: "FR",
    label: "French",
    countryCode: "FR",
    country: "France",
  },
  {
    code: "ara",
    short: "AR",
    label: "Arabic",
    countryCode: "MA",
    country: "Morocco",
  },
  {
    code: "spa",
    short: "ES",
    label: "Spanish",
    countryCode: "ES",
    country: "Spain",
  },
].map(withFlag);

const preferredCurrencyOrder = ["MAD", "EUR", "USD", "GBP", "AED", "SAR", "JPY"];
const preferredLanguageOrder = ["eng", "fra", "ara", "spa", "deu", "ita", "por"];

const languageShortCodes = {
  ara: "AR",
  deu: "DE",
  eng: "EN",
  fra: "FR",
  ita: "IT",
  jpn: "JA",
  kor: "KO",
  por: "PT",
  spa: "ES",
  tur: "TR",
  zho: "ZH",
};

const preferredCurrencyMeta = {
  AED: { countryCode: "AE", country: "United Arab Emirates" },
  EUR: { countryCode: "EU", country: "Europe" },
  GBP: { countryCode: "GB", country: "United Kingdom" },
  JPY: { countryCode: "JP", country: "Japan" },
  MAD: { countryCode: "MA", country: "Morocco" },
  SAR: { countryCode: "SA", country: "Saudi Arabia" },
  USD: { countryCode: "US", country: "United States" },
};

const preferredLanguageMeta = {
  ara: { countryCode: "MA", country: "Morocco" },
  deu: { countryCode: "DE", country: "Germany" },
  eng: { countryCode: "GB", country: "United Kingdom" },
  fra: { countryCode: "FR", country: "France" },
  ita: { countryCode: "IT", country: "Italy" },
  jpn: { countryCode: "JP", country: "Japan" },
  kor: { countryCode: "KR", country: "South Korea" },
  por: { countryCode: "PT", country: "Portugal" },
  spa: { countryCode: "ES", country: "Spain" },
  tur: { countryCode: "TR", country: "Turkiye" },
  zho: { countryCode: "CN", country: "China" },
};

function sortWithPreferredOrder(items, preferredOrder) {
  return [...items].sort((first, second) => {
    const firstIndex = preferredOrder.indexOf(first.code);
    const secondIndex = preferredOrder.indexOf(second.code);

    if (firstIndex !== -1 || secondIndex !== -1) {
      return (firstIndex === -1 ? 999 : firstIndex) - (secondIndex === -1 ? 999 : secondIndex);
    }

    return first.label.localeCompare(second.label);
  });
}

function uniqueByCode(items) {
  return Array.from(
    items.reduce((map, item) => {
      if (!map.has(item.code)) {
        map.set(item.code, item);
      }

      return map;
    }, new Map()).values()
  );
}

export async function fetchTravelPreferences(signal) {
  const response = await fetch(REST_COUNTRIES_PREFERENCES_URL, { signal });

  if (!response.ok) {
    throw new Error("Unable to load travel preferences");
  }

  const countries = await response.json();

  const currencies = uniqueByCode(
    countries.flatMap((country) => {
      const countryName = country.name?.common || "";
      const countryCode = country.cca2 || "";

      return Object.entries(country.currencies || {}).map(([code, currency]) => {
        const preferredMeta = preferredCurrencyMeta[code] || {};
        const displayCountryCode = preferredMeta.countryCode || countryCode;

        return {
          code,
          label: currency?.name || code,
          symbol: currency?.symbol || code,
          countryCode: displayCountryCode,
          flag: countryCodeToFlag(displayCountryCode),
          country: preferredMeta.country || countryName,
        };
      });
    })
  );

  const languages = uniqueByCode(
    countries.flatMap((country) => {
      const countryName = country.name?.common || "";
      const countryCode = country.cca2 || "";

      return Object.entries(country.languages || {}).map(([code, label]) => {
        const preferredMeta = preferredLanguageMeta[code] || {};
        const displayCountryCode = preferredMeta.countryCode || countryCode;

        return {
          code,
          short: languageShortCodes[code] || code.slice(0, 2).toUpperCase(),
          label,
          countryCode: displayCountryCode,
          flag: countryCodeToFlag(displayCountryCode),
          country: preferredMeta.country || countryName,
        };
      });
    })
  );

  return {
    currencies: sortWithPreferredOrder(currencies, preferredCurrencyOrder),
    languages: sortWithPreferredOrder(languages, preferredLanguageOrder),
  };
}
