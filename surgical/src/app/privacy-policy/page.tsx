import React from "react";
import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How MedVance collects, uses and protects the personal and business information of buyers and suppliers.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 September 2026"
      intro="MedVance respects your privacy. This policy explains what information we collect when you use our B2B marketplace, how we use it, and the choices available to you."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "We collect information you provide when registering a business account, placing orders or contacting support — including name, organisation, GST details, email, phone and delivery addresses.",
            "We also collect usage data such as pages viewed and products browsed to improve the marketplace experience.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "Your information is used to process orders, verify business accounts, provide support, and share relevant product and pricing updates.",
            "We do not sell your personal information to third parties.",
          ],
        },
        {
          heading: "Data security",
          body: [
            "We use industry-standard measures to protect your data. Payment and sensitive details are handled over encrypted connections.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "You may access, update or request deletion of your account information at any time by contacting our support team.",
          ],
        },
      ]}
    />
  );
}
