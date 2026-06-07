import React, { useState } from "react";
import { ArrowLeft, CalendarCheck, Download, FileText, Mail } from "lucide-react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import "./BookingSuccessView.css";

const pdfPage = { width: 595, height: 842 };

function cleanPdfText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapePdfText(value) {
  return cleanPdfText(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function createReceiptPdf(receiptText) {
  const content = [
    "q",
    "0.118 0.227 0.541 rg",
    `0 ${pdfPage.height - 60} ${pdfPage.width} 60 re f`,
    "Q",
    "BT",
    "/F1 28 Tf",
    "1 1 1 rg",
    `44 ${pdfPage.height - 40} Td`,
    "(NextTrip) Tj",
    "ET",
    "BT",
    "/F2 11 Tf",
    "0.8 0.85 0.95 rg",
    `44 ${pdfPage.height - 57} Td`,
    "(Confirmation de reservation securisee) Tj",
    "ET",
  ];

  let y = pdfPage.height - 100;

  content.push(
    "q",
    "0.118 0.227 0.541 rg",
    `44 ${y} 507 1.5 re f`,
    "Q"
  );
  y -= 20;

  content.push(
    "BT",
    "/F1 16 Tf",
    "0.118 0.227 0.541 rg",
    `44 ${y} Td`,
    "(RECAPUTATIF DE VOTRE RESERVATION) Tj",
    "ET"
  );
  y -= 28;

  const sections = [
    {
      title: "Informations de reservation",
      lines: [
        "Reference: NT-2026-08421",
        "Emis le: 11 Apr 2026",
      ],
    },
    {
      title: "Informations voyageur",
      lines: [
        "Nom: Voyageur",
        "Email: Non fourni",
        "Telephone: Non fourni",
      ],
    },
    {
      title: "Details du forfait",
      lines: [
        "Forfait: Marrakech Flash Escape",
        "Destination: Marrakech, Morocco",
        "Duree: 4 Days / 3 Nights",
        "Categorie: Culture",
        "Voyageurs: 2 | Avis: 4.7",
      ],
    },
    {
      title: "Detail du paiement",
      lines: [
        "Prix du forfait: 10,400 MAD",
        "Taxes et frais: 700 MAD",
        "Assurance voyage: 350 MAD",
      ],
    },
  ];

  sections.forEach((section) => {
    content.push(
      "BT",
      "/F1 12 Tf",
      "0.118 0.227 0.541 rg",
      `44 ${y} Td`,
      `(${escapePdfText(section.title)}) Tj`,
      "ET"
    );
    y -= 18;

    section.lines.forEach((line) => {
      const parts = line.split(": ");
      if (parts.length === 2) {
        content.push(
          "BT",
          "/F2 10 Tf",
          "0.3 0.3 0.3 rg",
          `44 ${y} Td`,
          `(${escapePdfText(parts[0])}: ) Tj`,
          "ET",
          "BT",
          "/F1 10 Tf",
          "0 0 0 rg",
          `${44 + parts[0].length * 5.5} ${y} Td`,
          `(${escapePdfText(parts[1])}) Tj`,
          "ET"
        );
      } else {
        content.push(
          "BT",
          "/F2 10 Tf",
          "0.3 0.3 0.3 rg",
          `44 ${y} Td`,
          `(${escapePdfText(line)}) Tj`,
          "ET"
        );
      }
      y -= 14;
    });

    y -= 8;
  });

  content.push(
    "q",
    "0.118 0.227 0.541 rg",
    `44 ${y} 507 1.5 re f`,
    "Q"
  );
  y -= 20;

  content.push(
    "BT",
    "/F1 14 Tf",
    "0.118 0.227 0.541 rg",
    `44 ${y} Td`,
    "(TOTAL A PAYER) Tj",
    "ET",
    "BT",
    "/F1 18 Tf",
    "0.118 0.227 0.541 rg",
    `${pdfPage.width - 144} ${y - 24} Td`,
    "(11,450 MAD) Tj",
    "ET"
  );
  y -= 50;

  content.push(
    "BT",
    "/F2 9 Tf",
    "0.64 0.64 0.64 rg",
    `44 ${Math.max(y, 50)} Td`,
    "(Paiement securise - Document genere automatiquement par NextTrip) Tj",
    "ET"
  );

  const stream = content.join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pdfPage.width} ${pdfPage.height}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];
  const offsets = [0];
  let pdf = "%PDF-1.4\n";

  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function buildReceiptText({
  receiptId,
  issuedAt,
  selectedPackage,
  bookingForm,
  travelersCount,
  pricing,
  saveCard,
}) {
  return [
    "REÇU DE RÉSERVATION NEXTTRIP",
    `Référence: ${receiptId}`,
    `Émis le: ${issuedAt}`,
    "",
    `Voyageur: ${bookingForm.fullName || "Voyageur"}`,
    `Email: ${bookingForm.email || "Non fourni"}`,
    `Téléphone: ${bookingForm.phone || "Non fourni"}`,
    `Carte enregistrée: ${saveCard ? "Oui" : "Non"}`,
    "",
    `Forfait: ${selectedPackage.title}`,
    `Destination: ${selectedPackage.location}`,
    `Durée: ${selectedPackage.duration}`,
    `Catégorie: ${selectedPackage.category}`,
    `Voyageurs: ${travelersCount}`,
    `Avis: ${selectedPackage.rating}`,
    "",
    `Prix du forfait: ${pricing.tripPrice.toLocaleString()} MAD`,
    `Taxes et frais: ${pricing.taxes.toLocaleString()} MAD`,
    `Assurance voyage: ${pricing.insurance.toLocaleString()} MAD`,
    `Total payé: ${pricing.total.toLocaleString()} MAD`,
  ].join("\n");
}

export default function BookingSuccessView({
  selectedPackage,
  bookingForm,
  travelersCount,
  pricing,
  saveCard,
  onBackToPackages,
  onBackToBooking,
}) {
  const [showReceiptPanel, setShowReceiptPanel] = useState(false);
  const [showEmailPanel, setShowEmailPanel] = useState(false);
  const receiptId = "NT-2026-08421";
  const issuedAt = "11 Apr 2026";
  const receiptText = buildReceiptText({
    receiptId,
    issuedAt,
    selectedPackage,
    bookingForm,
    travelersCount,
    pricing,
    saveCard,
  });
  const receiptFileName = `nexttrip-recu-${receiptId}.pdf`;
  const emailSubject = `Reçu NextTrip ${receiptId}`;
  const emailBody = [
    `Bonjour ${bookingForm.fullName || "voyageur"},`,
    "",
    "Votre réservation NextTrip est confirmée.",
    "Voici le récapitulatif de votre reçu:",
    "",
    receiptText,
    "",
    "Vous pouvez aussi télécharger le PDF depuis la page de confirmation NextTrip.",
  ].join("\n");

  const downloadReceiptPdf = () => {
    if (typeof document === "undefined") {
      return;
    }

    downloadBlob(createReceiptPdf(receiptText), receiptFileName);
    setShowReceiptPanel(true);
  };

  const openEmailDraft = () => {
    if (typeof window === "undefined") {
      return;
    }

    const to = bookingForm.email || "";
    const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    setShowEmailPanel(true);
    window.location.href = mailtoUrl;
  };

  return (
    <div className="packages-page">
      <Navbar />
      <section className="packages-hero">
        <div className="packages-hero-overlay" />
        <div className="trip-container packages-hero-content">
          <p className="packages-badge">RÉSERVATION CONFIRMÉE</p>
          <h1>Réservation réussie</h1>
          <p>Votre forfait est confirmé. Voici le reçu détaillé de votre paiement.</p>
        </div>
      </section>
      <main className="packages-main success-main">
        <section className="success-card">
          <div className="success-top-box">
            <div>
              <p className="section-badge">Reçu de paiement</p>
              <h2>Merci, {bookingForm.fullName || "voyageur"}</h2>
              <p className="success-subtext">
                Votre réservation pour {selectedPackage.title} est maintenant confirmée.
              </p>
            </div>
            <div className="receipt-meta-box">
              <p>
                <span>Référence:</span> {receiptId}
              </p>
              <p>
                <span>Émis le:</span> {issuedAt}
              </p>
            </div>
          </div>
          <div className="success-grid">
            <div className="success-left">
              <div className="success-info-card">
                <h3>Détails du forfait</h3>
                <div className="success-info-grid">
                  <p>
                    <span>Forfait:</span> {selectedPackage.title}
                  </p>
                  <p>
                    <span>Destination:</span> {selectedPackage.location}
                  </p>
                  <p>
                    <span>Durée:</span> {selectedPackage.duration}
                  </p>
                  <p>
                    <span>Catégorie:</span> {selectedPackage.category}
                  </p>
                  <p>
                    <span>Voyageurs:</span> {travelersCount}
                  </p>
                  <p>
                    <span>Avis:</span> {"\u2605"} {selectedPackage.rating}
                  </p>
                </div>
              </div>
              <div className="success-info-card">
                <h3>Informations voyageur</h3>
                <div className="success-info-grid">
                  <p>
                    <span>Nom complet:</span> {bookingForm.fullName || "Non fourni"}
                  </p>
                  <p>
                    <span>Email:</span> {bookingForm.email || "Non fourni"}
                  </p>
                  <p>
                    <span>Téléphone:</span> {bookingForm.phone || "Non fourni"}
                  </p>
                  <p>
                    <span>Carte enregistrée:</span> {saveCard ? "Oui" : "Non"}
                  </p>
                </div>
              </div>
              <div className="success-info-card">
                <h3>Détail du paiement</h3>
                <div className="payment-lines">
                  <div>
                    <span>Prix du forfait</span>
                    <strong>{pricing.tripPrice.toLocaleString()} MAD</strong>
                  </div>
                  <div>
                    <span>Taxes et frais</span>
                    <strong>{pricing.taxes.toLocaleString()} MAD</strong>
                  </div>
                  <div>
                    <span>Assurance voyage</span>
                    <strong>{pricing.insurance.toLocaleString()} MAD</strong>
                  </div>
                  <div className="payment-total">
                    <span>Total payé</span>
                    <strong>{pricing.total.toLocaleString()} MAD</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="success-right">
              <div className="success-image-card">
                <img src={selectedPackage.image} alt={selectedPackage.title} decoding="async" />
                <div className="success-image-content">
                  <h3>{selectedPackage.title}</h3>
                  <p>Votre réservation est sécurisée et le reçu est prêt.</p>
                </div>
              </div>
              <div className="success-actions-card">
                <h3>Actions du reçu</h3>
                <p className="success-actions-copy">
                  Téléchargez votre reçu de réservation en PDF pour conserver une copie de votre paiement.
                </p>
                <div className="success-actions">
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={downloadReceiptPdf}
                  >
                    <Download size={16} />
                    Télécharger le reçu
                  </button>
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={openEmailDraft}
                  >
                    <Mail size={16} />
                    Envoyer par email
                  </button>
                  {onBackToBooking ? (
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={onBackToBooking}
                    >
                      <ArrowLeft size={16} />
                      Modifier la réservation
                    </button>
                  ) : null}
                  {onBackToPackages ? (
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={onBackToPackages}
                    >
                      <CalendarCheck size={16} />
                      Mes réservations
                    </button>
                  ) : null}
                </div>
                {showReceiptPanel ? (
                  <div className="receipt-panel">
                    <div className="panel-head">
                      <h4>
                        <FileText size={16} />
                        Reçu PDF prêt
                      </h4>
                      <button type="button" onClick={() => setShowReceiptPanel(false)}>
                        Fermer
                      </button>
                    </div>
                    <p className="panel-text">
                      Le fichier <strong>{receiptFileName}</strong> a été préparé. Si votre
                      navigateur bloque le téléchargement, utilisez encore le bouton ci-dessous.
                    </p>
                    <button type="button" className="receipt-inline-action" onClick={downloadReceiptPdf}>
                      <Download size={15} />
                      Télécharger le PDF
                    </button>
                    <pre className="receipt-preview">{receiptText}</pre>
                  </div>
                ) : null}
                {showEmailPanel ? (
                  <div className="receipt-panel">
                    <div className="panel-head">
                      <h4>
                        <Mail size={16} />
                        Message email prêt
                      </h4>
                      <button type="button" onClick={() => setShowEmailPanel(false)}>
                        Fermer
                      </button>
                    </div>
                    <div className="email-meta">
                      <p>
                        <span>À:</span> {bookingForm.email || "votre-email@example.com"}
                      </p>
                      <p>
                        <span>Objet:</span> Reçu NextTrip {receiptId}
                      </p>
                    </div>
                    <p className="panel-text">
                      Un brouillon email s'ouvre avec le message ci-dessous. L'envoi automatique
                      et la pièce jointe PDF seront connectés côté backend.
                    </p>
                    <textarea readOnly value={emailBody} rows={12} />
                    <button type="button" className="receipt-inline-action" onClick={downloadReceiptPdf}>
                      <Download size={15} />
                      Télécharger aussi le PDF
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
