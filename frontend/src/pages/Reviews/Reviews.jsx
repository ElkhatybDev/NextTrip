import React from "react";
import InfoPageLayout from "../../components/InfoPageLayout/InfoPageLayout";

const sections = [
  {
    title: "What travelers value most",
    items: [
      {
        title: "Fast planning",
        text: "Travelers consistently prefer flows where they can compare packages and ask agencies direct questions without friction.",
      },
      {
        title: "Clear communication",
        text: "The more visible the next steps are, the more confident travelers feel before booking.",
      },
      {
        title: "Flexible trips",
        text: "Good reviews usually mention customization, quick replies, and package details that feel easy to understand.",
      },
    ],
  },
  {
    title: "How reviews help the platform",
    items: [
      "They highlight where travelers feel confident or blocked.",
      "They help agencies understand which experiences create repeat demand.",
      "They make destination discovery feel more human and trustworthy.",
    ],
  },
];

export default function Reviews() {
  return (
    <InfoPageLayout
      eyebrow="Reviews"
      title="Reviews matter because travelers trust real experience more than polished promises."
      description="This page focuses on the role reviews play in choosing destinations, judging agency responsiveness, and giving future travelers more confidence."
      sections={sections}
      asideTitle="Reviews snapshot"
      asideItems={[
        { label: "Main value", value: "Trust and clarity" },
        { label: "Best paired with", value: "Packages and support" },
        { label: "Traveler outcome", value: "Better decisions" },
        { label: "Agency outcome", value: "Better service signals" },
      ]}
      ctaTitle="Ready to explore with context?"
      ctaText="Use reviews as guidance, then move to live packages and real agency contact."
      ctaPrimary={{ label: "See Packages", to: "/packages" }}
      ctaSecondary={{ label: "Open Experience", to: "/experience" }}
    />
  );
}
