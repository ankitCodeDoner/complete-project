import React from "react";
import { ArrowRight } from "lucide-react";
import { iconMap } from "@/lib/icons";
import type { Feature } from "@/lib/types";

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

interface WhyChooseUsProps {
  features: Feature[];
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ features }) => {
  return (
    <section className="w-full bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="mb-9 max-w-2xl sm:mb-11">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1 w-6 rounded-full bg-teal-700" />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700 sm:text-xs">
              Why Choose MedVance
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-[#071B35] sm:text-3xl lg:text-4xl">
            Procurement built for healthcare, end to end
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            From wholesale pricing to certified products and dedicated support,
            everything on MedVance is designed to make institutional buying
            faster, cheaper and more reliable.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];

            return (
              <div
                key={feature.id}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a7dce9] hover:shadow-[0_10px_28px_rgba(14,116,144,0.08)]"
              >
                {/* Top accent line on hover */}
                <span className="absolute left-6 top-0 h-[3px] w-0 rounded-b-full bg-[#0e7490] transition-all duration-300 group-hover:w-12" />

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9FAF6] text-[#087F8C] transition-transform duration-300 group-hover:scale-105">
                  <Icon size={24} strokeWidth={1.7} />
                </div>

                <h3 className="text-base font-bold text-[#10243E] sm:text-lg">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA strip */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#DDE9EC] bg-[#F4FBFB] px-6 py-6 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-[#071B35]">
              Ready to streamline your medical procurement?
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Create a verified business account to unlock bulk pricing and
              credit terms.
            </p>
          </div>

          <a
            href="/login"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#087F8C] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#087F8C]/10 transition duration-300 hover:bg-[#066D78]"
          >
            Get Started
            <ArrowRight size={17} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
