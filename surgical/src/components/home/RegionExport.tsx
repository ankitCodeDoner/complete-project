import React from "react";
import { ArrowRight, Globe, MapPin } from "lucide-react";
import type { Region } from "@/lib/types";

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

interface RegionExportProps {
  regions: Region[];
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const RegionExport: React.FC<RegionExportProps> = ({ regions }) => {
  return (
    <section className="w-full bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">

          {/* Left: intro */}
          <div className="lg:col-span-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-teal-700" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700 sm:text-xs">
                Reach &amp; Exports
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[#071B35] sm:text-3xl lg:text-4xl">
              Delivering across India &amp; beyond
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              Beyond nationwide coverage in India, MedVance supports export-ready
              medical procurement for institutions across the GCC, MEA and CIS
              regions — with compliant documentation and reliable freight.
            </p>

            <a
              href="/export"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#DDE9EC] bg-[#F4FBFB] px-5 py-3 text-sm font-semibold text-[#087F8C] transition duration-300 hover:border-[#087F8C] hover:bg-[#E9FAF6]"
            >
              <Globe size={17} />
              Explore Export Capabilities
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right: region cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {regions.map((region) => (
                <div
                  key={region.id}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a7dce9] hover:shadow-[0_10px_28px_rgba(14,116,144,0.08)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#071B35] text-[11px] font-extrabold tracking-wide text-[#63D2D8]">
                    {region.code}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-[#10243E]">
                      {region.name}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {region.description}
                    </p>

                    <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-[#087F8C]">
                      <MapPin size={13} />
                      {region.markets}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default RegionExport;
