export const dashboardNavItems = [
  { key: "overview", label: "Tableau de bord", icon: "overview" },
  { key: "bookings", label: "Demandes reçues", icon: "bookings" },
  { key: "packages", label: "Forfaits agence", icon: "packages" },
  { key: "messages", label: "Messages", icon: "messages" },
  { key: "analytics", label: "Analyse", icon: "analytics" },
];

export const agencySummary = {
  name: "Atlas Voyages Maroc",
  status: "Agence vérifiée",
  type: "Agence de voyage au Maroc",
  manager: "Nadia El Amrani",
  location: "Marrakech, Maroc",
  phone: "+212 6 24 18 77 90",
  email: "contact@atlasvoyages.ma",
  license: "AVM-TRVL-2148",
  responseTime: "Réponse moyenne en 42 min",
  rating: "Note 4,9 | 128 voyages sur mesure",
  specialties: ["Circuits au Maroc", "Séjours Sahara", "Organisation Omra"],
  image:
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=220&q=80",
};

export const bookingSeed = [
  {
    id: 1,
    requestId: "REQ-2401",
    client: "Yassine El Idrissi",
    tier: "Voyage familial",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=240&q=80",
    destination: "Marrakech et Agafay",
    interest: "Riad familial | Dîner désert | Chauffeur privé",
    budget: "12 000 - 15 000 MAD",
    dates: "18 juin - 23 juin",
    duration: "6 jours",
    travelers: "2 adultes, 2 enfants",
    submitted: "Aujourd’hui",
    status: "pending",
  },
  {
    id: 2,
    requestId: "REQ-2402",
    client: "Salma Alaoui",
    tier: "Demande couple",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=240&q=80",
    destination: "Chefchaouen et Tanger",
    interest: "Ville bleue | Vue mer | Hôtel boutique",
    budget: "8 500 - 10 000 MAD",
    dates: "05 juillet - 10 juillet",
    duration: "5 jours",
    travelers: "2 adultes",
    submitted: "Il y a 2 h",
    status: "pending",
  },
  {
    id: 3,
    requestId: "REQ-2403",
    client: "Imane Bennis",
    tier: "Cliente régulière",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=80",
    destination: "Merzouga Sahara",
    interest: "Balade à dos de chameau | Camp premium | Lever du soleil",
    budget: "6 000 - 8 500 MAD",
    dates: "20 août - 24 août",
    duration: "4 jours",
    travelers: "3 amis",
    submitted: "Hier",
    status: "review",
  },
];

export const packageSeed = [
  {
    id: 1,
    title: "Marrakech Magic Route",
    place: "Marrakech, Maroc",
    price: "9 900 MAD",
    status: "Actif",
    duration: "4 jours / 3 nuits",
    category: "Forfait culturel",
    requests: 12,
    image:
      "https://images.unsplash.com/photo-1597212720419-8b7a03f15263?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Atlas Adventure Circuit",
    place: "Haut Atlas, Maroc",
    price: "7 600 MAD",
    status: "Actif",
    duration: "3 jours / 2 nuits",
    category: "Forfait aventure",
    requests: 8,
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Sahara Serenity Camp",
    place: "Merzouga, Maroc",
    price: "11 500 MAD",
    status: "Actif",
    duration: "5 jours / 4 nuits",
    category: "Forfait désert",
    requests: 15,
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=80",
  },
];

export const messageSeed = [
  {
    id: 1,
    from: "Yassine El Idrissi",
    subject: "Besoin de deux options premium",
    preview: "Merci d’envoyer des options avec transfert privé et belle vue inclus.",
    unread: true,
  },
  {
    id: 2,
    from: "Salma Alaoui",
    subject: "Peut-on ajouter plus d’expériences culinaires ?",
    preview: "Je souhaite un programme avec davantage d’adresses et de repas locaux.",
    unread: true,
  },
  {
    id: 3,
    from: "Imane Bennis",
    subject: "Meilleures dates pour le voyage",
    preview: "Fin novembre est-elle une bonne période pour les activités prévues ?",
    unread: false,
  },
];

export const dashboardPageTitles = {
  overview: "Vue d’ensemble agence",
  bookings: "Centre des demandes clients",
  packages: "Bibliothèque des forfaits",
  messages: "Messages clients",
  analytics: "Performance de l’agence",
};

export const analyticsCards = [
  {
    label: "Conversion des demandes",
    value: "31.4%",
    note: "+6,2 % ce mois-ci",
  },
  {
    label: "Valeur moyenne des offres",
    value: "9 800 MAD",
    note: "Forfaits de l’agence",
  },
  {
    label: "Temps de réponse agence",
    value: "42m",
    note: "Plus rapide que la semaine dernière",
  },
];

export const monthlyPerformance = [70, 100, 85, 130, 115, 160, 145, 180, 155, 210, 175, 230];

export const defaultPackageImage =
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80";
