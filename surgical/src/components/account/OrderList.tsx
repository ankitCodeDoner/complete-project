"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatInr, formatOrderDate, orderStatusClass, orderTotal } from "@/lib/account";
import type { AccountOrder, OrderStatus } from "@/lib/types";

const filters = ["All", "Processing", "Shipped", "Delivered"] as const;

export function OrderList({ orders }: { orders: AccountOrder[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#071B35]">My Orders</h1>
      <p className="mt-1 text-sm text-slate-500">
        Track institutional orders, invoices and delivery status.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {filters.map((item) => {
          const count =
            item === "All"
              ? orders.length
              : orders.filter((order) => order.status === (item as OrderStatus))
                  .length;
          const active = filter === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                active
                  ? "bg-[#071B35] text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-[#087F8C]"
              }`}
            >
              {item} ({count})
            </button>
          );
        })}
      </div>

      <div className="mt-5 space-y-3">
        {visible.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center text-sm text-slate-500">
            No orders in this status.
          </p>
        )}
        {visible.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-[#a7dce9] hover:shadow-sm sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[#071B35]">{order.id}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Placed {formatOrderDate(order.placedOn)} · {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#10243E]">
                  {formatInr(orderTotal(order))}
                </p>
                <span
                  className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${orderStatusClass[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
            <p className="mt-3 line-clamp-1 text-xs text-slate-500">
              {order.items.map((item) => item.name).join(", ")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
