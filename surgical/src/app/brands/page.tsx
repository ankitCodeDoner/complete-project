import React from "react";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { ChevronRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { getBrands } from "@/lib/data";

export const metadata = pageMetadata({
  title: "Brands",
  description:
    "Shop trusted medical brands on MedVance — IndoSurgicals, 3M Littmann, Contec, Volk, Healthium, Smith & Nephew and more.",
  path: "/brands",
});

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <>
      <PageHero
        eyebrow="Trusted Partners"
        title="Shop by Brand"
        subtitle="Explore products from the trusted manufacturers and suppliers we partner with across every medical speciality."
        crumbs={[{ label: "Brands" }]}
      />

      <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <a
              key={brand.id}
              href={brand.href}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#a7dce9] hover:shadow-[0_10px_24px_rgba(14,116,144,0.08)]"
            >
              <div className="flex h-20 items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={130}
                  height={64}
                  className="h-auto max-h-[60px] w-auto max-w-[120px] object-contain"
                />
              </div>

              <h3 className="mt-4 truncate text-sm font-bold text-[#162b44]" title={brand.name}>
                {brand.name}
              </h3>
              <p className="mt-0.5 text-[11px] text-slate-400">
                {brand.origin} · Est. {brand.established}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#087F8C]">
                {brand.productCount}
                <ChevronRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
