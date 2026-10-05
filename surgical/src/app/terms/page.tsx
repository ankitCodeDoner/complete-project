import React from "react";
import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms governing the use of the MedVance B2B medical supplies marketplace.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="1 September 2026"
      intro="These terms govern your access to and use of the MedVance marketplace. By creating an account or placing an order, you agree to these terms."
      sections={[
        {
          heading: "Eligibility",
          body: [
            "MedVance is a business-to-business marketplace intended for registered healthcare establishments, pharmacies and medical businesses. Accounts may be subject to verification.",
          ],
        },
        {
          heading: "Orders & pricing",
          body: [
            "All prices are shown in INR and, unless stated otherwise, are inclusive of applicable taxes. We reserve the right to correct pricing errors and to accept or decline any order.",
            "Bulk and institutional pricing may require business verification.",
          ],
        },
        {
          heading: "Products & compliance",
          body: [
            "Certain products may require valid professional or institutional credentials to purchase. You are responsible for ensuring lawful use of the products you order.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "MedVance is not liable for indirect or consequential losses arising from use of the marketplace, to the extent permitted by law.",
          ],
        },
      ]}
    />
  );
}
