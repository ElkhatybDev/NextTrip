import React from "react";
import InfoPageLayout from "../../components/InfoPageLayout/InfoPageLayout";

const sections = [
  {
    title: "Simple trip flow",
    items: [
      {
        title: "1. Discover",
        text: "Start by exploring packages, destinations, or travel styles that match your budget and mood.",
      },
      {
        title: "2. Compare",
        text: "Look at details, clarify what matters, and use agency communication when you need more precision.",
      },
      {
        title: "3. Customize",
        text: "Adjust dates, traveler count, style, or preferences before moving toward checkout.",
      },
      {
        title: "4. Confirm",
        text: "Complete the booking flow, review totals, and keep your receipt and support routes close.",
      },
    ],
  },
  {
    title: "Why this works better",
    items: [
      "Travelers keep context instead of jumping across disconnected pages.",
      "Agencies receive cleaner requests and can respond faster.",
      "Support pages and policies reduce uncertainty before payment.",
    ],
  },
];

export default function HowItWorks() {
  return (
    <InfoPageLayout
      eyebrow="How It Works"
      title="From first idea to final booking, the trip flow is built to stay clear."
      description="This page explains the practical rhythm of NextTrip: discover, compare, customize, and confirm without losing your place."
      sections={sections}
      asideTitle="Flow summary"
      asideItems={[
        { label: "Start", value: "Packages or destinations" },
        { label: "Middle", value: "Agency clarification" },
        { label: "Finish", value: "Booking and receipt" },
        { label: "Backup", value: "Support and FAQ" },
      ]}
      ctaTitle="Try the real journey"
      ctaText="If you want to feel the product instead of just reading about it, start from the packages page."
      ctaPrimary={{ label: "Open Packages", to: "/packages" }}
      ctaSecondary={{ label: "Open Support", to: "/support" }}
    />
  );
}
