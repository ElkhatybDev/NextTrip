🌍 Next Trip — Plateforme de voyages personnalisés
Application web Full Stack permettant aux utilisateurs de consulter des offres de voyage,personnaliser leurs séjours et effectuer des réservations, avec un calcul du prix en temps réel.

Développée dans le cadre du Projet de Fin d'Études — ISTA 2 NTIC Settat (Développement Digital, option Web Full Stack).

🔗 Live Demo
👉 next-trip-coral.vercel.app

✨ Fonctionnalités
🔍 Consultation des offres de voyage
🧳 Personnalisation du séjour (destinations, options)
💰 Calcul du prix en temps réel
📝 Réservation avec parcours utilisateur simple
🏢 Espace agence
🔐 Authentification sécurisée
🛠️ Tech Stack
Frontend	Backend	Base de données	Outils
React.js, Bootstrap	Laravel (API REST)	MySQL	Git, Postman, Figma
🏗️ Architecture
Frontend : React.js déployé sur Vercel
Backend : API REST Laravel communiquant avec le frontend via HTTP
Base de données : MySQL (modélisation & relations)
🚀 Installation en local
Backend (Laravel)

# 1. Cloner le repositorygit clone https://github.com/ElkhatybDev/NextTrip.gitcd NextTrip/backend# 2. Installer les dépendancescomposer install# 3. Configurer l'environnementcp .env.example .envphp artisan key:generate# Configurer la connexion MySQL dans le fichier .env# 4. Migrations + donnéesphp artisan migrate --seed# 5. Lancer le serveurphp artisan serve
Frontend (React)

cd frontendnpm installnpm run dev
📸 Aperçu
Page d'accueil	Réservation
Accueil	Réservation
👤 Auteur
Amine EL KHATYB

💼 LinkedIn : linkedin.com/in/amine-el-khatyb
