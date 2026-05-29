import React from "react";
import InfoPageLayout from "../../components/InfoPageLayout/InfoPageLayout";

const sections = [
  {
    title: "What information we use",
    items: [
      "Account details such as name, email, and sign-in data.",
      "Booking details like destination, dates, preferences, and package selections.",
      "Support and communication details when you contact the team or an agency.",
    ],
  },
  {
    title: "Why we use it",
    items: [
      {
        title: "To operate the platform",
        text: "Your information helps us show relevant packages, manage accounts, and keep booking steps organized.",
      },
      {
        title: "To support requests",
        text: "Support and agency teams use the details you share to answer questions and follow up on bookings.",
      },
      {
        title: "To improve experience",
        text: "Usage patterns help us improve navigation, package discovery, and support flows over time.",
      },
    ],
  },
  {
    title: "Your control",
    items: [
      "You can request account-related help through our contact page.",
      "You can ask for clarification on what information is needed for support or booking workflows.",
      "Sensitive updates should always be sent through official support channels.",
    ],
  },
];

export default function Privacy() {
  return (
    <InfoPageLayout
      eyebrow="Privacy"
      title="Privacy matters because travel planning includes personal details."
      description="This page explains, in plain language, the kinds of information used to run the platform, assist bookings, and improve traveler support."
      sections={sections}
      asideTitle="Privacy summary"
      asideItems={[
        { label: "Used for", value: "Accounts, bookings, support" },
        { label: "Main principle", value: "Use only what helps the trip flow" },
        { label: "User requests", value: "Handled through support" },
        { label: "Questions", value: "support@nexttrip.com" },
      ]}
      ctaTitle="Need the rules too?"
      ctaText="If you also want to understand platform responsibilities and booking expectations, read the terms page."
      ctaPrimary={{ label: "View Terms", to: "/terms" }}
      ctaSecondary={{ label: "Contact Team", to: "/contact" }}
    />
  );
}
