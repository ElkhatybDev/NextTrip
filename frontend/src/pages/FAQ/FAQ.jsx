import React from "react";
import InfoPageLayout from "../../components/InfoPageLayout/InfoPageLayout";

const sections = [
  {
    title: "Common questions",
    items: [
      {
        title: "Can I customize a package before booking?",
        text: "Yes. The site is built around package discovery plus direct agency communication so travelers can refine details before checkout.",
      },
      {
        title: "How do I contact an agency?",
        text: "You can use the agency and dashboard flows already available on the site, or contact support if you are not sure where your request should go.",
      },
      {
        title: "What if I need help after booking?",
        text: "Use your booking reference and contact support or the relevant agency as early as possible so your case can be routed correctly.",
      },
      {
        title: "Does pricing stay fixed?",
        text: "Pricing can depend on dates, traveler count, availability, and agency confirmation, so always review the latest package details before final payment.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <InfoPageLayout
      eyebrow="FAQ"
      title="Fast answers to the questions travelers ask most."
      description="This page is here for the practical things: customization, agency contact, booking help, and what can affect final package pricing."
      sections={sections}
      asideTitle="Best next pages"
      asideItems={[
        { label: "Need support", value: "Open the help center" },
        { label: "Need direct contact", value: "Use the contact page" },
        { label: "Need package options", value: "Browse packages" },
        { label: "Need policy details", value: "Read privacy and terms" },
      ]}
      ctaTitle="Still not answered?"
      ctaText="Move to a direct support channel and include the trip or booking context so the team can help faster."
      ctaPrimary={{ label: "Contact Us", to: "/contact" }}
      ctaSecondary={{ label: "Browse Packages", to: "/packages" }}
    />
  );
}
