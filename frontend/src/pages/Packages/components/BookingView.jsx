import React from "react";
import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";
import "./BookingView.css";

const formatPrice = (value) => `${Number(value || 0).toLocaleString()} MAD`;

function formatTravelDate(date) {
  if (!date) {
    return "Date flexible";
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("fr", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

export default function BookingView({
  selectedPackage,
  bookingForm,
  travelersCount,
  pricing,
  saveCard,
  onBookingChange,
  onSaveCardChange,
  onCheckout,
  onBackToPackages,
  backLabel = "Retour aux forfaits",
  checkoutError = "",
  isSubmitting = false,
}) {
  const serviceFees = pricing.taxes + pricing.insurance;
  const travelDate = formatTravelDate(selectedPackage.nextDeparture);
  const pricePerTraveler = selectedPackage.price;

  return (
    <main className="packages-main booking-main">
      <div className="checkout-layout">
        <div className="checkout-left-column">
          <section className="checkout-card checkout-trip-card" aria-label="Voyage sélectionné">
            <div className="checkout-card-heading">
              <div>
                <p className="section-badge">Voyage sélectionné</p>
                <h2>{selectedPackage.title}</h2>
              </div>
              <span className="checkout-status-pill">
                <CheckCircle2 size={16} />
                Prêt à réserver
              </span>
            </div>

            <div className="checkout-trip-overview">
              <div className="checkout-trip-media" aria-label={selectedPackage.title}>
                <img
                  src={selectedPackage.image}
                  alt=""
                  className="checkout-trip-image"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.classList.add("checkout-trip-image-hidden");
                  }}
                />
                <span>{selectedPackage.location.split(",")[0]}</span>
              </div>
              <div className="checkout-trip-copy">
                <span>{selectedPackage.category}</span>
                <h3>{selectedPackage.location}</h3>
                <p>{selectedPackage.description}</p>
              </div>
            </div>

            <div className="checkout-info-grid">
              <div className="checkout-info-tile">
                <MapPin size={18} />
                <span>Destination</span>
                <strong>{selectedPackage.location}</strong>
              </div>
              <div className="checkout-info-tile">
                <CalendarDays size={18} />
                <span>Date de voyage</span>
                <strong>{travelDate}</strong>
              </div>
              <div className="checkout-info-tile">
                <Users size={18} />
                <span>Voyageurs</span>
                <strong>{travelersCount} voyageur(s)</strong>
              </div>
              <div className="checkout-info-tile">
                <WalletCards size={18} />
                <span>Prix par voyageur</span>
                <strong>{formatPrice(pricePerTraveler)}</strong>
              </div>
            </div>
          </section>

          <section className="checkout-card" aria-label="Détails voyageur">
            <div className="checkout-card-heading">
              <div>
                <p className="section-badge">Détails voyageur</p>
                <h2>Informations de contact</h2>
              </div>
              <span className="checkout-icon-badge">
                <UserRound size={18} />
              </span>
            </div>

            <div className="booking-form-grid">
              <div className="booking-field">
                <label htmlFor="fullName">Nom complet</label>
                <div className="checkout-input-wrap">
                  <UserRound size={17} />
                  <input
                    id="fullName"
                    name="fullName"
                    value={bookingForm.fullName}
                    onChange={onBookingChange}
                    placeholder="Nom complet du voyageur"
                    autoComplete="name"
                  />
                </div>
              </div>
              <div className="booking-field">
                <label htmlFor="email">Email</label>
                <div className="checkout-input-wrap">
                  <Mail size={17} />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={onBookingChange}
                    placeholder="email@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="booking-field">
                <label htmlFor="phone">Numéro de téléphone</label>
                <div className="checkout-input-wrap">
                  <Phone size={17} />
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={onBookingChange}
                    placeholder="Numéro de téléphone"
                    autoComplete="tel"
                  />
                </div>
              </div>
              <div className="booking-field">
                <label htmlFor="travelers">Nombre de voyageurs</label>
                <div className="checkout-input-wrap">
                  <Users size={17} />
                  <input
                    id="travelers"
                    type="number"
                    min="1"
                    name="travelers"
                    value={bookingForm.travelers}
                    onChange={onBookingChange}
                    placeholder="2"
                  />
                </div>
              </div>
              <div className="booking-field booking-field-full">
                <label htmlFor="specialRequest">Demande spéciale</label>
                <textarea
                  id="specialRequest"
                  name="specialRequest"
                  value={bookingForm.specialRequest}
                  onChange={onBookingChange}
                  rows={4}
                  placeholder="Pickup, préférence de chambre, demande repas, ou autre détail utile..."
                />
              </div>
            </div>
          </section>

          <section className="checkout-card checkout-payment-card" aria-label="Détails de paiement">
            <div className="checkout-card-heading">
              <div>
                <p className="section-badge">Formulaire de paiement</p>
                <h2>Détails de la carte</h2>
              </div>
              <span className="checkout-icon-badge checkout-icon-badge-orange">
                <CreditCard size={18} />
              </span>
            </div>

            <div className="accepted-cards" aria-label="Cartes acceptées">
              <div className="accepted-cards-label">
                <WalletCards size={16} />
                <span>Cartes acceptées</span>
              </div>
              <div className="accepted-card-brands">
                <strong>VISA</strong>
                <strong>Mastercard</strong>
                <strong>Carte bancaire</strong>
              </div>
            </div>

            <div className="booking-form-grid">
              <div className="booking-field booking-field-full">
                <label htmlFor="cardName">Nom du titulaire</label>
                <div className="checkout-input-wrap">
                  <UserRound size={17} />
                  <input
                    id="cardName"
                    name="cardName"
                    value={bookingForm.cardName}
                    onChange={onBookingChange}
                    placeholder="Nom figurant sur la carte"
                    autoComplete="cc-name"
                  />
                </div>
              </div>
              <div className="booking-field booking-field-full">
                <label htmlFor="cardNumber">Numéro de carte</label>
                <div className="checkout-input-wrap checkout-card-number">
                  <CreditCard size={17} />
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    value={bookingForm.cardNumber}
                    onChange={onBookingChange}
                    placeholder="1234 5678 9012 34"
                    inputMode="numeric"
                    maxLength={17}
                    autoComplete="cc-number"
                  />
                  <span>123</span>
                </div>
              </div>
              <div className="booking-field">
                <label htmlFor="expiry">Date d'expiration</label>
                <div className="checkout-input-wrap">
                  <CalendarDays size={17} />
                  <input
                    id="expiry"
                    name="expiry"
                    value={bookingForm.expiry}
                    onChange={onBookingChange}
                    placeholder="MM/AA"
                    inputMode="numeric"
                    maxLength={5}
                    autoComplete="cc-exp"
                  />
                </div>
              </div>
              <div className="booking-field">
                <label htmlFor="cvv">Code CVV</label>
                <div className="checkout-input-wrap">
                  <Lock size={17} />
                  <input
                    id="cvv"
                    name="cvv"
                    value={bookingForm.cvv}
                    onChange={onBookingChange}
                    placeholder="123"
                    inputMode="numeric"
                    maxLength={3}
                    autoComplete="cc-csc"
                  />
                </div>
              </div>
            </div>

            <div className="save-card-box">
              <input
                id="saveCard"
                type="checkbox"
                checked={saveCard}
                onChange={onSaveCardChange}
              />
              <label htmlFor="saveCard">
                Enregistrer cette carte pour les prochaines réservations
              </label>
            </div>

            <p className="secure-payment-note">
              <ShieldCheck size={17} />
              Paiement sécurisé par NextTrip.
            </p>
          </section>
        </div>

        <aside className="checkout-summary-column" aria-label="Résumé de commande">
          <section className="checkout-card checkout-summary-card">
            <div className="checkout-summary-top">
              <p className="section-badge">Résumé de commande</p>
              <h2>{selectedPackage.title}</h2>
              <p>
                {selectedPackage.location} - {selectedPackage.duration}
              </p>
            </div>

            <div className="summary-trip-strip">
              <div>
                <Sparkles size={18} />
                <span>{selectedPackage.dealTag || "Forfait NextTrip"}</span>
              </div>
              <strong>{selectedPackage.rating} avis</strong>
            </div>

            <div className="price-info-box">
              Le total se met à jour automatiquement quand le nombre de voyageurs change.
            </div>

            <div className="price-lines">
              <div>
                <span>Prix par voyageur</span>
                <strong>{formatPrice(pricePerTraveler)}</strong>
              </div>
              <div>
                <span>Nombre de voyageurs</span>
                <strong>{travelersCount}</strong>
              </div>
              <div>
                <span>Prix de base</span>
                <strong>{formatPrice(pricing.tripPrice)}</strong>
              </div>
              <div>
                <span>Frais de service</span>
                <strong>{formatPrice(serviceFees)}</strong>
              </div>
            </div>

            <div className="price-total">
              <span>Prix total</span>
              <strong>{formatPrice(pricing.total)}</strong>
            </div>

            <div className="checkout-security-box">
              <ShieldCheck size={20} />
              <div>
                <strong>Paiement chiffré</strong>
                <span>Paiement sécurisé par NextTrip</span>
              </div>
            </div>

            <div className="booking-actions">
              {checkoutError ? <p className="secure-payment-note">{checkoutError}</p> : null}
              <button
                type="button"
                className="checkout-confirm-btn"
                onClick={onCheckout}
                disabled={isSubmitting}
              >
                <ShieldCheck size={18} />
                {isSubmitting ? "Confirmation..." : "Confirmer le paiement"}
              </button>
              <button type="button" className="secondary-btn" onClick={onBackToPackages}>
                {backLabel}
              </button>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
