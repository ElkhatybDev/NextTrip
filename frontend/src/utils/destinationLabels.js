const EDGE_QUOTES_PATTERN = /^[`'\u2018\u2019"\u201c\u201d\s]+|[`'\u2018\u2019"\u201c\u201d\s]+$/g;

export function cleanDestinationText(value = "") {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .split(",")
    .map((part) => part.trim().replace(EDGE_QUOTES_PATTERN, "").replace(/\s+/g, " "))
    .filter(Boolean)
    .join(", ");
}

export function getDestinationDisplayParts(destination = "") {
  const parts = cleanDestinationText(destination).split(", ").filter(Boolean);
  const primary = parts[0] || cleanDestinationText(destination);
  const details = parts.slice(1).join(", ");

  return {
    primary,
    details: details || "Country destination",
    typeLabel: parts.length > 1 ? "City" : "Country",
  };
}
