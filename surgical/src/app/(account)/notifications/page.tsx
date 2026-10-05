import { NotificationCenter } from "@/components/account/NotificationCenter";
import { getNotifications } from "@/lib/account";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Notifications",
  description: "Order, shipment and account updates for your MedVance buyer account.",
  path: "/notifications",
  noIndex: true,
});

export default async function NotificationsPage() {
  const notifications = await getNotifications();
  return <NotificationCenter notifications={notifications} />;
}
