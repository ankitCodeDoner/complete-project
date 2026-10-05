
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Banner } from "@/lib/types";

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

interface PromoBannerProps {
  banners: Banner[];
}

// ─────────────────────────────────────────────
// Main PromoBanner Component
// ─────────────────────────────────────────────

export const PromoBanner = ({
  banners,
}: PromoBannerProps): React.ReactElement => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const totalBanners: number = banners.length;

  // ─────────────────────────────────────────
  // Next Slide
  // ─────────────────────────────────────────

  const nextSlide = (): void => {
    setActiveIndex(
      (prev: number) => (prev + 1) % totalBanners
    );
  };

  // ─────────────────────────────────────────
  // Previous Slide
  // ─────────────────────────────────────────

  const prevSlide = (): void => {
    setActiveIndex(
      (prev: number) =>
        (prev - 1 + totalBanners) % totalBanners
    );
  };

  // ─────────────────────────────────────────
  // Go To Specific Slide
  // ─────────────────────────────────────────

  const goToSlide = (index: number): void => {
    setActiveIndex(index);
  };

  // ─────────────────────────────────────────
  // Auto Slider - Every 3 Seconds
  // Always Running
  // ─────────────────────────────────────────

  useEffect(() => {
    const interval: ReturnType<typeof setInterval> =
      setInterval(() => {
        setActiveIndex(
          (prev: number) => (prev + 1) % totalBanners
        );
      }, 3000);

    return () => clearInterval(interval);
  }, [totalBanners]);

  // ─────────────────────────────────────────
  // JSX
  // ─────────────────────────────────────────

  return (
    <section
      className="w-full bg-[#f5f8fc] py-4 sm:py-5 lg:py-6"
      aria-label="Promotional banners"
    >
      <div className="relative mx-auto w-full max-w-[1920px] overflow-hidden rounded-none sm:rounded-2xl lg:rounded-[28px]">
        {/* ───────────────────────────────────
            Slider Track
        ─────────────────────────────────── */}

        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {banners.map((banner: Banner) => (
            <div
              key={banner.id}
              className="relative min-w-full aspect-[1920/500] overflow-hidden bg-slate-100"
            >
              <Image
                src={banner.image}
                alt={banner.alt}
                fill
                priority={banner.id === 1}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* ───────────────────────────────────
            Previous Button
        ─────────────────────────────────── */}

        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous banner"
          className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-slate-100 sm:left-5 sm:h-12 sm:w-12 lg:left-6 lg:h-14 lg:w-14"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* ───────────────────────────────────
            Next Button
        ─────────────────────────────────── */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next banner"
          className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-slate-100 sm:right-5 sm:h-12 sm:w-12 lg:right-6 lg:h-14 lg:w-14"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* ───────────────────────────────────
            Bottom Dots
        ─────────────────────────────────── */}

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 sm:bottom-5">
          <div className="flex items-center gap-1.5 rounded-full bg-black/20 px-3 py-2 backdrop-blur-sm">
            {banners.map((banner: Banner, index: number) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to banner ${index + 1}`}
                aria-current={
                  activeIndex === index ? "true" : undefined
                }
                className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                  activeIndex === index
                    ? "w-6 bg-white sm:w-8"
                    : "w-1.5 bg-white/60 hover:bg-white sm:w-2"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ───────────────────────────────────
            Banner Counter
        ─────────────────────────────────── */}

        <div className="absolute bottom-3 right-3 z-20 rounded-lg bg-black/75 px-2.5 py-1 text-[10px] font-semibold text-white sm:bottom-5 sm:right-5 sm:px-3 sm:py-1.5 sm:text-xs">
          {activeIndex + 1}/{totalBanners}
        </div>
      </div>

      {/* ─────────────────────────────────────
          Category Quick Navigation
      ───────────────────────────────────── */}

      <div className="mx-auto mt-3 flex max-w-[1920px] items-center justify-center gap-2 overflow-x-auto px-3 pb-1 sm:mt-4 sm:gap-3">
        {banners.map((banner: Banner, index: number) => (
          <button
            key={banner.id}
            type="button"
            onClick={() => goToSlide(index)}
            className={`shrink-0 rounded-full px-3 py-2 text-[10px] font-semibold transition-all duration-300 sm:px-4 sm:text-xs ${
              activeIndex === index
                ? "bg-[#071b35] text-white shadow-md"
                : "bg-white text-slate-500 hover:bg-slate-100"
            }`}
          >
            {banner.category}
          </button>
        ))}
      </div>
    </section>
  );
};

export default PromoBanner;