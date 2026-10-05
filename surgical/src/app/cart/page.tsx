import React from "react";
import { CartView } from "@/components/cart/CartView";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cart & Checkout",
  description:
    "Review your cart, apply bulk discounts and check out securely on MedVance.",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return <CartView />;
}
