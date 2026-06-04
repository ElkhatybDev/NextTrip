import { agencyCatalog } from "./agencyCatalog";
import { destinationCities } from "./destinationsContent";
import { packageCatalog, offerCatalog } from "./packageCatalog";
import { initialExperiencePosts } from "./travelExperienceContent";
import { bookingRecords, profileOverview, tripRequests } from "./userWorkspaceContent";

export const adminNavItems = [
  { key: "overview", label: "Overview" },
  { key: "agencies", label: "Agencies" },
  { key: "requests", label: "Trip requests" },
  { key: "offers", label: "Offers" },
  { key: "payments", label: "Payments" },
  { key: "support", label: "Support" },
];

export const adminSummary = {
  name: "NextTrip Admin",
  role: "Platform operations",
  email: "admin@nexttrip.com",
  region: `${destinationCities.length} destinations tracked`,
  status: "Platform healthy",
};

const numberFormatter = new Intl.NumberFormat("en-US");
const moneyFormatter = new Intl.NumberFormat("en-US");

const formatMad = (value) => `${moneyFormatter.format(Math.round(value))} MAD`;
const formatShortMad = (value) =>
  value >= 1000 ? `${Math.round(value / 1000)}k MAD` : formatMad(value);

const clean = (value) => String(value || "").trim();
const normalize = (value) => clean(value).toLowerCase();
const cityFromLocation = (location) => clean(location).split(",")[0] || "Marketplace";
const parseBudget = (value) => Number(clean(value).replace(/[^\d]/g, "")) || 0;

const countBy = (items, getKey) =>
  items.reduce((counts, item) => {
    const key = clean(getKey(item)) || "Other";
    counts.set(key, (counts.get(key) || 0) + 1);
    return counts;
  }, new Map());

const percent = (value, total) => {
  if (!total) {
    return "0%";
  }

  return `${Math.round((value / total) * 100)}%`;
};

const allCatalogItems = [
  ...packageCatalog.map((item) => ({ ...item, catalogType: "Package" })),
  ...offerCatalog.map((item) => ({ ...item, catalogType: "Offer" })),
];

const catalogByBooking = (booking) =>
  allCatalogItems.find(
    (item) => item.id === booking.packageId || normalize(item.title) === normalize(booking.title)
  ) || null;

const matchesRequest = (request, item) => {
  const requestText = normalize(`${request.destination} ${request.mood} ${request.notes}`);
  const city = normalize(cityFromLocation(item.location));
  const category = normalize(item.category);

  return requestText.includes(city) || requestText.includes(category);
};

const agencyNames = Array.from(
  new Set([
    ...agencyCatalog.map((agency) => agency.name),
    ...allCatalogItems.map((item) => item.agency),
  ])
).filter(Boolean);

export const agencyRows = agencyNames.map((name) => {
  const profile = agencyCatalog.find((agency) => agency.name === name);
  const agencyPackages = allCatalogItems.filter((item) => item.agency === name);
  const agencyBookings = bookingRecords.filter((booking) => {
    const bookedPackage = catalogByBooking(booking);
    return bookedPackage?.agency === name;
  });
  const requestMatches = tripRequests.filter((request) =>
    agencyPackages.some((item) => matchesRequest(request, item))
  );
  const ratingSource = profile?.rating || agencyPackages[0]?.rating || 4.6;
  const status = profile?.verified ? "Verified" : agencyPackages.length > 1 ? "Listed" : "Review";

  return {
    id: profile?.id || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    location: profile?.location || agencyPackages[0]?.location || "Marketplace",
    status,
    packages: agencyPackages.length,
    requests: requestMatches.length,
    rating: Number(ratingSource).toFixed(1),
    revenue: agencyBookings.reduce((sum, booking) => sum + booking.total, 0),
    responseTime: profile?.responseTime || "Profile sourced from marketplace packages",
    specialties: profile?.specialties || Array.from(new Set(agencyPackages.map((item) => item.category))),
  };
});

const verifiedAgencies = agencyRows.filter((agency) => agency.status === "Verified").length;
const listedAgencies = agencyRows.filter((agency) => agency.status === "Listed").length;
const reviewAgencies = agencyRows.length - verifiedAgencies - listedAgencies;
const openRequestCount = tripRequests.length;
const waitingRequestCount = tripRequests.filter((request) =>
  normalize(request.status).includes("review")
).length;
const matchedRequestCount = tripRequests.filter((request) =>
  normalize(request.status).includes("offer")
).length;
const highBudgetRequests = tripRequests.filter((request) => parseBudget(request.budget) >= 20000)
  .length;
const paidBookings = bookingRecords.filter((booking) => booking.paymentStatus === "Paid");
const paymentReviewRows = bookingRecords.filter((booking) => booking.paymentStatus !== "Paid");
const grossBookingValue = bookingRecords.reduce((sum, booking) => sum + booking.total, 0);
const paidBookingValue = paidBookings.reduce((sum, booking) => sum + booking.total, 0);
const platformPayoutEstimate = paidBookingValue * 0.82;
const liveOfferCount = offerCatalog.length;
const marketplaceItemCount = allCatalogItems.length;
const realPhotoCount = allCatalogItems.filter((item) => item.image).length;
const pricedItemCount = allCatalogItems.filter((item) => item.price && item.duration).length;
const totalComments = initialExperiencePosts.reduce(
  (sum, post) => sum + (post.comments?.length || 0),
  0
);

export const platformStats = [
  {
    label: "Agency partners",
    value: numberFormatter.format(agencyRows.length),
    note: `${verifiedAgencies} verified, ${listedAgencies} listed from marketplace data`,
    tone: "blue",
  },
  {
    label: "Traveler requests",
    value: numberFormatter.format(openRequestCount),
    note: `${waitingRequestCount} waiting for agency review`,
    tone: "orange",
  },
  {
    label: "Packages and offers",
    value: numberFormatter.format(marketplaceItemCount),
    note: `${packageCatalog.length} packages + ${liveOfferCount} offer deals`,
    tone: "green",
  },
  {
    label: "Tracked booking value",
    value: formatShortMad(grossBookingValue),
    note: `${bookingRecords.length} booking records from the traveler workspace`,
    tone: "purple",
  },
];

export const pageStats = {
  overview: platformStats,
  agencies: [
    {
      label: "Verified agencies",
      value: numberFormatter.format(verifiedAgencies),
      note: `${percent(verifiedAgencies, agencyRows.length)} of agency partners`,
      tone: "green",
    },
    {
      label: "Listed agencies",
      value: numberFormatter.format(listedAgencies),
      note: "Sourced from package and offer ownership",
      tone: "blue",
    },
    {
      label: "Need admin review",
      value: numberFormatter.format(reviewAgencies),
      note: "Profiles with only one marketplace item",
      tone: "orange",
    },
    {
      label: "Package ownership",
      value: numberFormatter.format(marketplaceItemCount),
      note: "Every live marketplace item has an agency name",
      tone: "purple",
    },
  ],
  requests: [
    {
      label: "Open trip requests",
      value: numberFormatter.format(openRequestCount),
      note: "Custom requests from traveler workspace",
      tone: "blue",
    },
    {
      label: "Need agency offers",
      value: numberFormatter.format(waitingRequestCount),
      note: "Requests still in agency review",
      tone: "orange",
    },
    {
      label: "Offer ready",
      value: numberFormatter.format(matchedRequestCount),
      note: "Travelers can compare agency replies",
      tone: "green",
    },
    {
      label: "High budget requests",
      value: numberFormatter.format(highBudgetRequests),
      note: "Budgets at or above 20k MAD",
      tone: "purple",
    },
  ],
  offers: [
    {
      label: "Marketplace items",
      value: numberFormatter.format(marketplaceItemCount),
      note: "Packages and offer deals combined",
      tone: "blue",
    },
    {
      label: "Offer deals",
      value: numberFormatter.format(liveOfferCount),
      note: "Cards from offerCatalog",
      tone: "orange",
    },
    {
      label: "Real media coverage",
      value: percent(realPhotoCount, marketplaceItemCount),
      note: "Items with destination images",
      tone: "green",
    },
    {
      label: "Agency coverage",
      value: numberFormatter.format(agencyRows.length),
      note: "Unique agency names in marketplace data",
      tone: "purple",
    },
  ],
  payments: [
    {
      label: "Gross booking value",
      value: formatShortMad(grossBookingValue),
      note: "Total value in traveler bookings",
      tone: "green",
    },
    {
      label: "Paid bookings",
      value: formatShortMad(paidBookingValue),
      note: `${paidBookings.length} confirmed paid record`,
      tone: "blue",
    },
    {
      label: "Payment reviews",
      value: numberFormatter.format(paymentReviewRows.length),
      note: "Deposit or checkout still pending",
      tone: "orange",
    },
    {
      label: "Payment success",
      value: percent(paidBookings.length, bookingRecords.length),
      note: "Paid records versus all booking records",
      tone: "purple",
    },
  ],
  support: [
    {
      label: "Support items",
      value: numberFormatter.format(openRequestCount + paymentReviewRows.length + totalComments),
      note: "Requests, payment reviews, and community replies",
      tone: "orange",
    },
    {
      label: "Traveler comments",
      value: numberFormatter.format(totalComments),
      note: "Comments from experience posts",
      tone: "green",
    },
    {
      label: "Booking follow-ups",
      value: numberFormatter.format(paymentReviewRows.length),
      note: "Workspace bookings that need next action",
      tone: "blue",
    },
    {
      label: "Agency reviews",
      value: numberFormatter.format(reviewAgencies + listedAgencies),
      note: "Profiles not verified in agencyCatalog",
      tone: "purple",
    },
  ],
};

export const adminAlerts = [
  {
    title: `${reviewAgencies + listedAgencies} agencies need admin profile review`,
    detail: "These agency names exist in marketplace packages or offers but are not fully verified in agencyCatalog.",
    status: "Action needed",
    target: "agencies",
  },
  {
    title: `${waitingRequestCount} traveler request waiting for agency offers`,
    detail: "Route open requests to agencies that already sell matching destinations or categories.",
    status: "High priority",
    target: "requests",
  },
  {
    title: `${paymentReviewRows.length} booking payment follow-up item`,
    detail: "Review deposits and unfinished checkout records from the traveler workspace.",
    status: "Finance",
    target: "payments",
  },
];

export const pageHeaders = {
  overview: {
    eyebrow: "Platform data",
    title: "Control the NextTrip platform from one place.",
    description:
      "This admin view is filled from the current site catalogs, traveler requests, booking records, destinations, agencies, and experience activity.",
    search: "Search agencies, requests, offers, payments...",
  },
  agencies: {
    eyebrow: "Agency operations",
    title: "Manage every agency partner on NextTrip.",
    description:
      "Review verified agency profiles and agency names coming from live packages and offer deals.",
    search: "Search agencies, cities, or status...",
  },
  requests: {
    eyebrow: "Traveler demand",
    title: "Route trip requests to the right agencies faster.",
    description:
      "Track every custom trip request from the traveler workspace and match it with marketplace agencies.",
    search: "Search request, traveler, destination, or status...",
  },
  offers: {
    eyebrow: "Marketplace control",
    title: "Keep packages and offers clean, visible, and ready to sell.",
    description:
      "Watch live packageCatalog and offerCatalog items, prices, media coverage, and booking activity.",
    search: "Search offers, packages, agencies, or visibility...",
  },
  payments: {
    eyebrow: "Finance center",
    title: "Follow booking value, paid records, and payment follow-ups.",
    description:
      "Use real traveler booking records to review paid bookings, deposits, and unfinished checkout actions.",
    search: "Search payment, traveler, agency, or status...",
  },
  support: {
    eyebrow: "Support desk",
    title: "Resolve traveler and agency issues before they slow trips down.",
    description:
      "Support items are built from open trip requests, booking follow-ups, and experience comments.",
    search: "Search ticket, owner, subject, or status...",
  },
};

export const verificationQueue = agencyRows
  .filter((agency) => agency.status !== "Verified")
  .slice(0, 6)
  .map((agency) => ({
    agency: agency.name,
    item: agency.status === "Listed" ? "Complete agency profile verification" : "Review marketplace profile",
    submitted: `${agency.packages} marketplace item${agency.packages === 1 ? "" : "s"}`,
    risk: agency.status === "Listed" ? "Medium" : "Low",
  }));

const fastestResponder = agencyCatalog[0];
const highestRatedAgency = [...agencyRows].sort((a, b) => Number(b.rating) - Number(a.rating))[0];
const mostPackagesAgency = [...agencyRows].sort((a, b) => b.packages - a.packages)[0];

export const agencyHealthCards = [
  {
    title: "Fastest known responder",
    value: fastestResponder?.name || "No verified profile yet",
    detail: fastestResponder?.responseTime || "Add response-time data to agencyCatalog.",
  },
  {
    title: "Highest rating",
    value: highestRatedAgency?.name || "No agency data",
    detail: highestRatedAgency
      ? `${highestRatedAgency.rating} average rating across profile or catalog data.`
      : "Add agency ratings to improve quality control.",
  },
  {
    title: "Largest catalog owner",
    value: mostPackagesAgency?.name || "No package owner",
    detail: mostPackagesAgency
      ? `${mostPackagesAgency.packages} package or offer item${mostPackagesAgency.packages === 1 ? "" : "s"} live.`
      : "Add agency names to packages and offers.",
  },
];

export const requestRows = tripRequests.map((request) => {
  const matchedItem = allCatalogItems.find((item) => matchesRequest(request, item));

  return {
    id: request.id,
    traveler: profileOverview.name,
    destination: request.destination,
    type: request.mood,
    budget: request.budget,
    status: request.status,
    matchedAgency: matchedItem?.agency || "No agency match yet",
  };
});

export const requestPipeline = [
  {
    stage: "Custom briefs",
    count: numberFormatter.format(tripRequests.length),
    detail: "Traveler requests saved in userWorkspaceContent.",
  },
  {
    stage: "Waiting offers",
    count: numberFormatter.format(waitingRequestCount),
    detail: "Requests still marked as agency reviewing.",
  },
  {
    stage: "Offer ready",
    count: numberFormatter.format(matchedRequestCount),
    detail: "Travelers can compare at least one response.",
  },
  {
    stage: "Booking records",
    count: numberFormatter.format(bookingRecords.length),
    detail: "Trips already present in the traveler workspace.",
  },
];

const categoryCounts = Array.from(countBy(allCatalogItems, (item) => item.category).entries()).sort(
  (a, b) => b[1] - a[1]
);

export const demandCategories = categoryCounts.slice(0, 4).map(([label, count]) => ({
  label,
  value: percent(count, marketplaceItemCount),
  note: `${count} marketplace item${count === 1 ? "" : "s"} in ${label}`,
}));

export const offerRows = allCatalogItems.map((item) => {
  const bookings = bookingRecords.filter(
    (booking) => booking.packageId === item.id || normalize(booking.title) === normalize(item.title)
  );

  return {
    id: `${item.catalogType}-${item.id}`,
    packageName: item.title,
    agency: item.agency,
    price: formatMad(item.price),
    visibility: item.catalogType === "Offer" ? "Offer" : "Package",
    catalogType: item.catalogType,
    bookings: bookings.length,
    rating: item.rating,
    location: item.location,
  };
});

export const offerQualityCards = [
  {
    title: "Destination images",
    value: percent(realPhotoCount, marketplaceItemCount),
    detail: `${realPhotoCount} of ${marketplaceItemCount} packages and offers include media.`,
  },
  {
    title: "Clear pricing",
    value: percent(pricedItemCount, marketplaceItemCount),
    detail: "Items with price and duration ready for comparison.",
  },
  {
    title: "Offer deals",
    value: numberFormatter.format(offerCatalog.length),
    detail: "Dedicated offerCatalog cards available on the offers page.",
  },
];

export const paymentRows = bookingRecords.map((booking) => {
  const item = catalogByBooking(booking);
  const statusMap = {
    Paid: "Completed",
    "Deposit pending": "Manual review",
    "Not paid": "Pending",
  };

  return {
    id: `PAY-${booking.id.replace("BK-", "")}`,
    traveler: profileOverview.name,
    agency: item?.agency || "NextTrip marketplace",
    amount: formatMad(booking.total),
    method: booking.paymentStatus === "Paid" ? "Card" : booking.paymentStatus,
    status: statusMap[booking.paymentStatus] || booking.paymentStatus,
    bookingId: booking.id,
  };
});

export const refundRows = paymentReviewRows.map((booking) => ({
  id: `REV-${booking.id.replace("BK-", "")}`,
  traveler: profileOverview.name,
  reason: booking.nextAction,
  amount: formatMad(booking.total),
  status: booking.paymentStatus === "Deposit pending" ? "Manual review" : "Pending",
}));

const requestTickets = tripRequests.map((request) => ({
  code: `SUP-${request.id.replace("REQ-", "")}`,
  subject: `${request.title} needs agency follow-up`,
  owner: request.status === "Offer ready" ? "Traveler care" : "Agency success",
  priority: request.status === "Offer ready" ? "Medium" : "High",
  status: request.status === "Offer ready" ? "Waiting traveler" : "Open",
}));

const bookingTickets = paymentReviewRows.map((booking) => ({
  code: `SUP-${booking.id.replace("BK-", "")}`,
  subject: `${booking.title} payment or booking action is pending`,
  owner: "Payments",
  priority: booking.paymentStatus === "Deposit pending" ? "High" : "Medium",
  status: booking.paymentStatus === "Deposit pending" ? "Answering" : "Open",
}));

const agencyTickets = verificationQueue.slice(0, 2).map((item, index) => ({
  code: `SUP-AG-${index + 1}`,
  subject: `${item.agency}: ${item.item}`,
  owner: "Verification",
  priority: item.risk === "Medium" ? "High" : "Medium",
  status: "Open",
}));

export const supportTickets = [...requestTickets, ...bookingTickets, ...agencyTickets];

export const supportChannels = [
  {
    name: "Trip requests",
    volume: numberFormatter.format(requestTickets.length),
    sla: "Agency success queue",
  },
  {
    name: "Payments",
    volume: numberFormatter.format(bookingTickets.length),
    sla: "Finance follow-up queue",
  },
  {
    name: "Community",
    volume: numberFormatter.format(totalComments),
    sla: "Experience comments",
  },
];

export const revenueSummary = {
  total: formatMad(grossBookingValue),
  subtitle: `${bookingRecords.length} booking records, ${formatMad(platformPayoutEstimate)} estimated agency payouts`,
};

export const revenueBars = bookingRecords.map((booking) =>
  Math.max(66, Math.min(238, Math.round(booking.total / 115)))
);
