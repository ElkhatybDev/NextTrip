export const chatbotUiText = {
  fra: {
    welcome: "Bonjour 👋 Je suis l’assistant NextTrip. Comment puis-je vous aider ?",
    title: "Assistant NextTrip",
    subtitle: "Packages, réservations, agences, paiement et suivi",
    inputLabel: "Votre question",
    inputPlaceholder: "Posez votre question...",
    sendLabel: "Envoyer la question",
    closeLabel: "Fermer le chatbot",
    openLabel: "Ouvrir l’assistant NextTrip",
    closedLabel: "Assistant",
    quickActionsLabel: "Actions rapides",
  },
  eng: {
    welcome: "Hello 👋 I’m the NextTrip assistant. How can I help you?",
    title: "NextTrip Assistant",
    subtitle: "Packages, bookings, agencies, payment, and tracking",
    inputLabel: "Your question",
    inputPlaceholder: "Ask your question...",
    sendLabel: "Send question",
    closeLabel: "Close chatbot",
    openLabel: "Open NextTrip assistant",
    closedLabel: "Assistant",
    quickActionsLabel: "Quick actions",
  },
  ara: {
    welcome: "مرحبا 👋 أنا مساعد NextTrip. كيف يمكنني مساعدتك؟",
    title: "مساعد NextTrip",
    subtitle: "الباقات، الحجوزات، الوكالات، الدفع والتتبع",
    inputLabel: "سؤالك",
    inputPlaceholder: "اكتب سؤالك...",
    sendLabel: "إرسال السؤال",
    closeLabel: "إغلاق المحادثة",
    openLabel: "فتح مساعد NextTrip",
    closedLabel: "المساعد",
    quickActionsLabel: "إجراءات سريعة",
  },
};

export const chatbotFallbackResponse = {
  id: "fallback",
  answers: {
    fra:
      "Je n’ai pas trouvé une réponse exacte, mais je peux quand même vous orienter. Sur NextTrip, vous pouvez chercher des packages, créer un voyage personnalisé, suivre une réservation, contacter une agence ou demander de l’aide au support.\n\nEssayez une question comme: prix, paiement, réservation, agence, dashboard, reçu ou créer un voyage.",
    eng:
      "I could not find an exact answer, but I can still guide you. On NextTrip, you can browse packages, create a custom trip, track a booking, contact an agency, or ask support for help.\n\nTry asking about price, payment, booking, agency, dashboard, receipt, or creating a trip.",
    ara:
      "لم أجد جوابا مطابقا تماما، لكن يمكنني توجيهك. في NextTrip يمكنك تصفح الباقات، إنشاء رحلة مخصصة، تتبع الحجز، التواصل مع وكالة أو طلب المساعدة من الدعم.\n\nجرب أن تسأل عن السعر، الدفع، الحجز، الوكالة، لوحة التحكم، الوصل أو إنشاء رحلة.",
  },
  actions: [
    { label: { fra: "Voir les packages", eng: "View packages", ara: "عرض الباقات" }, route: "/packages" },
    {
      label: { fra: "Créer un voyage", eng: "Create a trip", ara: "إنشاء رحلة" },
      route: "/create-trip",
    },
    { label: { fra: "Contacter support", eng: "Contact support", ara: "الدعم" }, route: "/support" },
  ],
};

export const chatbotQuickActions = [
  {
    label: { fra: "Voir les packages", eng: "View packages", ara: "عرض الباقات" },
    prompt: "packages",
    topicId: "browse-packages",
  },
  {
    label: {
      fra: "Créer un voyage personnalisé",
      eng: "Create a custom trip",
      ara: "إنشاء رحلة مخصصة",
    },
    prompt: "custom trip",
    topicId: "custom-trip",
  },
  {
    label: { fra: "Comment réserver ?", eng: "How do I book?", ara: "كيف أحجز؟" },
    prompt: "booking",
    topicId: "confirm-booking",
  },
  {
    label: { fra: "Suivre ma réservation", eng: "Track my booking", ara: "تتبع حجزي" },
    prompt: "booking status",
    topicId: "booking-status",
  },
  {
    label: { fra: "Contacter une agence", eng: "Contact an agency", ara: "التواصل مع وكالة" },
    prompt: "agency",
    topicId: "agencies",
  },
  {
    label: { fra: "Problème de paiement", eng: "Payment issue", ara: "مشكلة في الدفع" },
    prompt: "payment",
    topicId: "payment",
  },
];

export const chatbotKnowledgeBase = [
  {
    id: "what-is-nexttrip",
    title: "What is NextTrip?",
    keywords: [
      "nexttrip",
      "c est quoi",
      "what is",
      "platform",
      "plateforme",
      "site",
      "service",
      "chno",
      "achno",
      "kifach",
      "ما هو",
      "شنو",
    ],
    answers: {
      fra:
        "NextTrip est une plateforme de voyage pour trouver des packages, comparer les offres d’agences, créer un voyage personnalisé, réserver, payer et suivre vos réservations.",
      eng:
        "NextTrip is a travel platform where users can browse packages, compare agency offers, create custom trips, book, pay online, and track reservations.",
      ara:
        "NextTrip منصة سفر تساعدك على تصفح الباقات، مقارنة عروض الوكالات، إنشاء رحلة مخصصة، الحجز، الدفع وتتبع الحجوزات.",
    },
    actions: [
      { label: { fra: "Explorer les packages", eng: "Explore packages", ara: "استكشاف الباقات" }, route: "/packages" },
      { label: { fra: "Créer un voyage", eng: "Create a trip", ara: "إنشاء رحلة" }, route: "/create-trip" },
    ],
  },
  {
    id: "create-account",
    title: "How to create an account",
    keywords: [
      "account",
      "compte",
      "signup",
      "register",
      "inscription",
      "connexion",
      "login",
      "auth",
      "ndir compte",
      "نسجل",
      "حساب",
    ],
    answers: {
      fra:
        "Pour créer un compte, ouvrez Connexion, choisissez votre rôle utilisateur ou agence, puis remplissez les informations demandées. Après connexion, vous serez redirigé vers l’espace adapté.",
      eng:
        "To create an account, open Sign In, choose traveler or agency, then fill in the required information. After login, NextTrip sends you to the right workspace.",
      ara:
        "لإنشاء حساب، افتح صفحة تسجيل الدخول، اختر مستخدم أو وكالة، ثم املأ المعلومات المطلوبة. بعد الدخول ستنتقل إلى المساحة المناسبة.",
    },
    actions: [{ label: { fra: "Connexion", eng: "Sign in", ara: "تسجيل الدخول" }, route: "/auth" }],
  },
  {
    id: "browse-packages",
    title: "How to browse packages",
    keywords: [
      "package",
      "packages",
      "forfait",
      "forfaits",
      "offre",
      "offres",
      "trip",
      "voyage",
      "destination",
      "chercher",
      "search",
      "safar",
      "باقة",
      "باقات",
      "عرض",
      "رحلة",
    ],
    answers: {
      fra:
        "Ouvrez la page Packages pour comparer destination, prix, durée, agence, note et détails. La page Offers montre les offres spéciales des agences.",
      eng:
        "Open the Packages page to compare destination, price, duration, agency, rating, and details. The Offers page shows special agency deals.",
      ara:
        "افتح صفحة الباقات لمقارنة الوجهة، السعر، المدة، الوكالة، التقييم والتفاصيل. صفحة العروض تعرض عروض الوكالات الخاصة.",
    },
    actions: [
      { label: { fra: "Voir les packages", eng: "View packages", ara: "عرض الباقات" }, route: "/packages" },
      { label: { fra: "Voir les offres", eng: "View offers", ara: "عرض العروض" }, route: "/offers" },
    ],
  },
  {
    id: "custom-trip",
    title: "How to customize a trip",
    keywords: [
      "custom",
      "customize",
      "personnalise",
      "personnaliser",
      "sur mesure",
      "create trip",
      "creer voyage",
      "demande",
      "request",
      "voyage personnalisé",
      "رحلة مخصصة",
      "طلب",
    ],
    answers: {
      fra:
        "Pour créer un voyage personnalisé, ouvrez Create Trip et ajoutez destination, dates, budget, voyageurs, type de voyage, hôtel, extras et notes. NextTrip prépare un brief clair pour les agences.",
      eng:
        "To create a custom trip, open Create Trip and add destination, dates, budget, travelers, trip type, hotel level, extras, and notes. NextTrip turns it into a clear brief for agencies.",
      ara:
        "لإنشاء رحلة مخصصة، افتح Create Trip وأضف الوجهة، التواريخ، الميزانية، المسافرين، نوع الرحلة، مستوى الفندق، الإضافات والملاحظات. NextTrip يحولها إلى ملخص واضح للوكالات.",
    },
    actions: [{ label: { fra: "Créer un voyage personnalisé", eng: "Create custom trip", ara: "إنشاء رحلة مخصصة" }, route: "/create-trip" }],
  },
  {
    id: "price-calculation",
    title: "How the price is calculated",
    keywords: [
      "prix",
      "price",
      "taman",
      "chhal",
      "cost",
      "calcul",
      "total",
      "taxes",
      "insurance",
      "assurance",
      "budget",
      "السعر",
      "الثمن",
      "الميزانية",
    ],
    answers: {
      fra:
        "Le prix dépend du package, du nombre de voyageurs et des frais comme taxes ou assurance. Dans le checkout, NextTrip affiche le prix du voyage, les frais et le total avant confirmation.",
      eng:
        "The price depends on the selected package, traveler count, and fees such as taxes or insurance. Checkout shows the trip price, fees, and total before confirmation.",
      ara:
        "السعر يعتمد على الباقة المختارة، عدد المسافرين والرسوم مثل الضرائب أو التأمين. في checkout سترى سعر الرحلة، الرسوم والمجموع قبل التأكيد.",
    },
    actions: [
      { label: { fra: "Comparer les packages", eng: "Compare packages", ara: "مقارنة الباقات" }, route: "/packages" },
      { label: { fra: "Checkout", eng: "Checkout", ara: "الدفع" }, route: "/checkout" },
    ],
  },
  {
    id: "send-request-agencies",
    title: "How to send a request to agencies",
    keywords: [
      "send request",
      "envoyer demande",
      "demande agence",
      "agency request",
      "brief",
      "agencies respond",
      "nseft demande",
      "talab",
      "وكالة",
      "طلب وكالة",
    ],
    answers: {
      fra:
        "Après avoir rempli le voyage personnalisé, votre demande devient un brief. Les agences utilisent ce brief pour comprendre votre destination, budget, dates, style et services avant d’envoyer une offre.",
      eng:
        "After you complete a custom trip, your request becomes a brief. Agencies use it to understand destination, budget, dates, style, and services before sending an offer.",
      ara:
        "بعد ملء الرحلة المخصصة، يتحول طلبك إلى ملخص. تستعمله الوكالات لفهم الوجهة، الميزانية، التواريخ، الأسلوب والخدمات قبل إرسال العرض.",
    },
    actions: [{ label: { fra: "Créer la demande", eng: "Create request", ara: "إنشاء الطلب" }, route: "/create-trip" }],
  },
  {
    id: "agencies",
    title: "How agencies work",
    keywords: [
      "agence",
      "agences",
      "agency",
      "agencies",
      "contact agency",
      "contacter agence",
      "offer agency",
      "profile agence",
      "wakala",
      "l'agence",
      "وكالة",
      "وكالات",
    ],
    answers: {
      fra:
        "Les agences ont des profils détaillés avec ranking, note, packages, offres, services et clients servis. Vous pouvez ouvrir une agence depuis une card package ou depuis la page Agencies.",
      eng:
        "Agencies have detailed profiles with ranking, rating, packages, offers, services, and served clients. You can open an agency from a package card or from the Agencies page.",
      ara:
        "للوكالات صفحات مفصلة فيها الترتيب، التقييم، الباقات، العروض، الخدمات وعدد العملاء. يمكنك فتح وكالة من بطاقة الباقة أو من صفحة الوكالات.",
    },
    actions: [
      { label: { fra: "Voir les agences", eng: "View agencies", ara: "عرض الوكالات" }, route: "/agency" },
      { label: { fra: "Contact", eng: "Contact", ara: "التواصل" }, route: "/contact" },
    ],
  },
  {
    id: "confirm-booking",
    title: "How to confirm a booking",
    keywords: [
      "reservation",
      "réservation",
      "booking",
      "book",
      "reserver",
      "réserver",
      "confirm",
      "confirmer",
      "book now",
      "nreservi",
      "حجز",
      "تأكيد",
    ],
    answers: {
      fra:
        "Pour réserver, ouvrez un package, cliquez sur Book now, remplissez les informations du voyageur, vérifiez le prix total, puis confirmez la réservation.",
      eng:
        "To book, open a package, click Book now, fill in traveler information, review the total price, then confirm the booking.",
      ara:
        "للحجز، افتح باقة، اضغط Book now، املأ معلومات المسافر، راجع السعر الإجمالي ثم أكد الحجز.",
    },
    actions: [
      { label: { fra: "Voir les packages", eng: "View packages", ara: "عرض الباقات" }, route: "/packages" },
      { label: { fra: "Mes réservations", eng: "My bookings", ara: "حجوزاتي" }, route: "/my-bookings" },
    ],
  },
  {
    id: "booking-status",
    title: "How to track booking status",
    keywords: [
      "suivi",
      "track",
      "status",
      "etat",
      "état",
      "my bookings",
      "mes reservations",
      "reservation status",
      "فين وصل",
      "تتبع",
      "حجوزاتي",
    ],
    answers: {
      fra:
        "Pour suivre votre réservation, ouvrez Mes réservations. Vous y trouverez le statut, la date de voyage, le paiement, les prochaines actions et les détails utiles.",
      eng:
        "To track a booking, open My bookings. You can see status, travel date, payment state, next actions, and useful details.",
      ara:
        "لتتبع الحجز، افتح حجوزاتي. ستجد الحالة، تاريخ السفر، حالة الدفع، الخطوات التالية والتفاصيل المهمة.",
    },
    actions: [{ label: { fra: "Mes réservations", eng: "My bookings", ara: "حجوزاتي" }, route: "/my-bookings" }],
  },
  {
    id: "payment",
    title: "How payment works",
    keywords: [
      "payment",
      "paiement",
      "pay",
      "payer",
      "carte",
      "card",
      "bank",
      "virement",
      "checkout",
      "failed",
      "erreur paiement",
      "problème paiement",
      "khls",
      "الدفع",
      "البطاقة",
      "أداء",
    ],
    answers: {
      fra:
        "Le paiement se fait dans le checkout après vérification du total. Si le paiement échoue, vérifiez la carte, réessayez, ou contactez le support avec votre référence de réservation.",
      eng:
        "Payment happens in checkout after you review the total. If payment fails, check card details, try again, or contact support with your booking reference.",
      ara:
        "يتم الدفع في checkout بعد مراجعة المجموع. إذا فشل الدفع، تحقق من معلومات البطاقة، أعد المحاولة أو تواصل مع الدعم ومعك مرجع الحجز.",
    },
    actions: [
      { label: { fra: "Checkout", eng: "Checkout", ara: "الدفع" }, route: "/checkout" },
      { label: { fra: "Support", eng: "Support", ara: "الدعم" }, route: "/support" },
    ],
  },
  {
    id: "receipt",
    title: "How to download or send receipt",
    keywords: [
      "receipt",
      "recu",
      "reçu",
      "facture",
      "invoice",
      "download",
      "telecharger",
      "télécharger",
      "justificatif",
      "وصل",
      "فاتورة",
    ],
    answers: {
      fra:
        "Après confirmation, gardez la référence de réservation. Vous pouvez retrouver les détails depuis votre espace client. Pour une facture ou un reçu corrigé, contactez le support.",
      eng:
        "After confirmation, keep your booking reference. You can find details in your client area. For a corrected invoice or receipt, contact support.",
      ara:
        "بعد التأكيد، احتفظ بمرجع الحجز. يمكنك إيجاد التفاصيل في مساحة العميل. إذا احتجت فاتورة أو وصلا مصححا فتواصل مع الدعم.",
    },
    actions: [
      { label: { fra: "Mes réservations", eng: "My bookings", ara: "حجوزاتي" }, route: "/my-bookings" },
      { label: { fra: "Support", eng: "Support", ara: "الدعم" }, route: "/support" },
    ],
  },
  {
    id: "client-dashboard",
    title: "How to use client dashboard",
    keywords: [
      "dashboard",
      "client dashboard",
      "profile",
      "profil",
      "my bookings",
      "mes reservations",
      "suivi",
      "tableau de bord",
      "لوحة التحكم",
      "الملف",
    ],
    answers: {
      fra:
        "L’espace client sert à suivre vos réservations, vos demandes de voyage, vos préférences et les prochaines actions. Utilisez Profil pour vos informations et Mes réservations pour le suivi.",
      eng:
        "The client area helps you track bookings, trip requests, preferences, and next actions. Use Profile for your information and My bookings for tracking.",
      ara:
        "مساحة العميل تساعدك على تتبع الحجوزات، طلبات الرحلات، التفضيلات والخطوات التالية. استعمل الملف للمعلومات وحجوزاتي للتتبع.",
    },
    actions: [
      { label: { fra: "Profil client", eng: "Client profile", ara: "ملف العميل" }, route: "/profile" },
      { label: { fra: "Mes réservations", eng: "My bookings", ara: "حجوزاتي" }, route: "/my-bookings" },
    ],
  },
  {
    id: "agency-dashboard",
    title: "How to use agency dashboard",
    keywords: [
      "agency dashboard",
      "dashboard agence",
      "agency workspace",
      "workspace agence",
      "package agency",
      "requests agency",
      "لوحة الوكالة",
      "مساحة الوكالة",
    ],
    answers: {
      fra:
        "Le dashboard agence aide les agences à gérer leurs packages, répondre aux demandes voyageurs, suivre les messages et organiser les offres. Connectez-vous avec le rôle agence.",
      eng:
        "The agency dashboard helps agencies manage packages, answer traveler requests, follow messages, and organize offers. Sign in with the agency role.",
      ara:
        "لوحة الوكالة تساعد الوكالات على إدارة الباقات، الرد على طلبات المسافرين، متابعة الرسائل وتنظيم العروض. سجل الدخول بدور الوكالة.",
    },
    actions: [
      { label: { fra: "Dashboard agence", eng: "Agency dashboard", ara: "لوحة الوكالة" }, route: "/dashboard" },
      { label: { fra: "Connexion agence", eng: "Agency sign in", ara: "دخول الوكالة" }, route: "/auth" },
    ],
  },
  {
    id: "travel-experiences",
    title: "How to use travel experiences",
    keywords: [
      "experience",
      "experiences",
      "expérience",
      "avis",
      "review",
      "reviews",
      "comment",
      "story",
      "traveler story",
      "تجارب",
      "تقييم",
    ],
    answers: {
      fra:
        "La page Experiences montre des histoires et avis de voyageurs. Ouvrez une expérience pour voir les détails et utilisez ces avis comme repères avant de choisir un package.",
      eng:
        "The Experiences page shows traveler stories and reviews. Open an experience for details and use reviews as guidance before choosing a package.",
      ara:
        "صفحة التجارب تعرض قصص وتقييمات المسافرين. افتح تجربة لرؤية التفاصيل واستعمل الآراء كدليل قبل اختيار باقة.",
    },
    actions: [
      { label: { fra: "Voir les expériences", eng: "View experiences", ara: "عرض التجارب" }, route: "/experience" },
      { label: { fra: "Avis voyageurs", eng: "Traveler reviews", ara: "تقييمات المسافرين" }, route: "/reviews" },
    ],
  },
  {
    id: "support",
    title: "How to contact support",
    keywords: [
      "support",
      "help",
      "aide",
      "contact",
      "problem",
      "probleme",
      "problème",
      "bug",
      "question",
      "assistance",
      "مساعدة",
      "دعم",
      "مشكلة",
    ],
    answers: {
      fra:
        "Pour l’aide, ouvrez Support ou Contact. Ajoutez votre référence de réservation si le problème concerne paiement, facture, annulation ou changement de date.",
      eng:
        "For help, open Support or Contact. Add your booking reference if the issue is about payment, receipt, cancellation, or date changes.",
      ara:
        "للمساعدة، افتح الدعم أو التواصل. أضف مرجع الحجز إذا كانت المشكلة تخص الدفع، الوصل، الإلغاء أو تغيير التاريخ.",
    },
    actions: [
      { label: { fra: "Support", eng: "Support", ara: "الدعم" }, route: "/support" },
      { label: { fra: "Contact", eng: "Contact", ara: "التواصل" }, route: "/contact" },
    ],
  },
];
