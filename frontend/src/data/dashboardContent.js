export const dashboardNavItems = [
  { key: "overview", label: "Overview", icon: "overview" },
  { key: "bookings", label: "Bookings", icon: "bookings" },
  { key: "packages", label: "Packages", icon: "packages" },
  { key: "messages", label: "Messages", icon: "messages" },
  { key: "analytics", label: "Analytics", icon: "analytics" },
];

export const agencySummary = {
  name: "Atlas Voyages",
  status: "Verified Partner",
  rating: "4.9 rating | 128 luxury trips",
  image:
    "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=220&q=80",
};

export const bookingSeed = [
  {
    id: 1,
    client: "Yassine El Idrissi",
    tier: "Platinum Member",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=240&q=80",
    destination: "Amalfi Coast, Italy",
    interest: "Luxury Villa | Private Boat Tour",
    budget: "$12,000 - $15,000",
    dates: "Sept 12 - Sept 24",
    duration: "12 days",
    status: "pending",
  },
  {
    id: 2,
    client: "Salma Alaoui",
    tier: "New Client",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=240&q=80",
    destination: "Kyoto, Japan",
    interest: "Cultural Discovery | Food Tour",
    budget: "$8,500 - $10,000",
    dates: "Oct 05 - Oct 15",
    duration: "10 days",
    status: "pending",
  },
  {
    id: 3,
    client: "Imane Bennis",
    tier: "Repeat Traveler",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=80",
    destination: "Reykjavik, Iceland",
    interest: "Adventure | Northern Lights",
    budget: "$5,000 - $7,000",
    dates: "Nov 20 - Nov 28",
    duration: "8 days",
    status: "review",
  },
];

export const packageSeed = [
  {
    id: 1,
    title: "Bali Luxury Escape",
    place: "Ubud, Bali",
    price: "$3,200",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Santorini Sunset Romance",
    place: "Santorini, Greece",
    price: "$2,950",
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Swiss Alpine Retreat",
    place: "Zermatt, Switzerland",
    price: "$4,850",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80",
  },
];

export const messageSeed = [
  {
    id: 1,
    from: "Yassine El Idrissi",
    subject: "Need 2 premium villa options",
    preview: "Please send me options with private transfer and sea view included.",
    unread: true,
  },
  {
    id: 2,
    from: "Salma Alaoui",
    subject: "Can we add more food experiences?",
    preview: "I want a stronger culinary focus in the Kyoto itinerary.",
    unread: true,
  },
  {
    id: 3,
    from: "Imane Bennis",
    subject: "Best dates for Northern Lights",
    preview: "Is late November a good time for visibility and activities?",
    unread: false,
  },
];

export const dashboardPageTitles = {
  overview: "Dashboard Overview",
  bookings: "Bookings Management",
  packages: "Packages Library",
  messages: "Client Messages",
  analytics: "Performance Analytics",
};

export const analyticsCards = [
  {
    label: "Conversion rate",
    value: "24.8%",
    note: "+4.1% this month",
  },
  {
    label: "Average package value",
    value: "$3,940",
    note: "Premium travel segment",
  },
  {
    label: "Response time",
    value: "42m",
    note: "Faster than last week",
  },
];

export const monthlyPerformance = [70, 100, 85, 130, 115, 160, 145, 180, 155, 210, 175, 230];

export const defaultPackageImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80";
