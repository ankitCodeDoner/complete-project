import React from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { NewsItem } from "@/lib/types";

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

interface WhatsTrendingProps {
  news: NewsItem[];
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const formatDate = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const WhatsTrending: React.FC<WhatsTrendingProps> = ({ news }) => {
  return (
    <section className="w-full bg-[#f5f8fc] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-teal-700" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700 sm:text-xs">
                What&apos;s Trending
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[#071B35] sm:text-3xl lg:text-4xl">
              News &amp; Updates
            </h2>

            <p className="mt-2 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
              Company announcements, new partnerships and procurement insights
              from the MedVance team.
            </p>
          </div>

          <a
            href="/blog"
            className="group hidden shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-[#071B35] transition-all duration-300 hover:border-[#a7dce9] hover:text-[#087F8C] sm:inline-flex"
          >
            View All
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#e5ebf2] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(15,35,65,0.08)]"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#087F8C] shadow-sm">
                  {item.tag}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                  <CalendarDays size={13} />
                  {formatDate(item.date)}
                </div>

                <h3 className="line-clamp-2 text-base font-bold leading-snug text-[#10243E] transition-colors duration-300 group-hover:text-[#087F8C]">
                  {item.title}
                </h3>

                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-500">
                  {item.excerpt}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#087F8C]">
                  Read more
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatsTrending;
