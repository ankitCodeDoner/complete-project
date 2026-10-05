"use client";

import React, { useEffect, useRef, useState } from "react";
import { iconMap } from "@/lib/icons";
import type { Stat } from "@/lib/types";

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

interface StatsProps {
  stats: Stat[];
}

// ─────────────────────────────────────────────
// Single animated counter
// ─────────────────────────────────────────────

const CountUp = ({
  target,
  active,
  duration = 1600,
}: {
  target: number;
  active: boolean;
  duration?: number;
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame: number;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // easeOutCubic for a smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return <>{value.toLocaleString("en-IN")}</>;
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  // Start the counters when the band scrolls into view. A fallback
  // timer guarantees the numbers never stay stuck at 0 if the
  // IntersectionObserver never reports an intersection (e.g. the tab
  // is backgrounded / not painting).
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let done = false;
    const start = () => {
      if (done) return;
      done = true;
      setActive(true);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) start();
      },
      { threshold: 0.3 }
    );
    observer.observe(node);

    const fallback = window.setTimeout(start, 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f5f8fc] px-4 pb-4 sm:px-6 lg:px-8"
      aria-label="MedVance by the numbers"
    >
      <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#071B35] via-[#0b2647] to-[#0e3358] px-6 py-10 shadow-[0_10px_40px_rgba(7,27,53,0.18)] sm:px-10 sm:py-12">

        {/* Decorative glows */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#168C9C]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-[#35D5DF]/10 blur-3xl" />

        {/* Header */}
        <div className="relative mb-8 text-center sm:mb-10">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="h-[3px] w-7 rounded-full bg-[#35D5DF]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#63D2D8]">
              Trusted at Scale
            </span>
            <span className="h-[3px] w-7 rounded-full bg-[#35D5DF]" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            India&apos;s Growing Medical Supply Network
          </h2>
        </div>

        {/* Grid */}
        <div className="relative grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon];

            return (
              <div
                key={stat.id}
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#35D5DF]/40 hover:bg-white/[0.07] sm:px-5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#168C9C]/30 bg-[#168C9C]/15 text-[#63D2D8]">
                  <Icon size={24} strokeWidth={1.7} />
                </div>

                <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-[34px]">
                  <CountUp target={stat.value} active={active} />
                  <span className="text-[#35D5DF]">{stat.suffix}</span>
                </p>

                <p className="mt-2 text-[11px] font-medium leading-4 text-slate-300 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Stats;
