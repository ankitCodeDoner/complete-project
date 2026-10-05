import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  addressById,
  formatInr,
  formatOrderDate,
  getAddresses,
  getOrder,
  getOrders,
  orderStatusClass,
  orderTotal,
} from "@/lib/account";
import { pageMetadata } from "@/lib/seo";

interface Params {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const orders = await getOrders();
  return orders.map((order) => ({ id: order.id }));
}

export async function generateMetadata({ params }: Params) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) {
    return pageMetadata({
      title: "Order not found",
      description: "This order is not on the MedVance account.",
      path: `/orders/${id}`,
      noIndex: true,
    });
  }
  return pageMetadata({
    title: `Order ${order.id}`,
    description: `Order ${order.id} placed on MedVance. Status: ${order.status}.`,
    path: `/orders/${order.id}`,
    noIndex: true,
  });
}

export default async function OrderDetailPage({ params }: Params) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  const addresses = await getAddresses();
  const address = addressById(addresses, order.addressId);

  return (
    <div>
      <Link
        href="/orders"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087F8C] hover:underline"
      >
        <ArrowLeft size={15} />
        All orders
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#071B35]">{order.id}</h1>
          <p className="mt-1 text-sm text-slate-500">
            Placed {formatOrderDate(order.placedOn)} · {order.payment}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${orderStatusClass[order.status]}`}
        >
          {order.status}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-3">
          {order.items.map((item) => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-[#a7dce9]"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#10243E]">
                  {item.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Qty {item.qty} · {item.packSize}
                </p>
              </div>
              <p className="text-sm font-bold text-[#10243E]">
                {formatInr(item.price * item.qty)}
              </p>
            </Link>
          ))}
          <div className="flex justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#071B35]">
            <span>Total</span>
            <span>{formatInr(orderTotal(order))}</span>
          </div>
        </div>

        <div className="space-y-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-bold text-[#071B35]">Delivery</h2>
            {address ? (
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {address.label}
                <br />
                {address.line}
                <br />
                {address.city}, {address.state} {address.pin}
              </p>
            ) : (
              <p className="mt-2 text-sm text-slate-500">Address unavailable.</p>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-bold text-[#071B35]">Status</h2>
            <ol className="mt-3 space-y-3">
              {order.timeline.map((event) => (
                <li key={event.label} className="text-sm">
                  <p className="font-semibold text-[#10243E]">{event.label}</p>
                  <p className="text-xs text-slate-500">{event.at}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
