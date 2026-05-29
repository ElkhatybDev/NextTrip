import React from "react";
import { useParams } from "react-router-dom";
import InfoPageLayout from "../../components/InfoPageLayout/InfoPageLayout";
import { getServiceBySlug } from "../../data/servicesCatalog";

export default function ServiceDetails() {
  const { serviceSlug } = useParams();
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return (
      <InfoPageLayout
        eyebrow="Service not found"
        title="This service page is not available."
        description="The service may have been moved or the link is incorrect."
        ctaTitle="Back to services"
        ctaText="Open the services overview to choose another page."
        ctaPrimary={{ label: "Services", to: "/services" }}
      />
    );
  }

  return (
    <InfoPageLayout
      eyebrow={service.eyebrow}
      title={service.title}
      description={service.summary}
      asideTitle="Best for"
      asideItems={[
        { label: "Audience", value: service.bestFor },
        { label: "Backend ready", value: "Yes" },
      ]}
      sections={[
        {
          title: "What this service includes",
          items: service.includes,
        },
        {
          title: "How it works",
          items: [
            "User enters structured information.",
            "Platform keeps the request readable for agencies.",
            "Backend can later store, match, and notify based on the same fields.",
          ],
        },
      ]}
      ctaTitle="Ready to continue?"
      ctaText="Start with a custom trip request or contact support if you need help."
      ctaPrimary={{ label: "Create trip", to: "/create-trip" }}
      ctaSecondary={{ label: "Contact", to: "/contact" }}
    />
  );
}
