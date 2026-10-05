
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BadgePercent,
  Tag,
} from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/lib/types";

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

interface OffersOnProductProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const OffersOnProduct: React.FC<OffersOnProductProps> = ({
  products,
  title = "Exclusive Offers",
  subtitle = "Save more on trusted medical and surgical products.",
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  // ─────────────────────────────────────────────
  // Track Slider Arrows
  // ─────────────────────────────────────────────

  const updateArrows = () => {
    const el = sliderRef.current;

    if (!el) return;

    setCanLeft(el.scrollLeft > 8);

    setCanRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - 8
    );
  };

  useEffect(() => {
    updateArrows();

    const el = sliderRef.current;

    if (!el) return;

    el.addEventListener("scroll", updateArrows, {
      passive: true,
    });

    window.addEventListener("resize", updateArrows);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [products]);

  // ─────────────────────────────────────────────
  // Scroll Products
  // ─────────────────────────────────────────────

  const scrollProducts = (direction: "left" | "right") => {
    const el = sliderRef.current;

    if (!el) return;

    el.scrollBy({
      left: direction === "right" ? 480 : -480,
      behavior: "smooth",
    });
  };

  // ─────────────────────────────────────────────
  // Empty State
  // ─────────────────────────────────────────────

  if (!products.length) {
    return null;
  }

  // ─────────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────────

  return (
    <section className="w-full bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">

        {/* Section Header */}
        <div className="mb-7 flex items-end justify-between gap-4">

          <div>
            {/* Badge */}
            <div className="mb-2 flex flex-wrap items-center gap-2">

              <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-[#EAF8F2] px-2.5 text-[10px] font-bold uppercase tracking-wide text-[#16845B]">
                <BadgePercent size={12} />
                Special Offers
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#087F8C]">
                Save More, Shop Smart
              </span>

            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold tracking-tight text-[#071B35] sm:text-3xl lg:text-4xl">
              {title}
            </h2>

            {/* Subtitle */}
            <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
              {subtitle}
            </p>
          </div>

          {/* Desktop Actions */}
          <div className="hidden shrink-0 items-center gap-3 sm:flex">

            {/* View All */}
            <a
              href="/products?offer=true"
              className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-[#071B35] transition-all duration-300 hover:border-[#a7dce9] hover:text-[#087F8C]"
            >
              View All

              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>

            {/* Navigation Arrows */}
            <div className="hidden items-center gap-2 lg:flex">

              <button
                type="button"
                aria-label="Previous offers"
                onClick={() => scrollProducts("left")}
                disabled={!canLeft}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#10233f] shadow-sm transition-all duration-300 enabled:hover:border-[#087F8C] enabled:hover:bg-[#087F8C] enabled:hover:text-white disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                aria-label="Next offers"
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

          {/* Left Edge Fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-10 bg-gradient-to-r from-white to-transparent lg:block" />

          {/* Right Edge Fade */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-10 bg-gradient-to-l from-white to-transparent lg:block" />

          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="relative w-[220px] min-w-[220px] snap-start sm:w-[240px] sm:min-w-[240px]"
              >
                {/* Offer Badge */}
                <div className="pointer-events-none absolute left-2 top-2 z-20 inline-flex items-center gap-1 rounded-full bg-[#EAF8F2] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[#16845B] shadow-sm">
                  <Tag size={10} />
                  Offer
                </div>

                {/* Product Card */}
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View All */}
        <div className="mt-4 flex justify-center sm:hidden">

          <a
            href="/products?offer=true"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#087F8C]/20 bg-white px-5 py-2.5 text-xs font-semibold text-[#087F8C]"
          >
            View All Offers
            <ArrowRight size={14} />
          </a>

        </div>

      </div>
    </section>
  );
};

export default OffersOnProduct;