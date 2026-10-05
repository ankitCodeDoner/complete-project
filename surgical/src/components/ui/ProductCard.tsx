"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Plus, Star } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number): string =>
  `₹${price.toLocaleString("en-IN")}`;

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-[14px] border border-[#e0e4ea] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(15,35,65,0.08)]">
      {/* Image */}
      <a
        href={`/products/${product.slug}`}
        className="relative mx-2 mt-2 block rounded-[11px] bg-white"
      >
        {product.discount > 0 && (
          <span className="absolute left-2 top-2 z-10 rounded-md bg-[#14866d] px-1.5 py-0.5 text-[10px] font-bold text-white">
            {product.discount}% OFF
          </span>
        )}

        {!product.inStock && (
          <span className="absolute right-2 top-2 z-10 rounded-md bg-slate-700/90 px-1.5 py-0.5 text-[10px] font-bold text-white">
            Out of stock
          </span>
        )}

        <div className="relative h-[150px] w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="240px"
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </a>

      {/* Details */}
      <div className="flex flex-1 flex-col px-3 pb-3 pt-3">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#087F8C]">
          {product.brand}
        </p>

        <a href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[36px] text-[13px] font-medium leading-[1.4] text-[#30343b] transition-colors hover:text-[#087F8C]">
            {product.name}
          </h3>
        </a>

        <div className="mt-1.5 flex items-center gap-1.5">
          <Star size={12} fill="#fbbf24" className="shrink-0 text-[#fbbf24]" />
          <span className="text-xs font-medium text-[#333333]">
            {product.rating}
          </span>
          <span className="text-[11px] text-slate-400">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-[19px] font-bold tracking-tight text-[#303030]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="pb-0.5 text-[11px] text-slate-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {product.bulkTag && (
          <p className="mt-1 text-[10px] font-semibold text-[#14866d]">
            {product.bulkTag}
          </p>
        )}

        <button
          type="button"
          onClick={handleAdd}
          disabled={!product.inStock}
          aria-label={`Add ${product.name} to cart`}
          className={`mt-3 flex h-9 items-center justify-center gap-1.5 rounded-lg border text-xs font-semibold transition-colors active:scale-[0.98] disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400 ${
            added
              ? "border-[#14866d] bg-[#14866d] text-white"
              : "border-[#087F8C] bg-white text-[#087F8C] hover:bg-[#087F8C] hover:text-white"
          }`}
        >
          {added ? (
            <>
              <Check size={15} /> Added
            </>
          ) : product.inStock ? (
            <>
              <Plus size={15} /> Add to Cart
            </>
          ) : (
            <>Out of Stock</>
          )}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
