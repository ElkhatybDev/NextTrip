const cityVideos = {
  Marrakech: "https://videos.pexels.com/video-files/26731547/11995273_1280_720_25fps.mp4",
  Chefchaouen: "https://videos.pexels.com/video-files/34755708/14733998_1280_720_60fps.mp4",
  Casablanca: "https://videos.pexels.com/video-files/32154469/13709448_720_1280_30fps.mp4",
  Paris: "https://videos.pexels.com/video-files/35404485/15000609_1280_720_30fps.mp4",
  Rome: "https://videos.pexels.com/video-files/34313209/14536328_1280_720_30fps.mp4",
  Istanbul: "https://videos.pexels.com/video-files/34384018/14566396_1280_720_25fps.mp4",
  Kyoto: "https://videos.pexels.com/video-files/32111750/13690409_1280_720_60fps.mp4",
  Dubai: "https://videos.pexels.com/video-files/30481175/13061090_1280_720_30fps.mp4",
  Cairo: "https://videos.pexels.com/video-files/4205789/4205789-hd_720_962_30fps.mp4",
  Zanzibar: "https://videos.pexels.com/video-files/34792305/14751201_1280_720_30fps.mp4",
  Bali: "https://videos.pexels.com/video-files/18310174/18310174-hd_720_1280_30fps.mp4",
  Barcelona: "https://videos.pexels.com/video-files/36765509/15580771_720_1280_30fps.mp4",
};

export const destinationCities = [
  {
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    mood: "Culture, riads, souks",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1100&q=80",
    video: cityVideos.Marrakech,
    summary:
      "Marrakech is a warm Moroccan city known for colorful souks, riads, gardens, rooftop dinners, and easy desert add-ons.",
    bestFor: "Culture trips, family stays, couples, and short city breaks",
    duration: "3-5 days",
    season: "March-May or September-November",
    highlights: ["Jemaa el-Fnaa", "Majorelle Garden", "Medina riads", "Agafay desert"],
  },
  {
    name: "Chefchaouen",
    country: "Morocco",
    region: "Africa",
    mood: "Blue streets, calm, mountain air",
    image:
      "https://images.unsplash.com/flagged/photo-1555169048-3c4845cfcf1c?auto=format&fit=crop&w=1100&q=80",
    video: cityVideos.Chefchaouen,
    summary:
      "Chefchaouen is a peaceful mountain city with blue alleys, slow walks, small cafés, and relaxed photo-friendly routes.",
    bestFor: "Calm escapes, couples, photographers, and slow travel",
    duration: "2-3 days",
    season: "Spring or autumn",
    highlights: ["Blue Medina", "Ras El Maa", "Spanish Mosque", "Akchour day trip"],
  },
  {
    name: "Casablanca",
    country: "Morocco",
    region: "Africa",
    mood: "Ocean, modern city, business",
    image:
      "https://images.unsplash.com/photo-1577147443647-81856d5151af?auto=format&fit=crop&w=1100&q=80",
    video: cityVideos.Casablanca,
    summary:
      "Casablanca brings Atlantic views, modern restaurants, shopping, and the famous Hassan II Mosque in one easy city stop.",
    bestFor: "Business stays, weekend breaks, and first Morocco arrivals",
    duration: "1-3 days",
    season: "All year",
    highlights: ["Hassan II Mosque", "Corniche", "Habous Quarter", "Morocco Mall"],
  },
  {
    name: "Paris",
    country: "France",
    region: "Europe",
    mood: "Museums, food, romance",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1100&q=80",
    video: cityVideos.Paris,
    summary:
      "Paris is made for iconic walks, museums, cafés, shopping streets, and romantic evenings around the Seine.",
    bestFor: "Couples, culture trips, shopping, and first Europe visits",
    duration: "4-6 days",
    season: "April-June or September-October",
    highlights: ["Eiffel Tower", "Louvre", "Montmartre", "Seine cruise"],
  },
  {
    name: "Rome",
    country: "Italy",
    region: "Europe",
    mood: "History, food, old streets",
    image:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1100&q=80",
    video: cityVideos.Rome,
    summary:
      "Rome mixes ancient ruins, lively piazzas, pasta spots, and easy day plans for travelers who like history with comfort.",
    bestFor: "Families, couples, heritage routes, and food lovers",
    duration: "3-5 days",
    season: "Spring or early autumn",
    highlights: ["Colosseum", "Vatican City", "Trevi Fountain", "Trastevere"],
  },
  {
    name: "Istanbul",
    country: "Turkiye",
    region: "Europe / Asia",
    mood: "Markets, mosques, Bosphorus",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1100&q=80",
    video: cityVideos.Istanbul,
    summary:
      "Istanbul connects Europe and Asia through historic mosques, markets, ferry rides, tea stops, and rich food culture.",
    bestFor: "Culture, faith-friendly travel, shopping, and group trips",
    duration: "4-6 days",
    season: "April-June or September-November",
    highlights: ["Hagia Sophia", "Blue Mosque", "Grand Bazaar", "Bosphorus cruise"],
  },
  {
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    mood: "Temples, gardens, quiet tradition",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1100&q=80",
    video: cityVideos.Kyoto,
    summary:
      "Kyoto is a calm cultural city with temples, bamboo paths, gardens, tea houses, and traditional neighborhoods.",
    bestFor: "Culture lovers, calm travel, couples, and photography",
    duration: "3-5 days",
    season: "Cherry blossom or autumn colors",
    highlights: ["Fushimi Inari", "Arashiyama", "Gion", "Kiyomizu-dera"],
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Asia",
    mood: "Luxury, skyline, desert",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1100&q=80",
    video: cityVideos.Dubai,
    summary:
      "Dubai is ideal for comfortable hotel stays, shopping, skyline views, desert experiences, family activities, and luxury upgrades.",
    bestFor: "Families, luxury stays, shopping, and honeymoon trips",
    duration: "4-7 days",
    season: "November-March",
    highlights: ["Burj Khalifa", "Dubai Marina", "Desert safari", "Old Dubai"],
  },
  {
    name: "Cairo",
    country: "Egypt",
    region: "Africa",
    mood: "Pyramids, Nile, history",
    image:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1100&q=80",
    video: cityVideos.Cairo,
    summary:
      "Cairo is a strong choice for travelers who want pyramids, museums, Nile views, bazaars, and deep ancient history.",
    bestFor: "History routes, families, groups, and culture trips",
    duration: "3-5 days",
    season: "October-April",
    highlights: ["Giza Pyramids", "Egyptian Museum", "Khan el-Khalili", "Nile dinner"],
  },
  {
    name: "Zanzibar",
    country: "Tanzania",
    region: "Africa",
    mood: "Beach, spice tours, slow island days",
    image:
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1100&q=80",
    video: cityVideos.Zanzibar,
    summary:
      "Zanzibar is ideal for soft beaches, relaxed resorts, spice tours, Stone Town walks, and easy island-style packages.",
    bestFor: "Beach stays, honeymoon, families, and slow escapes",
    duration: "5-8 days",
    season: "June-October or December-February",
    highlights: ["Stone Town", "Nungwi Beach", "Spice tour", "Prison Island"],
  },
  {
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    mood: "Nature, villas, wellness",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1100&q=80",
    video: cityVideos.Bali,
    summary:
      "Bali mixes green rice terraces, beach clubs, villas, temples, wellness retreats, and flexible adventure days.",
    bestFor: "Adventure, wellness, couples, and long stays",
    duration: "7-10 days",
    season: "April-October",
    highlights: ["Ubud", "Uluwatu", "Rice terraces", "Water temples"],
  },
  {
    name: "Barcelona",
    country: "Spain",
    region: "Europe",
    mood: "Beach city, food, design",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1100&q=80",
    video: cityVideos.Barcelona,
    summary:
      "Barcelona gives travelers a simple mix of city walks, Gaudí architecture, beach time, markets, and late dinners.",
    bestFor: "City breaks, friends, couples, and food trips",
    duration: "3-5 days",
    season: "May-June or September",
    highlights: ["Sagrada Familia", "Gothic Quarter", "Barceloneta", "Park Güell"],
  },
];

export const destinationFilters = ["All", "Africa", "Europe", "Asia"];
