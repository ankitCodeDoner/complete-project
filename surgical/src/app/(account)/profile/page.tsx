import { ProfilePanel } from "@/components/account/ProfilePanel";
import { getProfile } from "@/lib/account";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "My Profile",
  description: "View and update the City Care Hospital buyer profile on MedVance.",
  path: "/profile",
  noIndex: true,
});

export default async function ProfilePage() {
  const profile = await getProfile();
  return <ProfilePanel profile={profile} />;
}
