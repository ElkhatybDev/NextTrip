export const dashboardNavItems = [
  { key: "overview", label: "Overview", icon: "overview" },
  { key: "bookings", label: "Traveler requests", icon: "bookings" },
  { key: "packages", label: "Agency packages", icon: "packages" },
  { key: "messages", label: "Messages", icon: "messages" },
  { key: "analytics", label: "Analytics", icon: "analytics" },
];

export const agencySummary = {
  name: "Atlas Voyages Morocco",
  status: "Verified agency",
  type: "Morocco travel agency",
  manager: "Nadia El Amrani",
  location: "Marrakech, Morocco",
  phone: "+212 6 24 18 77 90",
  email: "contact@atlasvoyages.ma",
  license: "AVM-TRVL-2148",
  responseTime: "42 min average reply",
  rating: "4.9 rating | 128 tailored trips",
  specialties: ["Morocco tours", "Sahara stays", "Umrah planning"],
  image:
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=220&q=80",
};

export const bookingSeed = [
  {
    id: 1,
    requestId: "REQ-2401",
    client: "Yassine El Idrissi",
    tier: "Family traveler",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=240&q=80",
    destination: "Marrakech and Agafay",
    interest: "Family riad stay | Desert dinner | Private driver",
    budget: "12 000 - 15 000 MAD",
    dates: "Jun 18 - Jun 23",
    duration: "6 days",
    travelers: "2 adults, 2 kids",
    submitted: "Today",
    status: "pending",
  },
  {
    id: 2,
    requestId: "REQ-2402",
    client: "Salma Alaoui",
    tier: "Couple request",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=240&q=80",
    destination: "Chefchaouen and Tangier",
    interest: "Blue city walk | Sea views | Boutique hotel",
    budget: "8 500 - 10 000 MAD",
    dates: "Jul 05 - Jul 10",
    duration: "5 days",
    travelers: "2 adults",
    submitted: "2 hours ago",
    status: "pending",
  },
  {
    id: 3,
    requestId: "REQ-2403",
    client: "Imane Bennis",
    tier: "Repeat traveler",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=80",
    destination: "Merzouga Sahara",
    interest: "Camel trek | Luxury camp | Sunrise tour",
    budget: "6 000 - 8 500 MAD",
    dates: "Aug 20 - Aug 24",
    duration: "4 days",
    travelers: "3 friends",
    submitted: "Yesterday",
    status: "review",
  },
];

export const packageSeed = [
  {
    id: 1,
    title: "Marrakech Magic Route",
    place: "Marrakech, Morocco",
    price: "9 900 MAD",
    status: "Active",
    duration: "4 days / 3 nights",
    category: "Culture package",
    requests: 12,
    image:
      "https://images.unsplash.com/photo-1597212720419-8b7a03f15263?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Atlas Adventure Circuit",
    place: "High Atlas, Morocco",
    price: "7 600 MAD",
    status: "Active",
    duration: "3 days / 2 nights",
    category: "Adventure package",
    requests: 8,
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Sahara Serenity Camp",
    place: "Merzouga, Morocco",
    price: "11 500 MAD",
    status: "Active",
    duration: "5 days / 4 nights",
    category: "Desert package",
    requests: 15,
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=80",
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
  overview: "Agency overview",
  bookings: "Traveler request center",
  packages: "Agency package library",
  messages: "Traveler messages",
  analytics: "Agency performance",
};

export const analyticsCards = [
  {
    label: "Request conversion",
    value: "31.4%",
    note: "+6.2% this month",
  },
  {
    label: "Average offer value",
    value: "9 800 MAD",
    note: "Morocco agency packages",
  },
  {
    label: "Agency response time",
    value: "42m",
    note: "Faster than last week",
  },
];

export const monthlyPerformance = [70, 100, 85, 130, 115, 160, 145, 180, 155, 210, 175, 230];

export const defaultPackageImage =
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80";
