import React from "react";
import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Return Policy",
  description:
    "Returns, replacements and refunds for orders placed on the MedVance marketplace.",
  path: "/return-policy",
});

export default function ReturnPolicyPage() {
  return (
    <LegalPage
      title="Return Policy"
      updated="1 September 2026"
      intro="We want you to be confident in every purchase. This policy explains when and how returns are accepted."
      sections={[
        {
          heading: "Return window",
          body: [
            "Unused products in their original, sealed packaging may be returned within 7 days of delivery, subject to inspection.",
          ],
        },
        {
          heading: "Non-returnable items",
          body: [
            "For safety and regulatory reasons, certain sterile, implantable, cold-chain and made-to-order items are non-returnable unless received damaged or defective.",
          ],
        },
        {
          heading: "Damaged or incorrect items",
          body: [
            "If you receive a damaged, defective or incorrect item, contact support within 48 hours of delivery with photos, and we will arrange a replacement or refund.",
          ],
        },
        {
          heading: "Refunds",
          body: [
            "Approved refunds are processed to the original payment method or as account credit, typically within 7–10 business days.",
          ],
        },
      ]}
    />
  );
}
