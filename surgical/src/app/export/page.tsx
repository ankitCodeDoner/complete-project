import React from "react";
import { FileCheck, Globe2, Package, Plane, ShieldCheck } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { RegionExport } from "@/components/home/RegionExport";
import { getRegions } from "@/lib/data";

export const metadata = pageMetadata({
  title: "Export & Regions",
  description:
    "MedVance exports medical supplies to the GCC, MEA and CIS regions with compliant documentation, cold-chain handling and reliable freight.",
  path: "/export",
});

export default async function ExportPage() {
  const regions = await getRegions();

  const capabilities = [
    {
      icon: FileCheck,
      title: "Compliant documentation",
      text: "Export invoices, certificates of origin and regulatory paperwork handled end to end.",
    },
    {
      icon: Plane,
      title: "Freight & logistics",
      text: "Air and sea freight partnerships for time-critical and high-volume shipments.",
    },
    {
      icon: ShieldCheck,
      title: "Cold-chain ready",
      text: "Validated temperature-controlled handling for vaccines and biologics.",
    },
    {
      icon: Package,
      title: "Bulk fulfilment",
      text: "Institutional order volumes consolidated and shipped from a single source.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Global Reach"
        title="Export-ready medical procurement"
        subtitle="Beyond nationwide coverage in India, MedVance supplies healthcare institutions across the GCC, MEA and CIS regions — with the documentation, handling and logistics that cross-border medical trade demands."
        crumbs={[{ label: "Export & Regions" }]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#087F8C]">
          <span className="flex items-center gap-1.5 rounded-full bg-[#F4FBFB] px-3 py-1.5">
            <Globe2 size={14} /> 4 regions served
          </span>
          <span className="rounded-full bg-[#F4FBFB] px-3 py-1.5">
            ISO 13485:2016 certified
          </span>
          <span className="rounded-full bg-[#F4FBFB] px-3 py-1.5">
            Cold-chain capable
          </span>
        </div>
      </PageHero>

      {/* Regions (reused homepage section) */}
      <RegionExport regions={regions} />

      {/* Export capabilities */}
      <section className="border-t border-slate-100 bg-[#f5f8fc]">
        <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <h2 className="text-2xl font-bold tracking-tight text-[#071B35] sm:text-3xl">
            Export capabilities
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            We handle the complexity of cross-border medical supply so your
            institution can order with the same confidence as a domestic
            purchase.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E9FAF6] text-[#087F8C]">
                  <cap.icon size={22} strokeWidth={1.7} />
                </div>
                <h3 className="text-sm font-bold text-[#10243E]">
                  {cap.title}
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-slate-500">
                  {cap.text}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#071B35] px-6 py-7 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="text-lg font-bold text-white">
                Looking to import medical supplies from India?
              </h3>
              <p className="mt-1 text-sm text-slate-300">
                Talk to our export desk about your region, volumes and
                documentation needs.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#168C9C] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#117581]"
            >
              Contact Export Desk
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
