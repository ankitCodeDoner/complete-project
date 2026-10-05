"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";

const formatPrice = (price: number): string =>
  `₹${price.toLocaleString("en-IN")}`;

/** Simple auto-applied bulk discount tiers on the cart subtotal. */
function bulkRate(subtotal: number): number {
  if (subtotal >= 50000) return 0.1;
  if (subtotal >= 25000) return 0.05;
  if (subtotal >= 10000) return 0.03;
  return 0;
}

export const CartView: React.FC = () => {
  const { items, subtotal, updateQty, removeItem, clear, count, ready } =
    useCart();
  const [placed, setPlaced] = useState(false);

  if (!ready) {
    // Avoid a hydration flash before localStorage is read.
    return <div className="min-h-[40vh]" />;
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <CheckCircle2 size={48} className="mx-auto text-[#14866d]" />
        <h1 className="mt-5 text-2xl font-bold text-[#071B35]">
          Order placed successfully
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Thank you for your order. A confirmation with your invoice and
          delivery estimate will be sent to your registered email. (This is a
          demo checkout — no payment was taken.)
        </p>
        <a
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#087F8C] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#066D78]"
        >
          Continue shopping
        </a>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <ShoppingCart size={30} />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-[#071B35]">
          Your cart is empty
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Browse the catalogue and add products to get started.
        </p>
        <a
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#087F8C] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#066D78]"
        >
          Shop products
        </a>
      </div>
    );
  }

  const rate = bulkRate(subtotal);
  const bulkDiscount = Math.round(subtotal * rate);
  const gst = Math.round((subtotal - bulkDiscount) * 0.12);
  const total = subtotal - bulkDiscount + gst;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#071B35] sm:text-3xl">
          Your Cart{" "}
          <span className="text-base font-medium text-slate-400">
            ({count} {count === 1 ? "item" : "items"})
          </span>
        </h1>
        <button
          type="button"
          onClick={clear}
          className="text-xs font-semibold text-slate-400 hover:text-red-500"
        >
          Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Line items */}
        <div className="lg:col-span-2">
          <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
            {items.map((item) => (
              <div key={item.slug} className="flex gap-4 p-4 sm:p-5">
                <a
                  href={`/products/${item.slug}`}
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-white sm:h-24 sm:w-24"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-contain p-2"
                  />
                </a>

                <div className="flex min-w-0 flex-1 flex-col">
                  <a
                    href={`/products/${item.slug}`}
                    className="line-clamp-2 text-sm font-semibold text-[#10243E] hover:text-[#087F8C]"
                  >
                    {item.name}
                  </a>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Pack: {item.packSize}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-lg border border-slate-300">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQty(item.slug, item.qty - 1)}
                        className="flex h-8 w-8 items-center justify-center text-slate-600 hover:text-[#087F8C]"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-[#10243E]">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQty(item.slug, item.qty + 1)}
                        className="flex h-8 w-8 items-center justify-center text-slate-600 hover:text-[#087F8C]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-[#10243E]">
                        {formatPrice(item.price * item.qty)}
                      </span>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeItem(item.slug)}
                        className="text-slate-400 transition hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-bold text-[#071B35]">
              Order Summary
            </h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-semibold text-[#10243E]">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span className="flex items-center gap-1.5">
                  Bulk discount
                  {rate > 0 && (
                    <span className="rounded bg-[#E9FAF6] px-1.5 py-0.5 text-[10px] font-bold text-[#14866d]">
                      {Math.round(rate * 100)}% off
                    </span>
                  )}
                </span>
                <span className="font-semibold text-[#14866d]">
                  {bulkDiscount > 0 ? `− ${formatPrice(bulkDiscount)}` : "—"}
                </span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span>GST (12%)</span>
                <span className="font-semibold text-[#10243E]">
                  {formatPrice(gst)}
                </span>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="flex justify-between">
                  <span className="text-base font-bold text-[#071B35]">
                    Total
                  </span>
                  <span className="text-base font-extrabold text-[#071B35]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>

            {rate === 0 && (
              <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-[#f5f8fc] px-3 py-2 text-[11px] text-slate-500">
                <Tag size={13} className="text-[#087F8C]" />
                Add {formatPrice(10000 - subtotal)} more to unlock a 3% bulk
                discount.
              </p>
            )}

            <button
              type="button"
              onClick={() => {
                setPlaced(true);
                clear();
              }}
              className="mt-5 w-full rounded-xl bg-[#087F8C] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#087F8C]/20 transition hover:bg-[#066D78]"
            >
              Proceed to Checkout
            </button>

            <div className="mt-4 space-y-2 text-[11px] text-slate-400">
              <p className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#087F8C]" />
                Secure B2B checkout · GST invoice provided
              </p>
              <p className="flex items-center gap-2">
                <Truck size={14} className="text-[#087F8C]" />
                Fast, tracked delivery across India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
