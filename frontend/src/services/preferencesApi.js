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

function svgToDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const languageLogos = {
  eng: svgToDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><rect width="24" height="16" fill="#012169"/><path d="M0 0l24 16M24 0L0 16" stroke="#fff" stroke-width="4"/><path d="M0 0l24 16M24 0L0 16" stroke="#c8102e" stroke-width="2"/><path d="M12 0v16M0 8h24" stroke="#fff" stroke-width="6"/><path d="M12 0v16M0 8h24" stroke="#c8102e" stroke-width="3.2"/></svg>'
  ),
  fra: svgToDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><rect width="8" height="16" fill="#002395"/><rect x="8" width="8" height="16" fill="#fff"/><rect x="16" width="8" height="16" fill="#ed2939"/></svg>'
  ),
  ara: svgToDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><rect width="24" height="16" fill="#c1272d"/><path d="M12 3.2l1.08 3.32h3.49l-2.82 2.05 1.08 3.32L12 9.84l-2.83 2.05 1.08-3.32-2.82-2.05h3.49z" fill="none" stroke="#006233" stroke-width="1.1" stroke-linejoin="round"/></svg>'
  ),
};

const currencyLogos = {
  GBP: languageLogos.eng,
  USD: svgToDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><rect width="24" height="16" fill="#b22234"/><path d="M0 2h24M0 4.5h24M0 7h24M0 9.5h24M0 12h24M0 14.5h24" stroke="#fff" stroke-width="1.15"/><rect width="10.6" height="8.6" fill="#3c3b6e"/><g fill="#fff"><circle cx="1.5" cy="1.3" r=".35"/><circle cx="3.2" cy="1.3" r=".35"/><circle cx="4.9" cy="1.3" r=".35"/><circle cx="6.6" cy="1.3" r=".35"/><circle cx="8.3" cy="1.3" r=".35"/><circle cx="2.35" cy="2.65" r=".35"/><circle cx="4.05" cy="2.65" r=".35"/><circle cx="5.75" cy="2.65" r=".35"/><circle cx="7.45" cy="2.65" r=".35"/><circle cx="1.5" cy="4" r=".35"/><circle cx="3.2" cy="4" r=".35"/><circle cx="4.9" cy="4" r=".35"/><circle cx="6.6" cy="4" r=".35"/><circle cx="8.3" cy="4" r=".35"/><circle cx="2.35" cy="5.35" r=".35"/><circle cx="4.05" cy="5.35" r=".35"/><circle cx="5.75" cy="5.35" r=".35"/><circle cx="7.45" cy="5.35" r=".35"/><circle cx="1.5" cy="6.7" r=".35"/><circle cx="3.2" cy="6.7" r=".35"/><circle cx="4.9" cy="6.7" r=".35"/><circle cx="6.6" cy="6.7" r=".35"/><circle cx="8.3" cy="6.7" r=".35"/></g></svg>'
  ),
  EUR: svgToDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><rect width="24" height="16" fill="#003399"/><g fill="#ffcc00"><circle cx="12" cy="3" r=".55"/><circle cx="14.5" cy="3.65" r=".55"/><circle cx="16.35" cy="5.5" r=".55"/><circle cx="17" cy="8" r=".55"/><circle cx="16.35" cy="10.5" r=".55"/><circle cx="14.5" cy="12.35" r=".55"/><circle cx="12" cy="13" r=".55"/><circle cx="9.5" cy="12.35" r=".55"/><circle cx="7.65" cy="10.5" r=".55"/><circle cx="7" cy="8" r=".55"/><circle cx="7.65" cy="5.5" r=".55"/><circle cx="9.5" cy="3.65" r=".55"/></g></svg>'
  ),
  MAD: languageLogos.ara,
};

function withFlag(item) {
  return {
    ...item,
    flag: countryCodeToFlag(item.countryCode),
  };
}

export const fallbackCurrencies = [
  {
    code: "GBP",
    label: "British pound",
    symbol: "GBP",
    countryCode: "GB",
    country: "United Kingdom",
    logo: currencyLogos.GBP,
  },
  {
    code: "USD",
    label: "United States dollar",
    symbol: "USD",
    countryCode: "US",
    country: "United States",
    logo: currencyLogos.USD,
  },
  {
    code: "EUR",
    label: "Euro",
    symbol: "EUR",
    countryCode: "EU",
    country: "Europe",
    logo: currencyLogos.EUR,
  },
  {
    code: "MAD",
    label: "Moroccan dirham",
    symbol: "MAD",
    countryCode: "MA",
    country: "Morocco",
    logo: currencyLogos.MAD,
  },
].map(withFlag);

export const fallbackLanguages = [
  {
    code: "eng",
    short: "EN",
    label: "English",
    countryCode: "GB",
    country: "United Kingdom",
    logo: languageLogos.eng,
  },
  {
    code: "fra",
    short: "FR",
    label: "French",
    countryCode: "FR",
    country: "France",
    logo: languageLogos.fra,
  },
  {
    code: "ara",
    short: "AR",
    label: "Arabic",
    countryCode: "MA",
    country: "Morocco",
    logo: languageLogos.ara,
  },
].map(withFlag);

export async function fetchTravelPreferences() {
  return {
    currencies: fallbackCurrencies,
    languages: fallbackLanguages,
  };
}
