import React from "react";
import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shipping Policy",
  description:
    "Delivery timelines, charges and coverage for orders placed on MedVance.",
  path: "/shipping-policy",
});

export default function ShippingPolicyPage() {
  return (
    <LegalPage
      title="Shipping Policy"
      updated="1 September 2026"
      intro="This policy explains how orders are dispatched and delivered across our coverage area."
      sections={[
        {
          heading: "Dispatch timelines",
          body: [
            "In-stock orders are typically dispatched within 24–48 hours. Made-to-order and specialist items may take longer, which is indicated at checkout.",
          ],
        },
        {
          heading: "Delivery coverage",
          body: [
            "We deliver across India, with express options in major metros. Export shipments to the GCC, MEA and CIS regions are handled by our export desk with appropriate documentation.",
          ],
        },
        {
          heading: "Charges & tracking",
          body: [
            "Delivery charges, where applicable, are calculated at checkout based on destination and order weight. Tracking details are shared once an order is dispatched.",
          ],
        },
        {
          heading: "Cold-chain items",
          body: [
            "Temperature-sensitive products such as vaccines and biologics are shipped using validated cold-chain packaging and monitoring.",
          ],
        },
      ]}
    />
  );
}
