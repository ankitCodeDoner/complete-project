"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/lib/types";

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

interface TopSellingProductProps {
  products: Product[];
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const TopSellingProduct: React.FC<TopSellingProductProps> = ({
  products,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  // Track scroll position to enable/disable the arrows gracefully.
  const updateArrows = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateArrows();
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollProducts = (direction: "left" | "right"): void => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: direction === "right" ? 480 : -480,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-[#f5f8fc] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">

        {/* Section Header */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-6 items-center gap-1.5 rounded-full bg-[#FFF3E9] px-2.5 text-[10px] font-bold uppercase tracking-wide text-[#E47522]">
                <Flame size={12} />
                Trending
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#087F8C]">
                Explore Our Collection
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[#071B35] sm:text-3xl lg:text-4xl">
              Top Selling Products
            </h2>

            <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
              Popular products trusted by healthcare professionals across India.
            </p>
          </div>

          {/* Desktop arrows + View all */}
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <a
              href="/products"
              className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-[#071B35] transition-all duration-300 hover:border-[#a7dce9] hover:text-[#087F8C]"
            >
              View All
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>

            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                aria-label="Previous products"
                onClick={() => scrollProducts("left")}
                disabled={!canLeft}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#10233f] shadow-sm transition-all duration-300 enabled:hover:border-[#087F8C] enabled:hover:bg-[#087F8C] enabled:hover:text-white disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next products"
                onClick={() => scrollProducts("right")}
                disabled={!canRight}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#10233f] shadow-sm transition-all duration-300 enabled:hover:border-[#087F8C] enabled:hover:bg-[#087F8C] enabled:hover:text-white disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Slider */}
        <div className="relative">
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-10 bg-gradient-to-r from-[#f5f8fc] to-transparent lg:block" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-10 bg-gradient-to-l from-[#f5f8fc] to-transparent lg:block" />

          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[220px] min-w-[220px] snap-start sm:w-[240px] sm:min-w-[240px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View All */}
        <div className="mt-4 flex justify-center sm:hidden">
          <a
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#087F8C]/20 bg-white px-5 py-2.5 text-xs font-semibold text-[#087F8C]"
          >
            View All Products
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default TopSellingProduct;
