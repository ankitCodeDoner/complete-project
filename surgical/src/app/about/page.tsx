import React from "react";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";
import { Stats } from "@/components/home/Stats";
import { iconMap } from "@/lib/icons";
import { getCompany, getStats } from "@/lib/data";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "MedVance is India's B2B marketplace for medical supplies, connecting 90,000+ healthcare establishments with 4,500+ verified suppliers.",
  path: "/about",
});

export default async function AboutPage() {
  const [company, stats] = await Promise.all([getCompany(), getStats()]);

  return (
    <>
      <PageHero
        eyebrow="About MedVance"
        title="Rebuilding healthcare procurement for India"
        subtitle="We connect hospitals, clinics and labs with a verified network of manufacturers and suppliers — making quality medical supplies accessible, affordable and reliable."
        crumbs={[{ label: "About Us" }]}
      />

      {/* Mission */}
      <section className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#071B35] sm:text-3xl">
              Our story
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                MedVance was founded on a simple frustration: procuring quality
                medical supplies in India was fragmented, opaque and slow.
                Hospitals juggled dozens of vendors, clinics struggled to find
                genuine products at fair prices, and rural establishments were
                often left out entirely.
              </p>
              <p>
                We set out to fix that with a single, trusted B2B marketplace —
                one that brings manufacturers, suppliers and healthcare buyers
                together with transparent pricing, verified quality and reliable
                logistics. Today, MedVance serves tens of thousands of medical
                establishments across the country and beyond.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#071B35] sm:text-3xl">
              Our mission
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              To make quality medical supplies accessible to every healthcare
              provider — from large metro hospitals to the smallest rural clinic
              — through technology, trust and an uncompromising commitment to
              service.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {company.values.map((value) => {
                const Icon = iconMap[value.icon];
                return (
                  <div
                    key={value.title}
                    className="rounded-2xl border border-slate-200 bg-white p-5"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E9FAF6] text-[#087F8C]">
                      <Icon size={20} strokeWidth={1.7} />
                    </div>
                    <h3 className="text-sm font-bold text-[#10243E]">
                      {value.title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {value.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Scale numbers */}
      <Stats stats={stats} />

      {/* Milestones */}
      <section className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1 w-6 rounded-full bg-teal-700" />
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700 sm:text-xs">
            Our Journey
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[#071B35] sm:text-3xl">
          Milestones
        </h2>

        <div className="mt-8 space-y-0">
          {company.milestones.map((m, i) => (
            <div key={m.year} className="flex gap-5">
              {/* Timeline rail */}
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#087F8C] bg-white text-xs font-extrabold text-[#087F8C]">
                  {m.year}
                </div>
                {i < company.milestones.length - 1 && (
                  <div className="w-px flex-1 bg-slate-200" />
                )}
              </div>

              <div className="pb-8">
                <h3 className="text-base font-bold text-[#10243E]">
                  {m.title}
                </h3>
                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="border-t border-slate-100 bg-[#f5f8fc]">
        <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <h2 className="text-2xl font-bold tracking-tight text-[#071B35] sm:text-3xl">
            Leadership
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {company.leadership.map((leader) => (
              <div
                key={leader.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#071B35] text-lg font-bold text-[#63D2D8]">
                  {leader.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <h3 className="mt-4 text-base font-bold text-[#10243E]">
                  {leader.name}
                </h3>
                <p className="text-xs font-semibold text-[#087F8C]">
                  {leader.role}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
