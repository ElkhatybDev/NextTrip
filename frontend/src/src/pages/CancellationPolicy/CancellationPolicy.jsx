import React from "react";
import InfoPageLayout from "../../components/InfoPageLayout/InfoPageLayout";

export default function CancellationPolicy() {
  return (
    <InfoPageLayout
      eyebrow="Cancellation policy"
      title="Clear cancellation rules before every booking."
      description="This page gives travelers and agencies a clear place for cancellation expectations before backend rules are connected."
      sections={[
        {
          title: "Traveler cancellations",
          items: [
            "Cancellation rules depend on the agency and package selected.",
            "Travelers should review deadlines before confirming payment.",
            "Support can help route cancellation questions to the agency.",
          ],
        },
        {
          title: "Agency cancellations",
          items: [
            "Agencies should explain changes early and clearly.",
            "Any schedule or hotel change should appear in booking updates.",
            "Future backend rules can store cancellation windows per package.",
          ],
        },
      ]}
      ctaTitle="Need help?"
      ctaText="Contact support if you need help understanding a cancellation case."
      ctaPrimary={{ label: "Support", to: "/support" }}
      ctaSecondary={{ label: "Packages", to: "/packages" }}
    />
  );
}
