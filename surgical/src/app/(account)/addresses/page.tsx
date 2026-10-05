import { AddressBook } from "@/components/account/AddressBook";
import { getAddresses } from "@/lib/account";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Saved Addresses",
  description: "Manage delivery addresses for your MedVance institutional account.",
  path: "/addresses",
  noIndex: true,
});

export default async function AddressesPage() {
  const addresses = await getAddresses();
  return <AddressBook addresses={addresses} />;
}
