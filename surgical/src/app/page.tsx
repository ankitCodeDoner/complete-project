
import { Home } from "@/components/home/Home";
import { pageMetadata, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${SITE_NAME} — B2B Medical Supplies Marketplace`,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
  keywords: [
    "MedVance",
    "B2B medical supplies",
    "surgical instruments wholesale",
    "hospital procurement India",
  ],
});

export default async function Page() {
 
  return <Home />;
}
