export const chatbotUiText = {
  fra: {
    welcome: "Bonjour 👋 Je suis l’assistant NextTrip. Comment puis-je vous aider ?",
    guide:
      "Je peux vous guider sur les forfaits, les offres, la création d’un voyage personnalisé, les agences, le paiement, les reçus, les dashboards et le suivi de réservation.\n\nChoisissez une action rapide ou écrivez votre question en français, en anglais ou en arabe.",
    title: "NextTrip Chat",
    subtitle: "",
    inputLabel: "Votre question",
    inputPlaceholder: "Posez votre question...",
    sendLabel: "Envoyer la question",
    closeLabel: "Fermer le chatbot",
    openLabel: "Ouvrir l’assistant NextTrip",
    closedLabel: "Assistant",
    quickActionsLabel: "Actions rapides",
    clearLabel: "Réinitialiser la conversation",
    typingLabel: "NextTrip Chat écrit...",
  },
  eng: {
    welcome: "Hello 👋 I’m the NextTrip assistant. How can I help you?",
    guide:
      "I can guide you through packages, offers, custom trips, agencies, payments, receipts, dashboards, and booking tracking.\n\nChoose a quick action or write your question in English, French, or Arabic.",
    title: "NextTrip Chat",
    subtitle: "",
    inputLabel: "Your question",
    inputPlaceholder: "Ask your question...",
    sendLabel: "Send question",
    closeLabel: "Close chatbot",
    openLabel: "Open NextTrip assistant",
    closedLabel: "Assistant",
    quickActionsLabel: "Quick actions",
    clearLabel: "Clear conversation",
    typingLabel: "NextTrip Chat is typing...",
  },
  ara: {
    welcome: "مرحبا 👋 أنا مساعد NextTrip. كيف يمكنني مساعدتك؟",
    guide:
      "يمكنني مساعدتك في الباقات، العروض، إنشاء رحلة مخصصة، الوكالات، الدفع، الوصل، لوحات التحكم وتتبع الحجز.\n\nاختر إجراء سريعا أو اكتب سؤالك بالعربية أو الفرنسية أو الإنجليزية.",
    title: "NextTrip Chat",
    subtitle: "",
    inputLabel: "سؤالك",
    inputPlaceholder: "اكتب سؤالك...",
    sendLabel: "إرسال السؤال",
    closeLabel: "إغلاق المحادثة",
    openLabel: "فتح مساعد NextTrip",
    closedLabel: "المساعد",
    quickActionsLabel: "إجراءات سريعة",
    clearLabel: "مسح المحادثة",
    typingLabel: "NextTrip Chat يكتب...",
  },
};

export const chatbotFallbackResponse = {
  id: "fallback",
  intent: "unknown-question",
  answers: {
    fra:
      "Désolé, je n’ai pas bien compris votre question. Je peux vous aider avec les forfaits, la réservation, le paiement, le suivi de réservation, les agences ou le support.",
    darija:
      "سمح ليا، ما فهمتش مزيان السؤال ديالك. نقدر نعاونك ف les forfaits, réservation, paiement, suivi, agences ولا support.",
    ara:
      "عذرًا، لم أفهم سؤالك جيدًا. يمكنني مساعدتك في العروض، الحجز، الدفع، تتبع الحجز، الوكالات أو الدعم.",
    eng:
      "Sorry, I did not understand your question clearly. I can help you with packages, booking, payment, reservation tracking, agencies, or support.",
  },
  actions: [
    { label: { fra: "Voir les forfaits", darija: "شوف les forfaits", ara: "عرض الباقات", eng: "View packages" }, route: "/packages" },
    { label: { fra: "Créer un voyage", darija: "دير voyage personnalisé", ara: "إنشاء رحلة", eng: "Create a trip" }, route: "/create-trip" },
    { label: { fra: "Support", darija: "Support", ara: "الدعم", eng: "Support" }, route: "/support" },
  ],
};

export const chatbotClarificationResponse = {
  id: "clarification",
  intent: "clarification",
  answers: {
    fra:
      "Je peux vous aider sur plusieurs sujets. Vous parlez plutôt de quel point ?",
    darija:
      "نقدر نعاونك فكثر من حاجة. واش كتقصد شنو بالضبط؟",
    ara:
      "يمكنني مساعدتك في أكثر من موضوع. ما المقصود بالضبط؟",
    eng:
      "I can help with more than one topic. Which one do you mean?",
  },
};

export const chatbotQuickActions = [
  {
    label: { fra: "Voir les forfaits", darija: "شوف les forfaits", ara: "عرض الباقات", eng: "View packages" },
    prompt: "packages",
    topicId: "browse-packages",
  },
  {
    label: {
      fra: "Créer un voyage personnalisé",
      darija: "دير voyage personnalisé",
      ara: "إنشاء رحلة مخصصة",
      eng: "Create a custom trip",
    },
    prompt: "custom trip",
    topicId: "custom-trip",
  },
  {
    label: { fra: "Comment réserver ?", darija: "كيفاش نحجز؟", ara: "كيف أحجز؟", eng: "How do I book?" },
    prompt: "booking",
    topicId: "confirm-booking",
  },
  {
    label: { fra: "Suivre ma réservation", darija: "نتبع réservation ديالي", ara: "تتبع حجزي", eng: "Track my booking" },
    prompt: "booking status",
    topicId: "booking-status",
  },
  {
    label: { fra: "Contacter une agence", darija: "نهضر مع agence", ara: "التواصل مع وكالة", eng: "Contact an agency" },
    prompt: "agency",
    topicId: "agencies",
  },
  {
    label: { fra: "Problème de paiement", darija: "مشكل ف paiement", ara: "مشكلة في الدفع", eng: "Payment issue" },
    prompt: "payment",
    topicId: "payment",
  },
  {
    label: { fra: "Support réservation", ara: "دعم الحجز", eng: "Booking support" },
    prompt: "booking support",
    topicId: "booking-status",
  },
  {
    label: { fra: "Support NextTrip", darija: "Support NextTrip", ara: "دعم NextTrip", eng: "NextTrip support" },
    prompt: "support contact aide",
    topicId: "support",
  },
];

const commonActions = {
  packages: { label: { fra: "Voir les forfaits", darija: "شوف les forfaits", ara: "عرض الباقات", eng: "View packages" }, route: "/packages" },
  offers: { label: { fra: "Voir les offres", darija: "شوف les offres", ara: "عرض العروض", eng: "View offers" }, route: "/offers" },
  createTrip: { label: { fra: "Créer un voyage", darija: "دير voyage personnalisé", ara: "إنشاء رحلة", eng: "Create a trip" }, route: "/create-trip" },
  destinations: { label: { fra: "Voir les destinations", darija: "شوف destinations", ara: "عرض الوجهات", eng: "View destinations" }, route: "/destinations" },
  auth: { label: { fra: "Connexion", darija: "تسجيل الدخول", ara: "تسجيل الدخول", eng: "Sign in" }, route: "/auth" },
  bookings: { label: { fra: "Support réservation", darija: "support réservation", ara: "دعم الحجز", eng: "Booking support" }, route: "/support" },
  profile: { label: { fra: "Accueil", darija: "Accueil", ara: "الرئيسية", eng: "Home" }, route: "/" },
  agency: { label: { fra: "Voir les agences", darija: "شوف agences", ara: "عرض الوكالات", eng: "View agencies" }, route: "/agency" },
  agencyDashboard: { label: { fra: "Dashboard agence", darija: "dashboard agence", ara: "لوحة الوكالة", eng: "Agency dashboard" }, route: "/agency-dashboard" },
  support: { label: { fra: "Support", darija: "Support", ara: "الدعم", eng: "Support" }, route: "/support" },
  contact: { label: { fra: "Contact", darija: "Contact", ara: "التواصل", eng: "Contact" }, route: "/contact" },
  experiences: { label: { fra: "Voir les expériences", darija: "شوف expériences", ara: "عرض التجارب", eng: "View experiences" }, route: "/experience" },
  home: { label: { fra: "Accueil", darija: "Accueil", ara: "الرئيسية", eng: "Home" }, route: "/" },
};

export const chatbotKnowledgeBase = [
  {
    id: "greeting",
    intent: "greeting",
    title: "Greeting",
    label: { fra: "Salutation", darija: "Salam", ara: "تحية", eng: "Greeting" },
    keywords: ["bonjour", "salut", "hello", "hi", "salam", "السلام", "مرحبا", "اهلا", "صباح الخير", "مساء الخير"],
    synonyms: ["coucou", "hey", "slt", "السلام عليكم", "salam alikom"],
    examples: ["Bonjour", "salam", "hello", "السلام عليكم"],
    related: [],
    answers: {
      fra:
        "Bonjour ! Je peux vous aider à trouver un forfait, réserver un voyage, créer une demande personnalisée, suivre une réservation ou contacter une agence.",
      darija:
        "Salam ! نقدر نعاونك تلقى forfait، تحجز voyage، دير demande personnalisée، تتبع réservation ولا تهضر مع agence.",
      ara:
        "مرحبا! يمكنني مساعدتك في اختيار باقة، حجز رحلة، إنشاء طلب مخصص، تتبع الحجز أو التواصل مع وكالة.",
      eng:
        "Hello! I can help you find packages, book a trip, create a custom request, track a booking, or contact an agency.",
    },
    actions: [commonActions.packages, commonActions.createTrip],
  },
  {
    id: "what-is-nexttrip",
    intent: "what-is-nexttrip",
    title: "What is NextTrip?",
    label: { fra: "C’est quoi NextTrip ?", darija: "شنو NextTrip؟", ara: "ما هو NextTrip؟", eng: "What is NextTrip?" },
    keywords: ["nexttrip", "c est quoi", "what is", "platform", "plateforme", "site", "service", "شنو", "ما هو"],
    synonyms: ["chno nexttrip", "achno nexttrip", "3lach nexttrip", "about nexttrip", "presentation"],
    examples: ["C’est quoi NextTrip ?", "chno howa NextTrip", "What is NextTrip?", "ما هي منصة NextTrip؟"],
    related: ["travel", "voyage", "agence", "booking"],
    answers: {
      fra:
        "NextTrip est une plateforme de voyage qui regroupe les forfaits, les offres d’agences, les demandes de voyage personnalisées, la réservation, le paiement et le suivi au même endroit.",
      darija:
        "NextTrip hiya plateforme dyal voyage: كتجمع les forfaits, offres dyal agences, demandes personnalisées, réservation, paiement و suivi f بلاصة وحدة.",
      ara:
        "NextTrip منصة سفر تجمع الباقات، عروض الوكالات، طلبات الرحلات المخصصة، الحجز، الدفع وتتبع الرحلات في مكان واحد.",
      eng:
        "NextTrip is a travel platform for packages, agency offers, custom trip requests, booking, payment, and reservation tracking in one place.",
    },
    actions: [commonActions.packages, commonActions.createTrip],
  },
  {
    id: "browse-packages",
    intent: "packages",
    title: "Browse packages",
    label: { fra: "Forfaits", darija: "Les forfaits", ara: "الباقات", eng: "Packages" },
    keywords: ["package", "packages", "forfait", "forfaits", "pack", "trip", "voyage", "باقة", "باقات", "رحلة", "رحلات"],
    synonyms: ["nchof forfaits", "voir forfaits", "show packages", "travel package", "عروض السفر", "الرحلات"],
    examples: ["Je veux voir les forfaits", "bghit nchof les forfaits", "Show me packages", "أريد مشاهدة الباقات"],
    related: ["destination", "prix", "agence", "details"],
    answers: {
      fra:
        "Pour voir les forfaits, ouvrez la page Forfaits. Vous pouvez comparer la destination, le prix, la durée, l’agence, la note et ouvrir les détails avant de réserver.",
      darija:
        "باش تشوف les forfaits، دخل لصفحة Forfaits. تقدر تقارن destination, prix, durée, agence و détails قبل ما تحجز.",
      ara:
        "لمشاهدة الباقات، افتح صفحة الباقات. يمكنك مقارنة الوجهة، السعر، المدة، الوكالة والتفاصيل قبل الحجز.",
      eng:
        "To view packages, open the Packages page. You can compare destination, price, duration, agency, rating, and details before booking.",
    },
    actions: [commonActions.packages, commonActions.offers],
  },
  {
    id: "offers",
    intent: "offers",
    title: "Agency offers",
    label: { fra: "Offres", darija: "Les offres", ara: "العروض", eng: "Offers" },
    keywords: ["offer", "offers", "offre", "offres", "deal", "discount", "promotion", "promo", "عرض", "عروض", "تخفيض"],
    synonyms: ["agency offers", "special offer", "fin nchof offres", "فين العروض", "عروض الوكالات"],
    examples: ["Où voir les offres ?", "فين نقدر نشوف العروض؟", "Show me offers", "أريد مشاهدة العروض"],
    related: ["package", "agence", "prix"],
    answers: {
      fra:
        "Les offres sont les propositions spéciales des agences. Ouvrez la page Offres pour comparer les deals disponibles et accéder aux détails.",
      darija:
        "Les offres هما عروض خاصة من agences. دخل لصفحة Offres باش تقارن deals وتشوف التفاصيل.",
      ara:
        "العروض هي اقتراحات خاصة من الوكالات. افتح صفحة العروض لمقارنتها والوصول إلى التفاصيل.",
      eng:
        "Offers are special agency deals. Open the Offers page to compare available deals and view details.",
    },
    actions: [commonActions.offers, commonActions.agency],
  },
  {
    id: "destinations",
    intent: "destinations",
    title: "Destinations",
    label: { fra: "Destinations", darija: "Destinations", ara: "الوجهات", eng: "Destinations" },
    keywords: ["destination", "destinations", "city", "ville", "country", "pays", "marrakech", "paris", "dubai", "وجهة", "وجهات", "مدينة"],
    synonyms: ["where to go", "فين نمشي", "فين نسافر", "best destinations", "مدن"],
    examples: ["Quelles destinations proposez-vous ?", "fin n9der nsafr?", "Show destinations", "ما هي الوجهات المتاحة؟"],
    related: ["video", "travel", "package"],
    answers: {
      fra:
        "La page Destinations vous aide à explorer les villes disponibles avec photos, vidéos, durée conseillée, saison et points d’intérêt.",
      darija:
        "صفحة Destinations كتخليك تشوف المدن، photos/videos، durée مقترحة، أحسن saison وشنو تزور.",
      ara:
        "صفحة الوجهات تساعدك على استكشاف المدن مع الصور والفيديوهات، المدة المقترحة، أفضل موسم وأهم الأماكن.",
      eng:
        "The Destinations page lets you explore cities with photos, videos, recommended duration, best season, and highlights.",
    },
    actions: [commonActions.destinations, commonActions.packages],
  },
  {
    id: "package-details",
    intent: "package-details",
    title: "Package details",
    label: { fra: "Détails forfait", darija: "Détails dyal forfait", ara: "تفاصيل الباقة", eng: "Package details" },
    keywords: ["details", "detail", "détails", "package details", "included", "programme", "itinerary", "تفاصيل", "برنامج", "يشمل"],
    synonyms: ["chno fih forfait", "شنو فيه", "what is included", "voir details", "تفاصيل العرض"],
    examples: ["Comment voir les détails d’un forfait ?", "chno fih had forfait?", "What is included in a package?", "كيف أرى تفاصيل الباقة؟"],
    related: ["package", "hotel", "duration", "price"],
    answers: {
      fra:
        "Pour voir les détails, ouvrez un forfait depuis la page Forfaits puis cliquez sur Détails. Vous verrez la description, la durée, le prix, l’agence et les actions de réservation.",
      darija:
        "باش تشوف détails، دخل لصفحة Forfaits، اختار forfait وكليكي على Détails. غادي تشوف description, durée, prix, agence و booking.",
      ara:
        "لمشاهدة التفاصيل، افتح باقة من صفحة الباقات ثم اضغط على التفاصيل. ستجد الوصف، المدة، السعر، الوكالة وخيارات الحجز.",
      eng:
        "To see details, open a package from the Packages page and click Details. You will see the description, duration, price, agency, and booking actions.",
    },
    actions: [commonActions.packages],
  },
  {
    id: "search-trips",
    intent: "search-trips",
    title: "Search trips",
    label: { fra: "Recherche", darija: "Recherche voyage", ara: "البحث عن رحلة", eng: "Search trips" },
    keywords: ["search", "chercher", "recherche", "where to", "destination", "date", "travelers", "filter", "بحث", "ابحث", "فلتر"],
    synonyms: ["n9leb 3la voyage", "bghit n9leb", "find trip", "chercher voyage", "فين نقلب"],
    examples: ["Comment chercher un voyage ?", "bghit n9leb 3la voyage", "How can I search trips?", "كيف أبحث عن رحلة؟"],
    related: ["package", "price", "city"],
    answers: {
      fra:
        "Utilisez la barre de recherche de l’accueil pour choisir destination, date, type de voyage et voyageurs. Vous pouvez aussi ouvrir les Forfaits pour comparer directement.",
      darija:
        "استعمل barre de recherche f l’accueil: اختار destination, date, type de voyage و voyageurs. وتقدر تدخل مباشرة ل Forfaits.",
      ara:
        "استعمل شريط البحث في الصفحة الرئيسية لاختيار الوجهة، التاريخ، نوع الرحلة وعدد المسافرين. يمكنك أيضا فتح صفحة الباقات للمقارنة.",
      eng:
        "Use the home search bar to choose destination, date, trip type, and travelers. You can also open Packages to compare directly.",
    },
    actions: [commonActions.home, commonActions.packages],
  },
  {
    id: "custom-trip",
    intent: "custom-trip",
    title: "Create custom trip",
    label: { fra: "Voyage personnalisé", darija: "Voyage 3la 9eddi", ara: "رحلة مخصصة", eng: "Custom trip" },
    keywords: ["custom", "personalized", "personnalise", "personnaliser", "sur mesure", "create trip", "creer voyage", "demande", "request", "مخصصه", "مخصصة", "طلب"],
    synonyms: ["voyage sur mesure", "voyage personnalisé", "3la 9eddi", "ala 9eddi", "ndير voyage", "bghit ndir voyage", "رحلة خاصة"],
    examples: ["Je veux créer un voyage sur mesure", "bghit ndir voyage personnalisé", "I want a custom trip", "أريد إنشاء رحلة مخصصة"],
    related: ["budget", "hotel", "date", "agence"],
    contextIntents: ["packages", "destinations", "offers"],
    answers: {
      fra:
        "Pour créer un voyage personnalisé, ouvrez Créer un voyage. Ajoutez destination, dates, budget, voyageurs, hôtel, services et notes. NextTrip prépare un brief clair pour les agences.",
      darija:
        "باش تدير voyage personnalisé، دخل ل Créer un voyage. عمر destination, dates, budget, voyageurs, hôtel, services و notes. NextTrip كيصاوب brief واضح للوكالات.",
      ara:
        "لإنشاء رحلة مخصصة، افتح صفحة إنشاء رحلة. أضف الوجهة، التواريخ، الميزانية، المسافرين، الفندق، الخدمات والملاحظات. سيجهز NextTrip ملخصا واضحا للوكالات.",
      eng:
        "To create a custom trip, open Create Trip. Add destination, dates, budget, travelers, hotel level, services, and notes. NextTrip prepares a clear brief for agencies.",
    },
    actions: [commonActions.createTrip],
  },
  {
    id: "send-request-agencies",
    intent: "send-request-agencies",
    title: "Send request to agencies",
    label: { fra: "Demande agences", darija: "Demande l agences", ara: "طلب للوكالات", eng: "Agency request" },
    keywords: ["send request", "envoyer demande", "demande agence", "agency request", "brief", "proposal", "nseft demande", "طلب وكالة", "طلب للوكالات"],
    synonyms: ["agencies respond", "wakala tjawbni", "وكالة تجاوبني", "recevoir offres", "agency offer"],
    examples: ["Comment envoyer une demande aux agences ?", "bghit nseft demande l agence", "How do agencies send offers?", "كيف أرسل طلبا للوكالات؟"],
    related: ["custom", "offer", "budget"],
    contextIntents: ["custom-trip", "agencies"],
    answers: {
      fra:
        "Après le formulaire personnalisé, votre demande devient un brief. Les agences peuvent l’utiliser pour vous envoyer des offres adaptées à votre budget, dates et préférences.",
      darija:
        "من بعد form dyal voyage personnalisé، demande كتولي brief. Les agences كيستعملوه باش يصيفطو لك offres مناسبين budget, dates و préférences ديالك.",
      ara:
        "بعد إكمال نموذج الرحلة المخصصة، يتحول طلبك إلى ملخص. تستعمله الوكالات لإرسال عروض مناسبة لميزانيتك وتواريخك وتفضيلاتك.",
      eng:
        "After the custom trip form, your request becomes a brief. Agencies use it to send offers that match your budget, dates, and preferences.",
    },
    actions: [commonActions.createTrip, commonActions.agency],
  },
  {
    id: "confirm-booking",
    intent: "booking",
    title: "Book a trip",
    label: { fra: "Réservation", darija: "Réservation", ara: "الحجز", eng: "Booking" },
    keywords: ["booking", "reservation", "réservation", "reserver", "réserver", "book", "book now", "confirm", "confirmer", "nreservi", "nhjez", "n7jez", "حجز", "احجز", "الحجز"],
    synonyms: ["bghit nreservi", "kifach nreservi", "comment reserver", "how can i book", "كيفاش نحجز", "كيف احجز", "حجز رحلة", "كيف يمكنني حجز رحلة"],
    examples: ["Comment réserver un voyage ?", "bghit nreservi voyage", "كيفاش نحجز رحلة؟", "كيف يمكنني حجز رحلة؟", "How can I book a trip?"],
    related: ["package", "payment", "traveler", "checkout"],
    contextIntents: ["packages", "package-details", "offers"],
    answers: {
      fra:
        "Pour réserver un voyage, choisissez un forfait, ouvrez les détails, puis cliquez sur Réserver maintenant ou Book Now. Ensuite, remplissez vos informations, vérifiez le total et confirmez.",
      darija:
        "باش تحجز رحلة، اختار forfait، دخل للتفاصيل، ومن بعد كليكي على Réserver maintenant / Book Now. عمر المعلومات ديالك، راجع total وكمل confirmation.",
      ara:
        "لحجز رحلة، اختر الباقة المناسبة، افتح التفاصيل، ثم اضغط على زر الحجز. بعد ذلك املأ معلوماتك، راجع المجموع وأكد الطلب.",
      eng:
        "To book a trip, choose a package, open its details, then click Book Now. Fill in your information, review the total, and confirm.",
    },
    actions: [commonActions.packages, commonActions.bookings],
  },
  {
    id: "booking-status",
    intent: "booking-status",
    title: "Track booking",
    label: { fra: "Suivi réservation", darija: "Suivi réservation", ara: "تتبع الحجز", eng: "Booking tracking" },
    keywords: ["track", "tracking", "suivi", "status", "etat", "état", "reservation status", "my bookings", "mes reservations", "ntabe3", "ntaba3", "fin wslat", "فين وصلت", "تتبع", "حجزي"],
    synonyms: ["bghit ntabe3 reservation", "fin ntabe3 reservation dyali", "where can i track", "أين أتابع الحجز", "حالة الحجز"],
    examples: ["Où suivre ma réservation ?", "fin ntabe3 reservation dyali?", "Where can I track my booking?", "أين أتابع الحجز؟"],
    related: ["dashboard", "booking", "client"],
    contextIntents: ["booking", "payment", "receipt"],
    answers: {
      fra:
        "Pour suivre une réservation, contactez le support avec votre référence. L’équipe peut confirmer le statut, le paiement, les prochaines actions et les détails utiles.",
      darija:
        "باش تتبع réservation ديالك، دخل ل Mes réservations. غادي تلقى status, date dyal voyage, paiement, next actions و détails.",
      ara:
        "لتتبع الحجز، تواصل مع الدعم وأرسل مرجع الحجز. يمكن للفريق تأكيد الحالة، الدفع، الخطوات التالية والتفاصيل المهمة.",
      eng:
        "For booking tracking, contact support with your booking reference. The team can confirm status, payment state, next actions, and useful details.",
    },
    actions: [commonActions.bookings, commonActions.profile],
  },
  {
    id: "payment",
    intent: "payment",
    title: "Payment",
    label: { fra: "Paiement", darija: "Paiement", ara: "الدفع", eng: "Payment" },
    keywords: ["payment", "paiement", "payer", "pay", "carte", "card", "visa", "mastercard", "checkout", "bank", "virement", "nkhless", "nkhlss", "خلص", "الدفع", "البطاقة", "أداء"],
    synonyms: ["wach n9der nkhless b carte", "kifach nkhless", "comment payer", "how can i pay", "كيف يتم الدفع", "الدفع بالبطاقة"],
    examples: ["Comment payer ?", "kifach nkhless?", "wach n9der nkhless b carte?", "How can I pay?", "كيف يتم الدفع؟"],
    related: ["price", "booking", "checkout"],
    contextIntents: ["booking", "custom-trip", "price-calculation"],
    answers: {
      fra:
        "Le paiement se fait dans le checkout après vérification du total. Vous pouvez préparer le paiement par carte quand la réservation est prête. Si le paiement échoue, vérifiez la carte ou contactez le support.",
      darija:
        "Paiement kayكون f checkout من بعد ما تراجع total. تقدر تخلص b carte ملي réservation تكون واجدة. Ila وقع مشكل، راجع carte ولا تواصل مع support.",
      ara:
        "يتم الدفع في صفحة checkout بعد مراجعة المجموع. يمكنك الدفع بالبطاقة عند جاهزية الحجز. إذا فشل الدفع، تحقق من البطاقة أو تواصل مع الدعم.",
      eng:
        "Payment happens in checkout after you review the total. You can pay by card when the booking is ready. If payment fails, check the card or contact support.",
    },
    actions: [commonActions.packages, commonActions.support],
  },
  {
    id: "price-calculation",
    intent: "price-calculation",
    title: "Price calculation",
    label: { fra: "Calcul du prix", darija: "Taman", ara: "حساب السعر", eng: "Price calculation" },
    keywords: ["price", "prix", "taman", "chhal", "cost", "budget", "total", "taxes", "insurance", "assurance", "calcul", "kayt7seb", "t7seb", "السعر", "الثمن", "الميزانية"],
    synonyms: ["prix kifach kayt7seb", "how is price calculated", "comment le prix est calcule", "كيف يحسب السعر"],
    examples: ["prix kifach kayt7seb?", "Comment le prix est calculé ?", "How is the price calculated?", "كيف يتم حساب السعر؟"],
    related: ["payment", "package", "travelers"],
    contextIntents: ["payment", "booking", "custom-trip"],
    answers: {
      fra:
        "Le prix dépend du forfait, du nombre de voyageurs, des dates, du niveau d’hôtel, des services et des frais comme taxes ou assurance. Le total est affiché avant confirmation.",
      darija:
        "Taman kayt7seb 3la forfait, nombre dyal voyageurs, dates, hôtel, services و frais بحال taxes/assurance. Total kayبان قبل confirmation.",
      ara:
        "يعتمد السعر على الباقة، عدد المسافرين، التواريخ، مستوى الفندق، الخدمات والرسوم مثل الضرائب أو التأمين. يظهر المجموع قبل التأكيد.",
      eng:
        "Price depends on the package, travelers, dates, hotel level, services, and fees like taxes or insurance. The total is shown before confirmation.",
    },
    actions: [commonActions.packages, commonActions.createTrip],
  },
  {
    id: "receipt",
    intent: "receipt",
    title: "Receipt",
    label: { fra: "Reçu", darija: "Reçu", ara: "الوصل", eng: "Receipt" },
    keywords: ["receipt", "recu", "reçu", "facture", "invoice", "download", "telecharger", "télécharger", "send receipt", "وصل", "فاتورة", "تحميل"],
    synonyms: ["booking receipt", "envoyer recu", "download invoice", "نحمل الوصل", "الفاتورة"],
    examples: ["Comment télécharger mon reçu ?", "bghit reçu dyal réservation", "How can I download receipt?", "كيف أحصل على الوصل؟"],
    related: ["booking", "payment", "support"],
    contextIntents: ["payment", "booking-status", "booking"],
    answers: {
      fra:
        "Après confirmation, gardez votre référence de réservation. Pour une facture, un reçu corrigé ou un détail de réservation, contactez le support.",
      darija:
        "من بعد confirmation، خلي référence dyal réservation. التفاصيل كتلقاها f espace client. Ila بغيتي facture ولا reçu مصحح، تواصل مع support.",
      ara:
        "بعد التأكيد، احتفظ بمرجع الحجز. إذا احتجت فاتورة، وصلا مصححا أو تفاصيل الحجز، تواصل مع الدعم.",
      eng:
        "After confirmation, keep your booking reference. For a corrected invoice, receipt, or booking detail, contact support.",
    },
    actions: [commonActions.bookings, commonActions.support],
  },
  {
    id: "create-account",
    intent: "login-signup-account",
    title: "Login and account",
    label: { fra: "Compte", darija: "Compte", ara: "الحساب", eng: "Account" },
    keywords: ["login", "signin", "sign in", "signup", "register", "account", "compte", "connexion", "inscription", "auth", "نسجل", "تسجيل", "حساب", "دخول"],
    synonyms: ["create account", "ouvrir compte", "ndir compte", "nconnecta", "تسجيل الدخول", "إنشاء حساب"],
    examples: ["Comment créer un compte ?", "bghit ndir compte", "How do I sign up?", "كيف أنشئ حسابا؟"],
    related: ["profile", "dashboard", "booking"],
    answers: {
      fra:
        "Pour accéder à votre compte, ouvrez Connexion. Vous pouvez vous connecter comme voyageur ou agence, puis NextTrip vous envoie vers l’espace adapté.",
      darija:
        "باش تدخل للحساب، كليكي على Connexion. تقدر تدخل ك voyageur ولا agence، و NextTrip غادي يديك l’espace المناسب.",
      ara:
        "للدخول إلى حسابك، افتح صفحة تسجيل الدخول. يمكنك الدخول كمسافر أو وكالة، ثم ينقلك NextTrip إلى المساحة المناسبة.",
      eng:
        "To access your account, open Sign In. You can sign in as a traveler or agency, then NextTrip sends you to the right workspace.",
    },
    actions: [commonActions.auth],
  },
  {
    id: "client-dashboard",
    intent: "client-dashboard",
    title: "Client dashboard",
    label: { fra: "Espace client", darija: "Espace client", ara: "مساحة العميل", eng: "Client dashboard" },
    keywords: ["client dashboard", "dashboard client", "espace client", "profile", "profil", "my bookings", "mes reservations", "suivi", "tableau de bord", "مساحة العميل", "لوحة التحكم", "ملفي"],
    synonyms: ["fin compte dyali", "profil dyali", "traveler dashboard", "حسابي", "حجوزاتي"],
    examples: ["Où est mon espace client ?", "fin n9der nchof profil dyali?", "Where is my dashboard?", "أين أجد مساحة العميل؟"],
    related: ["booking", "tracking", "receipt"],
    contextIntents: ["booking-status", "receipt"],
    answers: {
      fra:
        "Cette version garde uniquement le dashboard agence et le dashboard admin NextTrip. Pour le suivi voyageur, utilisez le support ou les pages de demande de voyage.",
      darija:
        "Espace client فيه réservations, demandes dyal voyage, préférences و infos ديالك. Profil للinfos، و Mes réservations للsuivi.",
      ara:
        "هذا الإصدار يحتفظ فقط بلوحة الوكالة ولوحة إدارة NextTrip. لتتبع طلبات المسافرين، استخدم الدعم أو صفحات طلب الرحلة.",
      eng:
        "This version keeps only the agency dashboard and the NextTrip admin dashboard. For traveler tracking, use support or the trip request pages.",
    },
    actions: [commonActions.profile, commonActions.bookings],
  },
  {
    id: "agency-dashboard",
    intent: "agency-dashboard",
    title: "Agency dashboard",
    label: { fra: "Dashboard agence", darija: "Dashboard agence", ara: "لوحة الوكالة", eng: "Agency dashboard" },
    keywords: ["agency dashboard", "dashboard agence", "agency workspace", "workspace agence", "agency account", "لوحة الوكالة", "مساحة الوكالة", "وكالة"],
    synonyms: ["agence dashboard", "wakala dashboard", "espace agence", "حساب الوكالة"],
    examples: ["Comment utiliser le dashboard agence ?", "fin kayn dashboard agence?", "How does agency dashboard work?", "كيف تعمل لوحة الوكالة؟"],
    related: ["agency", "request", "offers"],
    contextIntents: ["agencies", "send-request-agencies"],
    answers: {
      fra:
        "Le dashboard agence permet de gérer les packages, lire les demandes voyageurs, envoyer des offres, suivre les messages et organiser les réservations.",
      darija:
        "Dashboard agence كيعاون الوكالة تسير packages، تشوف demandes dyal voyageurs، تصيفط offres، تتابع messages و réservations.",
      ara:
        "لوحة الوكالة تساعد الوكالات على إدارة الباقات، قراءة طلبات المسافرين، إرسال العروض، متابعة الرسائل وتنظيم الحجوزات.",
      eng:
        "The agency dashboard helps agencies manage packages, read traveler requests, send offers, follow messages, and organize bookings.",
    },
    actions: [commonActions.agencyDashboard, commonActions.auth],
  },
  {
    id: "agencies",
    intent: "agencies",
    title: "Agencies",
    label: { fra: "Agences", darija: "Agences", ara: "الوكالات", eng: "Agencies" },
    keywords: ["agency", "agencies", "agence", "agences", "wakala", "contact agency", "contacter agence", "profile agence", "وكالة", "وكالات"],
    synonyms: ["bghit agence", "agence t3awni", "find agency", "أريد وكالة", "التواصل مع وكالة"],
    examples: ["Comment contacter une agence ?", "bghit agence t3awni", "How can I contact an agency?", "أريد التواصل مع وكالة"],
    related: ["offer", "request", "package"],
    answers: {
      fra:
        "Les agences ont des profils avec note, ranking, packages, offres et services. Vous pouvez les consulter depuis la page Agences ou depuis les cartes de forfaits.",
      darija:
        "Les agences عندهم profiles فيه note, ranking, packages, offres و services. تقدر تشوفهم من page Agences ولا من cards dyal forfaits.",
      ara:
        "للوكالات صفحات فيها التقييم، الترتيب، الباقات، العروض والخدمات. يمكنك فتحها من صفحة الوكالات أو من بطاقات الباقات.",
      eng:
        "Agencies have profiles with rating, ranking, packages, offers, and services. You can open them from the Agencies page or package cards.",
    },
    actions: [commonActions.agency, commonActions.contact],
  },
  {
    id: "travel-experiences",
    intent: "travel-experiences",
    title: "Travel experiences",
    label: { fra: "Expériences", darija: "Expériences", ara: "التجارب", eng: "Experiences" },
    keywords: ["experience", "experiences", "expérience", "avis", "review", "reviews", "story", "post", "comment", "تجارب", "تقييم", "آراء"],
    synonyms: ["traveler stories", "share experience", "avis voyageurs", "قصص المسافرين"],
    examples: ["Où lire les expériences ?", "bghit nchof avis voyageurs", "Where are travel experiences?", "أين أقرأ تجارب المسافرين؟"],
    related: ["review", "package", "destination"],
    answers: {
      fra:
        "La page Expériences contient des histoires, avis et commentaires de voyageurs. Elle vous aide à mieux choisir une destination ou un forfait.",
      darija:
        "Page Expériences فيها stories, avis و commentaires dyal voyageurs. كتعاونك تختار destination ولا forfait بوضوح.",
      ara:
        "صفحة التجارب تعرض قصص وآراء وتعليقات المسافرين، وتساعدك على اختيار الوجهة أو الباقة بشكل أفضل.",
      eng:
        "The Experiences page shows traveler stories, reviews, and comments. It helps you choose a destination or package with more confidence.",
    },
    actions: [commonActions.experiences, commonActions.destinations],
  },
  {
    id: "support",
    intent: "support-contact",
    title: "Support and contact",
    label: { fra: "Support", darija: "Support", ara: "الدعم", eng: "Support" },
    keywords: ["support", "help", "aide", "contact", "problem", "probleme", "problème", "bug", "assistance", "مساعدة", "دعم", "مشكلة", "تواصل"],
    synonyms: ["contact support", "besoin aide", "3ndi mochkil", "محتاج مساعدة", "اتصل بنا"],
    examples: ["Comment contacter le support ?", "3ndi mochkil", "How can I contact support?", "كيف أتواصل مع الدعم؟"],
    related: ["payment", "booking", "receipt"],
    answers: {
      fra:
        "Pour obtenir de l’aide, ouvrez Support ou Contact. Si le sujet concerne une réservation, ajoutez votre référence pour que l’équipe comprenne plus vite.",
      darija:
        "إلا بغيتي المساعدة، دخل ل Support ولا Contact. Ila عندك مشكل ف réservation، زيد référence باش الفريق يفهم بسرعة.",
      ara:
        "للحصول على المساعدة، افتح صفحة الدعم أو التواصل. إذا كان الأمر يخص حجزا، أضف مرجع الحجز لتسهيل المعالجة.",
      eng:
        "For help, open Support or Contact. If the issue is about a booking, include your booking reference so the team can help faster.",
    },
    actions: [commonActions.support, commonActions.contact],
  },
  {
    id: "cancel-booking",
    intent: "cancel-booking",
    title: "Cancel booking",
    label: { fra: "Annulation", darija: "Annuler réservation", ara: "إلغاء الحجز", eng: "Cancel booking" },
    keywords: ["cancel", "annuler", "annulation", "cancel booking", "refund", "remboursement", "nannuli", "إلغاء", "الغاء", "استرجاع"],
    synonyms: ["bghit nannuli reservation", "annuler voyage", "cancel my booking", "إلغاء الرحلة"],
    examples: ["Comment annuler ma réservation ?", "bghit nannuli reservation", "Can I cancel my booking?", "كيف ألغي الحجز؟"],
    related: ["booking", "support", "refund"],
    contextIntents: ["booking-status", "payment", "receipt"],
    answers: {
      fra:
        "Pour annuler une réservation, contactez le support avec votre référence. L’équipe peut vérifier les règles de l’agence, le remboursement et les prochaines actions.",
      darija:
        "باش تلغي réservation، دخل ل Mes réservations وشوف actions المتاحة. Ila maبانش annulation/refund، تواصل مع support ومعاك référence.",
      ara:
        "لإلغاء الحجز، تواصل مع الدعم وأرسل مرجع الحجز. يمكن للفريق مراجعة شروط الوكالة، الاسترجاع والخطوات التالية.",
      eng:
        "To cancel a booking, contact support with your booking reference. The team can check agency rules, refund eligibility, and next actions.",
    },
    actions: [commonActions.bookings, commonActions.support],
  },
  {
    id: "modify-booking",
    intent: "modify-booking",
    title: "Modify booking",
    label: { fra: "Modifier réservation", darija: "بدل réservation", ara: "تعديل الحجز", eng: "Modify booking" },
    keywords: ["modify", "modifier", "change", "changer", "date", "travelers", "edit booking", "بدل", "تعديل", "تغيير"],
    synonyms: ["bghit nbdl reservation", "changer date", "modify my booking", "تغيير تاريخ الحجز"],
    examples: ["Comment modifier ma réservation ?", "bghit nbdl date dyal voyage", "Can I modify my booking?", "كيف أعدل الحجز؟"],
    related: ["booking", "support", "date"],
    contextIntents: ["booking-status", "booking"],
    answers: {
      fra:
        "Pour modifier une réservation, contactez le support ou l’agence avec votre référence. Ils peuvent vérifier les changements de date, voyageurs ou services importants.",
      darija:
        "باش تبدل réservation، دخل ل Mes réservations وشوف actions. Ila بغيتي تبدل date, voyageurs ولا service مهم، تواصل مع support ولا agence.",
      ara:
        "لتعديل الحجز، تواصل مع الدعم أو الوكالة وأرسل مرجع الحجز. يمكنهم مراجعة تغيير التاريخ، المسافرين أو الخدمات المهمة.",
      eng:
        "To modify a booking, contact support or the agency with your booking reference. They can review date, traveler, or service changes.",
    },
    actions: [commonActions.bookings, commonActions.support],
  },
  {
    id: "language-help",
    intent: "language-help",
    title: "Language help",
    label: { fra: "Langue", darija: "Langue", ara: "اللغة", eng: "Language" },
    keywords: ["language", "langue", "arabic", "francais", "français", "english", "changer langue", "translation", "traduction", "لغة", "العربية", "الفرنسية", "الإنجليزية"],
    synonyms: ["how change language", "bghit nbdl langue", "بدل اللغة", "site en arabe"],
    examples: ["Comment changer la langue ?", "bghit nbdl langue", "How do I change language?", "كيف أغير اللغة؟"],
    related: ["menu", "settings", "preferences"],
    answers: {
      fra:
        "Pour changer la langue, ouvrez le menu, choisissez Langue, puis sélectionnez Français, Anglais ou Arabe. Le site garde votre choix automatiquement.",
      darija:
        "باش تبدل langue، حل menu، دخل ل Langue، ومن بعد اختار Français, English ولا Arabic. Site كيحفظ الاختيار ديالك.",
      ara:
        "لتغيير اللغة، افتح القائمة، اختر اللغة، ثم اختر الفرنسية أو الإنجليزية أو العربية. سيحفظ الموقع اختيارك تلقائيا.",
      eng:
        "To change language, open the menu, choose Language, then select French, English, or Arabic. The site saves your choice automatically.",
    },
    actions: [],
  },
];
