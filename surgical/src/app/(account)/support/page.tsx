import { SupportPanel } from "@/components/account/SupportPanel";
import { getContact } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Help & Support",
  description:
    "Raise an order, quote or invoice request with the MedVance procurement desk.",
  path: "/support",
  noIndex: true,
});

export default async function SupportPage() {
  const { faqs } = await getContact();
  return <SupportPanel faqs={faqs} />;
}
