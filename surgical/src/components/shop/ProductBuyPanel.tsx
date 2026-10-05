"use client";

import React, { useState } from "react";
import { Check, Minus, Plus, ShoppingCart, FileText } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import type { Product } from "@/lib/types";

const formatPrice = (price: number): string =>
  `₹${price.toLocaleString("en-IN")}`;

export const ProductBuyPanel: React.FC<{ product: Product }> = ({
  product,
}) => {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [quoted, setQuoted] = useState(false);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div>
      {/* Price */}
      <div className="flex flex-wrap items-end gap-3">
        <span className="text-3xl font-extrabold tracking-tight text-[#071B35]">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice > product.price && (
          <span className="pb-1 text-base text-slate-400 line-through">
            {formatPrice(product.originalPrice)}
          </span>
        )}
        {product.discount > 0 && (
          <span className="mb-1 rounded-md bg-[#14866d] px-2 py-0.5 text-xs font-bold text-white">
            {product.discount}% OFF
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-slate-400">
        Inclusive of all taxes · GST invoice provided
      </p>

      {product.bulkTag && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#E9FAF6] px-3 py-2 text-xs font-semibold text-[#14866d]">
          <Check size={14} /> {product.bulkTag}
        </div>
      )}

      {/* Stock */}
      <p className="mt-4 flex items-center gap-2 text-sm font-semibold">
        <span
          className={`h-2 w-2 rounded-full ${
            product.inStock ? "bg-[#14866d]" : "bg-slate-400"
          }`}
        />
        <span className={product.inStock ? "text-[#14866d]" : "text-slate-500"}>
          {product.inStock ? "In stock" : "Out of stock"}
        </span>
        <span className="font-normal text-slate-400">· Pack: {product.packSize}</span>
      </p>

      {/* Quantity + actions */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center rounded-lg border border-slate-300">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center text-slate-600 hover:text-[#087F8C]"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center text-sm font-bold text-[#10243E]">
            {qty}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
            className="flex h-10 w-10 items-center justify-center text-slate-600 hover:text-[#087F8C]"
          >
            <Plus size={16} />
          </button>
        </div>
        <span className="text-xs text-slate-400">
          Subtotal:{" "}
          <span className="font-bold text-[#10243E]">
            {formatPrice(product.price * qty)}
          </span>
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none ${
            added
              ? "bg-[#14866d] shadow-[#14866d]/20"
              : "bg-[#087F8C] shadow-[#087F8C]/20 hover:bg-[#066D78]"
          }`}
        >
          {added ? (
            <>
              <Check size={18} /> Added to cart
            </>
          ) : (
            <>
              <ShoppingCart size={18} /> Add to Cart
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setQuoted(true)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#087F8C] px-6 py-3.5 text-sm font-semibold text-[#087F8C] transition hover:bg-[#F4FBFB]"
        >
          <FileText size={17} />
          {quoted ? "Quote requested" : "Request Quote"}
        </button>
      </div>

      {quoted && (
        <p className="mt-3 rounded-lg bg-[#F4FBFB] px-3 py-2 text-xs text-[#087F8C]">
          Thanks! Our procurement desk will get back to you with bulk pricing
          shortly.
        </p>
      )}
    </div>
  );
};

export default ProductBuyPanel;
