
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Brand } from "@/lib/types";

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

interface TopBrandsProps {
  brands: Brand[];
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const TopBrands = ({ brands }: TopBrandsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  // Duplicate brands for seamless infinite scrolling
  const infiniteBrands = [...brands, ...brands];

  // ─────────────────────────────────────────────
  // Auto Scroll
  // ─────────────────────────────────────────────

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (!scrollContainer) return;

    const scrollSpeed = 35;

    const autoScroll = (timestamp: number) => {
      if (!scrollContainer) return;

      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastTimeRef.current;

      lastTimeRef.current = timestamp;

      if (!isHoveredRef.current) {
        const scrollAmount =
          (scrollSpeed * deltaTime) / 1000;

        scrollContainer.scrollLeft += scrollAmount;

        const halfScrollWidth =
          scrollContainer.scrollWidth / 2;

        if (
          scrollContainer.scrollLeft >= halfScrollWidth
        ) {
          scrollContainer.scrollLeft -= halfScrollWidth;
        }
      }

      animationRef.current =
        requestAnimationFrame(autoScroll);
    };

    animationRef.current =
      requestAnimationFrame(autoScroll);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      lastTimeRef.current = null;
    };
  }, []);

  // ─────────────────────────────────────────────
  // Pause / Resume Auto Scroll
  // ─────────────────────────────────────────────

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    lastTimeRef.current = null;
  };

  // ─────────────────────────────────────────────
  // Manual Scroll
  // ─────────────────────────────────────────────

  const scrollLeft = () => {
    const container = scrollRef.current;

    if (!container) return;

    container.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const container = scrollRef.current;

    if (!container) return;

    container.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  // ─────────────────────────────────────────────
  // JSX
  // ─────────────────────────────────────────────

  return (
    <section className="w-full bg-[#f5f8fc] px-4 py-8 sm:px-6 lg:px-8">

      {/* Main Container */}

      <div className="mx-auto max-w-[1600px] overflow-hidden rounded-[28px] border border-[#edf1f7] bg-white px-5 py-7 shadow-[0_4px_25px_rgba(15,35,65,0.025)] sm:px-8 sm:py-9 lg:px-12">

        {/* Section Header */}

        <div className="mb-7 flex flex-col items-center justify-center text-center sm:mb-9">

          {/* Small Label */}

          <div className="mb-2 flex items-center justify-center gap-2">

            <span className="h-[3px] w-7 rounded-full bg-[#0e7490]" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0e7490]">
              Trusted Partners
            </span>

            <span className="h-[3px] w-7 rounded-full bg-[#0e7490]" />

          </div>

          {/* Heading */}

          <h2 className="text-2xl font-bold text-teal-700 tracking-[-0.8px] text-[#10243e] sm:text-[30px]">
            Top Brands
          </h2>

          {/* Description */}

          <p className="mt-1.5 text-sm text-[#718096]">
            Explore products from trusted healthcare brands
          </p>

        </div>

        {/* Brands Slider Wrapper */}

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >

          {/* Left Arrow */}

          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Scroll brands left"
            className="absolute left-0 top-1/2 z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#dbe5ef] bg-white text-[#183b5b] shadow-[0_4px_15px_rgba(15,35,65,0.12)] transition-all duration-300 hover:border-[#0e7490] hover:bg-[#0e7490] hover:text-white sm:h-10 sm:w-10"
          >
            <ChevronLeft
              size={20}
              strokeWidth={2}
            />
          </button>

          {/* Right Arrow */}

          <button
            type="button"
            onClick={scrollRight}
            aria-label="Scroll brands right"
            className="absolute right-0 top-1/2 z-20 flex h-9 w-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#dbe5ef] bg-white text-[#183b5b] shadow-[0_4px_15px_rgba(15,35,65,0.12)] transition-all duration-300 hover:border-[#0e7490] hover:bg-[#0e7490] hover:text-white sm:h-10 sm:w-10"
          >
            <ChevronRight
              size={20}
              strokeWidth={2}
            />
          </button>

          {/* Left Fade */}

          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-white to-transparent" />

          {/* Right Fade */}

          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-white to-transparent" />

          {/* Scroll Container */}

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4"
          >

            {infiniteBrands.map((brand, index) => (

              <a
                key={`${brand.id}-${index}`}
                href={brand.href}
                aria-label={`View ${brand.name} products`}
                className="group relative flex w-[142px] shrink-0 flex-col items-center rounded-2xl border border-[#e2eaf3] bg-white px-3 pb-4 pt-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#a7dce9] hover:shadow-[0_8px_24px_rgba(14,116,144,0.08)] sm:w-[154px] sm:pt-4"
              >

                {/* Hover Top Line */}

                <span className="absolute left-1/2 top-0 h-[2px] w-0 -translate-x-1/2 rounded-b-full bg-[#0e7490] transition-all duration-300 group-hover:w-12" />

                {/* Logo Container */}

                <div className="relative flex h-[83px] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-gradient-to-b from-[#f8fafc] to-white transition-colors duration-300 group-hover:border-[#dcecef] sm:h-[92px]">

                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={130}
                    height={70}
                    className="h-auto max-h-[60px] w-auto max-w-[112px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />

                </div>

                {/* Brand Name */}

                <div className="mt-3 flex w-full flex-col items-center overflow-hidden text-center">

                  <h3
                    className="w-full truncate text-[14px] font-semibold text-[#162b44] sm:text-[15px]"
                    title={brand.name}
                  >
                    {brand.name}
                  </h3>

                  {/* Product Count */}

                  <span className="mt-1.5 inline-flex rounded-full bg-[#F4FBFB] px-2 py-0.5 text-[10px] font-semibold text-[#087F8C]">
                    {brand.productCount}
                  </span>

                </div>

                {/* Bottom Indicator */}

                <div className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-[#0e7490] opacity-0 transition-opacity duration-300 group-hover:opacity-100">

                  <span>Explore</span>

                  <ChevronRight size={12} />

                </div>

              </a>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default TopBrands;