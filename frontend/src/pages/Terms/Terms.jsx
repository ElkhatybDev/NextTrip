import React from "react";
import InfoPageLayout from "../../components/InfoPageLayout/InfoPageLayout";

const sections = [
  {
    title: "Using the platform",
    items: [
      "Provide accurate information when creating an account or sending a booking request.",
      "Use the platform for genuine travel planning, agency communication, and booking-related actions.",
      "Keep payment and personal details up to date when moving forward with a reservation.",
    ],
  },
  {
    title: "Booking expectations",
    items: [
      {
        title: "Package information",
        text: "Packages may vary by dates, availability, traveler count, and agency confirmation.",
      },
      {
        title: "Agency responsibility",
        text: "Agencies manage their offers, itinerary details, and final booking-specific confirmations.",
      },
      {
        title: "Traveler responsibility",
        text: "Travelers should review package details carefully before checkout and communicate changes early.",
      },
    ],
  },
  {
    title: "Communication and support",
    text: "Support helps route questions and explain flows, but time-sensitive travel changes should be shared with the correct agency or official channel as early as possible.",
  },
];

export default function Terms() {
  return (
    <InfoPageLayout
      eyebrow="Terms"
      title="Clear expectations make bookings smoother for travelers and agencies."
      description="These terms summarize how the platform should be used, what booking information depends on agencies, and what travelers should review before confirming a reservation."
      sections={sections}
      asideTitle="Terms summary"
      asideItems={[
        { label: "Applies to", value: "Accounts, requests, bookings" },
        { label: "Important rule", value: "Review package details before payment" },
        { label: "Agency role", value: "Manage offers and confirmations" },
        { label: "Support role", value: "Guide and route questions" },
      ]}
      ctaTitle="Need practical answers?"
      ctaText="For common booking questions in simple language, the FAQ page is the fastest next stop."
      ctaPrimary={{ label: "Open FAQ", to: "/faq" }}
      ctaSecondary={{ label: "Go to Support", to: "/support" }}
    />
  );
}
