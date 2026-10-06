# ✈️ Next Trip - Plateforme de Voyages Personnalisés

**Next Trip** est une plateforme web moderne développée dans le cadre d'un Projet de Fin d'Études (PFE 2026). Elle permet aux utilisateurs de découvrir des offres de voyage, de personnaliser leurs trajets en temps réel et d'effectuer des réservations. La plateforme intègre également un espace dédié aux agences pour la gestion de leurs offres.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111827)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?logo=laravel&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)
![API REST](https://img.shields.io/badge/API-REST-0F766E)

---

## ✨ Fonctionnalités Principales

- 🧳 **Consultation des Offres & Réservation** : Navigation fluide pour parcourir les offres de voyages et réserver facilement.
- 🛠️ **Personnalisation de Voyage** : Un parcours utilisateur intuitif permettant d'adapter son voyage selon ses besoins.
- 💰 **Calcul du Prix en Temps Réel** : Mise à jour dynamique du tarif lors de la personnalisation de l'offre.
- 🏢 **Espace Agence** : Interface dédiée aux agences partenaires pour administrer leurs offres et réservations.
- 🎨 **UI/UX Soignée** : Interface conçue et prototypée sur Figma pour garantir une expérience utilisateur optimale.

---

## 🛠️ Tech Stack

- **Front-end** : React.js, HTML5, CSS3 / Tailwind CSS
- **Back-end** : Laravel (API REST)
- **Base de données** : MySQL
- **Design & Prototypage** : Figma
- **Gestion de version** : Git & GitHub

---

## 🏗️ Architecture du Projet

Le projet repose sur une architecture découplée :
- **Client (React)** : Consomme les endpoints de l'API REST pour afficher l'interface dynamique.
- **Serveur (Laravel)** : Traite la logique métier, la sécurité, la gestion des rôles (utilisateurs / agences) et les requêtes vers la base de données.
- **Base de Données (MySQL)** : Stocke les données des utilisateurs, des agences, des offres et des réservations.

---

## 🚀 Installation et Configuration

### Prérequis
- PHP >= 8.1
- Composer
- Node.js & npm
- MySQL Server

### 1. Cloner le dépôt
```bash
git clone [https://github.com/ElkhatybDev/NextTrip.git](https://github.com/ElkhatybDev/NextTrip.git)
cd NextTrip

# Aller dans le dossier backend (ou à la racine selon la structure)
cd backend

# Installer les dépendances PHP
composer install

# Copier le fichier d'environnement et configurer la base de données MySQL
cp .env.example .env

# Générer la clé d'application
php artisan key:generate

# Configurer vos identifiants MySQL dans le fichier .env :
# DB_DATABASE=next_trip_db
# DB_USERNAME=root
# DB_PASSWORD=

# Exécuter les migrations et les seeders
php artisan migrate --seed

# Lancer le serveur Laravel
php artisan serve

# Dans le dossier frontend
cd frontend

# Installer les dépendances JavaScript
npm install

# Configurer l'URL de l'API Laravel dans le fichier .env (ex: REACT_APP_API_URL=[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api))

# Lancer l'application React
npm start


---

## 👤 Auteur
Amine EL KHATYB

- **LinkedIn** : [LinkedIn](https://www.linkedin.com/in/amine-el-khatyb)
