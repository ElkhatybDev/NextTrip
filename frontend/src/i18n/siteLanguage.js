import { fallbackCurrencies, fallbackLanguages } from "../services/preferencesApi";

export const LANGUAGE_STORAGE_KEY = "nexttrip-language";
export const LANGUAGE_CHANGE_EVENT = "nexttrip-language-change";
export const CURRENCY_STORAGE_KEY = "nexttrip-currency";
export const CURRENCY_CHANGE_EVENT = "nexttrip-currency-change";
export const supportedLanguages = fallbackLanguages;
export const supportedCurrencies = fallbackCurrencies;

const ATTRIBUTE_NAMES = ["placeholder", "aria-label", "title", "alt"];
const DEFAULT_LANGUAGE_CODE = "fra";
const DEFAULT_CURRENCY_CODE = "EUR";
const DEFAULT_PREFERENCES_STORAGE_KEY = "nexttrip-default-preferences-version";
const DEFAULT_PREFERENCES_VERSION = "fr-eur-v1";

const currencyRatesFromMad = {
  GBP: 0.079,
  USD: 0.1,
  EUR: 0.092,
  MAD: 1,
};

const languageSettings = {
  eng: { htmlLang: "en", dir: "ltr" },
  fra: { htmlLang: "fr", dir: "ltr" },
  ara: { htmlLang: "ar", dir: "rtl" },
};

const translations = {
  fra: {
    "Home": "Accueil",
    "Experiences": "Expériences",
    "Packages": "Forfaits",
    "Offers": "Offres",
    "Destinations": "Destinations",
    "About Us": "À propos",
    "About us": "À propos",
    "Sign In": "Connexion",
    "Language": "Langue",
    "Currency": "Devise",
    "English": "Anglais",
    "French": "Français",
    "Arabic": "Arabe",
    "United Kingdom": "Royaume-Uni",
    "France": "France",
    "Morocco": "Maroc",
    "Europe": "Europe",
    "Africa": "Afrique",
    "Asia": "Asie",
    "Start": "Départ",
    "Explore": "Explorer",
    "Travel styles": "Styles de voyage",
    "Support": "Support",
    "Policies": "Politiques",
    "Create Trip": "Créer un voyage",
    "Agencies": "Agences",
    "Individual": "Individuel",
    "Group": "Groupe",
    "Family": "Famille",
    "Religion": "Religion",
    "Honeymoon": "Lune de miel",
    "Adventures": "Aventures",
    "Adventure": "Aventure",
    "Contact Us": "Contactez-nous",
    "Contact us": "Contactez-nous",
    "Privacy Policy": "Politique de confidentialité",
    "Terms of Service": "Conditions d'utilisation",
    "Privacy policy": "Politique de confidentialité",
    "Terms of service": "Conditions d'utilisation",
    "Refund policy": "Politique de remboursement",
    "Cancellation policy": "Politique d'annulation",
    "Help center": "Centre d'aide",
    "FAQ": "FAQ",
    "Services": "Services",
    "Reviews": "Avis",
    "Company": "Entreprise",
    "Discover": "Découvrir",
    "Help": "Aide",
    "Back home": "Retour accueil",
    "Plan smarter with NextTrip": "Planifiez mieux avec NextTrip",
    "Find packages, compare offers, or send a clear custom trip request.": "Trouvez des forfaits, comparez les offres ou envoyez une demande de voyage claire.",
    "Sign in to continue": "Connectez-vous pour continuer",
    "Travel more, for less": "Voyagez plus, dépensez moins",
    "Packages, custom trips, and agency offers in one place.": "Forfaits, voyages sur mesure et offres d'agences au même endroit.",
    "Custom travel workspace": "Espace de voyage personnalisé",
    "Create a personal trip request.": "Créez une demande de voyage personnelle.",
    "A simple flow from idea to offer": "Un parcours simple de l'idée à l'offre",
    "How NextTrip helps": "Comment NextTrip aide",
    "Choose your mood": "Choisissez votre ambiance",
    "Family trips, adventure, faith travel, luxury, or calm stays.": "Voyages en famille, aventure, voyage spirituel, luxe ou séjours calmes.",
    "Compare agencies": "Comparez les agences",
    "One request can bring several clear offers.": "Une seule demande peut générer plusieurs offres claires.",
    "Move to booking": "Passez à la réservation",
    "Pick the best match and continue with confidence.": "Choisissez la meilleure option et continuez en confiance.",
    "Tell agencies exactly what you need.": "Dites exactement aux agences ce dont vous avez besoin.",
    "Use this when ready packages are not enough. Write the trip you want once, keep the details organized, and let agencies send offers that match your real needs.": "Utilisez cela quand les forfaits prêts ne suffisent pas. Décrivez votre voyage une seule fois, gardez les détails organisés et laissez les agences envoyer des offres adaptées à vos besoins.",
    "This personal card collects your destination, date, travelers, budget, hotel level, transport, and preferences before any agency replies.": "Cette carte personnelle regroupe votre destination, date, voyageurs, budget, niveau d'hôtel, transport et préférences avant la réponse des agences.",
    "Choose the vibe": "Choisissez l'ambiance",
    "Tell agencies if you want calm, adventure, culture, family comfort, or luxury.": "Indiquez aux agences si vous voulez du calme, de l'aventure, de la culture, du confort familial ou du luxe.",
    "Set the basics": "Définissez les bases",
    "Add destination, dates, budget, travelers, hotel level, and transport needs.": "Ajoutez destination, dates, budget, voyageurs, niveau d'hôtel et besoins de transport.",
    "Compare replies": "Comparez les réponses",
    "Agencies answer with organized offers so you can choose without confusion.": "Les agences répondent avec des offres organisées pour choisir sans confusion.",
    "Custom request": "Demande sur mesure",
    "Plan your trip your way.": "Planifiez votre voyage à votre façon.",
    "Add the basics and send one clear request to agencies.": "Ajoutez les bases et envoyez une demande claire aux agences.",
    "Destination": "Destination",
    "Dates": "Dates",
    "Hotel level": "Niveau d'hôtel",
    "Start custom trip": "Démarrer un voyage sur mesure",
    "How it works": "Comment ça marche",
    "From first search to clear choice": "De la première recherche au choix clair",
    "A short flow that helps users understand the platform before they open details or create a custom request.": "Un parcours court qui aide les utilisateurs à comprendre la plateforme avant d'ouvrir les détails ou de créer une demande sur mesure.",
    "Search with real context": "Cherchez avec le bon contexte",
    "Choose a destination, travel date, travelers, and trip type before comparing packages.": "Choisissez une destination, une date de voyage, le nombre de voyageurs et le type de voyage avant de comparer les forfaits.",
    "Compare clear options": "Comparez des options claires",
    "Compare ready offers, standard packages, and agency replies in a clearer flow.": "Comparez les offres prêtes, les forfaits standards et les réponses des agences dans un parcours plus clair.",
    "Open details or customize": "Ouvrez les détails ou personnalisez",
    "Continue with a package detail page or create a personal request when needed.": "Continuez avec une page de détail ou créez une demande personnelle si besoin.",
    "Featured destinations": "Destinations en vedette",
    "Choose your next direction": "Choisissez votre prochaine direction",
    "A compact destination deck across Africa, Europe, and Asia. Hover the card to open the places and compare them quickly.": "Une sélection compacte de destinations en Afrique, Europe et Asie. Survolez la carte pour découvrir les lieux et les comparer rapidement.",
    "Hover to discover": "Survolez pour découvrir",
    "One deck, four travel moods.": "Une sélection, quatre ambiances de voyage.",
    "Explore destination": "Explorer la destination",
    "Agency offers": "Offres d'agences",
    "Offers ready to compare": "Offres prêtes à comparer",
    "These cards are agency offers with clear prices, trip types, durations, and details.": "Ces cartes présentent des offres d'agences avec des prix, des types de voyage, des durées et des détails clairs.",
    "Agency offer": "Offre d'agence",
    "Standard packages": "Forfaits standards",
    "Simpler package options": "Options de forfaits plus simples",
    "Standard packages for users who want a straightforward trip option without a custom request.": "Forfaits standards pour les utilisateurs qui veulent une option de voyage simple sans demande sur mesure.",
    "Real traveler stories": "Histoires de vrais voyageurs",
    "Cards move like reviews, and every experience opens its detail page.": "Les cartes défilent comme des avis et chaque expérience ouvre sa page de détail.",
    "View detail": "Voir le détail",
    "Why choose NextTrip?": "Pourquoi choisir NextTrip ?",
    "Clear trips before you book.": "Des voyages clairs avant de réserver.",
    "Compare ready packages, personal requests, agency replies, and booking details in one simple travel flow.": "Comparez forfaits prêts, demandes personnelles, réponses d'agences et détails de réservation dans un seul parcours simple.",
    "Trip brief": "Brief voyage",
    "Better decision": "Meilleure décision",
    "Verified agency flow": "Parcours d'agence vérifié",
    "Travelers send clear requests, and agencies respond from one organized workspace.": "Les voyageurs envoient des demandes claires et les agences répondent depuis un espace organisé.",
    "Simple personalization": "Personnalisation simple",
    "Choose a destination, travel date, travel type, budget, guests, and preferences without confusion.": "Choisissez destination, date, type de voyage, budget, voyageurs et préférences sans confusion.",
    "Cleaner communication": "Communication plus claire",
    "Keep offers, messages, booking details, and support connected to the same trip.": "Gardez offres, messages, détails de réservation et support proches du même voyage.",
    "Comparison ready": "Prêt à comparer",
    "3 offers": "3 offres",
    "Same request, clearer choices.": "Même demande, choix plus clairs.",
    "See how it feels": "Voir comment ça marche",
    "Built for clear decisions": "Conçu pour des décisions claires",
    "Less noise before booking.": "Moins de bruit avant la réservation.",
    "NextTrip keeps the important travel details visible: destination, date, travelers, trip type, agency offer, price, and support.": "NextTrip garde visibles les détails importants : destination, date, voyageurs, type de voyage, offre d'agence, prix et support.",
    "Verified agency offers": "Offres d'agences vérifiées",
    "Keep agency names, prices, dates, and package details easy to compare.": "Gardez noms d'agences, prix, dates et détails de forfait faciles à comparer.",
    "Personal trip requests": "Demandes de voyage personnelles",
    "Send one organized brief instead of repeating the same details many times.": "Envoyez un brief organisé au lieu de répéter les mêmes détails plusieurs fois.",
    "Booking-ready details": "Détails prêts pour la réservation",
    "Move from discovery to details and booking with fewer confusing steps.": "Passez de la découverte aux détails puis à la réservation avec moins d'étapes confuses.",
    "Happy Travelers": "Voyageurs satisfaits",
    "Agency Partners": "Agences partenaires",
    "Curated Packages": "Forfaits sélectionnés",
    "Quick answers": "Réponses rapides",
    "Questions users ask first": "Questions que les utilisateurs peuvent poser d'abord",
    "Short answers near the end of the home page reduce confusion before people move to packages or custom trips.": "Des réponses courtes près de la fin de l'accueil réduisent la confusion avant de passer aux forfaits ou aux voyages sur mesure.",
    "Ready when the user is ready": "Prêt quand l'utilisateur l'est",
    "Choose a package or build a personal trip.": "Choisissez un forfait ou créez un voyage personnel.",
    "Users can start with ready-made packages, then move to a custom request if they need more control over budget, hotel level, transport, or travel style.": "Les utilisateurs peuvent commencer simplement avec des forfaits prêts, puis passer à une demande sur mesure s'ils veulent plus de contrôle sur le budget, l'hôtel, le transport ou le style de voyage.",
    "Browse packages": "Voir les forfaits",
    "Ready to Start Your Adventure?": "Prêt à commencer votre aventure ?",
    "Join 50k+ travelers getting weekly secret deals and destination inspiration.": "Rejoignez 50k+ voyageurs qui reçoivent chaque semaine des offres secrètes et de l'inspiration.",
    "Subscribe": "S'abonner",
    "Your email address": "Votre adresse e-mail",
    "Enter your email": "Entrez votre e-mail",
    "Where to?": "Où aller ?",
    "When?": "Quand ?",
    "Trip type": "Type de voyage",
    "Travelers": "Voyageurs",
    "Add guests": "Ajouter des voyageurs",
    "Search": "Rechercher",
    "Casablanca - Anywhere": "Casablanca - Partout",
    "Popular destination": "Destination populaire",
    "No destination found": "Aucune destination trouvée",
    "Choose travel date": "Choisir la date de voyage",
    "Clear": "Effacer",
    "Today": "Aujourd'hui",
    "Adults": "Adultes",
    "Children": "Enfants",
    "Infants": "Bébés",
    "Pets": "Animaux",
    "Ages 13 or above": "13 ans ou plus",
    "Ages 2-12": "2 à 12 ans",
    "Under 2": "Moins de 2 ans",
    "Service animals welcome": "Animaux d'assistance acceptés",
    "CURATED TRAVEL PACKAGES": "FORFAITS DE VOYAGE SÉLECTIONNÉS",
    "AGENCY OFFERS": "OFFRES D'AGENCES",
    "SECURE BOOKING": "RÉSERVATION SÉCURISÉE",
    "Booking details": "Détails de réservation",
    "Discover handpicked packages designed for romance, adventure, culture, and unforgettable escapes.": "Découvrez des forfaits sélectionnés pour la romance, l'aventure, la culture et des escapades mémorables.",
    "Compare highlighted agency offers with clear prices, trip styles, and booking details.": "Comparez les offres d'agences avec prix, styles de voyage et détails de réservation clairs.",
    "Explore our premium packages": "Explorez nos forfaits premium",
    "FIND YOUR NEXT TRIP": "TROUVEZ VOTRE PROCHAIN VOYAGE",
    "Search by title, destination, or category": "Rechercher par titre, destination ou catégorie",
    "Search from Home": "Recherche depuis l'accueil",
    "Available packages": "Forfaits disponibles",
    "Available offers": "Offres disponibles",
    "packages found": "forfaits trouvés",
    "offers found": "offres trouvées",
    "No exact match found yet.": "Aucun forfait exact trouvé pour le moment.",
    "Try another destination, choose a broader category, or clear filters to see every available package.": "Essayez une autre destination, choisissez une catégorie plus large ou effacez les filtres pour voir tous les forfaits disponibles.",
    "Show all results": "Afficher tous les forfaits",
    "Details": "Détails",
    "Book now ->": "Réserver ->",
    "Offer": "Offre",
    "Destination Finder": "Recherche de destination",
    "Pick a city, watch the mood, then plan smarter.": "Choisissez une ville, regardez l'ambiance, puis planifiez mieux.",
    "Explore city ideas across Morocco, Europe, Asia, and Africa. Click any city to open a short video preview, useful details, and a simple definition before choosing a package or custom trip.": "Explorez des idées de villes au Maroc, en Europe, en Asie et en Afrique. Cliquez sur une ville pour ouvrir une courte vidéo, des détails utiles et une définition simple avant de choisir un forfait ou un voyage sur mesure.",
    "Browse Packages": "Voir les forfaits",
    "Create custom trip": "Créer un voyage sur mesure",
    "Click a city card to open video, details, season, and highlights.": "Cliquez sur une carte de ville pour ouvrir la vidéo, les détails, la saison et les points forts.",
    "City library": "Bibliothèque des villes",
    "Search by city or filter by region. Every card opens a focused city preview.": "Recherchez par ville ou filtrez par région. Chaque carte ouvre un aperçu ciblé de la ville.",
    "Search Marrakech, Paris, Kyoto...": "Rechercher Marrakech, Paris, Kyoto...",
    "Destination regions": "Régions de destination",
    "No city found yet. Try another name or switch the region filter.": "Aucune ville trouvée pour le moment. Essayez un autre nom ou changez le filtre de région.",
    "Travel moods": "Ambiances de voyage",
    "Use destinations as a starting point, not the final decision.": "Utilisez les destinations comme point de départ, pas comme décision finale.",
    "City breaks": "Séjours urbains",
    "Beach escapes": "Escapades plage",
    "Religious trips": "Voyages religieux",
    "Adventure routes": "Routes d'aventure",
    "Family holidays": "Vacances en famille",
    "Luxury stays": "Séjours de luxe",
    "Riads, souks, desert add-ons, and warm Moroccan city energy.": "Riads, souks, options désert et énergie chaleureuse marocaine.",
    "White villages, sunset views, boutique stays, and calm sea moments.": "Villages blancs, couchers de soleil, séjours boutique et moments calmes au bord de la mer.",
    "Temples, gardens, quiet neighborhoods, and refined cultural routes.": "Temples, jardins, quartiers tranquilles et itinéraires culturels raffinés.",
    "Soft beaches, island hotels, spice tours, and easy tropical pacing.": "Plages douces, hôtels insulaires, visites d'épices et rythme tropical facile.",
    "Vibrant souks, blue lanes, and a handcrafted cultural route.": "Souks vibrants, ruelles bleues et itinéraire culturel soigné.",
    "A romantic journey through Italy's most iconic coastline.": "Un voyage romantique sur la côte la plus iconique d'Italie.",
    "Calm gardens, old temples, and timeless local traditions.": "Jardins calmes, anciens temples et traditions locales intemporelles.",
    "Oceanfront stays, peaceful vibes, and tropical slow living.": "Séjours face à l'océan, ambiance paisible et douceur tropicale.",
    "A simple city escape with hotel, transfer, and guided highlights.": "Une escapade urbaine simple avec hôtel, transfert et visites guidées.",
    "A short modern getaway with flexible activities and shopping time.": "Une courte escapade moderne avec activités flexibles et temps shopping.",
    "A practical cultural stay with old city walks and local food.": "Un séjour culturel pratique avec balades en vieille ville et cuisine locale.",
    "Sunny streets, food stops, and a calm pace for easy discovery.": "Rues ensoleillées, pauses gourmandes et rythme calme pour découvrir facilement.",
    "A peaceful luxury stay with sunset views and clear agency support.": "Un séjour de luxe paisible avec vues sur le coucher de soleil et assistance claire de l'agence.",
    "Temples, old streets, calm gardens, and a balanced cultural route.": "Temples, vieilles rues, jardins calmes et route culturelle équilibrée.",
    "Mountain air, train routes, and premium lodge memories.": "Air de montagne, trajets en train et souvenirs de lodge premium.",
    "User reviews": "Avis utilisateurs",
    "What travelers say": "Ce que disent les voyageurs",
    "Reviews move automatically so the section feels alive instead of showing only three static cards.": "Les avis défilent automatiquement pour donner une section vivante, pas seulement trois cartes statiques.",
    "Traveler": "Voyageur",
    "Agency client": "Client agence",
    "Family traveler": "Voyageuse en famille",
    "Adventure traveler": "Voyageur aventure",
    "Couple trip": "Voyage en couple",
    "NextTrip made planning very easy. I customized everything, and the agency replied quickly.": "NextTrip a rendu la planification très simple. J'ai tout personnalisé et l'agence a répondu rapidement.",
    "The real-time pricing and direct communication saved me time and helped me make a better choice.": "La tarification en temps réel et la communication directe m'ont fait gagner du temps et m'ont aidé à faire un meilleur choix.",
    "A clear experience, beautiful offers, and I loved how flexible the trip customization was.": "Une expérience claire, de belles offres, et j'ai aimé la flexibilité de la personnalisation.",
    "The family trip options were easy to compare, especially hotels, transfers, and activities.": "Les options famille étaient faciles à comparer, surtout les hôtels, transferts et activités.",
    "I liked that the platform kept the quote, agency messages, and booking details together.": "J'ai aimé que la plateforme garde le devis, les messages d'agence et les détails de réservation ensemble.",
    "It felt simple. We selected the style, checked the offer, and contacted the agency quickly.": "C'était simple. Nous avons choisi le style, vérifié l'offre et contacté l'agence rapidement.",
    "Can users book a ready package?": "Les utilisateurs peuvent-ils réserver une offre prête ?",
    "Yes. They can browse packages, open details, and continue to booking.": "Oui. Ils peuvent parcourir les forfaits, ouvrir les détails et continuer vers la réservation.",
    "What if the package is not enough?": "Et si le forfait ne suffit pas ?",
    "They can start a custom trip and send agencies a clear personal request.": "Ils peuvent lancer un voyage sur mesure et envoyer aux agences une demande personnelle claire.",
    "Can agencies send and compare offers later?": "Les agences peuvent-elles envoyer et comparer des offres plus tard ?",
    "Yes. The platform is ready for offers, booking items, and price quotes, so agencies can manage comparisons as the backend grows.": "Oui. La plateforme est prête pour les offres, les éléments de réservation et les devis, afin que les agences puissent gérer les comparaisons à mesure que le backend évolue.",
    "Does search support trip type?": "La recherche prend-elle en charge le type de voyage ?",
    "The Home search sends destination, date, travelers, and trip type to the packages flow.": "La recherche de l'accueil envoie destination, date, voyageurs et type de voyage vers le parcours des forfaits.",
    "Recommended duration": "Durée recommandée",
    "Best season": "Meilleure saison",
    "Best for": "Idéal pour",
    "All year": "Toute l'année",
    "Spring or autumn": "Printemps ou automne",
    "Culture": "Culture",
    "Cultural": "Culturel",
    "Romantic": "Romantique",
    "Luxury": "Luxe",
    "City": "Ville",
    "Relax": "Détente",
    "Seaside": "Bord de mer",
    "Heritage": "Patrimoine",
    "All": "Tout",
    "Popular": "Populaire",
    "Classic": "Classique",
    "Easy": "Facile",
    "Value": "Bon plan",
    "Calm": "Calme",
    "Escape": "Évasion",
    "Morocco Deal": "Offre Maroc",
    "Adventure Pick": "Choix aventure",
    "Religious Trip": "Voyage religieux",
    "Agency": "Agence",
    "Marrakech": "Marrakech",
    "Casablanca": "Casablanca",
    "Chefchaouen": "Chefchaouen",
    "Paris": "Paris",
    "Rome": "Rome",
    "Istanbul": "Istanbul",
    "Kyoto": "Kyoto",
    "Dubai": "Dubaï",
    "Cairo": "Le Caire",
    "Zanzibar": "Zanzibar",
    "Bali": "Bali",
    "Barcelona": "Barcelone",
    "Santorini": "Santorin",
    "Greece": "Grèce",
    "Swiss Alps": "Alpes suisses",
    "Switzerland": "Suisse",
    "Italy": "Italie",
    "Japan": "Japon",
    "Spain": "Espagne",
    "Egypt": "Égypte",
    "Tanzania": "Tanzanie",
    "Indonesia": "Indonésie",
    "United Arab Emirates": "Émirats arabes unis",
    "Turkiye": "Turquie",
    "Moroccan dirham": "Dirham marocain",
    "Euro": "Euro",
    "United States dollar": "Dollar américain",
    "British pound": "Livre sterling",
    "United States": "États-Unis",
    "Privacy": "Confidentialité",
    "Back to top": "Retour en haut",
    "Curated travel planning with direct agency support and smoother booking flows.": "Planification de voyage sélectionnée avec support direct des agences et réservation plus fluide.",
    "Smarter travel planning with trusted agencies, curated packages, and support that stays close to every trip.": "Planification plus intelligente avec agences de confiance, forfaits sélectionnés et support proche de chaque voyage.",
    "(c) 2026 NextTrip. All rights reserved.": "(c) 2026 NextTrip. Tous droits réservés.",
  },
  ara: {
    "Home": "الرئيسية",
    "Experiences": "التجارب",
    "Packages": "الباقات",
    "Offers": "العروض",
    "Destinations": "الوجهات",
    "About Us": "من نحن",
    "About us": "من نحن",
    "Sign In": "تسجيل الدخول",
    "Language": "اللغة",
    "Currency": "العملة",
    "English": "الإنجليزية",
    "French": "الفرنسية",
    "Arabic": "العربية",
    "United Kingdom": "المملكة المتحدة",
    "France": "فرنسا",
    "Morocco": "المغرب",
    "Europe": "أوروبا",
    "Africa": "أفريقيا",
    "Asia": "آسيا",
    "Start": "ابدأ",
    "Explore": "استكشف",
    "Travel styles": "أنماط السفر",
    "Support": "الدعم",
    "Policies": "السياسات",
    "Create Trip": "إنشاء رحلة",
    "Agencies": "الوكالات",
    "Individual": "فردي",
    "Group": "مجموعة",
    "Family": "عائلة",
    "Religion": "ديني",
    "Honeymoon": "شهر العسل",
    "Adventures": "مغامرات",
    "Adventure": "مغامرة",
    "Contact Us": "اتصل بنا",
    "Contact us": "اتصل بنا",
    "Privacy Policy": "سياسة الخصوصية",
    "Terms of Service": "شروط الخدمة",
    "Privacy policy": "سياسة الخصوصية",
    "Terms of service": "شروط الخدمة",
    "Refund policy": "سياسة الاسترجاع",
    "Cancellation policy": "سياسة الإلغاء",
    "Help center": "مركز المساعدة",
    "FAQ": "الأسئلة الشائعة",
    "Services": "الخدمات",
    "Reviews": "التقييمات",
    "Company": "الشركة",
    "Discover": "اكتشف",
    "Help": "المساعدة",
    "Back home": "العودة للرئيسية",
    "Plan smarter with NextTrip": "خطط بذكاء أكثر مع NextTrip",
    "Find packages, compare offers, or send a clear custom trip request.": "اعثر على الباقات، قارن العروض، أو أرسل طلب رحلة مخصصا بوضوح.",
    "Sign in to continue": "سجل الدخول للمتابعة",
    "Travel more, for less": "سافر أكثر بتكلفة أقل",
    "Packages, custom trips, and agency offers in one place.": "باقات، رحلات مخصصة، وعروض وكالات في مكان واحد.",
    "Custom travel workspace": "مساحة سفر مخصصة",
    "Create a personal trip request.": "أنشئ طلب رحلة شخصيا.",
    "A simple flow from idea to offer": "مسار بسيط من الفكرة إلى العرض",
    "How NextTrip helps": "كيف يساعدك NextTrip",
    "Choose your mood": "اختر جو الرحلة",
    "Family trips, adventure, faith travel, luxury, or calm stays.": "رحلات عائلية، مغامرة، سفر إيماني، رفاهية أو إقامات هادئة.",
    "Compare agencies": "قارن الوكالات",
    "One request can bring several clear offers.": "يمكن لطلب واحد أن يجلب عدة عروض واضحة.",
    "Move to booking": "انتقل إلى الحجز",
    "Pick the best match and continue with confidence.": "اختر الأنسب وتابع بثقة.",
    "Tell agencies exactly what you need.": "أخبر الوكالات بما تحتاجه بالضبط.",
    "Use this when ready packages are not enough. Write the trip you want once, keep the details organized, and let agencies send offers that match your real needs.": "استعمل هذا عندما لا تكفي الباقات الجاهزة. اكتب الرحلة التي تريدها مرة واحدة، واجعل التفاصيل منظمة، ودع الوكالات ترسل عروضا تناسب احتياجاتك.",
    "This personal card collects your destination, date, travelers, budget, hotel level, transport, and preferences before any agency replies.": "هذه البطاقة تجمع الوجهة، التاريخ، المسافرين، الميزانية، مستوى الفندق، النقل، والتفضيلات قبل رد أي وكالة.",
    "Choose the vibe": "اختر الأجواء",
    "Tell agencies if you want calm, adventure, culture, family comfort, or luxury.": "أخبر الوكالات إن كنت تريد هدوءا، مغامرة، ثقافة، راحة عائلية، أو رفاهية.",
    "Set the basics": "حدد الأساسيات",
    "Add destination, dates, budget, travelers, hotel level, and transport needs.": "أضف الوجهة، التواريخ، الميزانية، المسافرين، مستوى الفندق، واحتياجات النقل.",
    "Compare replies": "قارن الردود",
    "Agencies answer with organized offers so you can choose without confusion.": "ترد الوكالات بعروض منظمة لتختار بدون ارتباك.",
    "Custom request": "طلب مخصص",
    "Plan your trip your way.": "خطط رحلتك بطريقتك.",
    "Add the basics and send one clear request to agencies.": "أضف الأساسيات وأرسل طلبا واضحا واحدا للوكالات.",
    "Destination": "الوجهة",
    "Dates": "التواريخ",
    "Hotel level": "مستوى الفندق",
    "Start custom trip": "ابدأ رحلة مخصصة",
    "How it works": "كيف يعمل",
    "From first search to clear choice": "من أول بحث إلى اختيار واضح",
    "A short flow that helps users understand the platform before they open details or create a custom request.": "مسار قصير يساعد المستخدمين على فهم المنصة قبل فتح التفاصيل أو إنشاء طلب مخصص.",
    "Search with real context": "ابحث بسياق حقيقي",
    "Choose a destination, travel date, travelers, and trip type before comparing packages.": "اختر الوجهة، تاريخ السفر، عدد المسافرين ونوع الرحلة قبل مقارنة الباقات.",
    "Compare clear options": "قارن خيارات واضحة",
    "Compare ready offers, standard packages, and agency replies in a clearer flow.": "قارن العروض الجاهزة، الباقات القياسية وردود الوكالات في مسار أوضح.",
    "Open details or customize": "افتح التفاصيل أو خصص",
    "Continue with a package detail page or create a personal request when needed.": "تابع عبر صفحة تفاصيل الباقة أو أنشئ طلبا شخصيا عند الحاجة.",
    "Featured destinations": "وجهات مميزة",
    "Choose your next direction": "اختر وجهتك التالية",
    "A compact destination deck across Africa, Europe, and Asia. Hover the card to open the places and compare them quickly.": "مجموعة مختصرة من الوجهات عبر أفريقيا وأوروبا وآسيا. مرر على البطاقة لاكتشاف الأماكن ومقارنتها بسرعة.",
    "Hover to discover": "مرر للاكتشاف",
    "One deck, four travel moods.": "مجموعة واحدة، أربع أجواء سفر.",
    "Explore destination": "استكشف الوجهة",
    "Agency offers": "عروض الوكالات",
    "Offers ready to compare": "عروض جاهزة للمقارنة",
    "These cards are agency offers with clear prices, trip types, durations, and details.": "تعرض هذه البطاقات عروض وكالات بأسعار وأنواع رحلات ومدد وتفاصيل واضحة.",
    "Agency offer": "عرض وكالة",
    "Standard packages": "باقات قياسية",
    "Simpler package options": "خيارات باقات أبسط",
    "Standard packages for users who want a straightforward trip option without a custom request.": "باقات قياسية للمستخدمين الذين يريدون خيار رحلة مباشرا بدون طلب مخصص.",
    "Real traveler stories": "قصص مسافرين حقيقية",
    "Cards move like reviews, and every experience opens its detail page.": "تتحرك البطاقات مثل التقييمات، وكل تجربة تفتح صفحة تفاصيلها.",
    "View detail": "عرض التفاصيل",
    "Why choose NextTrip?": "لماذا تختار NextTrip؟",
    "Clear trips before you book.": "رحلات واضحة قبل الحجز.",
    "Compare ready packages, personal requests, agency replies, and booking details in one simple travel flow.": "قارن الباقات الجاهزة، الطلبات الشخصية، ردود الوكالات، وتفاصيل الحجز في مسار سفر بسيط.",
    "Trip brief": "ملخص الرحلة",
    "Better decision": "قرار أفضل",
    "Verified agency flow": "مسار وكالة موثوق",
    "Travelers send clear requests, and agencies respond from one organized workspace.": "يرسل المسافرون طلبات واضحة وتجيب الوكالات من مساحة منظمة واحدة.",
    "Simple personalization": "تخصيص بسيط",
    "Choose a destination, travel date, travel type, budget, guests, and preferences without confusion.": "اختر الوجهة، التاريخ، نوع السفر، الميزانية، الضيوف، والتفضيلات بدون ارتباك.",
    "Cleaner communication": "تواصل أوضح",
    "Keep offers, messages, booking details, and support connected to the same trip.": "احتفظ بالعروض، الرسائل، تفاصيل الحجز، والدعم قرب نفس الرحلة.",
    "Comparison ready": "جاهز للمقارنة",
    "3 offers": "3 عروض",
    "Same request, clearer choices.": "نفس الطلب، خيارات أوضح.",
    "See how it feels": "شاهد التجربة",
    "Built for clear decisions": "مصمم لقرارات واضحة",
    "Less noise before booking.": "تشويش أقل قبل الحجز.",
    "NextTrip keeps the important travel details visible: destination, date, travelers, trip type, agency offer, price, and support.": "يحافظ NextTrip على التفاصيل المهمة ظاهرة: الوجهة، التاريخ، المسافرون، نوع الرحلة، عرض الوكالة، السعر، والدعم.",
    "Verified agency offers": "عروض وكالات موثوقة",
    "Keep agency names, prices, dates, and package details easy to compare.": "اجعل أسماء الوكالات والأسعار والتواريخ وتفاصيل الباقات سهلة المقارنة.",
    "Personal trip requests": "طلبات رحلات شخصية",
    "Send one organized brief instead of repeating the same details many times.": "أرسل ملخصا منظما واحدا بدل تكرار نفس التفاصيل مرات عديدة.",
    "Booking-ready details": "تفاصيل جاهزة للحجز",
    "Move from discovery to details and booking with fewer confusing steps.": "انتقل من الاكتشاف إلى التفاصيل والحجز بخطوات أقل إرباكا.",
    "Happy Travelers": "مسافرون سعداء",
    "Agency Partners": "وكالات شريكة",
    "Curated Packages": "باقات مختارة",
    "Quick answers": "إجابات سريعة",
    "Questions users ask first": "أسئلة قد يطرحها المستخدمون أولا",
    "Short answers near the end of the home page reduce confusion before people move to packages or custom trips.": "إجابات قصيرة قرب نهاية الصفحة الرئيسية تقلل الحيرة قبل الانتقال إلى الباقات أو الرحلات المخصصة.",
    "Ready when the user is ready": "جاهز عندما يكون المستخدم جاهزا",
    "Choose a package or build a personal trip.": "اختر باقة أو ابن رحلة شخصية.",
    "Users can start with ready-made packages, then move to a custom request if they need more control over budget, hotel level, transport, or travel style.": "يمكن للمستخدمين البدء بباقات جاهزة، ثم الانتقال إلى طلب مخصص إذا احتاجوا تحكما أكبر في الميزانية أو الفندق أو النقل أو نمط السفر.",
    "Browse packages": "تصفح الباقات",
    "Ready to Start Your Adventure?": "هل أنت مستعد لبدء مغامرتك؟",
    "Join 50k+ travelers getting weekly secret deals and destination inspiration.": "انضم إلى أكثر من 50 ألف مسافر يحصلون أسبوعيا على عروض سرية وإلهام للوجهات.",
    "Subscribe": "اشترك",
    "Your email address": "بريدك الإلكتروني",
    "Enter your email": "أدخل بريدك الإلكتروني",
    "Where to?": "إلى أين؟",
    "When?": "متى؟",
    "Trip type": "نوع الرحلة",
    "Travelers": "المسافرون",
    "Add guests": "أضف المسافرين",
    "Search": "بحث",
    "Casablanca - Anywhere": "الدار البيضاء - أي مكان",
    "Popular destination": "وجهة مشهورة",
    "No destination found": "لم يتم العثور على وجهة",
    "Choose travel date": "اختر تاريخ السفر",
    "Clear": "مسح",
    "Today": "اليوم",
    "Adults": "بالغون",
    "Children": "أطفال",
    "Infants": "رضع",
    "Pets": "حيوانات أليفة",
    "Ages 13 or above": "13 سنة أو أكثر",
    "Ages 2-12": "من 2 إلى 12 سنة",
    "Under 2": "أقل من سنتين",
    "Service animals welcome": "حيوانات الخدمة مرحب بها",
    "CURATED TRAVEL PACKAGES": "باقات سفر مختارة",
    "AGENCY OFFERS": "عروض الوكالات",
    "SECURE BOOKING": "حجز آمن",
    "Booking details": "تفاصيل الحجز",
    "Discover handpicked packages designed for romance, adventure, culture, and unforgettable escapes.": "اكتشف باقات مختارة للرومانسية والمغامرة والثقافة والرحلات التي لا تنسى.",
    "Compare highlighted agency offers with clear prices, trip styles, and booking details.": "قارن عروض الوكالات المميزة بأسعار وأنماط سفر وتفاصيل حجز واضحة.",
    "Explore our premium packages": "استكشف باقاتنا المميزة",
    "FIND YOUR NEXT TRIP": "اعثر على رحلتك القادمة",
    "Search by title, destination, or category": "ابحث بالعنوان أو الوجهة أو الفئة",
    "Search from Home": "بحث من الرئيسية",
    "Available packages": "الباقات المتاحة",
    "Available offers": "العروض المتاحة",
    "packages found": "باقة متاحة",
    "offers found": "عرض متاح",
    "No exact match found yet.": "لم يتم العثور على باقة مطابقة بعد.",
    "Try another destination, choose a broader category, or clear filters to see every available package.": "جرب وجهة أخرى، اختر فئة أوسع، أو امسح الفلاتر لرؤية كل الباقات المتاحة.",
    "Show all results": "عرض كل الباقات",
    "Details": "التفاصيل",
    "Book now ->": "احجز الآن ->",
    "Offer": "عرض",
    "Destination Finder": "مكتشف الوجهات",
    "Pick a city, watch the mood, then plan smarter.": "اختر مدينة، شاهد الأجواء، ثم خطط بذكاء.",
    "Explore city ideas across Morocco, Europe, Asia, and Africa. Click any city to open a short video preview, useful details, and a simple definition before choosing a package or custom trip.": "استكشف أفكار مدن في المغرب وأوروبا وآسيا وأفريقيا. اضغط على أي مدينة لفتح فيديو قصير وتفاصيل مفيدة قبل اختيار باقة أو رحلة مخصصة.",
    "Browse Packages": "تصفح الباقات",
    "Create custom trip": "إنشاء رحلة مخصصة",
    "Click a city card to open video, details, season, and highlights.": "اضغط على بطاقة مدينة لفتح الفيديو والتفاصيل والموسم والنقاط البارزة.",
    "City library": "مكتبة المدن",
    "Search by city or filter by region. Every card opens a focused city preview.": "ابحث بالمدينة أو صف حسب المنطقة. كل بطاقة تفتح معاينة مركزة للمدينة.",
    "Search Marrakech, Paris, Kyoto...": "ابحث عن مراكش، باريس، كيوتو...",
    "Destination regions": "مناطق الوجهات",
    "No city found yet. Try another name or switch the region filter.": "لم يتم العثور على مدينة بعد. جرب اسما آخر أو غير فلتر المنطقة.",
    "Travel moods": "أجواء السفر",
    "Use destinations as a starting point, not the final decision.": "استعمل الوجهات كنقطة بداية، لا كقرار نهائي.",
    "City breaks": "رحلات مدن قصيرة",
    "Beach escapes": "رحلات شاطئية",
    "Religious trips": "رحلات دينية",
    "Adventure routes": "مسارات مغامرة",
    "Family holidays": "عطل عائلية",
    "Luxury stays": "إقامات فاخرة",
    "Riads, souks, desert add-ons, and warm Moroccan city energy.": "رياضات وأسواق وخيارات صحراء وطاقة مغربية دافئة.",
    "White villages, sunset views, boutique stays, and calm sea moments.": "قرى بيضاء، مناظر الغروب، إقامات بوتيك ولحظات بحر هادئة.",
    "Temples, gardens, quiet neighborhoods, and refined cultural routes.": "معابد وحدائق وأحياء هادئة ومسارات ثقافية راقية.",
    "Soft beaches, island hotels, spice tours, and easy tropical pacing.": "شواطئ ناعمة، فنادق جزر، جولات توابل وإيقاع استوائي هادئ.",
    "Vibrant souks, blue lanes, and a handcrafted cultural route.": "أسواق نابضة، أزقة زرقاء ومسار ثقافي مصمم بعناية.",
    "A romantic journey through Italy's most iconic coastline.": "رحلة رومانسية عبر أشهر ساحل في إيطاليا.",
    "Calm gardens, old temples, and timeless local traditions.": "حدائق هادئة، معابد قديمة وتقاليد محلية خالدة.",
    "Oceanfront stays, peaceful vibes, and tropical slow living.": "إقامات أمام المحيط، أجواء هادئة ونمط استوائي بطيء.",
    "A simple city escape with hotel, transfer, and guided highlights.": "رحلة مدينة بسيطة مع فندق وتنقل وجولات موجهة.",
    "A short modern getaway with flexible activities and shopping time.": "رحلة عصرية قصيرة بأنشطة مرنة ووقت للتسوق.",
    "A practical cultural stay with old city walks and local food.": "إقامة ثقافية عملية مع جولات في المدينة القديمة وطعام محلي.",
    "Sunny streets, food stops, and a calm pace for easy discovery.": "شوارع مشمسة، توقفات طعام وإيقاع هادئ لاكتشاف سهل.",
    "A peaceful luxury stay with sunset views and clear agency support.": "إقامة فاخرة هادئة مع إطلالات غروب ودعم واضح من الوكالة.",
    "Temples, old streets, calm gardens, and a balanced cultural route.": "معابد، شوارع قديمة، حدائق هادئة ومسار ثقافي متوازن.",
    "Mountain air, train routes, and premium lodge memories.": "هواء الجبال، مسارات القطار وذكريات إقامة مميزة.",
    "User reviews": "آراء المستخدمين",
    "What travelers say": "ماذا يقول المسافرون",
    "Reviews move automatically so the section feels alive instead of showing only three static cards.": "تتحرك الآراء تلقائيا ليبدو القسم حيا بدل عرض ثلاث بطاقات ثابتة فقط.",
    "Traveler": "مسافر",
    "Agency client": "عميل وكالة",
    "Family traveler": "مسافر عائلي",
    "Adventure traveler": "مسافر مغامر",
    "Couple trip": "رحلة زوجين",
    "NextTrip made planning very easy. I customized everything, and the agency replied quickly.": "جعل NextTrip التخطيط سهلا جدا. خصصت كل شيء وردت الوكالة بسرعة.",
    "The real-time pricing and direct communication saved me time and helped me make a better choice.": "ساعدني التسعير الفوري والتواصل المباشر على توفير الوقت واتخاذ قرار أفضل.",
    "A clear experience, beautiful offers, and I loved how flexible the trip customization was.": "تجربة واضحة، عروض جميلة، وأعجبتني مرونة تخصيص الرحلة.",
    "The family trip options were easy to compare, especially hotels, transfers, and activities.": "كانت خيارات الرحلات العائلية سهلة المقارنة، خاصة الفنادق والتنقلات والأنشطة.",
    "I liked that the platform kept the quote, agency messages, and booking details together.": "أعجبني أن المنصة جمعت العرض ورسائل الوكالة وتفاصيل الحجز في مكان واحد.",
    "It felt simple. We selected the style, checked the offer, and contacted the agency quickly.": "كانت التجربة بسيطة. اخترنا النمط، راجعنا العرض وتواصلنا مع الوكالة بسرعة.",
    "Can users book a ready package?": "هل يمكن للمستخدمين حجز باقة جاهزة؟",
    "Yes. They can browse packages, open details, and continue to booking.": "نعم. يمكنهم تصفح الباقات، فتح التفاصيل والمتابعة نحو الحجز.",
    "What if the package is not enough?": "ماذا لو لم تكن الباقة كافية؟",
    "They can start a custom trip and send agencies a clear personal request.": "يمكنهم بدء رحلة مخصصة وإرسال طلب شخصي واضح للوكالات.",
    "Can agencies send and compare offers later?": "هل يمكن للوكالات إرسال العروض ومقارنتها لاحقا؟",
    "Yes. The platform is ready for offers, booking items, and price quotes, so agencies can manage comparisons as the backend grows.": "نعم. المنصة جاهزة للعروض وعناصر الحجز وعروض الأسعار، حتى تتمكن الوكالات من إدارة المقارنات مع تطور الواجهة الخلفية.",
    "Does search support trip type?": "هل يدعم البحث نوع الرحلة؟",
    "The Home search sends destination, date, travelers, and trip type to the packages flow.": "بحث الصفحة الرئيسية يرسل الوجهة والتاريخ والمسافرين ونوع الرحلة إلى مسار الباقات.",
    "Recommended duration": "المدة المقترحة",
    "Best season": "أفضل موسم",
    "Best for": "الأفضل لـ",
    "All year": "طوال السنة",
    "Spring or autumn": "الربيع أو الخريف",
    "Culture": "ثقافة",
    "Cultural": "ثقافي",
    "Romantic": "رومانسي",
    "Luxury": "فاخر",
    "City": "مدينة",
    "Relax": "استرخاء",
    "Seaside": "شاطئي",
    "Heritage": "تراث",
    "All": "الكل",
    "Popular": "شائع",
    "Classic": "كلاسيكي",
    "Easy": "سهل",
    "Value": "قيمة",
    "Calm": "هادئ",
    "Escape": "هروب",
    "Morocco Deal": "عرض المغرب",
    "Adventure Pick": "اختيار المغامرة",
    "Religious Trip": "رحلة دينية",
    "Agency": "وكالة",
    "Marrakech": "مراكش",
    "Casablanca": "الدار البيضاء",
    "Chefchaouen": "شفشاون",
    "Paris": "باريس",
    "Rome": "روما",
    "Istanbul": "إسطنبول",
    "Kyoto": "كيوتو",
    "Dubai": "دبي",
    "Cairo": "القاهرة",
    "Zanzibar": "زنجبار",
    "Bali": "بالي",
    "Barcelona": "برشلونة",
    "Santorini": "سانتوريني",
    "Greece": "اليونان",
    "Swiss Alps": "جبال الألب السويسرية",
    "Switzerland": "سويسرا",
    "Italy": "إيطاليا",
    "Japan": "اليابان",
    "Spain": "إسبانيا",
    "Egypt": "مصر",
    "Tanzania": "تنزانيا",
    "Indonesia": "إندونيسيا",
    "United Arab Emirates": "الإمارات العربية المتحدة",
    "Turkiye": "تركيا",
    "Moroccan dirham": "الدرهم المغربي",
    "Euro": "اليورو",
    "United States dollar": "الدولار الأمريكي",
    "British pound": "الجنيه الإسترليني",
    "United States": "الولايات المتحدة",
    "Privacy": "الخصوصية",
    "Back to top": "العودة للأعلى",
    "Curated travel planning with direct agency support and smoother booking flows.": "تخطيط سفر مختار مع دعم مباشر من الوكالات وحجز أكثر سلاسة.",
    "Smarter travel planning with trusted agencies, curated packages, and support that stays close to every trip.": "تخطيط سفر أذكى مع وكالات موثوقة وباقات مختارة ودعم قريب من كل رحلة.",
    "(c) 2026 NextTrip. All rights reserved.": "(c) 2026 NextTrip. كل الحقوق محفوظة.",
  },
};

const supplementalTranslations = {
  fra: {
    "Travelers explore": "Les voyageurs explorent",
    "Users discover destinations, compare packages, and choose the travel style that matches their plan.": "Les utilisateurs découvrent des destinations, comparent des forfaits et choisissent le style de voyage qui correspond à leur projet.",
    "Agencies respond": "Les agences répondent",
    "Agencies receive clearer requests and manage packages, messages, and offers from a focused workspace.": "Les agences reçoivent des demandes plus claires et gèrent forfaits, messages et offres depuis un espace de travail dédié.",
    "Trips stay organized": "Les voyages restent organisés",
    "The journey moves from inspiration to booking with fewer scattered steps and better context.": "Le parcours passe de l'inspiration à la réservation avec moins d'étapes dispersées et un meilleur contexte.",
    "Support builds trust": "L'assistance renforce la confiance",
    "Help pages, policies, and communication flows make the platform safer and easier to understand.": "Les pages d'aide, les politiques et les échanges rendent la plateforme plus sûre et plus facile à comprendre.",
    "Email support": "Assistance par e-mail",
    "General questions, account help, and booking clarification.": "Questions générales, aide au compte et clarifications de réservation.",
    "Agency partnerships": "Partenariats avec les agences",
    "For agencies joining NextTrip or updating profile details.": "Pour les agences qui rejoignent NextTrip ou mettent à jour leur profil.",
    "Travel help": "Aide voyage",
    "For active booking issues, include your booking reference.": "Pour un problème de réservation en cours, ajoutez votre référence de réservation.",
    "Response target": "Objectif de réponse",
    "Within 24 hours": "Sous 24 heures",
    "Channels": "Canaux",
    "Email + support": "E-mail + assistance",
    "Coverage": "Couverture",
    "Morocco and worldwide": "Maroc et monde entier",
    "Your name": "Votre nom",
    "Optional": "Facultatif",
    "Tell us what you need help with...": "Expliquez-nous ce dont vous avez besoin...",
    "Before booking": "Avant la réservation",
    "Understand package details, included services, payment flow, and what to ask before reserving.": "Comprenez les détails du forfait, les services inclus, le paiement et les questions à poser avant de réserver.",
    "Agency contact": "Contact avec l'agence",
    "Get directed to the right agency conversation with the destination and package context included.": "Soyez orienté vers la bonne conversation avec l'agence, avec le contexte de destination et de forfait.",
    "After booking": "Après la réservation",
    "Follow next steps, prepare documents, and know what information your agency needs from you.": "Suivez les prochaines étapes, préparez vos documents et sachez quelles informations l'agence attend de vous.",
    "How do I compare two packages?": "Comment comparer deux forfaits ?",
    "Can I contact an agency before booking?": "Puis-je contacter une agence avant de réserver ?",
    "Where can I see booking details?": "Où puis-je voir les détails de réservation ?",
    "How do agencies receive my request?": "Comment les agences reçoivent-elles ma demande ?",
    "Simple trip flow": "Parcours de voyage simple",
    "Start by exploring packages, destinations, or travel styles that match your budget and mood.": "Commencez par explorer les forfaits, destinations ou styles de voyage qui correspondent à votre budget et à votre envie.",
    "Look at details, clarify what matters, and use agency communication when you need more precision.": "Consultez les détails, clarifiez ce qui compte et échangez avec l'agence si vous avez besoin de précision.",
    "Adjust dates, traveler count, style, or preferences before moving toward checkout.": "Ajustez les dates, le nombre de voyageurs, le style ou les préférences avant de passer au paiement.",
    "Complete the booking flow, review totals, and keep your receipt and support routes close.": "Terminez la réservation, vérifiez les totaux et gardez votre reçu et les options d'assistance à portée de main.",
    "Why this works better": "Pourquoi cela fonctionne mieux",
    "Travelers keep context instead of jumping across disconnected pages.": "Les voyageurs gardent le contexte au lieu de passer entre des pages déconnectées.",
    "Agencies receive clearer requests and can respond faster.": "Les agences reçoivent des demandes plus claires et peuvent répondre plus vite.",
    "Support pages and policies reduce uncertainty before payment.": "Les pages d'aide et les politiques réduisent l'incertitude avant le paiement.",
    "How It Works": "Comment ça marche",
    "From first idea to final booking, the trip flow is built to stay clear.": "De la première idée à la réservation finale, le parcours reste clair.",
    "This page explains the practical rhythm of NextTrip: discover, compare, customize, and confirm without losing your place.": "Cette page explique le rythme pratique de NextTrip : découvrir, comparer, personnaliser et confirmer sans perdre le fil.",
    "Flow summary": "Résumé du parcours",
    "Packages or destinations": "Forfaits ou destinations",
    "Middle": "Milieu",
    "Agency clarification": "Clarification avec l'agence",
    "Finish": "Fin",
    "Booking and receipt": "Réservation et reçu",
    "Backup": "Appui",
    "Support and FAQ": "Assistance et FAQ",
    "Try the real journey": "Essayez le vrai parcours",
    "If you want to experience the product instead of just reading about it, start from the packages page.": "Pour vivre l'expérience plutôt que seulement la lire, commencez par la page des forfaits.",
    "Open Packages": "Ouvrir les forfaits",
    "Open Support": "Ouvrir l'assistance",
    "What travelers value most": "Ce que les voyageurs apprécient le plus",
    "Fast planning": "Planification rapide",
    "Travelers consistently prefer flows where they can compare packages and ask agencies direct questions easily.": "Les voyageurs préfèrent les parcours où ils comparent les forfaits et posent facilement des questions directes aux agences.",
    "Clear communication": "Communication claire",
    "The more visible the next steps are, the more confident travelers feel before booking.": "Plus les prochaines étapes sont visibles, plus les voyageurs se sentent confiants avant de réserver.",
    "Flexible trips": "Voyages flexibles",
    "Good reviews usually mention customization, quick replies, and package details that feel easy to understand.": "Les bons avis mentionnent souvent la personnalisation, les réponses rapides et des détails de forfait faciles à comprendre.",
    "Reviews matter because travelers trust real experiences more than polished promises.": "Les avis comptent parce que les voyageurs font davantage confiance aux vraies expériences qu'aux promesses parfaites.",
    "Ready to explore with context?": "Prêt à explorer avec du contexte ?",
    "Use reviews as guidance, then move to live packages and real agency contact.": "Utilisez les avis comme repères, puis passez aux forfaits disponibles et au contact réel avec l'agence.",
    "Common questions": "Questions fréquentes",
    "Fast answers to the questions travelers ask most.": "Des réponses rapides aux questions que les voyageurs posent le plus.",
    "Best next pages": "Meilleures pages suivantes",
    "Still not answered?": "Vous n'avez pas encore la réponse ?",
    "Use a direct support channel and include the trip or booking context so the team can help faster.": "Utilisez un canal d'assistance direct et ajoutez le contexte du voyage ou de la réservation pour obtenir une aide plus rapide.",
    "Clear cancellation rules before every booking.": "Des règles d'annulation claires avant chaque réservation.",
    "Traveler cancellations": "Annulations des voyageurs",
    "Agency cancellations": "Annulations des agences",
    "Refund handling should remain transparent and easy to track.": "Le traitement des remboursements doit rester transparent et facile à suivre.",
    "Refund basics": "Bases du remboursement",
    "Questions about payment?": "Questions sur le paiement ?",
    "Contact support or review your bookings.": "Contactez l'assistance ou consultez vos réservations.",
    "Enter your full name": "Saisissez votre nom complet",
    "Enter your phone number": "Saisissez votre numéro de téléphone",
    "Add any note, room preference, food request, or airport pickup details...": "Ajoutez une note, une préférence de chambre, une demande de repas ou des détails de prise en charge à l'aéroport...",
    "Name on card": "Nom figurant sur la carte",
    "Booking successful": "Réservation confirmée",
    "Your package was booked successfully. Here is your detailed receipt.": "Votre forfait a été réservé avec succès. Voici votre reçu détaillé.",
    "Receipt actions": "Actions sur le reçu",
    "Download receipt": "Télécharger le reçu",
    "Send by email": "Envoyer par e-mail",
    "Receipt ready": "Reçu prêt",
    "Email draft ready": "Brouillon d'e-mail prêt",
    "Automatic estimate": "Estimation automatique",
    "Automatic season": "Saison automatique",
    "Good comfort on a budget": "Bon confort à petit budget",
    "Activities and active days": "Activités et journées actives",
    "Simple breakfast plan": "Petit-déjeuner simple",
    "All main meals included": "Tous les repas principaux inclus",
    "Private stay for groups": "Séjour privé pour les groupes",
    "Fast option for long distances": "Option rapide pour les longues distances",
    "Simple budget transport": "Transport économique simple",
    "Choose an option": "Choisissez une option",
    "Trip type": "Type de voyage",
    "Budget level": "Niveau de budget",
    "Travel style": "Style de voyage",
    "Meal plan": "Formule repas",
    "Estimated price": "Prix estimé",
    "Per traveler": "Par voyageur",
    "Target budget": "Budget cible",
    "Extra services": "Services supplémentaires",
    "Additional details": "Détails supplémentaires",
    "Hotel preference": "Préférence d'hôtel",
    "Transport preference": "Préférence de transport",
    "Departure date": "Date de départ",
    "Return date": "Date de retour",
    "Trip basics": "Bases du voyage",
    "Submit request": "Envoyer la demande",
    "Plan your trip": "Planifiez votre voyage",
    "Send request": "Envoyer la demande",
    "Trip summary": "Résumé du voyage",
    "Check the main details before sending the request.": "Vérifiez les détails principaux avant d'envoyer la demande."
  },
  ara: {
    "Travelers explore": "المسافرون يستكشفون",
    "Users discover destinations, compare packages, and choose the travel style that matches their plan.": "يكتشف المستخدمون الوجهات، يقارنون الباقات، ويختارون أسلوب السفر المناسب لخطتهم.",
    "Agencies respond": "الوكالات ترد",
    "Agencies receive clearer requests and manage packages, messages, and offers from a focused workspace.": "تتلقى الوكالات طلبات أوضح وتدير الباقات والرسائل والعروض من مساحة عمل مركزة.",
    "Trips stay organized": "الرحلات تبقى منظمة",
    "The journey moves from inspiration to booking with fewer scattered steps and better context.": "تنتقل الرحلة من الإلهام إلى الحجز بخطوات أقل تشتتا وسياق أوضح.",
    "Support builds trust": "الدعم يعزز الثقة",
    "Help pages, policies, and communication flows make the platform safer and easier to understand.": "صفحات المساعدة والسياسات ومسارات التواصل تجعل المنصة أكثر أمانا وأسهل فهما.",
    "Email support": "الدعم عبر البريد الإلكتروني",
    "General questions, account help, and booking clarification.": "أسئلة عامة، مساعدة الحساب، وتوضيحات الحجز.",
    "Agency partnerships": "شراكات الوكالات",
    "For agencies joining NextTrip or updating profile details.": "للوكالات التي تنضم إلى NextTrip أو تحدث بيانات ملفها.",
    "Travel help": "مساعدة السفر",
    "For active booking issues, include your booking reference.": "لمشاكل الحجز الجارية، أضف مرجع الحجز الخاص بك.",
    "Response target": "هدف الرد",
    "Within 24 hours": "خلال 24 ساعة",
    "Channels": "القنوات",
    "Email + support": "البريد الإلكتروني + الدعم",
    "Coverage": "التغطية",
    "Morocco and worldwide": "المغرب والعالم",
    "Your name": "اسمك",
    "Optional": "اختياري",
    "Tell us what you need help with...": "أخبرنا بما تحتاج إلى مساعدة فيه...",
    "Before booking": "قبل الحجز",
    "Understand package details, included services, payment flow, and what to ask before reserving.": "افهم تفاصيل الباقة، الخدمات المشمولة، مسار الدفع، وما يجب سؤاله قبل الحجز.",
    "Agency contact": "التواصل مع الوكالة",
    "Get directed to the right agency conversation with the destination and package context included.": "انتقل إلى المحادثة المناسبة مع الوكالة مع سياق الوجهة والباقة.",
    "After booking": "بعد الحجز",
    "Follow next steps, prepare documents, and know what information your agency needs from you.": "اتبع الخطوات التالية، حضر الوثائق، واعرف المعلومات التي تحتاجها الوكالة منك.",
    "How do I compare two packages?": "كيف أقارن بين باقتين؟",
    "Can I contact an agency before booking?": "هل يمكنني التواصل مع وكالة قبل الحجز؟",
    "Where can I see booking details?": "أين أجد تفاصيل الحجز؟",
    "How do agencies receive my request?": "كيف تتلقى الوكالات طلبي؟",
    "Simple trip flow": "مسار رحلة بسيط",
    "Start by exploring packages, destinations, or travel styles that match your budget and mood.": "ابدأ باستكشاف الباقات أو الوجهات أو أنماط السفر التي تناسب ميزانيتك ورغبتك.",
    "Look at details, clarify what matters, and use agency communication when you need more precision.": "راجع التفاصيل، وضح ما يهمك، وتواصل مع الوكالة عندما تحتاج إلى دقة أكبر.",
    "Adjust dates, traveler count, style, or preferences before moving toward checkout.": "عدل التواريخ، عدد المسافرين، الأسلوب أو التفضيلات قبل الانتقال إلى الدفع.",
    "Complete the booking flow, review totals, and keep your receipt and support routes close.": "أكمل مسار الحجز، راجع المجموع، واحتفظ بالإيصال وخيارات الدعم قريبة.",
    "Why this works better": "لماذا يعمل هذا بشكل أفضل",
    "Travelers keep context instead of jumping across disconnected pages.": "يحافظ المسافرون على السياق بدل التنقل بين صفحات منفصلة.",
    "Agencies receive clearer requests and can respond faster.": "تتلقى الوكالات طلبات أوضح ويمكنها الرد بسرعة أكبر.",
    "Support pages and policies reduce uncertainty before payment.": "تقلل صفحات الدعم والسياسات من الغموض قبل الدفع.",
    "How It Works": "كيف يعمل",
    "From first idea to final booking, the trip flow is built to stay clear.": "من الفكرة الأولى إلى الحجز النهائي، يبقى مسار الرحلة واضحا.",
    "This page explains the practical rhythm of NextTrip: discover, compare, customize, and confirm without losing your place.": "تشرح هذه الصفحة إيقاع NextTrip العملي: اكتشف، قارن، خصص، وأكد دون أن تفقد مسارك.",
    "Flow summary": "ملخص المسار",
    "Packages or destinations": "الباقات أو الوجهات",
    "Middle": "المرحلة الوسطى",
    "Agency clarification": "توضيح مع الوكالة",
    "Finish": "النهاية",
    "Booking and receipt": "الحجز والإيصال",
    "Backup": "الدعم الاحتياطي",
    "Support and FAQ": "الدعم والأسئلة الشائعة",
    "Try the real journey": "جرب المسار الحقيقي",
    "If you want to experience the product instead of just reading about it, start from the packages page.": "إذا أردت تجربة المنتج بدل القراءة عنه فقط، ابدأ من صفحة الباقات.",
    "Open Packages": "افتح الباقات",
    "Open Support": "افتح الدعم",
    "What travelers value most": "ما يقدره المسافرون أكثر",
    "Fast planning": "تخطيط سريع",
    "Travelers consistently prefer flows where they can compare packages and ask agencies direct questions easily.": "يفضل المسافرون المسارات التي تمكنهم من مقارنة الباقات وطرح أسئلة مباشرة على الوكالات بسهولة.",
    "Clear communication": "تواصل واضح",
    "The more visible the next steps are, the more confident travelers feel before booking.": "كلما كانت الخطوات التالية أوضح، زادت ثقة المسافرين قبل الحجز.",
    "Flexible trips": "رحلات مرنة",
    "Good reviews usually mention customization, quick replies, and package details that feel easy to understand.": "غالبا ما تذكر التقييمات الجيدة التخصيص، الردود السريعة، وتفاصيل الباقات السهلة الفهم.",
    "Reviews matter because travelers trust real experiences more than polished promises.": "التقييمات مهمة لأن المسافرين يثقون بالتجارب الحقيقية أكثر من الوعود المصقولة.",
    "Ready to explore with context?": "جاهز للاستكشاف بسياق أوضح؟",
    "Use reviews as guidance, then move to live packages and real agency contact.": "استعمل التقييمات كدليل، ثم انتقل إلى الباقات المتاحة والتواصل الحقيقي مع الوكالة.",
    "Common questions": "أسئلة شائعة",
    "Fast answers to the questions travelers ask most.": "إجابات سريعة عن أكثر الأسئلة التي يطرحها المسافرون.",
    "Best next pages": "أفضل الصفحات التالية",
    "Still not answered?": "ما زلت لم تجد الجواب؟",
    "Use a direct support channel and include the trip or booking context so the team can help faster.": "استعمل قناة دعم مباشرة وأضف سياق الرحلة أو الحجز حتى يساعدك الفريق بسرعة أكبر.",
    "Clear cancellation rules before every booking.": "قواعد إلغاء واضحة قبل كل حجز.",
    "Traveler cancellations": "إلغاءات المسافرين",
    "Agency cancellations": "إلغاءات الوكالات",
    "Refund handling should remain transparent and easy to track.": "يجب أن تبقى معالجة الاسترداد شفافة وسهلة التتبع.",
    "Refund basics": "أساسيات الاسترداد",
    "Questions about payment?": "أسئلة حول الدفع؟",
    "Contact support or review your bookings.": "تواصل مع الدعم أو راجع حجوزاتك.",
    "Enter your full name": "أدخل اسمك الكامل",
    "Enter your phone number": "أدخل رقم هاتفك",
    "Add any note, room preference, food request, or airport pickup details...": "أضف أي ملاحظة، تفضيل غرفة، طلب طعام أو تفاصيل الاستقبال من المطار...",
    "Name on card": "الاسم على البطاقة",
    "Booking successful": "تم الحجز بنجاح",
    "Your package was booked successfully. Here is your detailed receipt.": "تم حجز باقتك بنجاح. هذا هو إيصالك المفصل.",
    "Receipt actions": "إجراءات الإيصال",
    "Download receipt": "تنزيل الإيصال",
    "Send by email": "الإرسال عبر البريد الإلكتروني",
    "Receipt ready": "الإيصال جاهز",
    "Email draft ready": "مسودة البريد جاهزة",
    "Automatic estimate": "تقدير تلقائي",
    "Automatic season": "موسم تلقائي",
    "Good comfort on a budget": "راحة جيدة بميزانية مناسبة",
    "Activities and active days": "أنشطة وأيام نشيطة",
    "Simple breakfast plan": "خطة إفطار بسيطة",
    "All main meals included": "كل الوجبات الرئيسية مشمولة",
    "Private stay for groups": "إقامة خاصة للمجموعات",
    "Fast option for long distances": "خيار سريع للمسافات الطويلة",
    "Simple budget transport": "نقل اقتصادي بسيط",
    "Choose an option": "اختر خيارا",
    "Trip type": "نوع الرحلة",
    "Budget level": "مستوى الميزانية",
    "Travel style": "أسلوب السفر",
    "Meal plan": "خطة الوجبات",
    "Estimated price": "السعر التقديري",
    "Per traveler": "لكل مسافر",
    "Target budget": "الميزانية المستهدفة",
    "Extra services": "خدمات إضافية",
    "Additional details": "تفاصيل إضافية",
    "Hotel preference": "تفضيل الفندق",
    "Transport preference": "تفضيل النقل",
    "Departure date": "تاريخ المغادرة",
    "Return date": "تاريخ العودة",
    "Trip basics": "أساسيات الرحلة",
    "Submit request": "إرسال الطلب",
    "Plan your trip": "خطط رحلتك",
    "Send request": "إرسال الطلب",
    "Trip summary": "ملخص الرحلة",
    "Check the main details before sending the request.": "راجع التفاصيل الرئيسية قبل إرسال الطلب."
  },
};

Object.entries(supplementalTranslations).forEach(([code, entries]) => {
  Object.assign(translations[code], entries);
});

const contentTranslations = {
  fra: {
    "Santorini Sunset Dream": "Rêve au coucher du soleil à Santorin",
    "Kyoto Heritage Journey": "Voyage patrimonial à Kyoto",
    "Swiss Alpine Escape": "Évasion dans les Alpes suisses",
    "Morocco Magic": "Magie du Maroc",
    "Amalfi Coast": "Côte amalfitaine",
    "Kyoto Zen": "Zen à Kyoto",
    "Bali Retreat": "Retraite à Bali",
    "Paris City Break": "Escapade urbaine à Paris",
    "Dubai Easy Escape": "Évasion facile à Dubaï",
    "Istanbul Weekend": "Week-end à Istanbul",
    "Lisbon Light Trip": "Voyage léger à Lisbonne",
    "Dubai Skyline Experience": "Expérience skyline à Dubaï",
    "Bali Wellness Retreat": "Retraite bien-être à Bali",
    "Amalfi Coast Escape": "Évasion sur la côte amalfitaine",
    "Morocco Magic Route": "Route magique du Maroc",
    "Atlas Adventure Circuit": "Circuit aventure dans l'Atlas",
    "Umrah Serenity Package": "Forfait Omra sérénité",
    "Marrakech Flash Escape": "Évasion express à Marrakech",
    "Istanbul Weekend Deal": "Offre week-end à Istanbul",
    "Dubai Family Saver": "Offre famille à Dubaï",
    "Paris Spring Promo": "Promo printemps à Paris",
    "Bali Calm Offer": "Offre détente à Bali",
    "Lisbon Light Deal": "Offre légère à Lisbonne",
    "Atlas Group Discount": "Réduction groupe dans l'Atlas",
    "Rome Heritage Special": "Spécial patrimoine à Rome",
    "Umrah Early Saver": "Omra réservation anticipée",
    "Tokyo Food Route": "Route gastronomique à Tokyo",
    "Nara Day Escape": "Évasion d'une journée à Nara",
    "UAE": "Émirats arabes unis",
    "Portugal": "Portugal",
    "Saudi Arabia": "Arabie saoudite",
    "Turkey": "Turquie",
    "Lisbon": "Lisbonne",
    "Zermatt": "Zermatt",
    "Ubud": "Ubud",
    "Amalfi": "Amalfi",
    "High Atlas": "Haut Atlas",
    "Makkah": "La Mecque",
    "Imlil": "Imlil",
    "Couples Deal": "Offre couples",
    "Culture Pick": "Sélection culturelle",
    "Premium Deal": "Offre premium",
    "City Break": "Escapade urbaine",
    "Wellness Deal": "Offre bien-être",
    "Seaside Deal": "Offre bord de mer",
    "Limited Offer": "Offre limitée",
    "Weekend Deal": "Offre week-end",
    "Family Offer": "Offre famille",
    "Spring Promo": "Promo printemps",
    "Wellness Offer": "Offre bien-être",
    "City + Sea": "Ville + mer",
    "Group Discount": "Réduction groupe",
    "Heritage Special": "Spécial patrimoine",
    "Early Saver": "Réservation anticipée",
    "Moderate": "Modéré",
    "A peaceful luxury stay with sunset views and clear agency support.": "Un séjour de luxe paisible avec vue sur le coucher du soleil et un accompagnement clair de l'agence.",
    "Temples, old streets, calm gardens, and a balanced cultural route.": "Temples, vieilles rues, jardins calmes et un itinéraire culturel équilibré.",
    "Mountain air, train routes, and premium lodge memories.": "Air de montagne, trajets en train et souvenirs dans un lodge premium.",
    "White cliffside houses, sea views, boutique stays, and unforgettable sunset moments.": "Maisons blanches sur les falaises, vues sur la mer, séjours boutique et couchers de soleil inoubliables.",
    "Traditional temples, quiet streets, gardens, and a calm cultural atmosphere.": "Temples traditionnels, rues calmes, jardins et atmosphère culturelle apaisante.",
    "Snowy peaks, premium chalets, scenic train rides, and peaceful alpine comfort.": "Sommets enneigés, chalets premium, trains panoramiques et confort alpin paisible.",
    "Modern luxury, iconic towers, premium shopping, and an energetic city break.": "Luxe moderne, tours iconiques, shopping premium et escapade urbaine énergique.",
    "Tropical greenery, peaceful villas, spa moments, and serene island energy.": "Verdure tropicale, villas paisibles, moments spa et énergie insulaire sereine.",
    "Colorful coastal towns, cliffside roads, sea views, and elegant Italian charm.": "Villages côtiers colorés, routes en falaise, vues sur mer et charme italien élégant.",
    "Riads, souks, guided city moments, and a warm Moroccan cultural route.": "Riads, souks, visites guidées et parcours culturel marocain chaleureux.",
    "Mountain villages, scenic valleys, light trekking, and active outdoor days.": "Villages de montagne, vallées panoramiques, trekking léger et journées actives en plein air.",
    "A calm religious travel package with hotel planning and organized support.": "Une formule de voyage religieux calme avec planification d'hôtel et accompagnement organisé.",
    "A short riad stay with medina walks, airport pickup, and a clear city plan.": "Un court séjour en riad avec balades dans la médina, accueil à l'aéroport et programme clair.",
    "Hotel, airport transfer, old city highlights, and a practical short-stay route.": "Hôtel, transfert aéroport, incontournables de la vieille ville et itinéraire court pratique.",
    "Family-friendly hotel, transfers, skyline stops, and optional desert evening.": "Hôtel adapté aux familles, transferts, vues urbaines et soirée désert optionnelle.",
    "A compact Paris stay with hotel, transfer help, viewpoints, and café routes.": "Un séjour compact à Paris avec hôtel, aide au transfert, points de vue et parcours cafés.",
    "Villa-style stay, greenery, spa suggestions, and relaxed island planning.": "Séjour style villa, verdure, suggestions spa et planification insulaire détendue.",
    "Sunny streets, viewpoints, coastal day options, and simple hotel planning.": "Rues ensoleillées, points de vue, options de journée côtière et planification d'hôtel simple.",
    "Mountain weekend with guesthouse stay, local guide, and light trekking.": "Week-end montagne avec maison d'hôtes, guide local et trekking léger.",
    "Classic Rome stay with hotel planning, old city walks, and food-route tips.": "Séjour classique à Rome avec hôtel, balades dans la vieille ville et conseils gourmands.",
    "Organized religious stay with hotel planning, transfer support, and clear timing.": "Séjour religieux organisé avec planification d'hôtel, transferts et horaires clairs.",
    "One of the best trips I ever had. The sunset view from the hotel was amazing and the whole experience felt peaceful and luxurious.": "L'un des meilleurs voyages que j'aie faits. La vue sur le coucher de soleil depuis l'hôtel était magnifique et toute l'expérience était paisible et luxueuse.",
    "Kyoto was calm, elegant, and full of culture. The temples, streets, and traditional atmosphere made the trip unforgettable.": "Kyoto était calme, élégante et pleine de culture. Les temples, les rues et l'atmosphère traditionnelle ont rendu le voyage inoubliable.",
    "Everything felt premium, from the train ride to the mountain lodge. The scenery was unreal and the air was so fresh.": "Tout paraissait premium, du trajet en train au lodge de montagne. Les paysages étaient incroyables et l'air très pur.",
    "NextTrip made planning very easy. I customized everything, and the agency replied quickly.": "NextTrip a rendu la planification très simple. J'ai tout personnalisé et l'agence a répondu rapidement.",
    "The real-time pricing and direct communication saved me time and helped me make a better choice.": "Les prix en temps réel et la communication directe m'ont fait gagner du temps et m'ont aidé à faire un meilleur choix.",
    "A clear experience, beautiful offers, and I loved how flexible the trip customization was.": "Une expérience claire, de belles offres, et j'ai beaucoup aimé la flexibilité de la personnalisation du voyage.",
    "The view looks incredible.": "La vue est incroyable.",
    "I want to book this one too!": "Je veux aussi réserver celui-ci !",
    "This post makes me want to visit Japan.": "Cette publication me donne envie de visiter le Japon.",
    "The mountains here are beautiful.": "Les montagnes ici sont magnifiques.",
    "This looks like a dream trip.": "Cela ressemble à un voyage de rêve.",
    "Agency client": "Client d'agence",
    "Family traveler": "Voyageuse en famille",
    "Adventure traveler": "Voyageur d'aventure",
    "Couple trip": "Voyage en couple",
  },
  ara: {
    "Santorini Sunset Dream": "حلم غروب سانتوريني",
    "Kyoto Heritage Journey": "رحلة تراثية في كيوتو",
    "Swiss Alpine Escape": "هروب إلى جبال الألب السويسرية",
    "Morocco Magic": "سحر المغرب",
    "Amalfi Coast": "ساحل أمالفي",
    "Kyoto Zen": "هدوء كيوتو",
    "Bali Retreat": "استراحة بالي",
    "Paris City Break": "استراحة مدينة باريس",
    "Dubai Easy Escape": "هروب سهل إلى دبي",
    "Istanbul Weekend": "عطلة نهاية الأسبوع في إسطنبول",
    "Lisbon Light Trip": "رحلة خفيفة إلى لشبونة",
    "Dubai Skyline Experience": "تجربة أفق دبي",
    "Bali Wellness Retreat": "استراحة العافية في بالي",
    "Amalfi Coast Escape": "هروب إلى ساحل أمالفي",
    "Morocco Magic Route": "مسار سحر المغرب",
    "Atlas Adventure Circuit": "جولة مغامرة في الأطلس",
    "Umrah Serenity Package": "باقة عمرة هادئة",
    "Marrakech Flash Escape": "هروب سريع إلى مراكش",
    "Istanbul Weekend Deal": "عرض عطلة نهاية الأسبوع في إسطنبول",
    "Dubai Family Saver": "عرض عائلي موفر في دبي",
    "Paris Spring Promo": "عرض الربيع في باريس",
    "Bali Calm Offer": "عرض هادئ في بالي",
    "Lisbon Light Deal": "عرض خفيف في لشبونة",
    "Atlas Group Discount": "خصم المجموعات في الأطلس",
    "Rome Heritage Special": "عرض تراث روما الخاص",
    "Umrah Early Saver": "عرض الحجز المبكر للعمرة",
    "Tokyo Food Route": "مسار طعام طوكيو",
    "Nara Day Escape": "هروب ليوم واحد إلى نارا",
    "UAE": "الإمارات العربية المتحدة",
    "Portugal": "البرتغال",
    "Saudi Arabia": "السعودية",
    "Turkey": "تركيا",
    "Lisbon": "لشبونة",
    "Zermatt": "زيرمات",
    "Ubud": "أوبود",
    "Amalfi": "أمالفي",
    "High Atlas": "الأطلس الكبير",
    "Makkah": "مكة",
    "Imlil": "إمليل",
    "Couples Deal": "عرض الأزواج",
    "Culture Pick": "اختيار ثقافي",
    "Premium Deal": "عرض فاخر",
    "City Break": "استراحة مدينة",
    "Wellness Deal": "عرض العافية",
    "Seaside Deal": "عرض ساحلي",
    "Limited Offer": "عرض محدود",
    "Weekend Deal": "عرض نهاية الأسبوع",
    "Family Offer": "عرض عائلي",
    "Spring Promo": "عرض الربيع",
    "Wellness Offer": "عرض العافية",
    "City + Sea": "مدينة + بحر",
    "Group Discount": "خصم المجموعة",
    "Heritage Special": "عرض التراث الخاص",
    "Early Saver": "حجز مبكر موفر",
    "Moderate": "متوسط",
    "A peaceful luxury stay with sunset views and clear agency support.": "إقامة فاخرة وهادئة مع إطلالات على الغروب ودعم واضح من الوكالة.",
    "Temples, old streets, calm gardens, and a balanced cultural route.": "معابد، شوارع قديمة، حدائق هادئة، ومسار ثقافي متوازن.",
    "Mountain air, train routes, and premium lodge memories.": "هواء جبلي، مسارات قطار، وذكريات إقامة فاخرة.",
    "White cliffside houses, sea views, boutique stays, and unforgettable sunset moments.": "بيوت بيضاء على الجرف، إطلالات بحرية، إقامات بوتيك ولحظات غروب لا تنسى.",
    "Traditional temples, quiet streets, gardens, and a calm cultural atmosphere.": "معابد تقليدية، شوارع هادئة، حدائق وأجواء ثقافية مطمئنة.",
    "Snowy peaks, premium chalets, scenic train rides, and peaceful alpine comfort.": "قمم ثلجية، شاليهات فاخرة، رحلات قطار بانورامية وراحة جبلية هادئة.",
    "Modern luxury, iconic towers, premium shopping, and an energetic city break.": "فخامة عصرية، أبراج شهيرة، تسوق فاخر واستراحة مدينة مليئة بالحيوية.",
    "Tropical greenery, peaceful villas, spa moments, and serene island energy.": "خضرة استوائية، فيلات هادئة، لحظات سبا وطاقة جزيرة مطمئنة.",
    "Colorful coastal towns, cliffside roads, sea views, and elegant Italian charm.": "مدن ساحلية ملونة، طرق على الجرف، إطلالات بحرية وسحر إيطالي أنيق.",
    "Riads, souks, guided city moments, and a warm Moroccan cultural route.": "رياضات، أسواق، جولات مدينة موجهة ومسار ثقافي مغربي دافئ.",
    "Mountain villages, scenic valleys, light trekking, and active outdoor days.": "قرى جبلية، وديان جميلة، مشي خفيف وأيام نشيطة في الهواء الطلق.",
    "A calm religious travel package with hotel planning and organized support.": "باقة سفر ديني هادئة مع تخطيط للفندق ودعم منظم.",
    "A short riad stay with medina walks, airport pickup, and a clear city plan.": "إقامة قصيرة في رياض مع جولات في المدينة القديمة، استقبال من المطار وخطة واضحة.",
    "Hotel, airport transfer, old city highlights, and a practical short-stay route.": "فندق، نقل من المطار، أبرز معالم المدينة القديمة ومسار قصير عملي.",
    "Family-friendly hotel, transfers, skyline stops, and optional desert evening.": "فندق مناسب للعائلات، تنقلات، توقفات على معالم المدينة وسهرة صحراوية اختيارية.",
    "A compact Paris stay with hotel, transfer help, viewpoints, and café routes.": "إقامة قصيرة في باريس مع فندق، مساعدة في التنقل، إطلالات ومسارات مقاهي.",
    "Villa-style stay, greenery, spa suggestions, and relaxed island planning.": "إقامة بطابع فيلا، خضرة، اقتراحات سبا وتخطيط جزيرة هادئ.",
    "Sunny streets, viewpoints, coastal day options, and simple hotel planning.": "شوارع مشمسة، نقاط إطلالة، خيارات يوم ساحلي وتخطيط فندق بسيط.",
    "Mountain weekend with guesthouse stay, local guide, and light trekking.": "نهاية أسبوع جبلية مع إقامة في دار ضيافة، دليل محلي ومشي خفيف.",
    "Classic Rome stay with hotel planning, old city walks, and food-route tips.": "إقامة كلاسيكية في روما مع تخطيط للفندق، جولات في المدينة القديمة ونصائح للطعام.",
    "Organized religious stay with hotel planning, transfer support, and clear timing.": "إقامة دينية منظمة مع تخطيط للفندق، دعم للتنقل وتوقيت واضح.",
    "One of the best trips I ever had. The sunset view from the hotel was amazing and the whole experience felt peaceful and luxurious.": "واحدة من أفضل الرحلات التي عشتها. كان منظر الغروب من الفندق رائعا وكانت التجربة كلها هادئة وفاخرة.",
    "Kyoto was calm, elegant, and full of culture. The temples, streets, and traditional atmosphere made the trip unforgettable.": "كانت كيوتو هادئة وأنيقة ومليئة بالثقافة. جعلت المعابد والشوارع والأجواء التقليدية الرحلة لا تنسى.",
    "Everything felt premium, from the train ride to the mountain lodge. The scenery was unreal and the air was so fresh.": "كان كل شيء يبدو فاخرا، من رحلة القطار إلى الإقامة الجبلية. كانت المناظر مذهلة والهواء منعشا جدا.",
    "NextTrip made planning very easy. I customized everything, and the agency replied quickly.": "جعل NextTrip التخطيط سهلا جدا. خصصت كل شيء وردت الوكالة بسرعة.",
    "The real-time pricing and direct communication saved me time and helped me make a better choice.": "ساعدني التسعير الفوري والتواصل المباشر على توفير الوقت واتخاذ قرار أفضل.",
    "A clear experience, beautiful offers, and I loved how flexible the trip customization was.": "تجربة واضحة، عروض جميلة، وأعجبني كثيرا مدى مرونة تخصيص الرحلة.",
    "The view looks incredible.": "المنظر يبدو مذهلا.",
    "I want to book this one too!": "أريد حجز هذه الرحلة أيضا!",
    "This post makes me want to visit Japan.": "هذه المشاركة تجعلني أرغب في زيارة اليابان.",
    "The mountains here are beautiful.": "الجبال هنا جميلة.",
    "This looks like a dream trip.": "تبدو هذه كرحلة أحلام.",
    "Agency client": "عميل وكالة",
    "Family traveler": "مسافرة عائلية",
    "Adventure traveler": "مسافر مغامر",
    "Couple trip": "رحلة زوجين",
  },
};

Object.entries(contentTranslations).forEach(([code, entries]) => {
  Object.assign(translations[code], entries);
});

const coverageTranslations = {
  fra: {
    "Travel access for modern planners": "Accès voyage pour planificateurs modernes",
    "Step back into your next journey.": "Reprenez votre prochain voyage.",
    "Sign in to manage bookings, compare offers, and keep every travel conversation in one smoother experience.": "Connectez-vous pour gérer vos réservations, comparer les offres et garder chaque conversation de voyage dans une expérience plus fluide.",
    "Personalized planning": "Planification personnalisée",
    "Build routes, budgets, and travel moods around the way you actually move.": "Construisez des itinéraires, des budgets et des styles de voyage autour de votre façon réelle de voyager.",
    "Direct agency contact": "Contact direct avec les agences",
    "Talk with agencies faster and refine your package in one clear flow.": "Discutez plus vite avec les agences et ajustez votre forfait dans un parcours clair.",
    "Reliable booking flow": "Parcours de réservation fiable",
    "Cleaner choices, better visibility, and support that stays close to your trip.": "Des choix plus clairs, une meilleure visibilité et un support proche de votre voyage.",
    "Trusted by travelers and agencies": "Approuvé par les voyageurs et les agences",
    "active explorers": "explorateurs actifs",
    "trusted agencies": "agences fiables",
    "support coverage": "support disponible",
    "Login": "Connexion",
    "Create Account": "Créer un compte",
    "Access your dashboard, bookings, and saved travel plans in one place.": "Accédez à votre tableau de bord, vos réservations et vos voyages enregistrés au même endroit.",
    "Open your NextTrip account and start planning with better control.": "Ouvrez votre compte NextTrip et commencez à planifier avec plus de contrôle.",
    "Enter your email": "Entrez votre e-mail",
    "Enter your password": "Entrez votre mot de passe",
    "Keep me signed in": "Rester connecté",
    "Forgot password?": "Mot de passe oublié ?",
    "I am joining as:": "Je m'inscris comme :",
    "Traveler": "Voyageur",
    "Agency": "Agence",
    "Book trips and manage your travel plans.": "Réservez des voyages et gérez vos plans.",
    "Create packages and manage client requests.": "Créez des forfaits et gérez les demandes clients.",
    "Agency name": "Nom de l'agence",
    "Business email": "E-mail professionnel",
    "Agency phone number": "Téléphone de l'agence",
    "Registration or license number (optional)": "Numéro d'enregistrement ou de licence (optionnel)",
    "Create a password": "Créer un mot de passe",
    "Confirm your password": "Confirmez votre mot de passe",
    "Create My Account": "Créer mon compte",
    "OR CONTINUE WITH": "OU CONTINUER AVEC",
    "Email is required": "L'e-mail est obligatoire",
    "Password is required": "Le mot de passe est obligatoire",
    "Full name is required": "Le nom complet est obligatoire",
    "Agency name is required": "Le nom de l'agence est obligatoire",
    "Business email is required": "L'e-mail professionnel est obligatoire",
    "Phone number is required": "Le numéro de téléphone est obligatoire",
    "Password must be at least 6 characters": "Le mot de passe doit contenir au moins 6 caractères",
    "Confirm password is required": "La confirmation du mot de passe est obligatoire",
    "Passwords do not match": "Les mots de passe ne correspondent pas",
    "traveler": "voyageur",
    "agency": "agence",
    "Contact NextTrip": "Contacter NextTrip",
    "Need a real answer? Reach the right team quickly.": "Besoin d'une vraie réponse ? Contactez rapidement la bonne équipe.",
    "Whether you are preparing a booking, comparing agencies, or solving an active travel issue, this page gives you a clear way to contact us.": "Que vous prépariez une réservation, compariez des agences ou régliez un problème de voyage en cours, cette page vous donne un moyen clair de nous contacter.",
    "Support is available": "Le support est disponible",
    "7 days a week": "7 jours sur 7",
    "Response target": "Délai de réponse",
    "Within 24 hours": "Sous 24 heures",
    "Channels": "Canaux",
    "Email + support": "E-mail + support",
    "Coverage": "Couverture",
    "Morocco and worldwide": "Maroc et monde entier",
    "Message us": "Écrivez-nous",
    "Send a clear request": "Envoyer une demande claire",
    "Add enough context so support can route your message without asking the same questions again.": "Ajoutez assez de contexte pour que le support oriente votre message sans reposer les mêmes questions.",
    "Full name": "Nom complet",
    "Topic": "Sujet",
    "Your name": "Votre nom",
    "Booking question": "Question de réservation",
    "Agency partnership": "Partenariat agence",
    "Support request": "Demande de support",
    "Account help": "Aide compte",
    "Booking reference": "Référence de réservation",
    "Optional": "Optionnel",
    "Message": "Message",
    "Tell us what you need help with...": "Dites-nous ce dont vous avez besoin...",
    "Send message": "Envoyer le message",
    "Email support": "Support par e-mail",
    "General questions, account help, and booking clarification.": "Questions générales, aide compte et clarification de réservation.",
    "Agency partnerships": "Partenariats agences",
    "For agencies joining NextTrip or updating profile details.": "Pour les agences qui rejoignent NextTrip ou mettent à jour leur profil.",
    "Travel help": "Aide voyage",
    "For active booking issues, include your booking reference.": "Pour les problèmes de réservation en cours, ajoutez votre référence.",
    "Help Center": "Centre d'aide",
    "Get unstuck faster, before or after booking.": "Obtenez de l'aide plus vite, avant ou après la réservation.",
    "Help on NextTrip is built around real traveler moments: choosing, confirming, contacting agencies, and preparing the next step.": "L'aide NextTrip suit les vrais moments du voyageur : choisir, confirmer, contacter les agences et préparer la suite.",
    "Need direct help?": "Besoin d'aide directe ?",
    "Send the package name, destination, and booking reference if you have one.": "Envoyez le nom du forfait, la destination et la référence de réservation si vous en avez une.",
    "Contact support": "Contacter le support",
    "Before booking": "Avant de réserver",
    "Understand package details, included services, payment flow, and what to ask before reserving.": "Comprenez les détails du forfait, les services inclus, le paiement et les questions à poser avant de réserver.",
    "Agency contact": "Contact agence",
    "Get directed to the right agency conversation with the destination and package context included.": "Accédez à la bonne conversation avec l'agence, avec le contexte de la destination et du forfait.",
    "After booking": "Après la réservation",
    "Follow next steps, prepare documents, and know what information your agency needs from you.": "Suivez les prochaines étapes, préparez vos documents et sachez ce que l'agence attend de vous.",
    "Quick questions": "Questions rapides",
    "Common questions travelers ask.": "Questions fréquentes des voyageurs.",
    "How do I compare two packages?": "Comment comparer deux forfaits ?",
    "Can I contact an agency before booking?": "Puis-je contacter une agence avant de réserver ?",
    "Where can I see booking details?": "Où voir les détails de réservation ?",
    "How do agencies receive my request?": "Comment les agences reçoivent-elles ma demande ?",
    "SELECTED PACKAGE": "FORFAIT SÉLECTIONNÉ",
    "Duration:": "Durée :",
    "Category:": "Catégorie :",
    "Guests:": "Voyageurs :",
    "Rating:": "Note :",
    "TRAVELER DETAILS": "DÉTAILS DU VOYAGEUR",
    "Enter your information": "Entrez vos informations",
    "Phone number": "Numéro de téléphone",
    "Number of travelers": "Nombre de voyageurs",
    "Special request": "Demande spéciale",
    "PAYMENT DETAILS": "DÉTAILS DU PAIEMENT",
    "Bank card information": "Informations de carte bancaire",
    "Cardholder name": "Nom du titulaire",
    "Card number": "Numéro de carte",
    "Expiry date": "Date d'expiration",
    "Save this card for faster future bookings": "Enregistrer cette carte pour les prochaines réservations",
    "ORDER SUMMARY": "RÉCAPITULATIF",
    "Checkout": "Paiement",
    "Price updates automatically based on": "Le prix se met à jour automatiquement selon",
    "traveler(s).": "voyageur(s).",
    "Package price": "Prix du forfait",
    "Taxes and fees": "Taxes et frais",
    "Travel insurance": "Assurance voyage",
    "Total": "Total",
    "Back to packages": "Retour aux forfaits",
    "BOOKING CONFIRMED": "RÉSERVATION CONFIRMÉE",
    "PAYMENT RECEIPT": "REÇU DE PAIEMENT",
    "Package details": "Détails du forfait",
    "Traveler information": "Informations du voyageur",
    "Payment breakdown": "Détail du paiement",
    "Total paid": "Total payé",
    "Your booking is secured and the receipt is ready below.": "Votre réservation est sécurisée et le reçu est prêt ci-dessous.",
    "Back to booking": "Retour à la réservation",
    "Preview environments can block real downloads, so the receipt is shown here in a ready-to-copy format.": "Les environnements de prévisualisation peuvent bloquer les téléchargements, le reçu est donc affiché ici dans un format prêt à copier.",
    "To:": "À :",
    "Subject:": "Objet :",
    "Monitor requests, manage offers, and keep your agency workflow organized.": "Suivez les demandes, gérez les offres et gardez votre travail d'agence organisé.",
    "Search anything...": "Rechercher...",
    "Filter": "Filtrer",
    "All bookings": "Toutes les réservations",
    "Pending bookings": "Réservations en attente",
    "Review bookings": "Réservations à vérifier",
    "Notifications": "Notifications",
    "Recent activity in your workspace": "Activité récente dans votre espace",
    "Open inbox and reply faster": "Ouvrir la boîte de réception et répondre plus vite",
    "Review and send offers": "Vérifier et envoyer des offres",
    "Check your package library": "Consulter votre bibliothèque de forfaits",
    "Close notifications": "Fermer les notifications",
    "All bookings selected.": "Toutes les réservations sélectionnées.",
    "Pending bookings selected.": "Réservations en attente sélectionnées.",
    "Review bookings selected.": "Réservations à vérifier sélectionnées.",
    "Overview": "Vue d'ensemble",
    "Bookings": "Réservations",
    "Messages": "Messages",
    "Analytics": "Analyses",
    "Dashboard Overview": "Vue d'ensemble du tableau de bord",
    "Bookings Management": "Gestion des réservations",
    "Packages Library": "Bibliothèque de forfaits",
    "Client Messages": "Messages clients",
    "Performance Analytics": "Analyses de performance",
    "Verified Partner": "Partenaire vérifié",
    "Platinum Member": "Membre platine",
    "New Client": "Nouveau client",
    "Repeat Traveler": "Voyageur fidèle",
    "Active": "Actif",
    "Draft": "Brouillon",
    "Need 2 premium villa options": "Besoin de 2 options de villa premium",
    "Please send me options with private transfer and sea view included.": "Merci de m'envoyer des options avec transfert privé et vue mer inclus.",
    "Can we add more food experiences?": "Peut-on ajouter plus d'expériences culinaires ?",
    "I want a stronger culinary focus in the Kyoto itinerary.": "Je veux un itinéraire à Kyoto plus orienté gastronomie.",
    "Best dates for Northern Lights": "Meilleures dates pour les aurores boréales",
    "Is late November a good time for visibility and activities?": "Fin novembre est-il un bon moment pour la visibilité et les activités ?",
    "PERSONALIZED TRAVEL REQUEST": "DEMANDE DE VOYAGE PERSONNALISÉE",
    "Create a trip brief agencies can answer faster.": "Créez un brief de voyage auquel les agences peuvent répondre plus vite.",
    "Choose your destination, mood, budget, travelers, services, and notes. NextTrip turns that into a clear request ready for agencies.": "Choisissez destination, ambiance, budget, voyageurs, services et notes. NextTrip transforme cela en demande claire prête pour les agences.",
    "Structured request": "Demande structurée",
    "Better agency offers": "Meilleures offres d'agence",
    "Trip builder": "Créateur de voyage",
    "4-step request": "Demande en 4 étapes",
    "Agencies receive your clear brief": "Les agences reçoivent votre brief clair",
    "Offers can be compared later": "Les offres pourront être comparées ensuite",
    "LIVE BRIEF": "BRIEF EN DIRECT",
    "Your request snapshot": "Aperçu de votre demande",
    "fields ready": "champs prêts",
    "Choose travel dates": "Choisir les dates de voyage",
    "Agencies receive this as a structured request, so they can reply with clearer offers instead of asking for missing details.": "Les agences reçoivent cela comme une demande structurée, afin de répondre avec des offres plus claires au lieu de demander les détails manquants.",
    "STEP 1": "ÉTAPE 1",
    "STEP 2": "ÉTAPE 2",
    "STEP 3": "ÉTAPE 3",
    "STEP 4": "ÉTAPE 4",
    "Preferences": "Préférences",
    "Extras": "Extras",
    "TRIP REQUEST": "DEMANDE DE VOYAGE",
    "Plan your trip": "Planifier votre voyage",
    "Choose a destination, dates, travelers, and preferences. Agencies can reply with clear offers.": "Choisissez destination, dates, voyageurs et préférences. Les agences peuvent répondre avec des offres claires.",
    "Example: Marrakech, Bali, Kyoto...": "Exemple : Marrakech, Bali, Kyoto...",
    "Select trip type": "Sélectionner le type de voyage",
    "Selected travel date": "Date de voyage sélectionnée",
    "Choose a travel date": "Choisir une date de voyage",
    "Choose departure date": "Choisir la date de départ",
    "Choose return date": "Choisir la date de retour",
    "Clear": "Effacer",
    "Today": "Aujourd'hui",
    "Budget (MAD)": "Budget (MAD)",
    "Example: 12000 MAD": "Exemple : 12000 MAD",
    "Select meal plan": "Sélectionner le repas",
    "Select hotel category": "Sélectionner la catégorie d'hôtel",
    "Select transport type": "Sélectionner le transport",
    "Describe your ideal trip, activities, food preferences, special requests, etc.": "Décrivez votre voyage idéal, activités, préférences alimentaires, demandes spéciales, etc.",
    "Why agencies love clear briefs": "Pourquoi les agences aiment les briefs clairs",
    "- Faster replies with better-tailored offers": "- Réponses plus rapides avec des offres mieux adaptées",
    "- More accurate pricing based on your needs": "- Prix plus précis selon vos besoins",
    "- Easier comparison between agencies": "- Comparaison plus facile entre agences",
    "- Better hotel and activity suggestions": "- Meilleures suggestions d'hôtels et d'activités",
    "Optional inspiration image": "Image d'inspiration optionnelle",
    "Upload a screenshot or travel inspiration image to help agencies understand your style.": "Ajoutez une capture ou une image d'inspiration pour aider les agences à comprendre votre style.",
    "Trip price preview": "Aperçu du prix du voyage",
    "This estimate updates automatically when destination, dates, travelers, trip type, hotel, transport, meals, or extras change.": "Cette estimation se met à jour automatiquement quand destination, dates, voyageurs, type de voyage, hôtel, transport, repas ou extras changent.",
    "Popular inspiration": "Inspirations populaires",
    "Click to use this destination": "Cliquez pour utiliser cette destination",
    "Review": "Vérifier",
    "Trip summary": "Résumé du voyage",
    "Check the main details before sending the request.": "Vérifiez les détails principaux avant d'envoyer la demande.",
    "Send request": "Envoyer la demande",
    "QUICK FILTER": "FILTRE RAPIDE",
    "Choose what your trip needs": "Choisissez les besoins du voyage",
    "These choices help agencies understand the offer before they contact you.": "Ces choix aident les agences à comprendre l'offre avant de vous contacter.",
    "Trip mood": "Ambiance du voyage",
    "Trip pace": "Rythme du voyage",
    "Stay preference": "Préférence de séjour",
    "Culture": "Culture",
    "Beach": "Plage",
    "Nature": "Nature",
    "City": "Ville",
    "Religious": "Religieux",
    "Smart": "Économique",
    "Comfort": "Confort",
    "Premium": "Premium",
    "Luxury": "Luxe",
    "Relaxed": "Détendu",
    "Balanced": "Équilibré",
    "Full Program": "Programme complet",
    "Hotel": "Hôtel",
    "Riad": "Riad",
    "Resort": "Resort",
    "Apartment": "Appartement",
    "Custom Trip": "Voyage personnalisé",
    "Luxury Trip": "Voyage de luxe",
    "Family Trip": "Voyage en famille",
    "Adventure Trip": "Voyage aventure",
    "Build your route": "Construisez votre itinéraire",
    "Premium hotels and comfort": "Hôtels premium et confort",
    "Easy flow for families": "Parcours facile pour les familles",
    "Romantic and calm": "Romantique et calme",
    "Breakfast Included": "Petit-déjeuner inclus",
    "Half Board": "Demi-pension",
    "Full Board": "Pension complète",
    "No Meal Plan": "Sans formule repas",
    "No meal plan": "Sans formule repas",
    "Breakfast and dinner": "Petit-déjeuner et dîner",
    "Keep meals flexible": "Gardez les repas flexibles",
    "3 Stars": "3 étoiles",
    "4 Stars": "4 étoiles",
    "5 Stars": "5 étoiles",
    "Luxury Riad": "Riad de luxe",
    "Villa": "Villa",
    "Balanced comfort": "Confort équilibré",
    "Premium stay": "Séjour premium",
    "Local boutique stay": "Séjour boutique local",
    "Flight": "Vol",
    "Train": "Train",
    "Private Car": "Voiture privée",
    "Bus": "Bus",
    "Comfortable city transfer": "Transfert urbain confortable",
    "Flexible door-to-door": "Porte-à-porte flexible",
    "Airport Transfer": "Transfert aéroport",
    "Local Guide": "Guide local",
    "Excursions": "Excursions",
    "Visa Support": "Aide visa",
    "Restaurant Booking": "Réservation restaurant",
    "Base stay": "Séjour de base",
    "Meals": "Repas",
    "Season and route": "Saison et itinéraire",
    "Choose dates": "Choisir les dates",
    "Select a departure date to apply the right season price.": "Sélectionnez une date de départ pour appliquer le bon prix de saison.",
    "Peak season": "Haute saison",
    "July, August, and December usually cost more.": "Juillet, août et décembre coûtent généralement plus cher.",
    "High season": "Saison élevée",
    "Good weather months with stronger demand.": "Mois agréables avec une demande plus forte.",
    "Shoulder season": "Saison intermédiaire",
    "Balanced season with better value.": "Saison équilibrée avec un meilleur rapport qualité-prix.",
    "Low season": "Basse saison",
    "Usually calmer dates with lower prices.": "Dates souvent plus calmes avec des prix plus bas.",
    "No hotel category selected": "Aucune catégorie d'hôtel sélectionnée",
    "No transport selected": "Aucun transport sélectionné",
    "No extras": "Aucun extra",
    "Not selected": "Non sélectionné",
    "Not set": "Non défini",
    "Automatic estimate": "Estimation automatique",
    "Automatic season": "Saison automatique",
    "Global": "Global",
    "MAD / traveler": "MAD / voyageur",
    "day(s)": "jour(s)",
    "Traveler(s)": "voyageur(s)",
    "Adults": "Adultes",
    "Children": "Enfants",
    "Infants": "Bébés",
    "Pets": "Animaux",
    "Age 13+": "13 ans et plus",
    "Ages 2-12": "2 à 12 ans",
    "Under 2": "Moins de 2 ans",
    "Service animals welcome": "Animaux d'assistance bienvenus",
    "Add Adults": "Ajouter des adultes",
    "Remove Adults": "Retirer des adultes",
    "Add Children": "Ajouter des enfants",
    "Remove Children": "Retirer des enfants",
    "Add Infants": "Ajouter des bébés",
    "Remove Infants": "Retirer des bébés",
    "Add Pets": "Ajouter des animaux",
    "Remove Pets": "Retirer des animaux",
    "Focus destination field": "Aller au champ destination",
    "Open travel date picker": "Ouvrir le sélecteur de date",
    "Destination options": "Options de destination",
    "Popular destination": "Destination populaire",
    "No destination found": "Aucune destination trouvée",
    "Where to?": "Où aller ?",
    "When?": "Quand ?",
    "Pick a date": "Choisir une date",
    "Add guests": "Ajouter des voyageurs",
    "Previous month": "Mois précédent",
    "Next month": "Mois suivant",
    "Africa | Morocco": "Afrique | Maroc",
    "AFRICA | MOROCCO": "AFRIQUE | MAROC",
    "ASIA | JAPAN": "ASIE | JAPON",
    "ASIA | UNITED ARAB EMIRATES": "ASIE | ÉMIRATS ARABES UNIS",
    "EUROPE | FRANCE": "EUROPE | FRANCE",
    "EUROPE | ITALY": "EUROPE | ITALIE",
    "Recommended duration": "Durée recommandée",
    "Best season": "Meilleure saison",
    "Best for": "Idéal pour",
    "All year": "Toute l'année",
    "November-March": "Novembre-mars",
    "Cherry blossom or autumn colors": "Fleurs de cerisier ou couleurs d'automne",
    "Business stays, weekend breaks, and first Morocco arrivals": "Séjours d'affaires, week-ends et premières arrivées au Maroc",
    "Culture lovers, calm travel, couples, and photography": "Amateurs de culture, voyages calmes, couples et photographie",
    "Families, luxury stays, shopping, and honeymoon trips": "Familles, séjours de luxe, shopping et lunes de miel",
    "Using the platform": "Utilisation de la plateforme",
    "Booking expectations": "Attentes de réservation",
    "Package information": "Informations du forfait",
    "Agency responsibility": "Responsabilité de l'agence",
    "Traveler responsibility": "Responsabilité du voyageur",
    "Communication and support": "Communication et support",
    "What information we use": "Informations que nous utilisons",
    "Why we use it": "Pourquoi nous l'utilisons",
    "Traveler cancellations": "Annulations voyageur",
    "Agency cancellations": "Annulations agence",
    "Refund basics": "Bases du remboursement",
    "Questions about payment?": "Questions sur le paiement ?"
  },
  ara: {
    "Travel access for modern planners": "وصول سفر للمخططين العصريين",
    "Step back into your next journey.": "عد إلى رحلتك القادمة.",
    "Sign in to manage bookings, compare offers, and keep every travel conversation in one smoother experience.": "سجل الدخول لإدارة الحجوزات ومقارنة العروض وجمع كل محادثات السفر في تجربة أكثر سلاسة.",
    "Personalized planning": "تخطيط مخصص",
    "Build routes, budgets, and travel moods around the way you actually move.": "أنشئ مسارات وميزانيات وأنماط سفر تناسب طريقتك الحقيقية في التنقل.",
    "Direct agency contact": "تواصل مباشر مع الوكالات",
    "Talk with agencies faster and refine your package in one clear flow.": "تحدث مع الوكالات بسرعة وعدل باقتك في مسار واضح.",
    "Reliable booking flow": "مسار حجز موثوق",
    "Cleaner choices, better visibility, and support that stays close to your trip.": "اختيارات أوضح ورؤية أفضل ودعم قريب من رحلتك.",
    "Trusted by travelers and agencies": "موثوق من المسافرين والوكالات",
    "active explorers": "مستكشفون نشيطون",
    "trusted agencies": "وكالات موثوقة",
    "support coverage": "تغطية الدعم",
    "Login": "تسجيل الدخول",
    "Create Account": "إنشاء حساب",
    "Access your dashboard, bookings, and saved travel plans in one place.": "ادخل إلى لوحة التحكم والحجوزات وخطط السفر المحفوظة في مكان واحد.",
    "Open your NextTrip account and start planning with better control.": "افتح حسابك في NextTrip وابدأ التخطيط بتحكم أفضل.",
    "Enter your email": "أدخل بريدك الإلكتروني",
    "Enter your password": "أدخل كلمة المرور",
    "Keep me signed in": "إبقائي مسجلا",
    "Forgot password?": "نسيت كلمة المرور؟",
    "I am joining as:": "أنضم بصفتي:",
    "Traveler": "مسافر",
    "Agency": "وكالة",
    "Book trips and manage your travel plans.": "احجز الرحلات وأدر خطط سفرك.",
    "Create packages and manage client requests.": "أنشئ الباقات وأدر طلبات العملاء.",
    "Agency name": "اسم الوكالة",
    "Business email": "البريد المهني",
    "Agency phone number": "رقم هاتف الوكالة",
    "Registration or license number (optional)": "رقم التسجيل أو الترخيص (اختياري)",
    "Create a password": "أنشئ كلمة مرور",
    "Confirm your password": "أكد كلمة المرور",
    "Create My Account": "إنشاء حسابي",
    "OR CONTINUE WITH": "أو تابع باستخدام",
    "Email is required": "البريد الإلكتروني مطلوب",
    "Password is required": "كلمة المرور مطلوبة",
    "Full name is required": "الاسم الكامل مطلوب",
    "Agency name is required": "اسم الوكالة مطلوب",
    "Business email is required": "البريد المهني مطلوب",
    "Phone number is required": "رقم الهاتف مطلوب",
    "Password must be at least 6 characters": "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
    "Confirm password is required": "تأكيد كلمة المرور مطلوب",
    "Passwords do not match": "كلمتا المرور غير متطابقتين",
    "traveler": "مسافر",
    "agency": "وكالة",
    "Contact NextTrip": "تواصل مع NextTrip",
    "Need a real answer? Reach the right team quickly.": "تحتاج جوابا واضحا؟ تواصل بسرعة مع الفريق المناسب.",
    "Whether you are preparing a booking, comparing agencies, or solving an active travel issue, this page gives you a clear way to contact us.": "سواء كنت تحضر حجزا أو تقارن الوكالات أو تحل مشكلة سفر قائمة، تمنحك هذه الصفحة طريقة واضحة للتواصل معنا.",
    "Support is available": "الدعم متاح",
    "7 days a week": "7 أيام في الأسبوع",
    "Response target": "هدف الرد",
    "Within 24 hours": "خلال 24 ساعة",
    "Channels": "القنوات",
    "Email + support": "البريد + الدعم",
    "Coverage": "التغطية",
    "Morocco and worldwide": "المغرب والعالم",
    "Message us": "راسلنا",
    "Send a clear request": "أرسل طلبا واضحا",
    "Add enough context so support can route your message without asking the same questions again.": "أضف سياقا كافيا حتى يوجه الدعم رسالتك دون إعادة نفس الأسئلة.",
    "Full name": "الاسم الكامل",
    "Topic": "الموضوع",
    "Your name": "اسمك",
    "Booking question": "سؤال حول الحجز",
    "Agency partnership": "شراكة وكالة",
    "Support request": "طلب دعم",
    "Account help": "مساعدة الحساب",
    "Booking reference": "مرجع الحجز",
    "Optional": "اختياري",
    "Message": "الرسالة",
    "Tell us what you need help with...": "أخبرنا بما تحتاج المساعدة فيه...",
    "Send message": "إرسال الرسالة",
    "Email support": "دعم عبر البريد",
    "General questions, account help, and booking clarification.": "أسئلة عامة، مساعدة الحساب، وتوضيح الحجز.",
    "Agency partnerships": "شراكات الوكالات",
    "For agencies joining NextTrip or updating profile details.": "للوكالات المنضمة إلى NextTrip أو التي تحدث تفاصيل ملفها.",
    "Travel help": "مساعدة السفر",
    "For active booking issues, include your booking reference.": "لمشاكل الحجز القائمة، أضف مرجع الحجز.",
    "Help Center": "مركز المساعدة",
    "Get unstuck faster, before or after booking.": "احصل على المساعدة بسرعة قبل الحجز أو بعده.",
    "Help on NextTrip is built around real traveler moments: choosing, confirming, contacting agencies, and preparing the next step.": "مساعدة NextTrip مبنية حول لحظات المسافر الحقيقية: الاختيار، التأكيد، التواصل مع الوكالات، والتحضير للخطوة التالية.",
    "Need direct help?": "تحتاج مساعدة مباشرة؟",
    "Send the package name, destination, and booking reference if you have one.": "أرسل اسم الباقة والوجهة ومرجع الحجز إن كان لديك.",
    "Contact support": "تواصل مع الدعم",
    "Before booking": "قبل الحجز",
    "Understand package details, included services, payment flow, and what to ask before reserving.": "افهم تفاصيل الباقة والخدمات المشمولة ومسار الدفع وما يجب سؤاله قبل الحجز.",
    "Agency contact": "تواصل الوكالة",
    "Get directed to the right agency conversation with the destination and package context included.": "انتقل إلى المحادثة المناسبة مع الوكالة مع سياق الوجهة والباقة.",
    "After booking": "بعد الحجز",
    "Follow next steps, prepare documents, and know what information your agency needs from you.": "اتبع الخطوات التالية، حضر الوثائق، واعرف المعلومات التي تحتاجها وكالتك منك.",
    "Quick questions": "أسئلة سريعة",
    "Common questions travelers ask.": "أسئلة شائعة يطرحها المسافرون.",
    "How do I compare two packages?": "كيف أقارن بين باقتين؟",
    "Can I contact an agency before booking?": "هل يمكنني التواصل مع وكالة قبل الحجز؟",
    "Where can I see booking details?": "أين أرى تفاصيل الحجز؟",
    "How do agencies receive my request?": "كيف تستقبل الوكالات طلبي؟",
    "SELECTED PACKAGE": "الباقة المختارة",
    "Duration:": "المدة:",
    "Category:": "الفئة:",
    "Guests:": "المسافرون:",
    "Rating:": "التقييم:",
    "TRAVELER DETAILS": "تفاصيل المسافر",
    "Enter your information": "أدخل معلوماتك",
    "Phone number": "رقم الهاتف",
    "Number of travelers": "عدد المسافرين",
    "Special request": "طلب خاص",
    "PAYMENT DETAILS": "تفاصيل الدفع",
    "Bank card information": "معلومات البطاقة البنكية",
    "Cardholder name": "اسم صاحب البطاقة",
    "Card number": "رقم البطاقة",
    "Expiry date": "تاريخ الانتهاء",
    "Save this card for faster future bookings": "احفظ هذه البطاقة لتسريع الحجوزات القادمة",
    "ORDER SUMMARY": "ملخص الطلب",
    "Checkout": "الدفع",
    "Price updates automatically based on": "يتحدث السعر تلقائيا حسب",
    "traveler(s).": "مسافر(ين).",
    "Package price": "سعر الباقة",
    "Taxes and fees": "الضرائب والرسوم",
    "Travel insurance": "تأمين السفر",
    "Total": "المجموع",
    "Back to packages": "العودة إلى الباقات",
    "BOOKING CONFIRMED": "تم تأكيد الحجز",
    "PAYMENT RECEIPT": "إيصال الدفع",
    "Package details": "تفاصيل الباقة",
    "Traveler information": "معلومات المسافر",
    "Payment breakdown": "تفاصيل الدفع",
    "Total paid": "المبلغ المدفوع",
    "Your booking is secured and the receipt is ready below.": "حجزك مؤكد والإيصال جاهز أسفله.",
    "Back to booking": "العودة إلى الحجز",
    "Preview environments can block real downloads, so the receipt is shown here in a ready-to-copy format.": "قد تمنع بيئات المعاينة التحميل الحقيقي، لذلك يظهر الإيصال هنا بصيغة جاهزة للنسخ.",
    "To:": "إلى:",
    "Subject:": "الموضوع:",
    "Monitor requests, manage offers, and keep your agency workflow organized.": "راقب الطلبات وأدر العروض وحافظ على تنظيم عمل الوكالة.",
    "Search anything...": "ابحث عن أي شيء...",
    "Filter": "تصفية",
    "All bookings": "كل الحجوزات",
    "Pending bookings": "حجوزات في الانتظار",
    "Review bookings": "حجوزات للمراجعة",
    "Notifications": "الإشعارات",
    "Recent activity in your workspace": "نشاط حديث في مساحة العمل",
    "Open inbox and reply faster": "افتح البريد ورد بسرعة",
    "Review and send offers": "راجع وأرسل العروض",
    "Check your package library": "تحقق من مكتبة الباقات",
    "Close notifications": "إغلاق الإشعارات",
    "All bookings selected.": "تم اختيار كل الحجوزات.",
    "Pending bookings selected.": "تم اختيار الحجوزات في الانتظار.",
    "Review bookings selected.": "تم اختيار حجوزات المراجعة.",
    "Overview": "نظرة عامة",
    "Bookings": "الحجوزات",
    "Messages": "الرسائل",
    "Analytics": "التحليلات",
    "Dashboard Overview": "نظرة عامة على لوحة التحكم",
    "Bookings Management": "إدارة الحجوزات",
    "Packages Library": "مكتبة الباقات",
    "Client Messages": "رسائل العملاء",
    "Performance Analytics": "تحليلات الأداء",
    "Verified Partner": "شريك موثق",
    "Platinum Member": "عضو بلاتيني",
    "New Client": "عميل جديد",
    "Repeat Traveler": "مسافر متكرر",
    "Active": "نشط",
    "Draft": "مسودة",
    "Need 2 premium villa options": "أحتاج خيارين لفيلا فاخرة",
    "Please send me options with private transfer and sea view included.": "يرجى إرسال خيارات تشمل نقلا خاصا وإطلالة بحرية.",
    "Can we add more food experiences?": "هل يمكن إضافة تجارب طعام أكثر؟",
    "I want a stronger culinary focus in the Kyoto itinerary.": "أريد تركيزا أكبر على الطعام في مسار كيوتو.",
    "Best dates for Northern Lights": "أفضل تواريخ لرؤية الشفق القطبي",
    "Is late November a good time for visibility and activities?": "هل أواخر نوفمبر وقت مناسب للرؤية والأنشطة؟",
    "PERSONALIZED TRAVEL REQUEST": "طلب سفر مخصص",
    "Create a trip brief agencies can answer faster.": "أنشئ موجزا للرحلة تستطيع الوكالات الرد عليه بسرعة.",
    "Choose your destination, mood, budget, travelers, services, and notes. NextTrip turns that into a clear request ready for agencies.": "اختر الوجهة والأجواء والميزانية والمسافرين والخدمات والملاحظات. يحول NextTrip ذلك إلى طلب واضح جاهز للوكالات.",
    "Structured request": "طلب منظم",
    "Better agency offers": "عروض وكالة أفضل",
    "Trip builder": "منشئ الرحلة",
    "4-step request": "طلب من 4 خطوات",
    "Agencies receive your clear brief": "تستقبل الوكالات موجزك الواضح",
    "Offers can be compared later": "يمكن مقارنة العروض لاحقا",
    "LIVE BRIEF": "موجز مباشر",
    "Your request snapshot": "لمحة عن طلبك",
    "fields ready": "حقول جاهزة",
    "Choose travel dates": "اختر تواريخ السفر",
    "Agencies receive this as a structured request, so they can reply with clearer offers instead of asking for missing details.": "تستقبل الوكالات هذا كطلب منظم، فترد بعروض أوضح بدل طلب تفاصيل ناقصة.",
    "STEP 1": "الخطوة 1",
    "STEP 2": "الخطوة 2",
    "STEP 3": "الخطوة 3",
    "STEP 4": "الخطوة 4",
    "Preferences": "التفضيلات",
    "Extras": "الإضافات",
    "TRIP REQUEST": "طلب الرحلة",
    "Plan your trip": "خطط رحلتك",
    "Choose a destination, dates, travelers, and preferences. Agencies can reply with clear offers.": "اختر الوجهة والتواريخ والمسافرين والتفضيلات. يمكن للوكالات الرد بعروض واضحة.",
    "Example: Marrakech, Bali, Kyoto...": "مثال: مراكش، بالي، كيوتو...",
    "Select trip type": "اختر نوع الرحلة",
    "Selected travel date": "تاريخ السفر المختار",
    "Choose a travel date": "اختر تاريخ السفر",
    "Choose departure date": "اختر تاريخ المغادرة",
    "Choose return date": "اختر تاريخ العودة",
    "Clear": "مسح",
    "Today": "اليوم",
    "Budget (MAD)": "الميزانية (MAD)",
    "Example: 12000 MAD": "مثال: 12000 MAD",
    "Select meal plan": "اختر خطة الوجبات",
    "Select hotel category": "اختر فئة الفندق",
    "Select transport type": "اختر نوع النقل",
    "Describe your ideal trip, activities, food preferences, special requests, etc.": "صف رحلتك المثالية، الأنشطة، تفضيلات الطعام، الطلبات الخاصة، إلخ.",
    "Why agencies love clear briefs": "لماذا تحب الوكالات الموجزات الواضحة",
    "- Faster replies with better-tailored offers": "- ردود أسرع بعروض أنسب",
    "- More accurate pricing based on your needs": "- تسعير أدق حسب احتياجاتك",
    "- Easier comparison between agencies": "- مقارنة أسهل بين الوكالات",
    "- Better hotel and activity suggestions": "- اقتراحات أفضل للفنادق والأنشطة",
    "Optional inspiration image": "صورة إلهام اختيارية",
    "Upload a screenshot or travel inspiration image to help agencies understand your style.": "ارفع لقطة شاشة أو صورة إلهام للسفر لمساعدة الوكالات على فهم أسلوبك.",
    "Trip price preview": "معاينة سعر الرحلة",
    "This estimate updates automatically when destination, dates, travelers, trip type, hotel, transport, meals, or extras change.": "يتحدث هذا التقدير تلقائيا عند تغيير الوجهة أو التواريخ أو المسافرين أو نوع الرحلة أو الفندق أو النقل أو الوجبات أو الإضافات.",
    "Popular inspiration": "إلهام شائع",
    "Click to use this destination": "اضغط لاستخدام هذه الوجهة",
    "Review": "مراجعة",
    "Trip summary": "ملخص الرحلة",
    "Check the main details before sending the request.": "راجع التفاصيل الأساسية قبل إرسال الطلب.",
    "Send request": "إرسال الطلب",
    "QUICK FILTER": "تصفية سريعة",
    "Choose what your trip needs": "اختر ما تحتاجه رحلتك",
    "These choices help agencies understand the offer before they contact you.": "تساعد هذه الاختيارات الوكالات على فهم العرض قبل التواصل معك.",
    "Trip mood": "أجواء الرحلة",
    "Trip pace": "إيقاع الرحلة",
    "Stay preference": "تفضيل الإقامة",
    "Culture": "ثقافة",
    "Beach": "شاطئ",
    "Nature": "طبيعة",
    "City": "مدينة",
    "Religious": "ديني",
    "Smart": "اقتصادي",
    "Comfort": "راحة",
    "Premium": "ممتاز",
    "Luxury": "فاخر",
    "Relaxed": "هادئ",
    "Balanced": "متوازن",
    "Full Program": "برنامج كامل",
    "Hotel": "فندق",
    "Riad": "رياض",
    "Resort": "منتجع",
    "Apartment": "شقة",
    "Custom Trip": "رحلة مخصصة",
    "Luxury Trip": "رحلة فاخرة",
    "Family Trip": "رحلة عائلية",
    "Adventure Trip": "رحلة مغامرة",
    "Build your route": "ابن مسارك",
    "Premium hotels and comfort": "فنادق ممتازة وراحة",
    "Easy flow for families": "مسار سهل للعائلات",
    "Romantic and calm": "رومانسي وهادئ",
    "Breakfast Included": "الفطور مشمول",
    "Half Board": "نصف إقامة",
    "Full Board": "إقامة كاملة",
    "No Meal Plan": "بدون خطة وجبات",
    "No meal plan": "بدون خطة وجبات",
    "Breakfast and dinner": "الفطور والعشاء",
    "Keep meals flexible": "اترك الوجبات مرنة",
    "3 Stars": "3 نجوم",
    "4 Stars": "4 نجوم",
    "5 Stars": "5 نجوم",
    "Luxury Riad": "رياض فاخر",
    "Villa": "فيلا",
    "Balanced comfort": "راحة متوازنة",
    "Premium stay": "إقامة ممتازة",
    "Local boutique stay": "إقامة بوتيك محلية",
    "Flight": "طائرة",
    "Train": "قطار",
    "Private Car": "سيارة خاصة",
    "Bus": "حافلة",
    "Comfortable city transfer": "تنقل مريح داخل المدينة",
    "Flexible door-to-door": "مرونة من الباب إلى الباب",
    "Airport Transfer": "نقل من المطار",
    "Local Guide": "دليل محلي",
    "Excursions": "جولات",
    "Visa Support": "دعم التأشيرة",
    "Restaurant Booking": "حجز مطعم",
    "Base stay": "الإقامة الأساسية",
    "Meals": "الوجبات",
    "Season and route": "الموسم والمسار",
    "Choose dates": "اختر التواريخ",
    "Select a departure date to apply the right season price.": "اختر تاريخ المغادرة لتطبيق سعر الموسم المناسب.",
    "Peak season": "موسم الذروة",
    "July, August, and December usually cost more.": "عادة ما تكون يوليوز وغشت ودجنبر أغلى.",
    "High season": "موسم مرتفع",
    "Good weather months with stronger demand.": "أشهر بطقس جيد وطلب أقوى.",
    "Shoulder season": "موسم متوسط",
    "Balanced season with better value.": "موسم متوازن بقيمة أفضل.",
    "Low season": "موسم منخفض",
    "Usually calmer dates with lower prices.": "تواريخ أهدأ غالبا وأسعار أقل.",
    "No hotel category selected": "لم يتم اختيار فئة الفندق",
    "No transport selected": "لم يتم اختيار النقل",
    "No extras": "لا إضافات",
    "Not selected": "غير مختار",
    "Not set": "غير محدد",
    "Automatic estimate": "تقدير تلقائي",
    "Automatic season": "موسم تلقائي",
    "Global": "عالمي",
    "MAD / traveler": "MAD / مسافر",
    "day(s)": "يوم/أيام",
    "Traveler(s)": "مسافر(ين)",
    "Adults": "البالغون",
    "Children": "الأطفال",
    "Infants": "الرضع",
    "Pets": "الحيوانات الأليفة",
    "Age 13+": "13 سنة فما فوق",
    "Ages 2-12": "من 2 إلى 12 سنة",
    "Under 2": "أقل من سنتين",
    "Service animals welcome": "حيوانات المساعدة مرحب بها",
    "Add Adults": "إضافة بالغين",
    "Remove Adults": "إزالة بالغين",
    "Add Children": "إضافة أطفال",
    "Remove Children": "إزالة أطفال",
    "Add Infants": "إضافة رضع",
    "Remove Infants": "إزالة رضع",
    "Add Pets": "إضافة حيوانات أليفة",
    "Remove Pets": "إزالة حيوانات أليفة",
    "Focus destination field": "الانتقال إلى حقل الوجهة",
    "Open travel date picker": "فتح اختيار تاريخ السفر",
    "Destination options": "خيارات الوجهة",
    "Popular destination": "وجهة شائعة",
    "No destination found": "لم يتم العثور على وجهة",
    "Where to?": "إلى أين؟",
    "When?": "متى؟",
    "Pick a date": "اختر تاريخا",
    "Add guests": "أضف مسافرين",
    "Previous month": "الشهر السابق",
    "Next month": "الشهر التالي",
    "Africa | Morocco": "إفريقيا | المغرب",
    "AFRICA | MOROCCO": "إفريقيا | المغرب",
    "ASIA | JAPAN": "آسيا | اليابان",
    "ASIA | UNITED ARAB EMIRATES": "آسيا | الإمارات العربية المتحدة",
    "EUROPE | FRANCE": "أوروبا | فرنسا",
    "EUROPE | ITALY": "أوروبا | إيطاليا",
    "Recommended duration": "المدة المقترحة",
    "Best season": "أفضل موسم",
    "Best for": "الأفضل لـ",
    "All year": "طوال السنة",
    "November-March": "نوفمبر-مارس",
    "Cherry blossom or autumn colors": "أزهار الكرز أو ألوان الخريف",
    "Business stays, weekend breaks, and first Morocco arrivals": "إقامات عمل، عطلات نهاية أسبوع، وأول وصول إلى المغرب",
    "Culture lovers, calm travel, couples, and photography": "محبو الثقافة، السفر الهادئ، الأزواج، والتصوير",
    "Families, luxury stays, shopping, and honeymoon trips": "العائلات، الإقامات الفاخرة، التسوق، ورحلات شهر العسل",
    "Using the platform": "استخدام المنصة",
    "Booking expectations": "توقعات الحجز",
    "Package information": "معلومات الباقة",
    "Agency responsibility": "مسؤولية الوكالة",
    "Traveler responsibility": "مسؤولية المسافر",
    "Communication and support": "التواصل والدعم",
    "What information we use": "المعلومات التي نستخدمها",
    "Why we use it": "لماذا نستخدمها",
    "Traveler cancellations": "إلغاءات المسافر",
    "Agency cancellations": "إلغاءات الوكالة",
    "Refund basics": "أساسيات الاسترداد",
    "Questions about payment?": "أسئلة حول الدفع؟"
  },
};

Object.entries(coverageTranslations).forEach(([code, entries]) => {
  Object.assign(translations[code], entries);
});

const detailTranslations = {
  fra: {
    "SECURE BOOKING": "RÉSERVATION SÉCURISÉE",
    "AGENCY OFFERS": "OFFRES D'AGENCES",
    "CURATED TRAVEL PACKAGES": "FORFAITS DE VOYAGE SÉLECTIONNÉS",
    "Booking details": "Détails de réservation",
    "Compare highlighted agency offers with clear prices, trip styles, and booking details.": "Comparez les offres d'agences mises en avant avec des prix clairs, des styles de voyage et des détails de réservation.",
    "Discover handpicked packages designed for romance, adventure, culture, and unforgettable escapes.": "Découvrez des forfaits sélectionnés pour la romance, l'aventure, la culture et des escapades inoubliables.",
    "Available offers": "Offres disponibles",
    "Available packages": "Forfaits disponibles",
    "offers found": "offres trouvées",
    "packages found": "forfaits trouvés",
    "Offer": "Offre",
    "Details": "Détails",
    "Book now ->": "Réserver ->",
    "Starting from": "À partir de",
    "Book this package": "Réserver ce forfait",
    "Contact agency": "Contacter l'agence",
    "Package not found": "Forfait introuvable",
    "This package may have been removed or the link is incorrect.": "Ce forfait a peut-être été supprimé ou le lien est incorrect.",
    "Trip overview": "Aperçu du voyage",
    "What makes this deal worth checking": "Pourquoi cette offre mérite d'être consultée",
    "Suggested itinerary": "Itinéraire suggéré",
    "What's included": "Ce qui est inclus",
    "Not included": "Non inclus",
    "Available add-ons": "Options disponibles",
    "Deal summary": "Résumé de l'offre",
    "Starting price per traveler": "Prix de départ par voyageur",
    "Next departure": "Prochain départ",
    "Book from offers": "Réserver depuis les offres",
    "Book from packages": "Réserver depuis les forfaits",
    "Ask about this deal": "Demander des infos sur cette offre",
    "Back to offers": "Retour aux offres",
    "Difficulty": "Difficulté",
    "Easy": "Facile",
    "Relax": "Détente",
    "Romantic": "Romantique",
    "Seaside": "Bord de mer",
    "Morocco Deal": "Offre Maroc",
    "Adventure Pick": "Sélection aventure",
    "Religious Trip": "Voyage religieux",
    "Enjoy a romantic stay in Santorini with elegant accommodation, panoramic caldera views, sunset dinners, island walks, and a premium travel atmosphere designed for unforgettable memories.": "Profitez d'un séjour romantique à Santorin avec hébergement élégant, vues panoramiques sur la caldeira, dîners au coucher du soleil, balades sur l'île et ambiance premium pensée pour des souvenirs inoubliables.",
    "Discover Kyoto through temple visits, traditional neighborhoods, cultural landmarks, refined local cuisine, and a peaceful itinerary full of authenticity and heritage.": "Découvrez Kyoto à travers les temples, quartiers traditionnels, lieux culturels, cuisine locale raffinée et un itinéraire paisible plein d'authenticité et de patrimoine.",
    "Experience the Swiss Alps with luxury chalet stays, panoramic mountain scenery, scenic railway journeys, cozy evenings, and a high-end winter escape.": "Vivez les Alpes suisses avec des chalets de luxe, paysages de montagne panoramiques, trajets ferroviaires pittoresques, soirées confortables et escapade hivernale haut de gamme.",
    "Enjoy Dubai with a premium city package including stylish accommodation, skyline dining, iconic attractions, shopping moments, and polished urban comfort.": "Profitez de Dubaï avec un forfait urbain premium incluant hébergement élégant, dîner avec vue skyline, attractions iconiques, moments shopping et confort urbain soigné.",
    "Relax in Bali with private villa vibes, lush landscapes, wellness experiences, quiet moments, and a soft tropical atmosphere designed for total relaxation.": "Détendez-vous à Bali avec une ambiance villa privée, paysages luxuriants, expériences bien-être, moments calmes et atmosphère tropicale douce pensée pour la relaxation.",
    "Explore the Amalfi Coast through scenic drives, charming villages, sea-view stays, refined dining, and a stylish Mediterranean travel experience.": "Explorez la côte amalfitaine avec routes panoramiques, villages charmants, séjours vue mer, gastronomie raffinée et expérience méditerranéenne élégante.",
    "Explore Marrakech and nearby highlights with riad stays, guided medina walks, local food, optional desert moments, and a comfortable agency-supported itinerary.": "Explorez Marrakech et ses alentours avec séjour en riad, balades guidées dans la médina, cuisine locale, moments désert optionnels et itinéraire confortable accompagné par l'agence.",
    "A practical adventure route through Morocco's mountain landscapes with guided walks, village stays, scenic transfers, and flexible outdoor activities.": "Un parcours aventure pratique dans les montagnes marocaines avec marches guidées, séjours villageois, transferts panoramiques et activités outdoor flexibles.",
    "Plan a religious trip with hotel options near key areas, transfer support, schedule guidance, and a clearer travel flow for individuals, couples, or families.": "Planifiez un voyage religieux avec options d'hôtel près des lieux clés, aide aux transferts, conseils d'horaires et parcours plus clair pour personnes seules, couples ou familles.",
    "This Marrakech offer is made for travelers who want a quick cultural escape with a riad stay, guided medina moments, airport pickup, and simple agency support from arrival to checkout.": "Cette offre Marrakech est faite pour les voyageurs qui veulent une escapade culturelle rapide avec séjour en riad, moments guidés dans la médina, accueil aéroport et support simple de l'arrivée au départ.",
    "A focused Istanbul weekend offer with central hotel options, transfer support, old city planning, Bosphorus timing suggestions, and agency help for a smooth city stay.": "Une offre week-end Istanbul ciblée avec hôtel central, aide au transfert, plan vieille ville, suggestions d'horaires pour le Bosphore et support agence pour un séjour fluide.",
    "This Dubai offer focuses on families and small groups with comfortable hotel options, transfer coordination, skyline planning, mall time, and a well-structured optional desert evening.": "Cette offre Dubaï vise les familles et petits groupes avec hôtels confortables, coordination des transferts, planning skyline, temps shopping et soirée désert optionnelle bien organisée.",
    "A romantic Paris offer with comfortable hotel planning, transfer guidance, viewpoint routes, café suggestions, and enough free time to keep the trip simple and easy.": "Une offre romantique à Paris avec hôtel confortable, aide aux transferts, itinéraires de points de vue, suggestions de cafés et assez de temps libre pour garder le voyage simple.",
    "A calm Bali offer for travelers who want a soft reset with villa-style stays, greenery-focused plans, spa suggestions, waterfall options, and flexible daily pacing.": "Une offre Bali calme pour les voyageurs qui veulent une pause douce avec séjour style villa, programme orienté verdure, suggestions spa, cascades et rythme quotidien flexible.",
    "This Lisbon offer blends sunny city routes with coastal day options, hotel planning, viewpoint suggestions, and enough free space for food stops and relaxed exploration.": "Cette offre Lisbonne mélange parcours urbains ensoleillés, journées côtières, planification d'hôtel, suggestions de points de vue et espace libre pour manger et explorer calmement.",
    "A short Atlas offer for groups who want nature without a long trip: guesthouse stay, local guide coordination, light trekking, village lunch options, and simple transport support.": "Une courte offre Atlas pour les groupes qui veulent de la nature sans long voyage : maison d'hôtes, guide local, trekking léger, déjeuner villageois et transport simple.",
    "A culture-first Rome offer with hotel planning, historic walking routes, food suggestions, and optional ticket support for travelers who want a clear heritage city plan.": "Une offre Rome centrée culture avec planification d'hôtel, parcours historiques à pied, suggestions food et aide optionnelle aux billets pour un plan patrimoine clair.",
    "An early saver religious travel offer with hotel planning, transfer support, schedule guidance, and agency coordination for individuals, couples, or families.": "Une offre religieuse en réservation anticipée avec hôtel, transferts, conseils d'horaires et coordination agence pour personnes seules, couples ou familles.",
    "International flights": "Vols internationaux",
    "Flights": "Vols",
    "Flights if not selected": "Vols si non sélectionnés",
    "Personal shopping": "Shopping personnel",
    "Personal expenses": "Dépenses personnelles",
    "Personal meals": "Repas personnels",
    "Lunches": "Déjeuners",
    "City taxes": "Taxes de séjour",
    "Museum tickets": "Billets de musée",
    "Attraction tickets": "Billets d'attractions",
    "Attraction tickets not listed": "Billets d'attractions non listés",
    "Visa fees": "Frais de visa",
    "Valid passport": "Passeport valide",
    "Valid ID or passport": "Pièce d'identité ou passeport valide",
    "Comfortable shoes": "Chaussures confortables",
    "Comfortable walking shoes": "Chaussures de marche confortables",
    "Travel insurance recommended": "Assurance voyage recommandée",
    "Required travel documents": "Documents de voyage requis",
    "Respect local dress codes": "Respecter les codes vestimentaires locaux",
    "Light clothing": "Vêtements légers",
    "Warm clothing": "Vêtements chauds",
    "Warm layer": "Couche chaude",
    "Walking shoes": "Chaussures de marche",
    "Private transfer": "Transfert privé",
    "Airport pickup": "Accueil à l'aéroport",
    "Transfer coordination": "Coordination des transferts",
    "Agency support": "Support agence",
    "Local guide": "Guide local",
    "Private guide": "Guide privé",
    "Cooking class": "Cours de cuisine",
    "Cooking workshop": "Atelier cuisine",
    "Food tour": "Circuit gourmand",
    "Dinner reservation": "Réservation dîner",
    "Museum pass": "Pass musée",
    "Bosphorus cruise": "Croisière sur le Bosphore",
    "Desert safari": "Safari désert",
    "Burj Khalifa ticket": "Billet Burj Khalifa",
    "Theme park day": "Journée parc à thème",
    "Private photographer": "Photographe privé",
    "Private photo walk": "Balade photo privée",
    "Wine tasting": "Dégustation de vin",
    "Tea ceremony": "Cérémonie du thé",
    "Kimono session": "Session kimono",
    "Day trip to Nara": "Excursion à Nara",
    "Ski instructor": "Moniteur de ski",
    "Spa day": "Journée spa",
    "Private mountain guide": "Guide de montagne privé",
    "Yoga class pack": "Pack cours de yoga",
    "Yoga package": "Pack yoga",
    "Waterfall tour": "Circuit cascades",
    "Private boat day": "Journée bateau privé",
    "Pompeii visit": "Visite de Pompéi",
    "Sintra day trip": "Excursion à Sintra",
    "Mountain bike route": "Route VTT",
    "Camel ride": "Balade à dos de chameau",
    "Flight support": "Aide au vol",
    "Premium hotel upgrade": "Surclassement hôtel premium",
    "Riad stay planning": "Planification du séjour en riad",
    "Guided medina experience": "Expérience guidée dans la médina",
    "Airport transfer support": "Aide au transfert aéroport",
    "Local food and activity suggestions": "Suggestions de cuisine locale et d'activités",
    "Hotel stay planning": "Planification du séjour hôtel",
    "Hotel stay for 3 nights": "Séjour hôtel de 3 nuits",
    "Hotel stay for 4 nights": "Séjour hôtel de 4 nuits",
    "Riad stay for 3 nights": "Séjour riad de 3 nuits",
    "Guesthouse stay": "Séjour en maison d'hôtes",
    "Villa-style stay": "Séjour style villa",
    "City route suggestions": "Suggestions d'itinéraire urbain",
    "Coastal day planning": "Planification d'une journée côtière",
    "Historic walking plan": "Plan de balade historique",
    "Food-route notes": "Notes de parcours gourmand",
    "Viewpoint route": "Itinéraire de points de vue",
    "Medina walking plan": "Plan de marche dans la médina",
    "Old city route": "Route vieille ville",
    "Light trekking route": "Route de trekking léger",
    "Mountain accommodation planning": "Planification d'hébergement en montagne",
    "Local guide coordination": "Coordination avec un guide local",
    "Transfer support between stops": "Aide aux transferts entre étapes",
    "Activity route suggestions": "Suggestions de routes d'activités",
    "Basic schedule guidance": "Conseils d'horaires de base",
    "Transfer guidance": "Aide aux transferts",
    "Agency planning notes": "Notes de planification de l'agence",
    "Wellness route notes": "Notes de parcours bien-être"
  },
  ara: {
    "SECURE BOOKING": "حجز آمن",
    "AGENCY OFFERS": "عروض الوكالات",
    "CURATED TRAVEL PACKAGES": "باقات سفر مختارة",
    "Booking details": "تفاصيل الحجز",
    "Compare highlighted agency offers with clear prices, trip styles, and booking details.": "قارن عروض الوكالات المميزة مع أسعار واضحة، أنماط سفر، وتفاصيل الحجز.",
    "Discover handpicked packages designed for romance, adventure, culture, and unforgettable escapes.": "اكتشف باقات مختارة للرومانسية والمغامرة والثقافة والرحلات التي لا تنسى.",
    "Available offers": "العروض المتاحة",
    "Available packages": "الباقات المتاحة",
    "offers found": "عروض موجودة",
    "packages found": "باقات موجودة",
    "Offer": "عرض",
    "Details": "التفاصيل",
    "Book now ->": "احجز الآن ->",
    "Starting from": "ابتداء من",
    "Book this package": "احجز هذه الباقة",
    "Contact agency": "تواصل مع الوكالة",
    "Package not found": "الباقة غير موجودة",
    "This package may have been removed or the link is incorrect.": "ربما تمت إزالة هذه الباقة أو أن الرابط غير صحيح.",
    "Trip overview": "نظرة عامة على الرحلة",
    "What makes this deal worth checking": "ما الذي يجعل هذا العرض يستحق المراجعة",
    "Suggested itinerary": "برنامج مقترح",
    "What's included": "ما هو مشمول",
    "Not included": "غير مشمول",
    "Available add-ons": "إضافات متاحة",
    "Deal summary": "ملخص العرض",
    "Starting price per traveler": "السعر الابتدائي لكل مسافر",
    "Next departure": "المغادرة القادمة",
    "Book from offers": "احجز من العروض",
    "Book from packages": "احجز من الباقات",
    "Ask about this deal": "اسأل عن هذا العرض",
    "Back to offers": "العودة إلى العروض",
    "Difficulty": "الصعوبة",
    "Easy": "سهل",
    "Relax": "استرخاء",
    "Romantic": "رومانسي",
    "Seaside": "ساحلي",
    "Morocco Deal": "عرض المغرب",
    "Adventure Pick": "اختيار المغامرة",
    "Religious Trip": "رحلة دينية",
    "Enjoy a romantic stay in Santorini with elegant accommodation, panoramic caldera views, sunset dinners, island walks, and a premium travel atmosphere designed for unforgettable memories.": "استمتع بإقامة رومانسية في سانتوريني مع سكن أنيق، إطلالات بانورامية على الكالديرا، عشاء عند الغروب، جولات في الجزيرة وأجواء سفر فاخرة لذكريات لا تنسى.",
    "Discover Kyoto through temple visits, traditional neighborhoods, cultural landmarks, refined local cuisine, and a peaceful itinerary full of authenticity and heritage.": "اكتشف كيوتو عبر زيارة المعابد، الأحياء التقليدية، المعالم الثقافية، المطبخ المحلي الراقي وبرنامج هادئ مليء بالأصالة والتراث.",
    "Experience the Swiss Alps with luxury chalet stays, panoramic mountain scenery, scenic railway journeys, cozy evenings, and a high-end winter escape.": "عش تجربة جبال الألب السويسرية مع شاليهات فاخرة، مناظر جبلية بانورامية، رحلات قطار جميلة، أمسيات دافئة وهروب شتوي راق.",
    "Enjoy Dubai with a premium city package including stylish accommodation, skyline dining, iconic attractions, shopping moments, and polished urban comfort.": "استمتع بدبي مع باقة مدينة فاخرة تشمل إقامة أنيقة، عشاء بإطلالة على الأفق، معالم شهيرة، وقت للتسوق وراحة حضرية راقية.",
    "Relax in Bali with private villa vibes, lush landscapes, wellness experiences, quiet moments, and a soft tropical atmosphere designed for total relaxation.": "استرخ في بالي بأجواء فيلا خاصة، مناظر خضراء، تجارب عافية، لحظات هادئة وأجواء استوائية ناعمة للراحة الكاملة.",
    "Explore the Amalfi Coast through scenic drives, charming villages, sea-view stays, refined dining, and a stylish Mediterranean travel experience.": "استكشف ساحل أمالفي عبر طرق بانورامية، قرى ساحرة، إقامات مطلة على البحر، مطاعم راقية وتجربة متوسطية أنيقة.",
    "Explore Marrakech and nearby highlights with riad stays, guided medina walks, local food, optional desert moments, and a comfortable agency-supported itinerary.": "استكشف مراكش وما حولها مع إقامة في رياض، جولات مرشدة في المدينة، طعام محلي، لحظات صحراوية اختيارية وبرنامج مريح بدعم الوكالة.",
    "A practical adventure route through Morocco's mountain landscapes with guided walks, village stays, scenic transfers, and flexible outdoor activities.": "مسار مغامرة عملي في جبال المغرب مع جولات مشي مرشدة، إقامات قروية، تنقلات جميلة وأنشطة خارجية مرنة.",
    "Plan a religious trip with hotel options near key areas, transfer support, schedule guidance, and a clearer travel flow for individuals, couples, or families.": "خطط رحلة دينية مع خيارات فنادق قرب المناطق المهمة، دعم النقل، إرشاد زمني ومسار أوضح للأفراد أو الأزواج أو العائلات.",
    "This Marrakech offer is made for travelers who want a quick cultural escape with a riad stay, guided medina moments, airport pickup, and simple agency support from arrival to checkout.": "هذا عرض مراكش للمسافرين الذين يريدون هروبا ثقافيا سريعا مع إقامة في رياض، جولات في المدينة، استقبال بالمطار ودعم بسيط من الوكالة من الوصول إلى المغادرة.",
    "A focused Istanbul weekend offer with central hotel options, transfer support, old city planning, Bosphorus timing suggestions, and agency help for a smooth city stay.": "عرض نهاية أسبوع في إسطنبول مع فنادق مركزية، دعم النقل، تخطيط المدينة القديمة، اقتراحات توقيت البوسفور ومساعدة الوكالة لإقامة سلسة.",
    "This Dubai offer focuses on families and small groups with comfortable hotel options, transfer coordination, skyline planning, mall time, and a well-structured optional desert evening.": "يركز عرض دبي هذا على العائلات والمجموعات الصغيرة مع فنادق مريحة، تنسيق النقل، تخطيط الأفق، وقت للمراكز التجارية وسهرة صحراوية اختيارية منظمة.",
    "A romantic Paris offer with comfortable hotel planning, transfer guidance, viewpoint routes, café suggestions, and enough free time to keep the trip simple and easy.": "عرض باريس رومانسي مع تخطيط فندق مريح، إرشاد النقل، مسارات إطلالات، اقتراحات مقاهي ووقت حر كاف ليبقى السفر بسيطا.",
    "A calm Bali offer for travelers who want a soft reset with villa-style stays, greenery-focused plans, spa suggestions, waterfall options, and flexible daily pacing.": "عرض بالي هادئ للمسافرين الذين يريدون راحة ناعمة مع إقامة على شكل فيلا، خطط خضراء، اقتراحات سبا، شلالات وإيقاع يومي مرن.",
    "This Lisbon offer blends sunny city routes with coastal day options, hotel planning, viewpoint suggestions, and enough free space for food stops and relaxed exploration.": "يمزج عرض لشبونة بين مسارات مدينة مشمسة وخيارات يوم ساحلي، تخطيط فندق، اقتراحات إطلالات ومساحة حرة للتذوق والاستكشاف الهادئ.",
    "A short Atlas offer for groups who want nature without a long trip: guesthouse stay, local guide coordination, light trekking, village lunch options, and simple transport support.": "عرض قصير في الأطلس للمجموعات التي تريد الطبيعة دون رحلة طويلة: دار ضيافة، دليل محلي، مشي خفيف، غداء قروي ودعم نقل بسيط.",
    "A culture-first Rome offer with hotel planning, historic walking routes, food suggestions, and optional ticket support for travelers who want a clear heritage city plan.": "عرض روما ثقافي مع تخطيط فندق، مسارات تاريخية مشيا، اقتراحات طعام ودعم اختياري للتذاكر لمن يريد خطة تراثية واضحة.",
    "An early saver religious travel offer with hotel planning, transfer support, schedule guidance, and agency coordination for individuals, couples, or families.": "عرض سفر ديني للحجز المبكر مع تخطيط فندق، دعم النقل، إرشاد زمني وتنسيق وكالة للأفراد أو الأزواج أو العائلات.",
    "International flights": "الرحلات الدولية",
    "Flights": "الرحلات الجوية",
    "Flights if not selected": "الرحلات الجوية إذا لم تكن مختارة",
    "Personal shopping": "التسوق الشخصي",
    "Personal expenses": "المصاريف الشخصية",
    "Personal meals": "الوجبات الشخصية",
    "Lunches": "وجبات الغداء",
    "City taxes": "ضرائب المدينة",
    "Museum tickets": "تذاكر المتحف",
    "Attraction tickets": "تذاكر المعالم",
    "Attraction tickets not listed": "تذاكر المعالم غير المذكورة",
    "Visa fees": "رسوم التأشيرة",
    "Valid passport": "جواز سفر صالح",
    "Valid ID or passport": "بطاقة هوية أو جواز سفر صالح",
    "Comfortable shoes": "أحذية مريحة",
    "Comfortable walking shoes": "أحذية مشي مريحة",
    "Travel insurance recommended": "تأمين السفر موصى به",
    "Required travel documents": "وثائق السفر المطلوبة",
    "Respect local dress codes": "احترام قواعد اللباس المحلية",
    "Light clothing": "ملابس خفيفة",
    "Warm clothing": "ملابس دافئة",
    "Warm layer": "طبقة دافئة",
    "Walking shoes": "أحذية مشي",
    "Private transfer": "نقل خاص",
    "Airport pickup": "استقبال من المطار",
    "Transfer coordination": "تنسيق النقل",
    "Agency support": "دعم الوكالة",
    "Local guide": "دليل محلي",
    "Private guide": "دليل خاص",
    "Cooking class": "درس طبخ",
    "Cooking workshop": "ورشة طبخ",
    "Food tour": "جولة طعام",
    "Dinner reservation": "حجز عشاء",
    "Museum pass": "بطاقة المتحف",
    "Bosphorus cruise": "رحلة بحرية في البوسفور",
    "Desert safari": "سفاري الصحراء",
    "Burj Khalifa ticket": "تذكرة برج خليفة",
    "Theme park day": "يوم في مدينة الألعاب",
    "Private photographer": "مصور خاص",
    "Private photo walk": "جولة تصوير خاصة",
    "Wine tasting": "تذوق النبيذ",
    "Tea ceremony": "حفل شاي",
    "Kimono session": "جلسة كيمونو",
    "Day trip to Nara": "رحلة يومية إلى نارا",
    "Ski instructor": "مدرب تزلج",
    "Spa day": "يوم سبا",
    "Private mountain guide": "دليل جبلي خاص",
    "Yoga class pack": "باقة حصص يوغا",
    "Yoga package": "باقة يوغا",
    "Waterfall tour": "جولة الشلالات",
    "Private boat day": "يوم قارب خاص",
    "Pompeii visit": "زيارة بومبي",
    "Sintra day trip": "رحلة يومية إلى سينترا",
    "Mountain bike route": "مسار دراجة جبلية",
    "Camel ride": "جولة على الجمل",
    "Flight support": "دعم الرحلة الجوية",
    "Premium hotel upgrade": "ترقية فندق ممتازة",
    "Riad stay planning": "تخطيط إقامة في رياض",
    "Guided medina experience": "تجربة مرشدة في المدينة",
    "Airport transfer support": "دعم نقل المطار",
    "Local food and activity suggestions": "اقتراحات طعام محلي وأنشطة",
    "Hotel stay planning": "تخطيط إقامة الفندق",
    "Hotel stay for 3 nights": "إقامة فندق 3 ليال",
    "Hotel stay for 4 nights": "إقامة فندق 4 ليال",
    "Riad stay for 3 nights": "إقامة رياض 3 ليال",
    "Guesthouse stay": "إقامة في دار ضيافة",
    "Villa-style stay": "إقامة بأسلوب فيلا",
    "City route suggestions": "اقتراحات مسار المدينة",
    "Coastal day planning": "تخطيط يوم ساحلي",
    "Historic walking plan": "خطة مشي تاريخية",
    "Food-route notes": "ملاحظات مسار الطعام",
    "Viewpoint route": "مسار الإطلالات",
    "Medina walking plan": "خطة مشي في المدينة",
    "Old city route": "مسار المدينة القديمة",
    "Light trekking route": "مسار مشي خفيف",
    "Mountain accommodation planning": "تخطيط إقامة جبلية",
    "Local guide coordination": "تنسيق دليل محلي",
    "Transfer support between stops": "دعم النقل بين المحطات",
    "Activity route suggestions": "اقتراحات مسارات الأنشطة",
    "Basic schedule guidance": "إرشاد زمني أساسي",
    "Transfer guidance": "إرشاد النقل",
    "Agency planning notes": "ملاحظات تخطيط الوكالة",
    "Wellness route notes": "ملاحظات مسار العافية"
  },
};

Object.entries(detailTranslations).forEach(([code, entries]) => {
  Object.assign(translations[code], entries);
});

const miscTranslations = {
  fra: {
    "Category": "Catégorie",
    "Email": "E-mail",
    "Email:": "E-mail :",
    "Full name:": "Nom complet :",
    "Phone:": "Téléphone :",
    "Issued:": "Émis le :",
    "Receipt ID:": "ID du reçu :",
    "Saved Card:": "Carte enregistrée :",
    "Your reservation for": "Votre réservation pour",
    "is now confirmed.": "est maintenant confirmée.",
    "Close": "Fermer",
    "CVV": "CVV",
    "Auto": "Auto",
    "Calculating": "Calcul en cours",
    "city ideas": "idées de villes",
    "Close city details": "Fermer les détails de la ville",
    "Focus trip type field": "Aller au champ type de voyage",
    "Featured experiences carousel": "Carrousel d'expériences en vedette",
    "day(s) ·": "jour(s) ·",
    "Google": "Google",
    "Facebook": "Facebook",
    "Couple": "Couple",
    "Starting price": "Prix de départ",
    "per traveler": "par voyageur",
    "per person": "par personne",
    "person": "personne",
    "Spring or autumn": "Printemps ou automne",
    "Spring or early autumn": "Printemps ou début d'automne",
    "March-May or September-November": "Mars-mai ou septembre-novembre",
    "May-June or September": "Mai-juin ou septembre",
    "June-October or December-February": "Juin-octobre ou décembre-février",
    "October-April": "Octobre-avril",
    "Culture, riads, souks": "Culture, riads, souks",
    "Blue streets, calm, mountain air": "Rues bleues, calme, air de montagne",
    "Ocean, modern city, business": "Océan, ville moderne, affaires",
    "Museums, food, romance": "Musées, gastronomie, romance",
    "History, food, old streets": "Histoire, gastronomie, vieilles rues",
    "Markets, mosques, Bosphorus": "Marchés, mosquées, Bosphore",
    "Temples, gardens, quiet tradition": "Temples, jardins, tradition calme",
    "Luxury, skyline, desert": "Luxe, skyline, désert",
    "Pyramids, Nile, history": "Pyramides, Nil, histoire",
    "Beach, spice tours, slow island days": "Plage, circuits d'épices, journées lentes sur l'île",
    "Nature, villas, wellness": "Nature, villas, bien-être",
    "Beach city, food, design": "Ville de plage, gastronomie, design",
    "Culture trips, family stays, couples, and short city breaks": "Voyages culturels, séjours en famille, couples et courts city breaks",
    "Calm escapes, couples, photographers, and slow travel": "Escapades calmes, couples, photographes et voyage lent",
    "Couples, culture trips, shopping, and first Europe visits": "Couples, voyages culturels, shopping et premières visites en Europe",
    "Families, couples, heritage routes, and food lovers": "Familles, couples, parcours patrimoine et amateurs de gastronomie",
    "Culture, faith-friendly travel, shopping, and group trips": "Culture, voyage adapté à la foi, shopping et voyages de groupe",
    "History routes, families, groups, and culture trips": "Parcours historiques, familles, groupes et voyages culturels",
    "City breaks, friends, couples, and food trips": "City breaks, amis, couples et voyages gourmands",
    "Marrakech is a warm Moroccan city known for colorful souks, riads, gardens, rooftop dinners, and easy desert add-ons.": "Marrakech est une ville marocaine chaleureuse connue pour ses souks colorés, riads, jardins, dîners en rooftop et options désert faciles.",
    "Chefchaouen is a peaceful mountain city with blue alleys, slow walks, small cafés, and relaxed photo-friendly routes.": "Chefchaouen est une ville de montagne paisible avec ruelles bleues, promenades lentes, petits cafés et parcours photo détendus.",
    "Casablanca brings Atlantic views, modern restaurants, shopping, and the famous Hassan II Mosque in one easy city stop.": "Casablanca réunit vues atlantiques, restaurants modernes, shopping et la célèbre mosquée Hassan II dans une étape urbaine simple.",
    "Paris is made for iconic walks, museums, cafés, shopping streets, and romantic evenings around the Seine.": "Paris est faite pour les balades iconiques, musées, cafés, rues commerçantes et soirées romantiques près de la Seine.",
    "Rome mixes ancient ruins, lively piazzas, pasta spots, and easy day plans for travelers who like history with comfort.": "Rome mélange ruines antiques, places animées, bonnes pâtes et journées faciles pour ceux qui aiment l'histoire avec confort.",
    "Istanbul connects Europe and Asia through historic mosques, markets, ferry rides, tea stops, and rich food culture.": "Istanbul relie l'Europe et l'Asie avec mosquées historiques, marchés, ferries, pauses thé et riche culture culinaire.",
    "Kyoto is a calm cultural city with temples, bamboo paths, gardens, tea houses, and traditional neighborhoods.": "Kyoto est une ville culturelle calme avec temples, chemins de bambou, jardins, maisons de thé et quartiers traditionnels.",
    "Dubai is ideal for comfortable hotel stays, shopping, skyline views, desert experiences, family activities, and luxury upgrades.": "Dubaï est idéale pour séjours hôteliers confortables, shopping, vues skyline, expériences désert, activités familiales et options luxe.",
    "Cairo is a strong choice for travelers who want pyramids, museums, Nile views, bazaars, and deep ancient history.": "Le Caire est un excellent choix pour pyramides, musées, vues sur le Nil, bazars et histoire antique profonde.",
    "Zanzibar is ideal for soft beaches, relaxed resorts, spice tours, Stone Town walks, and easy island-style packages.": "Zanzibar est idéale pour plages douces, resorts détendus, circuits d'épices, balades à Stone Town et forfaits insulaires faciles.",
    "Bali mixes green rice terraces, beach clubs, villas, temples, wellness retreats, and flexible adventure days.": "Bali mélange rizières vertes, beach clubs, villas, temples, retraites bien-être et journées aventure flexibles.",
    "Barcelona gives travelers a simple mix of city walks, Gaudí architecture, beach time, markets, and late dinners.": "Barcelone offre un mélange simple de balades urbaines, architecture de Gaudí, plage, marchés et dîners tardifs."
  },
  ara: {
    "Category": "الفئة",
    "Email": "البريد الإلكتروني",
    "Email:": "البريد الإلكتروني:",
    "Full name:": "الاسم الكامل:",
    "Phone:": "الهاتف:",
    "Issued:": "تاريخ الإصدار:",
    "Receipt ID:": "معرف الإيصال:",
    "Saved Card:": "البطاقة المحفوظة:",
    "Your reservation for": "حجزك لـ",
    "is now confirmed.": "تم تأكيده.",
    "Close": "إغلاق",
    "CVV": "CVV",
    "Auto": "تلقائي",
    "Calculating": "جاري الحساب",
    "city ideas": "أفكار مدن",
    "Close city details": "إغلاق تفاصيل المدينة",
    "Focus trip type field": "الانتقال إلى حقل نوع الرحلة",
    "Featured experiences carousel": "عارض التجارب المميزة",
    "day(s) ·": "يوم/أيام ·",
    "Google": "Google",
    "Facebook": "Facebook",
    "Couple": "زوجان",
    "Starting price": "السعر الابتدائي",
    "per traveler": "لكل مسافر",
    "per person": "لكل شخص",
    "person": "شخص",
    "Spring or autumn": "الربيع أو الخريف",
    "Spring or early autumn": "الربيع أو بداية الخريف",
    "March-May or September-November": "مارس-ماي أو سبتمبر-نوفمبر",
    "May-June or September": "ماي-يونيو أو سبتمبر",
    "June-October or December-February": "يونيو-أكتوبر أو ديسمبر-فبراير",
    "October-April": "أكتوبر-أبريل",
    "Culture, riads, souks": "ثقافة، رياضات، أسواق",
    "Blue streets, calm, mountain air": "شوارع زرقاء، هدوء، هواء الجبل",
    "Ocean, modern city, business": "محيط، مدينة عصرية، أعمال",
    "Museums, food, romance": "متاحف، طعام، رومانسية",
    "History, food, old streets": "تاريخ، طعام، شوارع قديمة",
    "Markets, mosques, Bosphorus": "أسواق، مساجد، البوسفور",
    "Temples, gardens, quiet tradition": "معابد، حدائق، تقاليد هادئة",
    "Luxury, skyline, desert": "فخامة، أفق المدينة، صحراء",
    "Pyramids, Nile, history": "أهرامات، النيل، تاريخ",
    "Beach, spice tours, slow island days": "شاطئ، جولات توابل، أيام جزيرة هادئة",
    "Nature, villas, wellness": "طبيعة، فيلات، عافية",
    "Beach city, food, design": "مدينة شاطئية، طعام، تصميم",
    "Culture trips, family stays, couples, and short city breaks": "رحلات ثقافية، إقامات عائلية، أزواج، واستراحات مدينة قصيرة",
    "Calm escapes, couples, photographers, and slow travel": "هروب هادئ، أزواج، مصورون، وسفر بطيء",
    "Couples, culture trips, shopping, and first Europe visits": "أزواج، رحلات ثقافية، تسوق، وأول زيارة لأوروبا",
    "Families, couples, heritage routes, and food lovers": "عائلات، أزواج، مسارات تراثية، ومحبو الطعام",
    "Culture, faith-friendly travel, shopping, and group trips": "ثقافة، سفر مناسب للدين، تسوق، ورحلات جماعية",
    "History routes, families, groups, and culture trips": "مسارات تاريخية، عائلات، مجموعات، ورحلات ثقافية",
    "City breaks, friends, couples, and food trips": "استراحات مدينة، أصدقاء، أزواج، ورحلات طعام",
    "Marrakech is a warm Moroccan city known for colorful souks, riads, gardens, rooftop dinners, and easy desert add-ons.": "مراكش مدينة مغربية دافئة معروفة بأسواقها الملونة ورياضاتها وحدائقها وعشاء الأسطح وخيارات الصحراء السهلة.",
    "Chefchaouen is a peaceful mountain city with blue alleys, slow walks, small cafés, and relaxed photo-friendly routes.": "شفشاون مدينة جبلية هادئة بأزقة زرقاء ومشي بطيء ومقاه صغيرة ومسارات مناسبة للتصوير.",
    "Casablanca brings Atlantic views, modern restaurants, shopping, and the famous Hassan II Mosque in one easy city stop.": "تجمع الدار البيضاء إطلالات الأطلسي ومطاعم عصرية وتسوقا ومسجد الحسن الثاني في توقف حضري سهل.",
    "Paris is made for iconic walks, museums, cafés, shopping streets, and romantic evenings around the Seine.": "باريس مناسبة للمشي الأيقوني والمتاحف والمقاهي وشوارع التسوق والأمسيات الرومانسية قرب السين.",
    "Rome mixes ancient ruins, lively piazzas, pasta spots, and easy day plans for travelers who like history with comfort.": "تمزج روما الآثار القديمة والساحات الحيوية وأماكن الباستا وبرامج يومية سهلة لمحبي التاريخ مع الراحة.",
    "Istanbul connects Europe and Asia through historic mosques, markets, ferry rides, tea stops, and rich food culture.": "تربط إسطنبول أوروبا وآسيا عبر مساجد تاريخية وأسواق وعبارات وتوقفات شاي وثقافة طعام غنية.",
    "Kyoto is a calm cultural city with temples, bamboo paths, gardens, tea houses, and traditional neighborhoods.": "كيوتو مدينة ثقافية هادئة فيها معابد ومسارات خيزران وحدائق وبيوت شاي وأحياء تقليدية.",
    "Dubai is ideal for comfortable hotel stays, shopping, skyline views, desert experiences, family activities, and luxury upgrades.": "دبي مثالية لإقامات فندقية مريحة وتسوق وإطلالات أفق المدينة وتجارب الصحراء وأنشطة عائلية وخيارات فاخرة.",
    "Cairo is a strong choice for travelers who want pyramids, museums, Nile views, bazaars, and deep ancient history.": "القاهرة خيار قوي لمن يريد الأهرامات والمتاحف وإطلالات النيل والأسواق وتاريخا قديما عميقا.",
    "Zanzibar is ideal for soft beaches, relaxed resorts, spice tours, Stone Town walks, and easy island-style packages.": "زنجبار مثالية للشواطئ الناعمة والمنتجعات الهادئة وجولات التوابل ومشي ستون تاون وباقات جزيرة سهلة.",
    "Bali mixes green rice terraces, beach clubs, villas, temples, wellness retreats, and flexible adventure days.": "تجمع بالي مدرجات الأرز الخضراء ونوادي الشاطئ والفيلات والمعابد ورحلات العافية وأيام مغامرة مرنة.",
    "Barcelona gives travelers a simple mix of city walks, Gaudí architecture, beach time, markets, and late dinners.": "تمنح برشلونة المسافرين مزيجا بسيطا من جولات المدينة وعمارة غاودي ووقت الشاطئ والأسواق والعشاء المتأخر."
  },
};

Object.entries(miscTranslations).forEach(([code, entries]) => {
  Object.assign(translations[code], entries);
});

const experienceTranslations = {
  fra: {
    "TRAVEL EXPERIENCE COMMUNITY": "COMMUNAUTÉ D'EXPÉRIENCES DE VOYAGE",
    "Share Your Journey": "Partagez votre voyage",
    "Travelers can post their experiences, receive likes and comments, and inspire others with real memories.": "Les voyageurs peuvent publier leurs expériences, recevoir des mentions J'aime et des commentaires, et inspirer les autres avec de vrais souvenirs.",
    "COMMUNITY OVERVIEW": "APERÇU DE LA COMMUNAUTÉ",
    "Travelers Hub": "Espace voyageurs",
    "POSTS": "PUBLICATIONS",
    "LIKES": "J'AIME",
    "COMMENTS": "COMMENTAIRES",
    "Likes": "J'aime",
    "Comments": "Commentaires",
    "ADD EXPERIENCE": "AJOUTER UNE EXPÉRIENCE",
    "Create a new post": "Créer une nouvelle publication",
    "Destination or city": "Destination ou ville",
    "Trip title": "Titre du voyage",
    "Upload image": "Importer une image",
    "No image selected yet.": "Aucune image sélectionnée pour le moment.",
    "Share your travel experience...": "Partagez votre expérience de voyage...",
    "Publish Experience": "Publier l'expérience",
    "Unknown Traveler": "Voyageur inconnu",
    "Custom destination": "Destination personnalisée",
    "You": "Vous",
    "Verified Traveler": "Voyageur vérifié",
    "Traveler": "Voyageur",
    "shared a real travel experience": "a partagé une vraie expérience de voyage",
    "| shared a real travel experience": "| a partagé une vraie expérience de voyage",
    "POST": "PUBLICATION",
    "TRAVEL STORY": "RÉCIT DE VOYAGE",
    "View experience details": "Voir les détails de l'expérience",
    "TRAVELER COMMENTS": "COMMENTAIRES DES VOYAGEURS",
    "Write a comment...": "Écrire un commentaire...",
    "Comment": "Commenter",
    "Experience not found": "Expérience introuvable",
    "This travel story may have been removed or the link is incorrect.": "Ce récit de voyage a peut-être été supprimé ou le lien est incorrect.",
    "Back to experiences": "Retour aux expériences",
    "Traveler story": "Récit du voyageur",
    "What made this journey memorable": "Ce qui a rendu ce voyage mémorable",
    "Verified post": "Publication vérifiée",
    "Community post": "Publication communautaire",
    "Traveler comments": "Commentaires des voyageurs",
    "Santorini, Greece": "Santorin, Grèce",
    "Kyoto, Japan": "Kyoto, Japon",
    "Swiss Alps, Switzerland": "Alpes suisses, Suisse"
  },
  ara: {
    "TRAVEL EXPERIENCE COMMUNITY": "مجتمع تجارب السفر",
    "Share Your Journey": "شارك رحلتك",
    "Travelers can post their experiences, receive likes and comments, and inspire others with real memories.": "يمكن للمسافرين نشر تجاربهم وتلقي الإعجابات والتعليقات وإلهام الآخرين بذكريات حقيقية.",
    "COMMUNITY OVERVIEW": "نظرة عامة على المجتمع",
    "Travelers Hub": "فضاء المسافرين",
    "POSTS": "المنشورات",
    "LIKES": "الإعجابات",
    "COMMENTS": "التعليقات",
    "Likes": "إعجابات",
    "Comments": "تعليقات",
    "ADD EXPERIENCE": "إضافة تجربة",
    "Create a new post": "إنشاء منشور جديد",
    "Destination or city": "الوجهة أو المدينة",
    "Trip title": "عنوان الرحلة",
    "Upload image": "رفع صورة",
    "No image selected yet.": "لم يتم اختيار صورة بعد.",
    "Share your travel experience...": "شارك تجربة سفرك...",
    "Publish Experience": "نشر التجربة",
    "Unknown Traveler": "مسافر غير معروف",
    "Custom destination": "وجهة مخصصة",
    "You": "أنت",
    "Verified Traveler": "مسافر موثق",
    "Traveler": "مسافر",
    "shared a real travel experience": "شارك تجربة سفر حقيقية",
    "| shared a real travel experience": "| شارك تجربة سفر حقيقية",
    "POST": "منشور",
    "TRAVEL STORY": "قصة سفر",
    "View experience details": "عرض تفاصيل التجربة",
    "TRAVELER COMMENTS": "تعليقات المسافرين",
    "Write a comment...": "اكتب تعليقا...",
    "Comment": "تعليق",
    "Experience not found": "التجربة غير موجودة",
    "This travel story may have been removed or the link is incorrect.": "ربما تمت إزالة قصة السفر هذه أو أن الرابط غير صحيح.",
    "Back to experiences": "العودة إلى التجارب",
    "Traveler story": "قصة المسافر",
    "What made this journey memorable": "ما الذي جعل هذه الرحلة لا تنسى",
    "Verified post": "منشور موثق",
    "Community post": "منشور المجتمع",
    "Traveler comments": "تعليقات المسافرين",
    "Santorini, Greece": "سانتوريني، اليونان",
    "Kyoto, Japan": "كيوتو، اليابان",
    "Swiss Alps, Switzerland": "جبال الألب السويسرية، سويسرا"
  },
};

Object.entries(experienceTranslations).forEach(([code, entries]) => {
  Object.assign(translations[code], entries);
});

const frenchPageCompletionTranslations = {
  "About NextTrip": "À propos de NextTrip",
  "A platform that connects travelers, agencies, and smarter trip planning.": "Une plateforme qui connecte les voyageurs, les agences et une planification de voyage plus intelligente.",
  "NextTrip is more than a static travel website. It is a planning platform where travelers can discover offers, agencies can manage requests, and every step becomes easier to follow.": "NextTrip est plus qu'un site de voyage statique. C'est une plateforme de planification où les voyageurs découvrent des offres, les agences gèrent les demandes, et chaque étape devient plus facile à suivre.",
  "Explore packages": "Explorer les forfaits",
  "For agencies": "Pour les agences",
  "Platform concept": "Concept de plateforme",
  "Discovery + Agency Workspace + Booking Flow": "Découverte + espace agence + parcours de réservation",
  "One experience for both sides of the travel journey.": "Une seule expérience pour les deux côtés du voyage.",
  "NextTrip brings the important parts of travel planning into one place.": "NextTrip rassemble les parties importantes de la planification de voyage au même endroit.",
  "Agencies respond": "Les agences répondent",
  "Trips stay organized": "Les voyages restent organisés",
  "Support builds trust": "Le support renforce la confiance",
  "Users discover destinations, compare packages, and choose the travel style that matches their plan.": "Les utilisateurs découvrent des destinations, comparent les forfaits et choisissent le style de voyage qui correspond à leur plan.",
  "Agencies receive clearer requests and manage packages, messages, and offers from a focused workspace.": "Les agences reçoivent des demandes plus claires et gèrent forfaits, messages et offres depuis un espace ciblé.",
  "The journey moves from inspiration to booking with fewer scattered steps and better context.": "Le parcours passe de l'inspiration à la réservation avec moins d'étapes dispersées et plus de contexte.",
  "Help pages, policies, and communication flows make the platform safer and easier to understand.": "Les pages d'aide, les politiques et les échanges rendent la plateforme plus sûre et plus facile à comprendre.",
  "Our goal": "Notre objectif",
  "Make travel planning feel clear for users and manageable for agencies.": "Rendre la planification de voyage claire pour les utilisateurs et facile à gérer pour les agences.",
  "For travel agencies": "Pour les agences de voyage",
  "NextTrip gives agencies a clearer way to receive requests, present packages, and keep communication moving without losing context.": "NextTrip donne aux agences une façon plus claire de recevoir les demandes, présenter les forfaits et garder la communication active sans perdre le contexte.",
  "Everything an agency needs to respond faster.": "Tout ce dont une agence a besoin pour répondre plus vite.",
  "Live workspace": "Espace de travail en direct",
  "Simple onboarding": "Intégration simple",
  "Simple performance": "Performance simple",
  "Active packages": "Forfaits actifs",
  "Pending requests": "Demandes en attente",
  "Booking requests": "Demandes de réservation",
  "Client messages": "Messages clients",
  "Package library": "Bibliothèque de forfaits",
  "Create agency account": "Créer un compte agence",
  "Sign in as agency": "Se connecter comme agence",
  "Receive structured client requests with destination, dates, budget, and traveler details.": "Recevez des demandes clients structurées avec destination, dates, budget et détails voyageurs.",
  "Publish curated offers and keep premium packages clear for travelers.": "Publiez des offres sélectionnées et gardez les forfaits premium clairs pour les voyageurs.",
  "Keep follow-ups close to the booking flow instead of scattered conversations.": "Gardez les suivis proches du parcours de réservation au lieu de conversations dispersées.",
  "From profile to first offer in a clear flow.": "Du profil à la première offre dans un parcours clair.",
  "1. Create agency profile": "1. Créer le profil agence",
  "2. Add packages": "2. Ajouter des forfaits",
  "3. Receive requests": "3. Recevoir les demandes",
  "4. Reply and convert": "4. Répondre et convertir",
  "New message from traveler about Kyoto route": "Nouveau message d'un voyageur au sujet du parcours Kyoto",
  "Agency not found": "Agence introuvable",
  "Back to agency page": "Retour à la page agence",
  "Agency profile": "Profil agence",
  "Agency sign in": "Connexion agence",
  "Contact summary": "Résumé du contact",
  "Known packages": "Forfaits connus",
  "Ask the agency for availability and price details.": "Demandez à l'agence les disponibilités et les détails du prix.",
  "Available through this agency profile.": "Disponible via ce profil d'agence.",
  "Response time": "Temps de réponse",
  "Services for travelers and agencies.": "Services pour voyageurs et agences.",
  "NextTrip services": "Services NextTrip",
  "Backend-ready flow": "Parcours prêt pour le backend",
  "Clean data, clear UI, and routes ready for API integration.": "Données propres, interface claire et routes prêtes pour l'intégration API.",
  "Keep custom requests, agency matching, booking support, and agency workspace tools clear before backend integration.": "Gardez les demandes personnalisées, la mise en relation avec les agences, le support de réservation et les outils d'espace agence clairs avant l'intégration backend.",
  "4 core services": "4 services principaux",
  "Service not found": "Service introuvable",
  "Back to services": "Retour aux services",
  "Audience": "Public",
  "Backend ready": "Prêt pour le backend",
  "Backend can later store, match, and notify based on the same fields.": "Le backend pourra ensuite stocker, associer et notifier à partir des mêmes champs.",
  "Platform keeps the request readable for agencies.": "La plateforme garde la demande lisible pour les agences.",
  "Ready to continue?": "Prêt à continuer ?",
  "Start with a custom trip request or contact support if you need help.": "Commencez par une demande de voyage personnalisée ou contactez le support si vous avez besoin d'aide.",
  "Open the services overview to choose another page.": "Ouvrez l'aperçu des services pour choisir une autre page.",
  "Secure checkout": "Paiement sécurisé",
  "Review package details before payment": "Vérifier les détails du forfait avant paiement",
  "Review and confirm your package.": "Vérifiez et confirmez votre forfait.",
  "Order summary": "Résumé de la commande",
  "Accepted cards": "Cartes acceptées",
  "Bank card": "Carte bancaire",
  "Bank Card": "Carte bancaire",
  "Deposit request": "Demande d'acompte",
  "Pay with agency": "Payer avec l'agence",
  "Payment method": "Méthode de paiement",
  "Save checkout": "Enregistrer le paiement",
  "Secure payment section ready for backend gateway integration.": "Section de paiement sécurisée prête pour l'intégration d'une passerelle backend.",
  "Bank transfer and agency deposit can be connected later.": "Le virement bancaire et l'acompte agence pourront être connectés plus tard.",
  "Need help?": "Besoin d'aide ?",
  "Pickup, room preference, food request...": "Prise en charge, préférence de chambre, demande alimentaire...",
  "Taxes": "Taxes",
  "Insurance": "Assurance",
  "Mastercard": "Mastercard",
  "My bookings": "Mes réservations",
  "Active trips": "Voyages actifs",
  "Featured booking": "Réservation mise en avant",
  "Booking ID": "ID de réservation",
  "Date": "Date",
  "Payment": "Paiement",
  "Request": "Demande",
  "Confirmed": "Confirmé",
  "bookings tracked": "réservations suivies",
  "A simple traveler view for booking status, receipts, package details, and agency follow-up.": "Une vue voyageur simple pour suivre le statut de réservation, les reçus, les détails du forfait et le suivi agence.",
  "Profile": "Profil",
  "Traveler account": "Compte voyageur",
  "Account details": "Détails du compte",
  "Home city": "Ville de départ",
  "Member since": "Membre depuis",
  "Activity timeline": "Chronologie d'activité",
  "Ready for better offers": "Prêt pour de meilleures offres",
  "Next actions": "Prochaines actions",
  "Create trip": "Créer un voyage",
  "Phone": "Téléphone",
  "Manage your profile, preferences, booking history, and trip requests from one clear traveler workspace.": "Gérez votre profil, vos préférences, votre historique de réservation et vos demandes de voyage depuis un espace voyageur clair.",
  "Terms summary": "Résumé des conditions",
  "Terms": "Conditions",
  "Clear expectations make bookings smoother for travelers and agencies.": "Des attentes claires rendent les réservations plus fluides pour les voyageurs et les agences.",
  "Using the platform": "Utilisation de la plateforme",
  "Applies to": "S'applique à",
  "Accounts, requests, bookings": "Comptes, demandes, réservations",
  "Important rule": "Règle importante",
  "Provide accurate information when creating an account or sending a booking request.": "Fournissez des informations exactes lors de la création d'un compte ou de l'envoi d'une demande de réservation.",
  "Packages may vary by dates, availability, traveler count, and agency confirmation.": "Les forfaits peuvent varier selon les dates, la disponibilité, le nombre de voyageurs et la confirmation de l'agence.",
  "Agencies manage their offers, itinerary details, and final booking-specific confirmations.": "Les agences gèrent leurs offres, les détails d'itinéraire et les confirmations finales propres à chaque réservation.",
  "Keep payment and personal details up to date when moving forward with a reservation.": "Gardez les informations de paiement et personnelles à jour lors de la réservation.",
  "Support helps route questions and explain flows, but time-sensitive travel changes should be shared with the correct agency or official channel as early as possible.": "Le support aide à orienter les questions et expliquer les parcours, mais les changements urgents doivent être envoyés à la bonne agence ou au canal officiel le plus tôt possible.",
  "Need practical answers?": "Besoin de réponses pratiques ?",
  "For common booking questions in simple language, the FAQ page is the fastest next stop.": "Pour les questions courantes de réservation en langage simple, la FAQ est l'étape la plus rapide.",
  "Open FAQ": "Ouvrir la FAQ",
  "Go to Support": "Aller au support",
  "Privacy summary": "Résumé de confidentialité",
  "Privacy matters because travel planning includes personal details.": "La confidentialité est importante car la planification de voyage inclut des données personnelles.",
  "Main principle": "Principe principal",
  "Account details such as name, email, and sign-in data.": "Détails de compte comme le nom, l'e-mail et les données de connexion.",
  "Booking details like destination, dates, preferences, and package selections.": "Détails de réservation comme destination, dates, préférences et choix de forfait.",
  "Support and communication details when you contact the team or an agency.": "Détails de support et de communication quand vous contactez l'équipe ou une agence.",
  "Support and agency teams use the details you share to answer questions and follow up on bookings.": "Les équipes support et agence utilisent les détails partagés pour répondre aux questions et suivre les réservations.",
  "Handled through support": "Géré via le support",
  "Sensitive updates should always be sent through official support channels.": "Les mises à jour sensibles doivent toujours passer par les canaux officiels de support.",
  "Need the rules too?": "Besoin aussi des règles ?",
  "If you also want to understand platform responsibilities and booking expectations, read the terms page.": "Pour comprendre aussi les responsabilités de la plateforme et les attentes de réservation, consultez les conditions.",
  "Read privacy and terms": "Lire confidentialité et conditions",
  "Contact Team": "Contacter l'équipe",
  "Cancellation rules depend on the agency and package selected.": "Les règles d'annulation dépendent de l'agence et du forfait sélectionnés.",
  "Agencies should explain changes early and clearly.": "Les agences doivent expliquer les changements tôt et clairement.",
  "Any schedule or hotel change should appear in booking updates.": "Tout changement d'horaire ou d'hôtel doit apparaître dans les mises à jour de réservation.",
  "Future backend rules can store cancellation windows per package.": "Les futures règles backend pourront stocker les fenêtres d'annulation par forfait.",
  "Contact support if you need help understanding a cancellation case.": "Contactez le support si vous avez besoin d'aide pour comprendre un cas d'annulation.",
  "Support can help route cancellation questions to the agency.": "Le support peut orienter les questions d'annulation vers l'agence.",
  "Refund eligibility depends on package rules, agency terms, and timing.": "L'éligibilité au remboursement dépend des règles du forfait, des conditions de l'agence et du timing.",
  "Refund status should be tracked from the booking workspace later.": "Le statut de remboursement devra être suivi depuis l'espace de réservation plus tard.",
  "Backend-ready fields": "Champs prêts pour le backend",
  "Booking ID, payment reference, agency ID, request date, status, and decision note.": "ID de réservation, référence de paiement, ID agence, date de demande, statut et note de décision.",
  "Support can use the same data to communicate with travelers.": "Le support peut utiliser les mêmes données pour communiquer avec les voyageurs.",
  "FAQ": "FAQ",
  "Can I customize a package before booking?": "Puis-je personnaliser un forfait avant de réserver ?",
  "How do I contact an agency?": "Comment contacter une agence ?",
  "Does pricing stay fixed?": "Le prix reste-t-il fixe ?",
  "Need package options": "Besoin d'options de forfait",
  "Need direct contact": "Besoin d'un contact direct",
  "Need policy details": "Besoin de détails de politique",
  "Need support": "Besoin de support",
  "Pricing can depend on dates, traveler count, availability, and agency confirmation, so always review the latest package details before final payment.": "Le prix peut dépendre des dates, du nombre de voyageurs, de la disponibilité et de la confirmation de l'agence. Vérifiez toujours les derniers détails avant le paiement final.",
  "Open the help center": "Ouvrir le centre d'aide",
  "Reviews snapshot": "Aperçu des avis",
  "How reviews help the platform": "Comment les avis aident la plateforme",
  "Main value": "Valeur principale",
  "Agency outcome": "Résultat agence",
  "Better decisions": "Meilleures décisions",
  "Better service signals": "Meilleurs signaux de service",
  "Packages and support": "Forfaits et support",
  "Open Experiences": "Ouvrir les expériences",
  "See Packages": "Voir les forfaits",
  "A simple trip flow": "Un parcours de voyage simple",
  "Agency brief": "Brief agence",
  "Planning pillars": "Piliers de planification",
  "Included ideas": "Idées incluses",
  "Sample rhythm": "Rythme exemple",
  "Switch the travel mood without losing the platform structure.": "Changez l'ambiance du voyage sans perdre la structure de la plateforme.",
  "NextTrip turns this style into a structured request: destination, dates, budget, travelers, services, pace, and notes. That makes agency replies easier to compare.": "NextTrip transforme ce style en demande structurée : destination, dates, budget, voyageurs, services, rythme et notes. Cela rend les réponses des agences plus faciles à comparer.",
  "Build this request": "Créer cette demande",
  "Explore more styles": "Explorer plus de styles",
  "Everything agencies need before they reply": "Tout ce dont les agences ont besoin avant de répondre",
  "Request summary": "Résumé de la demande",
  "Request movement": "Progression de la demande",
  "Agency checklist": "Checklist agence",
  "Services requested": "Services demandés",
  "Current status": "Statut actuel",
  "Back to profile": "Retour au profil",
  "Workspace": "Espace de travail",
  "Page not found": "Page introuvable",
  "Live records": "Données en direct",
  "Backend fields": "Champs backend",
  "Examples ready for backend connection": "Exemples prêts pour la connexion backend",
  "How this entity moves": "Comment cette entité évolue",
  "Model pages": "Pages modèles",
  "Open dashboard": "Ouvrir le tableau de bord",
  "Open users workspace": "Ouvrir l'espace utilisateurs",
  "Test trip flow": "Tester le parcours voyage",
  "Schema": "Schéma",
  "Flow": "Parcours",
  "Agency Workspace": "Espace agence",
  "A simple visual overview of your agency activity": "Un aperçu visuel simple de l'activité de votre agence",
  "Monthly performance": "Performance mensuelle",
  "Recent booking requests": "Demandes de réservation récentes",
  "No bookings found for this filter.": "Aucune réservation trouvée pour ce filtre.",
  "Submit offer": "Envoyer l'offre",
  "Export": "Exporter",
  "All (": "Toutes (",
  "Pending (": "En attente (",
  "Review (": "À vérifier (",
  "Latest messages": "Derniers messages",
  "New message": "Nouveau message",
  "Archive": "Archiver",
  "Mark read": "Marquer lu",
  "Read": "Lu",
  "Stay close to your travelers and answer faster": "Restez proche de vos voyageurs et répondez plus vite",
  "Subject": "Sujet",
  "Send": "Envoyer",
  "Cancel": "Annuler",
  "Add package": "Ajouter un forfait",
  "Create package": "Créer un forfait",
  "Create new package": "Créer un nouveau forfait",
  "Package title": "Titre du forfait",
  "Price": "Prix",
  "Save package": "Enregistrer le forfait",
  "Featured packages": "Forfaits en vedette",
  "Curated travel products ready to sell": "Produits de voyage sélectionnés prêts à vendre",
  "Active agency opportunities": "Opportunités agence actives",
  "Fast replies improve conversions": "Les réponses rapides améliorent les conversions",
  "Keep your offers fresh": "Gardez vos offres à jour",
  "Bookings exported.": "Réservations exportées.",
  "Message archived.": "Message archivé.",
  "Message marked as read.": "Message marqué comme lu.",
  "Message sent.": "Message envoyé.",
  "Package created.": "Forfait créé.",
  "Offer submitted successfully.": "Offre envoyée avec succès.",
  "Fill package title, place and price.": "Remplissez le titre, le lieu et le prix du forfait.",
  "Page Not Found": "Page introuvable",
  "Back to Home": "Retour à l'accueil",
  "The page you are looking for does not exist or has been moved.": "La page que vous cherchez n'existe pas ou a été déplacée.",
  "Questions users may ask first": "Questions que les utilisateurs peuvent poser d'abord",
  "Packages and offers from agencies": "Forfaits et offres des agences",
  "Ready offers": "Offres prêtes",
  "Ready when the user is": "Prêt quand l'utilisateur l'est",
  "NextTrip travel video preview": "Aperçu vidéo de voyage NextTrip",
  "Thank you,": "Merci,",
  "NEXTTRIP BOOKING RECEIPT": "REÇU DE RÉSERVATION NEXTTRIP",
  "NextTrip Receipt": "Reçu NextTrip",
  "Location:": "Lieu :",
  "Package:": "Forfait :",
  "Not provided": "Non fourni",
  "No": "Non",
  "Yes": "Oui",
  "11 Apr 2026": "11 avr. 2026",
  "MM/YY": "MM/AA",
  "pending booking request(s)": "demande(s) de réservation en attente",
  "active packages": "forfaits actifs"
};

const frenchHiddenMenuTranslations = {
  "Start": "Commencer",
  "Explore": "Explorer",
  "Travel Styles": "Styles de voyage",
  "Support": "Support",
  "Policies": "Politiques",
  "Agencies": "Agences",
  "Adventures": "Aventures",
  "Individual": "Individuel",
  "Group": "Groupe",
  "Family": "Famille",
  "Honeymoon": "Lune de miel",
  "Religion": "Religion",
  "Adventure": "Aventure",
  "About Us": "À propos",
  "Contact Us": "Contact",
  "Privacy Policy": "Politique de confidentialité",
  "Terms of Service": "Conditions d'utilisation",
  "Back home": "Retour à l'accueil",
  "Plan smarter with NextTrip": "Planifiez plus intelligemment avec NextTrip",
  "Find packages, compare offers, or send a clear custom trip request.": "Trouvez des forfaits, comparez des offres ou envoyez une demande de voyage personnalisée claire.",
  "Sign in to continue": "Connectez-vous pour continuer",
  "Language": "Langue",
  "Currency": "Devise",
  "Discover": "Découvrir",
  "Company": "Entreprise",
  "Help": "Aide",
  "Contact us": "Contact",
  "How it works": "Fonctionnement",
  "Help center": "Centre d'aide",
  "Newsletter": "Newsletter",
  "Curated travel planning with direct agency support and smoother booking flows.": "Planification de voyage sélectionnée avec support direct des agences et parcours de réservation plus fluides.",
  "Smarter travel planning with trusted agencies, curated packages, and support that stays close to every trip.": "Une planification de voyage plus intelligente avec des agences fiables, des forfaits sélectionnés et un support proche de chaque voyage.",
  "Enter your email": "Saisissez votre e-mail",
  "Subscribe": "S'abonner",
  "(c) 2026 NextTrip. All rights reserved.": "(c) 2026 NextTrip. Tous droits réservés.",
  "Individual Travel": "Voyage individuel",
  "Freedom-first trips for travelers who want their own pace.": "Des voyages libres pour les voyageurs qui veulent avancer à leur propre rythme.",
  "Individual travel on NextTrip focuses on flexible planning, useful agency support, and enough space for personal decisions before booking.": "Le voyage individuel sur NextTrip met l'accent sur une planification flexible, un support d'agence utile et assez de liberté pour décider avant de réserver.",
  "Solo rhythm": "Rythme solo",
  "Solo travelers, remote workers, flexible explorers": "Voyageurs solo, télétravailleurs, explorateurs flexibles",
  "8,000 - 18,000 MAD": "8 000 - 18 000 MAD",
  "4 - 10 days": "4 - 10 jours",
  "Flexible": "Flexible",
  "Flexible pace": "Rythme flexible",
  "Keep must-see moments planned while leaving space for slow mornings and local discoveries.": "Gardez les incontournables planifiés tout en laissant de la place aux matinées calmes et aux découvertes locales.",
  "Clear safety details": "Détails de sécurité clairs",
  "Compare stays, transfers, and local support before choosing the offer.": "Comparez les séjours, les transferts et le support local avant de choisir l'offre.",
  "Personal brief": "Brief personnel",
  "Send your exact budget, timing, and travel mood to agencies in one structured request.": "Envoyez votre budget exact, vos dates et votre ambiance de voyage aux agences dans une demande structurée.",
  "Arrival and city orientation": "Arrivée et orientation en ville",
  "Curated local experience": "Expérience locale sélectionnée",
  "Free discovery day": "Journée de découverte libre",
  "Agency-supported checkout": "Réservation accompagnée par l'agence",
  "Hotel options": "Options d'hôtel",
  "Airport transfer": "Transfert aéroport",
  "Local guide on demand": "Guide local à la demande",
  "Flexible activity slots": "Créneaux d'activités flexibles",
  "Group Travel": "Voyage en groupe",
  "Group trips that are easier to coordinate, price, and confirm.": "Des voyages de groupe plus faciles à coordonner, chiffrer et confirmer.",
  "Group travel needs shared planning, transparent package details, and clear communication so everyone understands the plan.": "Le voyage en groupe demande une planification partagée, des détails de forfait transparents et une communication claire pour que tout le monde comprenne le plan.",
  "Shared plans": "Plans partagés",
  "Friends, teams, associations, student groups": "Amis, équipes, associations, groupes étudiants",
  "6,000 - 14,000 MAD / person": "6 000 - 14 000 MAD / personne",
  "3 - 12 days": "3 - 12 jours",
  "Social": "Social",
  "Shared budget": "Budget partagé",
  "Keep pricing easy to understand with per-person totals and optional add-ons.": "Gardez les prix faciles à comprendre avec des totaux par personne et des options supplémentaires.",
  "Group logistics": "Logistique de groupe",
  "Transport, rooms, and activities are organized around group size and timing.": "Le transport, les chambres et les activités sont organisés selon la taille du groupe et le timing.",
  "One clear contact": "Un contact clair",
  "Agencies can respond to the group leader with clearer offers and fewer repeated questions.": "Les agences peuvent répondre au responsable du groupe avec des offres plus claires et moins de questions répétées.",
  "Group arrival": "Arrivée du groupe",
  "Main city tour": "Visite principale de la ville",
  "Shared activity day": "Journée d'activité partagée",
  "Flexible evening plan": "Programme de soirée flexible",
  "Group transport": "Transport de groupe",
  "Room allocation": "Répartition des chambres",
  "Shared excursions": "Excursions partagées",
  "Agency coordination": "Coordination de l'agence",
  "Family Travel": "Voyage en famille",
  "Family trips balanced around comfort, timing, and easy logistics.": "Des voyages en famille équilibrés autour du confort, du timing et d'une logistique simple.",
  "Family travel works best when hotels, transport, activities, and daily rhythm are planned for different ages.": "Le voyage en famille fonctionne mieux quand les hôtels, le transport, les activités et le rythme quotidien sont pensés pour différents âges.",
  "Comfort first": "Confort d'abord",
  "Parents, children, multi-generation trips": "Parents, enfants, voyages multigénérationnels",
  "10,000 - 24,000 MAD": "10 000 - 24 000 MAD",
  "5 - 10 days": "5 - 10 jours",
  "Easy-going": "Détendu",
  "Child-friendly rhythm": "Rythme adapté aux enfants",
  "Avoid overloaded days and keep transfers, meals, and activities easy to manage.": "Évitez les journées trop chargées et gardez les transferts, repas et activités faciles à gérer.",
  "Safe stays": "Séjours sûrs",
  "Compare family-friendly hotels, room types, and nearby services.": "Comparez les hôtels adaptés aux familles, les types de chambres et les services à proximité.",
  "Simple support": "Support simple",
  "Keep booking details, documents, and agency updates in one place.": "Gardez les détails de réservation, documents et mises à jour de l'agence au même endroit.",
  "Easy arrival": "Arrivée facile",
  "Family activity": "Activité familiale",
  "Beach or city day": "Journée plage ou ville",
  "Rest and local dinner": "Repos et dîner local",
  "Family rooms": "Chambres familiales",
  "Child-friendly activities": "Activités adaptées aux enfants",
  "Travel insurance options": "Options d'assurance voyage",
  "Honeymoon Travel": "Voyage de lune de miel",
  "Romantic trips with calmer planning and memorable details.": "Des voyages romantiques avec une planification plus calme et des détails mémorables.",
  "Honeymoon travel on NextTrip is about atmosphere, comfort, and curated moments that feel special from booking to arrival.": "La lune de miel sur NextTrip met l'accent sur l'ambiance, le confort et des moments sélectionnés qui restent spéciaux de la réservation à l'arrivée.",
  "Romantic detail": "Détail romantique",
  "Couples, anniversary trips, premium escapes": "Couples, voyages d'anniversaire, escapades premium",
  "15,000 - 38,000 MAD": "15 000 - 38 000 MAD",
  "5 - 12 days": "5 - 12 jours",
  "Romantic": "Romantique",
  "Atmosphere": "Ambiance",
  "Choose stays, views, dining, and activities that match the couple's mood.": "Choisissez des séjours, vues, repas et activités qui correspondent à l'ambiance du couple.",
  "Low-stress logistics": "Logistique sans stress",
  "Transfers, confirmations, and timing are handled clearly before departure.": "Les transferts, confirmations et horaires sont gérés clairement avant le départ.",
  "Special moments": "Moments spéciaux",
  "Add dinners, spa moments, private tours, or sunset experiences as selected options.": "Ajoutez des dîners, moments spa, visites privées ou expériences au coucher du soleil comme options sélectionnées.",
  "Private arrival": "Arrivée privée",
  "Slow exploration": "Découverte en douceur",
  "Signature romantic moment": "Moment romantique signature",
  "Relaxed final day": "Dernière journée détendue",
  "Premium hotel options": "Options d'hôtels premium",
  "Private transfers": "Transferts privés",
  "Couple experiences": "Expériences pour couples",
  "Special occasion notes": "Notes pour occasion spéciale",
  "Religious Travel": "Voyage religieux",
  "Spiritual journeys planned with respect, timing, and calm coordination.": "Des voyages spirituels planifiés avec respect, bon timing et coordination calme.",
  "Religious travel focuses on trusted planning, group clarity, respectful itineraries, and support for meaningful journeys.": "Le voyage religieux se concentre sur une planification fiable, une clarté de groupe, des itinéraires respectueux et un support pour des voyages porteurs de sens.",
  "Respectful planning": "Planification respectueuse",
  "Umrah groups, spiritual visits, community travel": "Groupes Omra, visites spirituelles, voyages communautaires",
  "9,000 - 22,000 MAD": "9 000 - 22 000 MAD",
  "5 - 14 days": "5 - 14 jours",
  "Spiritual": "Spirituel",
  "Respectful timing": "Timing respectueux",
  "Plan around prayer times, group movement, and calmer daily structure.": "Planifiez autour des horaires de prière, des déplacements du groupe et d'une structure quotidienne plus calme.",
  "Trusted coordination": "Coordination fiable",
  "Keep documents, transfers, hotel distance, and agency support clear.": "Gardez les documents, transferts, distance de l'hôtel et support de l'agence bien clairs.",
  "Group clarity": "Clarté de groupe",
  "Make inclusions visible so travelers understand what is covered.": "Rendez les inclusions visibles pour que les voyageurs comprennent ce qui est couvert.",
  "Arrival and hotel check-in": "Arrivée et installation à l'hôtel",
  "Main spiritual visit": "Visite spirituelle principale",
  "Guided group day": "Journée de groupe guidée",
  "Document and departure support": "Support documents et départ",
  "Visa support notes": "Notes de support visa",
  "Group transfers": "Transferts de groupe",
  "Nearby hotel options": "Options d'hôtels proches",
  "Guide coordination": "Coordination du guide",
  "Adventure Travel": "Voyage d'aventure",
  "Active trips for travelers who want nature, movement, and stronger memories.": "Des voyages actifs pour les voyageurs qui veulent de la nature, du mouvement et des souvenirs plus forts.",
  "Adventure travel helps travelers compare outdoor packages, safety details, and agency support before choosing high-energy experiences.": "Le voyage d'aventure aide les voyageurs à comparer les forfaits outdoor, les détails de sécurité et le support d'agence avant de choisir des expériences intenses.",
  "Active energy": "Énergie active",
  "Hikers, outdoor groups, nature explorers": "Randonneurs, groupes outdoor, explorateurs nature",
  "7,500 - 20,000 MAD": "7 500 - 20 000 MAD",
  "3 - 9 days": "3 - 9 jours",
  "Active": "Actif",
  "Safety details": "Détails de sécurité",
  "Understand guide support, difficulty, equipment, and cancellation rules before booking.": "Comprenez le support du guide, la difficulté, l'équipement et les règles d'annulation avant de réserver.",
  "Nature-first routes": "Parcours axés sur la nature",
  "Build around mountains, deserts, forests, coastlines, or island escapes.": "Construisez le voyage autour des montagnes, déserts, forêts, côtes ou îles.",
  "Right pace": "Bon rythme",
  "Match activities to fitness level, group size, and preferred intensity.": "Adaptez les activités au niveau physique, à la taille du groupe et à l'intensité souhaitée.",
  "Arrival and gear check": "Arrivée et vérification de l'équipement",
  "Main outdoor route": "Parcours outdoor principal",
  "Recovery or second activity": "Récupération ou deuxième activité",
  "Return transfer": "Transfert retour",
  "Certified guides": "Guides certifiés",
  "Transport to route": "Transport vers le parcours",
  "Equipment notes": "Notes d'équipement",
  "Insurance options": "Options d'assurance",
  "Best for": "Idéal pour",
  "Budget": "Budget",
  "Duration": "Durée",
  "Mood": "Ambiance",
  "What makes this style feel right": "Ce qui rend ce style pertinent",
  "What agencies receive": "Ce que les agences reçoivent",
  "Useful options to compare": "Options utiles à comparer",
  "Before booking": "Avant la réservation",
  "Understand package details, included services, payment flow, and what to ask before reserving.": "Comprenez les détails du forfait, les services inclus, le paiement et les questions à poser avant de réserver.",
  "Agency contact": "Contact agence",
  "Get directed to the right agency conversation with the destination and package context included.": "Accédez à la bonne conversation d'agence avec la destination et le contexte du forfait inclus.",
  "After booking": "Après la réservation",
  "Follow next steps, prepare documents, and know what information your agency needs from you.": "Suivez les prochaines étapes, préparez les documents et sachez quelles informations l'agence attend de vous.",
  "How do I compare two packages?": "Comment comparer deux forfaits ?",
  "Can I contact an agency before booking?": "Puis-je contacter une agence avant de réserver ?",
  "Where can I see booking details?": "Où puis-je voir les détails de réservation ?",
  "How do agencies receive my request?": "Comment les agences reçoivent-elles ma demande ?",
  "Help Center": "Centre d'aide",
  "Get unstuck faster, before or after booking.": "Avancez plus vite, avant ou après la réservation.",
  "Help on NextTrip is built around real traveler moments: choosing, confirming, contacting agencies, and preparing the next step.": "L'aide sur NextTrip est pensée autour des vrais moments du voyageur : choisir, confirmer, contacter les agences et préparer l'étape suivante.",
  "Need direct help?": "Besoin d'aide directe ?",
  "Send the package name, destination, and booking reference if you have one.": "Envoyez le nom du forfait, la destination et la référence de réservation si vous en avez une.",
  "Contact support": "Contacter le support",
  "Quick questions": "Questions rapides",
  "Common questions travelers ask.": "Questions fréquentes des voyageurs.",
  "Email support": "Support par e-mail",
  "General questions, account help, and booking clarification.": "Questions générales, aide compte et clarification de réservation.",
  "Agency partnerships": "Partenariats agences",
  "For agencies joining NextTrip or updating profile details.": "Pour les agences qui rejoignent NextTrip ou mettent à jour leur profil.",
  "Travel help": "Aide voyage",
  "For active booking issues, include your booking reference.": "Pour les problèmes de réservation actifs, incluez votre référence de réservation.",
  "Response target": "Objectif de réponse",
  "Within 24 hours": "Sous 24 heures",
  "Channels": "Canaux",
  "Email + support": "E-mail + support",
  "Coverage": "Couverture",
  "Morocco and worldwide": "Maroc et monde entier",
  "Contact NextTrip": "Contacter NextTrip",
  "Need a real answer? Reach the right team quickly.": "Besoin d'une vraie réponse ? Contactez rapidement la bonne équipe.",
  "Whether you are preparing a booking, comparing agencies, or solving an active travel issue, this page gives you a clear way to contact us.": "Que vous prépariez une réservation, compariez des agences ou régliez un problème de voyage actif, cette page vous donne une façon claire de nous contacter.",
  "Support is available": "Le support est disponible",
  "7 days a week": "7 jours sur 7",
  "Message us": "Écrivez-nous",
  "Send a clear request": "Envoyez une demande claire",
  "Add enough context so support can route your message without asking the same questions again.": "Ajoutez assez de contexte pour que le support oriente votre message sans reposer les mêmes questions.",
  "Full name": "Nom complet",
  "Your name": "Votre nom",
  "Topic": "Sujet",
  "Booking question": "Question de réservation",
  "Agency partnership": "Partenariat agence",
  "Support request": "Demande de support",
  "Account help": "Aide compte",
  "Booking reference": "Référence de réservation",
  "Optional": "Optionnel",
  "Message": "Message",
  "Tell us what you need help with...": "Dites-nous de quoi vous avez besoin...",
  "Send message": "Envoyer le message",
  "Custom Trip Planning": "Planification de voyage personnalisée",
  "Personal service": "Service personnalisé",
  "Build a trip brief with dates, budget, mood, travelers, and extras so agencies can send tailored offers.": "Créez un brief de voyage avec dates, budget, ambiance, voyageurs et options pour que les agences envoient des offres adaptées.",
  "Travelers who do not want a ready-made package.": "Voyageurs qui ne veulent pas d'un forfait prêt à l'emploi.",
  "Destination and date planning": "Planification de destination et dates",
  "Budget and travel style filters": "Filtres budget et style de voyage",
  "Hotel, transport, and activity preferences": "Préférences d'hôtel, transport et activités",
  "Agency-ready request summary": "Résumé de demande prêt pour l'agence",
  "Agency Matching": "Mise en relation avec agence",
  "Trusted agencies": "Agences fiables",
  "Connect travelers with agencies that match their destination, budget, and response needs.": "Connectez les voyageurs avec les agences adaptées à leur destination, budget et besoin de réponse.",
  "Users who want offers from the right agency faster.": "Utilisateurs qui veulent recevoir plus vite des offres de la bonne agence.",
  "Verified agency profiles": "Profils d'agences vérifiés",
  "Specialty-based recommendations": "Recommandations selon les spécialités",
  "Response and rating visibility": "Visibilité des réponses et notes",
  "Direct contact flow": "Parcours de contact direct",
  "Booking Support": "Support de réservation",
  "Trip confidence": "Confiance voyage",
  "Keep booking details, receipts, support steps, and follow-ups in one place.": "Gardez les détails de réservation, reçus, étapes de support et suivis au même endroit.",
  "Travelers who want clear booking tracking.": "Voyageurs qui veulent un suivi de réservation clair.",
  "Booking status overview": "Aperçu du statut de réservation",
  "Payment and receipt summary": "Résumé paiement et reçu",
  "Support handoff": "Transmission au support",
  "Policy and cancellation guidance": "Guide politique et annulation",
  "Package Management": "Gestion des forfaits",
  "Agency workspace": "Espace agence",
  "Help agencies organize offers, requests, messages, and package performance from the dashboard.": "Aidez les agences à organiser offres, demandes, messages et performance des forfaits depuis le tableau de bord.",
  "Agencies that need a clearer travel workspace.": "Agences qui ont besoin d'un espace de voyage plus clair.",
  "Package publishing flow": "Parcours de publication de forfait",
  "Request management": "Gestion des demandes",
  "Traveler messaging": "Messagerie voyageurs",
  "Simple performance metrics": "Indicateurs de performance simples",
  "View service": "Voir le service",
  "This service page is not available.": "Cette page de service n'est pas disponible.",
  "The service may have been moved or the link is incorrect.": "Le service a peut-être été déplacé ou le lien est incorrect.",
  "What this service includes": "Ce que ce service inclut",
  "User enters structured information.": "L'utilisateur saisit des informations structurées.",
  "Contact": "Contact",
  "To operate the platform": "Faire fonctionner la plateforme",
  "Your information helps us show relevant packages, manage accounts, and keep booking steps organized.": "Vos informations nous aident à afficher des forfaits pertinents, gérer les comptes et organiser les étapes de réservation.",
  "To support requests": "Accompagner les demandes",
  "To improve experience": "Améliorer l'expérience",
  "Usage patterns help us improve navigation, package discovery, and support flows over time.": "Les habitudes d'utilisation nous aident à améliorer la navigation, la découverte de forfaits et les parcours de support.",
  "Your control": "Votre contrôle",
  "You can request account-related help through our contact page.": "Vous pouvez demander de l'aide liée au compte via notre page contact.",
  "You can ask for clarification on what information is needed for support or booking workflows.": "Vous pouvez demander des précisions sur les informations nécessaires au support ou à la réservation.",
  "This page explains, in plain language, the kinds of information used to run the platform, assist bookings, and improve traveler support.": "Cette page explique simplement les types d'informations utilisées pour faire fonctionner la plateforme, aider les réservations et améliorer le support voyageurs.",
  "Used for": "Utilisé pour",
  "Accounts, bookings, support": "Comptes, réservations, support",
  "Use only what helps the trip flow": "Utiliser seulement ce qui aide le parcours du voyage",
  "User requests": "Demandes utilisateur",
  "Questions": "Questions",
  "View Terms": "Voir les conditions",
  "Use the platform for genuine travel planning, agency communication, and booking-related actions.": "Utilisez la plateforme pour une vraie planification de voyage, la communication avec les agences et les actions liées aux réservations.",
  "Travelers should review package details carefully before checkout and communicate changes early.": "Les voyageurs doivent vérifier soigneusement les détails du forfait avant le paiement et communiquer les changements tôt.",
  "These terms summarize how the platform should be used, what booking information depends on agencies, and what travelers should review before confirming a reservation.": "Ces conditions résument comment utiliser la plateforme, quelles informations de réservation dépendent des agences et ce que les voyageurs doivent vérifier avant de confirmer.",
  "Agency role": "Rôle de l'agence",
  "Manage offers and confirmations": "Gérer les offres et confirmations",
  "Support role": "Rôle du support",
  "Guide and route questions": "Guider et orienter les questions",
  "Yes. The site is built around package discovery plus direct agency communication so travelers can refine details before checkout.": "Oui. Le site est conçu autour de la découverte des forfaits et du contact direct avec les agences afin d'affiner les détails avant le paiement.",
  "You can use the agency and dashboard flows already available on the site, or contact support if you are not sure where your request should go.": "Vous pouvez utiliser les parcours agence et tableau de bord déjà disponibles sur le site, ou contacter le support si vous ne savez pas où envoyer votre demande.",
  "What if I need help after booking?": "Et si j'ai besoin d'aide après la réservation ?",
  "Use your booking reference and contact support or the relevant agency as early as possible so your case can be routed correctly.": "Utilisez votre référence de réservation et contactez le support ou l'agence concernée le plus tôt possible pour bien orienter votre cas.",
  "This page is here for the practical things: customization, agency contact, booking help, and what can affect final package pricing.": "Cette page répond aux besoins pratiques : personnalisation, contact agence, aide réservation et éléments pouvant influencer le prix final.",
  "Use the contact page": "Utiliser la page contact",
  "Clear cancellation rules before every booking.": "Des règles d'annulation claires avant chaque réservation.",
  "This page gives travelers and agencies a clear place for cancellation expectations before backend rules are connected.": "Cette page donne aux voyageurs et agences un espace clair pour les attentes d'annulation avant la connexion des règles backend.",
  "Traveler cancellations": "Annulations voyageurs",
  "Travelers should review deadlines before confirming payment.": "Les voyageurs doivent vérifier les délais avant de confirmer le paiement.",
  "Agency cancellations": "Annulations agences",
  "Refund handling should remain transparent and easy to track.": "Le traitement des remboursements doit rester transparent et facile à suivre.",
  "This policy page keeps refund expectations organized until payment and agency rules are connected to the backend.": "Cette page de politique garde les attentes de remboursement organisées jusqu'à la connexion du paiement et des règles agences au backend.",
  "Travelers should keep receipts and booking references available.": "Les voyageurs doivent garder les reçus et références de réservation disponibles.",
  "These fields can power refund tracking in the user profile.": "Ces champs peuvent alimenter le suivi des remboursements dans le profil utilisateur.",
  "Questions about payment?": "Questions sur le paiement ?",
  "Contact support or review your bookings.": "Contactez le support ou vérifiez vos réservations.",
  "How It Works": "Comment ça marche",
  "From first idea to final booking, the trip flow is built to stay clear.": "De la première idée à la réservation finale, le parcours de voyage reste clair.",
  "This page explains the practical rhythm of NextTrip: discover, compare, customize, and confirm without losing your place.": "Cette page explique le rythme pratique de NextTrip : découvrir, comparer, personnaliser et confirmer sans perdre le fil.",
  "Simple trip flow": "Parcours de voyage simple",
  "1. Discover": "1. Découvrir",
  "Start by exploring packages, destinations, or travel styles that match your budget and mood.": "Commencez par explorer des forfaits, destinations ou styles de voyage qui correspondent à votre budget et à votre ambiance.",
  "2. Compare": "2. Comparer",
  "Look at details, clarify what matters, and use agency communication when you need more precision.": "Consultez les détails, clarifiez ce qui compte et utilisez la communication avec l'agence quand vous avez besoin de précision.",
  "3. Customize": "3. Personnaliser",
  "Adjust dates, traveler count, style, or preferences before moving toward checkout.": "Ajustez les dates, le nombre de voyageurs, le style ou les préférences avant de passer au paiement.",
  "4. Confirm": "4. Confirmer",
  "Complete the booking flow, review totals, and keep your receipt and support routes close.": "Terminez le parcours de réservation, vérifiez les totaux et gardez votre reçu et les accès support à portée.",
  "Why this works better": "Pourquoi cela fonctionne mieux",
  "Travelers keep context instead of jumping across disconnected pages.": "Les voyageurs gardent le contexte au lieu de passer entre des pages déconnectées.",
  "Agencies receive clearer requests and can respond faster.": "Les agences reçoivent des demandes plus claires et peuvent répondre plus vite.",
  "Support pages and policies reduce uncertainty before payment.": "Les pages support et politiques réduisent l'incertitude avant le paiement.",
  "Flow summary": "Résumé du parcours",
  "Middle": "Milieu",
  "Agency clarification": "Clarification agence",
  "Finish": "Fin",
  "Booking and receipt": "Réservation et reçu",
  "Backup": "Secours",
  "Support and FAQ": "Support et FAQ",
  "Try the real journey": "Essayer le vrai parcours",
  "If you want to experience the product instead of just reading about it, start from the packages page.": "Pour vivre le produit au lieu de seulement le lire, commencez par la page des forfaits.",
  "Open Packages": "Ouvrir les forfaits",
  "Open Support": "Ouvrir le support",
  "Close side menu": "Fermer le menu latéral",
  "User profile": "Profil utilisateur",
  "NextTrip home": "Accueil NextTrip",
  "Main navigation": "Navigation principale",
  "Close menu": "Fermer le menu",
  "Open menu": "Ouvrir le menu",
  "Marrakech, Morocco": "Marrakech, Maroc",
  "Usually replies in 2 hours": "Répond généralement en 2 heures",
  "Usually replies same day": "Répond généralement le jour même",
  "Morocco culture, desert routes, and premium private trips.": "Culture marocaine, routes du désert et voyages privés premium.",
  "Calm cultural journeys across Kyoto, Osaka, Tokyo, and Nara.": "Voyages culturels calmes à travers Kyoto, Osaka, Tokyo et Nara.",
  "Morocco tours": "Circuits au Maroc",
  "Desert trips": "Voyages dans le désert",
  "Private guides": "Guides privés",
  "Family travel": "Voyage en famille",
  "Cultural routes": "Parcours culturels",
  "Temple visits": "Visites de temples",
  "Food planning": "Planification culinaire",
  "Rail guidance": "Conseils ferroviaires",
  "Active offers": "Offres actives",
  "Travelers served": "Voyageurs servis",
  "Response rate": "Taux de réponse",
  "Custom Morocco itineraries": "Itinéraires personnalisés au Maroc",
  "Hotel and riad sourcing": "Recherche d'hôtels et de riads",
  "Airport transfers": "Transferts aéroport",
  "Local guide coordination": "Coordination de guides locaux",
  "Cultural route planning": "Planification de parcours culturels",
  "Rail and transfer guidance": "Conseils train et transferts",
  "Food experience reservations": "Réservations d'expériences culinaires",
  "Day trip coordination": "Coordination d'excursions à la journée",
  "Sahara Private Route": "Route privée du Sahara",
  "Chefchaouen Weekend": "Week-end à Chefchaouen",
  "Tokyo Food Route": "Parcours culinaire à Tokyo",
  "Nara Day Escape": "Escapade d'une journée à Nara",
  "Track active packages, response flow, and agency activity from one workspace.": "Suivez les forfaits actifs, les réponses et l'activité de l'agence depuis un seul espace.",
  "Turn traveler interest into organized bookings.": "Transformez l'intérêt des voyageurs en réservations organisées.",
  "Workspace tools": "Outils d'espace de travail",
  "This agency profile is not available.": "Ce profil d'agence n'est pas disponible.",
  "Verified agency": "Agence vérifiée",
  "Rating": "Note",
  "Contact agency": "Contacter l'agence"
};

Object.assign(translations.fra, frenchPageCompletionTranslations, frenchHiddenMenuTranslations);

function normalizeLanguageCode(code) {
  return supportedLanguages.some((language) => language.code === code) ? code : DEFAULT_LANGUAGE_CODE;
}

function normalizeCurrencyCode(code) {
  return supportedCurrencies.some((currency) => currency.code === code)
    ? code
    : DEFAULT_CURRENCY_CODE;
}

export function getSavedLanguageCode() {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE_CODE;
  }

  try {
    return normalizeLanguageCode(window.localStorage.getItem(LANGUAGE_STORAGE_KEY));
  } catch (error) {
    return DEFAULT_LANGUAGE_CODE;
  }
}

export function getSavedCurrencyCode() {
  if (typeof window === "undefined") {
    return DEFAULT_CURRENCY_CODE;
  }

  try {
    return normalizeCurrencyCode(window.localStorage.getItem(CURRENCY_STORAGE_KEY));
  } catch (error) {
    return DEFAULT_CURRENCY_CODE;
  }
}

function saveLanguageCode(code) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
  } catch (error) {
    // Local storage can be unavailable in some private browsing contexts.
  }
}

function saveCurrencyCode(code) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(CURRENCY_STORAGE_KEY, code);
  } catch (error) {
    // Local storage can be unavailable in some private browsing contexts.
  }
}

function ensureStartupDefaultPreferences() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (window.localStorage.getItem(DEFAULT_PREFERENCES_STORAGE_KEY) === DEFAULT_PREFERENCES_VERSION) {
      return;
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, DEFAULT_LANGUAGE_CODE);
    window.localStorage.setItem(CURRENCY_STORAGE_KEY, DEFAULT_CURRENCY_CODE);
    window.localStorage.setItem(DEFAULT_PREFERENCES_STORAGE_KEY, DEFAULT_PREFERENCES_VERSION);
  } catch (error) {
    // Local storage can be unavailable in some private browsing contexts.
  }
}

function translateNumericText(text, code) {
  const numberText = "([0-9]+(?:-[0-9]+)?)";

  if (code === "fra") {
    return text
      .replace(new RegExp(`^${numberText} Days / ${numberText} Nights$`), "$1 jours / $2 nuits")
      .replace(new RegExp(`^${numberText} Days$`), "$1 jours")
      .replace(new RegExp(`^${numberText} days$`), "$1 jours")
      .replace(new RegExp(`^${numberText} travelers$`), "$1 voyageurs")
      .replace(new RegExp(`^${numberText} traveler\\(s\\)$`), "$1 voyageur(s)")
      .replace(new RegExp(`^${numberText} Traveler\\(s\\)$`), "$1 voyageur(s)")
      .replace(new RegExp(`^${numberText} day\\(s\\)$`), "$1 jour(s)")
      .replace(
        new RegExp(`^${numberText} day\\(s\\) x ${numberText} traveler\\(s\\)$`),
        "$1 jour(s) x $2 voyageur(s)"
      )
      .replace(/^([0-9]+) Adult$/, "$1 adulte")
      .replace(/^([0-9]+) Adults$/, "$1 adultes")
      .replace(/^([0-9]+) city ideas$/, "$1 idées de villes")
      .replace(/^Day ([0-9]+)$/, "Jour $1")
      .replace(/^([0-9]+) packages found$/, "$1 forfaits trouvés")
      .replace(/^([0-9]+) offers found$/, "$1 offres trouvées")
      .replace(/^([0-9.]+) rating$/, "$1 note")
      .replace(/^([0-9]+) luxury trips$/, "$1 voyages de luxe")
      .replace(/^([0-9]+) bookings$/, "$1 réservations")
      .replace(/^([0-9]+) offers$/, "$1 offres")
      .replace(/^([0-9]+) Likes$/, "$1 mentions J'aime")
      .replace(/^([0-9]+) Like$/, "$1 mention J'aime")
      .replace(/^([0-9]+) Comments$/, "$1 commentaires")
      .replace(/^([0-9]+) Comment$/, "$1 commentaire")
      .replace(/^([0-9]+) replies$/, "$1 réponses")
      .replace(/^([0-9]+) reply$/, "$1 réponse")
      .replace(/^([0-9]+) likes$/, "$1 mentions J'aime")
      .replace(/^([0-9]+) comments$/, "$1 commentaires")
      .replace(/^([0-9]+) roles$/, "$1 rôles")
      .replace(/^([0-9]+) slots$/, "$1 créneaux")
      .replace(/^([0-9]+) items$/, "$1 éléments")
      .replace(/^([0-9]+) alerts$/, "$1 alertes")
      .replace(/^([0-9]+) drafts$/, "$1 brouillons")
      .replace(/^([0-9]+) threads$/, "$1 discussions")
      .replace(/^([0-9]+) quotes$/, "$1 devis")
      .replace(/^([0-9]+) seats \| ([0-9]+) room$/, "$1 places | $2 chambre")
      .replace(/^([0-9]+) seats \| ([0-9]+) rooms$/, "$1 places | $2 chambres")
      .replace(/^([0-9]+) active packages$/, "$1 forfaits actifs")
      .replace(/^\+([0-9.]+)% this month$/, "+$1 % ce mois-ci");
  }

  if (code === "ara") {
    return text
      .replace(new RegExp(`^${numberText} Days / ${numberText} Nights$`), "$1 أيام / $2 ليال")
      .replace(new RegExp(`^${numberText} Days$`), "$1 أيام")
      .replace(new RegExp(`^${numberText} days$`), "$1 أيام")
      .replace(new RegExp(`^${numberText} travelers$`), "$1 مسافرين")
      .replace(new RegExp(`^${numberText} traveler\\(s\\)$`), "$1 مسافر(ين)")
      .replace(new RegExp(`^${numberText} Traveler\\(s\\)$`), "$1 مسافر(ين)")
      .replace(new RegExp(`^${numberText} day\\(s\\)$`), "$1 يوم/أيام")
      .replace(
        new RegExp(`^${numberText} day\\(s\\) x ${numberText} traveler\\(s\\)$`),
        "$1 يوم/أيام x $2 مسافر(ين)"
      )
      .replace(/^([0-9]+) Adult$/, "$1 بالغ")
      .replace(/^([0-9]+) Adults$/, "$1 بالغين")
      .replace(/^([0-9]+) city ideas$/, "$1 فكرة مدينة")
      .replace(/^Day ([0-9]+)$/, "اليوم $1")
      .replace(/^([0-9]+) packages found$/, "$1 باقات متاحة")
      .replace(/^([0-9]+) offers found$/, "$1 عروض متاحة")
      .replace(/^([0-9.]+) rating$/, "$1 تقييم")
      .replace(/^([0-9]+) luxury trips$/, "$1 رحلات فاخرة")
      .replace(/^([0-9]+) bookings$/, "$1 حجوزات")
      .replace(/^([0-9]+) offers$/, "$1 عروض")
      .replace(/^([0-9]+) Likes$/, "$1 إعجابات")
      .replace(/^([0-9]+) Like$/, "$1 إعجاب")
      .replace(/^([0-9]+) Comments$/, "$1 تعليقات")
      .replace(/^([0-9]+) Comment$/, "$1 تعليق")
      .replace(/^([0-9]+) replies$/, "$1 ردود")
      .replace(/^([0-9]+) reply$/, "$1 رد")
      .replace(/^([0-9]+) likes$/, "$1 إعجابات")
      .replace(/^([0-9]+) comments$/, "$1 تعليقات")
      .replace(/^([0-9]+) roles$/, "$1 أدوار")
      .replace(/^([0-9]+) slots$/, "$1 خانات")
      .replace(/^([0-9]+) items$/, "$1 عناصر")
      .replace(/^([0-9]+) alerts$/, "$1 تنبيهات")
      .replace(/^([0-9]+) drafts$/, "$1 مسودات")
      .replace(/^([0-9]+) threads$/, "$1 محادثات")
      .replace(/^([0-9]+) quotes$/, "$1 عروض أسعار")
      .replace(/^([0-9]+) seats \| ([0-9]+) room$/, "$1 مقاعد | $2 غرفة")
      .replace(/^([0-9]+) seats \| ([0-9]+) rooms$/, "$1 مقاعد | $2 غرف")
      .replace(/^([0-9]+) active packages$/, "$1 باقات نشطة")
      .replace(/^\+([0-9.]+)% this month$/, "+$1٪ هذا الشهر");
  }

  return text;
}

function translateDictionaryFragment(value, code) {
  const dictionary = translations[code] || {};

  return dictionary[value] || translateNumericText(value, code);
}

function translateDynamicText(text, code) {
  const translatePart = (value) => translateDictionaryFragment(value, code);
  let match = null;

  if (code === "fra") {
    match = text.match(/^Login success for (.+)$/);
    if (match) {
      return `Connexion réussie pour ${match[1]}`;
    }

    match = text.match(/^Selected: (.+)$/);
    if (match) {
      return `Sélectionné : ${match[1]}`;
    }

    match = text.match(/^Account created for (.+) as (.+)$/);
    if (match) {
      return `Compte créé pour ${match[1]} en tant que ${translatePart(match[2])}`;
    }

    match = text.match(/^Thank you, (.+)$/);
    if (match) {
      return `Merci, ${translatePart(match[1])}`;
    }

    match = text.match(/^Your reservation for (.+) is now confirmed\.$/);
    if (match) {
      return `Votre réservation pour ${translatePart(match[1])} est maintenant confirmée.`;
    }

    match = text.match(/^Complete your booking for (.+) and review your total before checkout\.$/);
    if (match) {
      return `Complétez votre réservation pour ${translatePart(match[1])} et vérifiez le total avant le paiement.`;
    }

    match = text.match(/^You have ([0-9]+) unread message\(s\)$/);
    if (match) {
      return `Vous avez ${match[1]} message(s) non lu(s)`;
    }

    match = text.match(/^([0-9]+) pending booking request\(s\)$/);
    if (match) {
      return `${match[1]} demande(s) de réservation en attente`;
    }

    match = text.match(/^([0-9]+) active packages$/);
    if (match) {
      return `${match[1]} forfaits actifs`;
    }

    match = text.match(/^Price updates automatically based on ([0-9]+) traveler\(s\)\.$/);
    if (match) {
      return `Le prix se met à jour automatiquement selon ${match[1]} voyageur(s).`;
    }

    match = text.match(/^Receipt ID: (.+)$/);
    if (match) {
      return `ID du reçu : ${match[1]}`;
    }

    match = text.match(/^Issued: (.+)$/);
    if (match) {
      return `Émis le : ${match[1]}`;
    }

    match = text.match(/^Traveler: (.+)$/);
    if (match) {
      return `Voyageur : ${translatePart(match[1])}`;
    }

    match = text.match(/^Email: (.+)$/);
    if (match) {
      return `E-mail : ${translatePart(match[1])}`;
    }

    match = text.match(/^Phone: (.+)$/);
    if (match) {
      return `Téléphone : ${translatePart(match[1])}`;
    }

    match = text.match(/^Saved Card: (.+)$/);
    if (match) {
      return `Carte enregistrée : ${translatePart(match[1])}`;
    }

    match = text.match(/^Package: (.+)$/);
    if (match) {
      return `Forfait : ${translatePart(match[1])}`;
    }

    match = text.match(/^Location: (.+)$/);
    if (match) {
      return `Lieu : ${translatePart(match[1])}`;
    }

    match = text.match(/^Duration: (.+)$/);
    if (match) {
      return `Durée : ${translatePart(match[1])}`;
    }

    match = text.match(/^Category: (.+)$/);
    if (match) {
      return `Catégorie : ${translatePart(match[1])}`;
    }

    match = text.match(/^Travelers: (.+)$/);
    if (match) {
      return `Voyageurs : ${translatePart(match[1])}`;
    }

    match = text.match(/^Rating: (.+)$/);
    if (match) {
      return `Note : ${match[1]}`;
    }

    match = text.match(/^Package price: (.+)$/);
    if (match) {
      return `Prix du forfait : ${match[1]}`;
    }

    match = text.match(/^Taxes and fees: (.+)$/);
    if (match) {
      return `Taxes et frais : ${match[1]}`;
    }

    match = text.match(/^Travel insurance: (.+)$/);
    if (match) {
      return `Assurance voyage : ${match[1]}`;
    }

    match = text.match(/^Total paid: (.+)$/);
    if (match) {
      return `Total payé : ${match[1]}`;
    }

    match = text.match(/^Subject: NextTrip Receipt (.+)$/);
    if (match) {
      return `Objet : Reçu NextTrip ${match[1]}`;
    }
  }

  if (code === "ara") {
    match = text.match(/^Login success for (.+)$/);
    if (match) {
      return `تم تسجيل الدخول بنجاح لـ ${match[1]}`;
    }

    match = text.match(/^Selected: (.+)$/);
    if (match) {
      return `تم الاختيار: ${match[1]}`;
    }

    match = text.match(/^Account created for (.+) as (.+)$/);
    if (match) {
      return `تم إنشاء الحساب لـ ${match[1]} بصفة ${translatePart(match[2])}`;
    }

    match = text.match(/^Thank you, (.+)$/);
    if (match) {
      return `شكرا لك، ${translatePart(match[1])}`;
    }

    match = text.match(/^Your reservation for (.+) is now confirmed\.$/);
    if (match) {
      return `تم تأكيد حجزك لـ ${translatePart(match[1])}.`;
    }

    match = text.match(/^Complete your booking for (.+) and review your total before checkout\.$/);
    if (match) {
      return `أكمل حجزك لـ ${translatePart(match[1])} وراجع المجموع قبل الدفع.`;
    }

    match = text.match(/^You have ([0-9]+) unread message\(s\)$/);
    if (match) {
      return `لديك ${match[1]} رسالة غير مقروءة`;
    }

    match = text.match(/^([0-9]+) pending booking request\(s\)$/);
    if (match) {
      return `${match[1]} طلب حجز في الانتظار`;
    }

    match = text.match(/^([0-9]+) active packages$/);
    if (match) {
      return `${match[1]} باقات نشطة`;
    }

    match = text.match(/^Price updates automatically based on ([0-9]+) traveler\(s\)\.$/);
    if (match) {
      return `يتحدث السعر تلقائيا حسب ${match[1]} مسافر(ين).`;
    }

    match = text.match(/^Receipt ID: (.+)$/);
    if (match) {
      return `معرف الإيصال: ${match[1]}`;
    }

    match = text.match(/^Issued: (.+)$/);
    if (match) {
      return `تاريخ الإصدار: ${match[1]}`;
    }

    match = text.match(/^Traveler: (.+)$/);
    if (match) {
      return `المسافر: ${translatePart(match[1])}`;
    }

    match = text.match(/^Email: (.+)$/);
    if (match) {
      return `البريد الإلكتروني: ${translatePart(match[1])}`;
    }

    match = text.match(/^Phone: (.+)$/);
    if (match) {
      return `الهاتف: ${translatePart(match[1])}`;
    }

    match = text.match(/^Saved Card: (.+)$/);
    if (match) {
      return `البطاقة المحفوظة: ${translatePart(match[1])}`;
    }

    match = text.match(/^Package: (.+)$/);
    if (match) {
      return `الباقة: ${translatePart(match[1])}`;
    }

    match = text.match(/^Location: (.+)$/);
    if (match) {
      return `الموقع: ${translatePart(match[1])}`;
    }

    match = text.match(/^Duration: (.+)$/);
    if (match) {
      return `المدة: ${translatePart(match[1])}`;
    }

    match = text.match(/^Category: (.+)$/);
    if (match) {
      return `الفئة: ${translatePart(match[1])}`;
    }

    match = text.match(/^Travelers: (.+)$/);
    if (match) {
      return `المسافرون: ${translatePart(match[1])}`;
    }

    match = text.match(/^Rating: (.+)$/);
    if (match) {
      return `التقييم: ${match[1]}`;
    }

    match = text.match(/^Package price: (.+)$/);
    if (match) {
      return `سعر الباقة: ${match[1]}`;
    }

    match = text.match(/^Taxes and fees: (.+)$/);
    if (match) {
      return `الضرائب والرسوم: ${match[1]}`;
    }

    match = text.match(/^Travel insurance: (.+)$/);
    if (match) {
      return `تأمين السفر: ${match[1]}`;
    }

    match = text.match(/^Total paid: (.+)$/);
    if (match) {
      return `المبلغ المدفوع: ${match[1]}`;
    }

    match = text.match(/^Subject: NextTrip Receipt (.+)$/);
    if (match) {
      return `الموضوع: إيصال NextTrip ${match[1]}`;
    }
  }

  return text;
}

function translateComposite(text, code) {
  const dictionary = translations[code] || {};
  const separators = [" | ", " / ", ", "];

  for (const separator of separators) {
    if (!text.includes(separator)) {
      continue;
    }

    const parts = text.split(separator);
    const nextParts = parts.map((part) => translateCore(part, code));

    if (nextParts.some((part, index) => part !== parts[index])) {
      return nextParts.join(separator);
    }
  }

  return dictionary[text] || text;
}

function translateCore(text, code) {
  if (code === "eng") {
    return text;
  }

  const dictionary = translations[code] || {};

  if (dictionary[text]) {
    return dictionary[text];
  }

  const numericText = translateNumericText(text, code);
  if (numericText !== text) {
    return numericText;
  }

  const dynamicText = translateDynamicText(text, code);
  if (dynamicText !== text) {
    return dynamicText;
  }

  return translateComposite(text, code);
}

function parseMadAmount(value) {
  const normalized = value.replace(/\s/g, "").replace(/,/g, "");
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}

function formatCurrencyNumber(value) {
  const fractionDigits = Math.abs(value) >= 100 ? 0 : 2;

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

function convertMadAmountText(amountText, currencyCode) {
  const parsedAmount = parseMadAmount(amountText);

  if (parsedAmount === null) {
    return amountText;
  }

  const convertedAmount = parsedAmount * (currencyRatesFromMad[currencyCode] || 1);

  return formatCurrencyNumber(convertedAmount);
}

function convertMadRange(match, firstAmount, secondAmount, currencyCode) {
  return `${convertMadAmountText(firstAmount, currencyCode)} - ${convertMadAmountText(
    secondAmount,
    currencyCode
  )} ${currencyCode}`;
}

function applyCurrencyToText(text, currencyCode) {
  const nextCurrencyCode = normalizeCurrencyCode(currencyCode);

  if (nextCurrencyCode === "MAD") {
    return text;
  }

  const convertedText = text.replace(
    /([+-]?\d[\d\s,.]*)\s*-\s*([+-]?\d[\d\s,.]*)\s*MAD\b/g,
    (match, firstAmount, secondAmount) =>
      convertMadRange(match, firstAmount, secondAmount, nextCurrencyCode)
  );

  return convertedText
    .replace(/([+-]?\d[\d\s,.]*)\s*MAD\b/g, (match, amount) => {
      const sign = amount.trim().startsWith("+") ? "+" : amount.trim().startsWith("-") ? "-" : "";
      const cleanAmount = amount.replace(/^[+-]/, "");

      return `${sign}${convertMadAmountText(cleanAmount, nextCurrencyCode)} ${nextCurrencyCode}`;
    })
    .replace(/\bMAD\b/g, nextCurrencyCode);
}

function shouldSkipCurrency(node) {
  const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;

  return Boolean(element?.closest(".site-preferences, [data-no-currency]"));
}

function translateValue(value, code, currencyCode, shouldConvertCurrency = true) {
  if (!value || typeof value !== "string") {
    return value;
  }

  const leading = value.match(/^\s*/)?.[0] || "";
  const trailing = value.match(/\s*$/)?.[0] || "";
  const text = value.trim();

  if (!text) {
    return value;
  }

  const translatedText = translateCore(text, code);
  const currencyText = shouldConvertCurrency
    ? applyCurrencyToText(translatedText, currencyCode)
    : translatedText;

  return `${leading}${currencyText}${trailing}`;
}

function shouldSkipNode(node) {
  const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;

  if (!element) {
    return true;
  }

  return Boolean(
    element.closest(
      "script, style, code, pre, textarea, svg, [data-no-translate]"
    )
  );
}

function translateTextNode(node, code, currencyCode) {
  if (shouldSkipNode(node)) {
    return;
  }

  if (
    !Object.prototype.hasOwnProperty.call(node, "__nextTripOriginalText") ||
    node.nodeValue !== node.__nextTripRenderedText
  ) {
    node.__nextTripOriginalText = node.nodeValue;
  }

  const translated = translateValue(
    node.__nextTripOriginalText,
    code,
    currencyCode,
    !shouldSkipCurrency(node)
  );

  if (node.nodeValue !== translated) {
    node.nodeValue = translated;
  }

  node.__nextTripRenderedText = translated;
}

function translateAttributes(element, code, currencyCode) {
  ATTRIBUTE_NAMES.forEach((attribute) => {
    if (!element.hasAttribute(attribute)) {
      return;
    }

    const originalAttribute = `data-nexttrip-original-${attribute}`;
    const renderedAttribute = `data-nexttrip-rendered-${attribute}`;
    const currentValue = element.getAttribute(attribute);
    const previousRenderedValue = element.getAttribute(renderedAttribute);
    const originalValue =
      !element.hasAttribute(originalAttribute) || currentValue !== previousRenderedValue
        ? currentValue
        : element.getAttribute(originalAttribute);

    if (!element.hasAttribute(originalAttribute)) {
      element.setAttribute(originalAttribute, originalValue);
    } else if (currentValue !== previousRenderedValue) {
      element.setAttribute(originalAttribute, originalValue);
    }

    const translated = translateValue(
      originalValue,
      code,
      currencyCode,
      !shouldSkipCurrency(element)
    );

    if (element.getAttribute(attribute) !== translated) {
      element.setAttribute(attribute, translated);
    }

    element.setAttribute(renderedAttribute, translated);
  });
}

function translateElementTree(root, code, currencyCode) {
  if (!root || shouldSkipNode(root)) {
    return;
  }

  const textWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return shouldSkipNode(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });

  let textNode = textWalker.nextNode();
  while (textNode) {
    translateTextNode(textNode, code, currencyCode);
    textNode = textWalker.nextNode();
  }

  if (root.nodeType === Node.ELEMENT_NODE) {
    translateAttributes(root, code, currencyCode);
  }

  root.querySelectorAll?.("*").forEach((element) => {
    if (!shouldSkipNode(element)) {
      translateAttributes(element, code, currencyCode);
    }
  });
}

export function applySiteLanguage(code = getSavedLanguageCode(), currencyCode = getSavedCurrencyCode()) {
  if (typeof document === "undefined") {
    return "eng";
  }

  const nextCode = normalizeLanguageCode(code);
  const nextCurrencyCode = normalizeCurrencyCode(currencyCode);
  const settings = languageSettings[nextCode] || languageSettings.eng;

  document.documentElement.lang = settings.htmlLang;
  document.documentElement.dir = settings.dir;
  document.documentElement.dataset.currency = nextCurrencyCode;
  translateElementTree(document.body, nextCode, nextCurrencyCode);

  return nextCode;
}

export function changeSiteLanguage(code) {
  const nextCode = normalizeLanguageCode(code);
  const previousCode = getSavedLanguageCode();

  saveLanguageCode(nextCode);
  applySiteLanguage(nextCode, getSavedCurrencyCode());

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE_EVENT, { detail: { code: nextCode } }));

    if (previousCode !== nextCode) {
      window.setTimeout(() => {
        window.location.reload();
      }, 0);
    }
  }

  return nextCode;
}

export function changeSiteCurrency(code) {
  const nextCode = normalizeCurrencyCode(code);
  const previousCode = getSavedCurrencyCode();

  saveCurrencyCode(nextCode);
  applySiteLanguage(getSavedLanguageCode(), nextCode);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CURRENCY_CHANGE_EVENT, { detail: { code: nextCode } }));

    if (previousCode !== nextCode) {
      window.setTimeout(() => {
        window.location.reload();
      }, 0);
    }
  }

  return nextCode;
}

let observer = null;
let queuedFrame = 0;
const queuedTranslationRoots = new Set();

function normalizeTranslationRoot(node) {
  if (!node) {
    return null;
  }

  if (node.nodeType === Node.DOCUMENT_NODE) {
    return document.body;
  }

  if (node.nodeType === Node.TEXT_NODE) {
    return node.parentElement;
  }

  return node.nodeType === Node.ELEMENT_NODE ? node : null;
}

function getVisibleTranslationRoots() {
  const roots = Array.from(queuedTranslationRoots)
    .map(normalizeTranslationRoot)
    .filter((root) => root && root.isConnected && !shouldSkipNode(root));

  if (roots.some((root) => root === document.body)) {
    return [document.body];
  }

  return roots.filter(
    (root, index) =>
      !roots.some(
        (candidate, candidateIndex) =>
          candidateIndex !== index && candidate !== root && candidate.contains(root)
      )
  );
}

function queueTranslate(root = document.body) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const nextRoot = normalizeTranslationRoot(root);

  if (nextRoot) {
    queuedTranslationRoots.add(nextRoot);
  }

  if (queuedFrame) {
    return;
  }

  queuedFrame = window.requestAnimationFrame(() => {
    queuedFrame = 0;

    const roots = getVisibleTranslationRoots();
    queuedTranslationRoots.clear();

    if (!roots.length) {
      return;
    }

    const languageCode = getSavedLanguageCode();
    const currencyCode = getSavedCurrencyCode();

    roots.forEach((translationRoot) => {
      translateElementTree(translationRoot, languageCode, currencyCode);
    });
  });
}

function queueMutationTranslations(mutations) {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((node) => {
        queueTranslate(node);
      });

      return;
    }

    queueTranslate(mutation.target);
  });
}

export function startSiteLanguageRuntime() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }

  ensureStartupDefaultPreferences();
  applySiteLanguage(getSavedLanguageCode(), getSavedCurrencyCode());

  if (!observer) {
    observer = new MutationObserver(queueMutationTranslations);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRIBUTE_NAMES,
    });
  }

  const handleLanguageChange = (event) => {
    applySiteLanguage(event.detail?.code || getSavedLanguageCode(), getSavedCurrencyCode());
  };

  const handleCurrencyChange = (event) => {
    applySiteLanguage(getSavedLanguageCode(), event.detail?.code || getSavedCurrencyCode());
  };

  window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
  window.addEventListener(CURRENCY_CHANGE_EVENT, handleCurrencyChange);

  return () => {
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
    window.removeEventListener(CURRENCY_CHANGE_EVENT, handleCurrencyChange);
  };
}
