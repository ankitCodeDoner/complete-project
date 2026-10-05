import { OrderList } from "@/components/account/OrderList";
import { getOrders } from "@/lib/account";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "My Orders",
  description: "Track institutional orders placed on the MedVance marketplace.",
  path: "/orders",
  noIndex: true,
});

export default async function OrdersPage() {
  const orders = await getOrders();
  return <OrderList orders={orders} />;
}
