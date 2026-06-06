import React from "react";
import InfoPageLayout from "../../components/InfoPageLayout/InfoPageLayout";

export default function RefundPolicy() {
  return (
    <InfoPageLayout
      eyebrow="Refund policy"
      title="Refund handling should remain transparent and easy to track."
      description="This policy page keeps refund expectations organized until payment and agency rules are connected to the backend."
      sections={[
        {
          title: "Refund basics",
          items: [
            "Refund eligibility depends on package rules, agency terms, and timing.",
            "Travelers should keep receipts and booking references available.",
            "Refund status should be tracked from the booking workspace later.",
          ],
        },
        {
          title: "Backend-ready fields",
          items: [
            "Booking ID, payment reference, agency ID, request date, status, and decision note.",
            "These fields can power refund tracking in the user profile.",
            "Support can use the same data to communicate with travelers.",
          ],
        },
      ]}
      ctaTitle="Questions about payment?"
      ctaText="Contact support if you need help with payment or refund tracking."
      ctaPrimary={{ label: "Support", to: "/support" }}
      ctaSecondary={{ label: "Contact", to: "/contact" }}
    />
  );
}
