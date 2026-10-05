import React from "react";
import { ChevronRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { iconMap } from "@/lib/icons";
import { getCategories } from "@/lib/data";

export const metadata = pageMetadata({
  title: "All Categories",
  description:
    "Browse all medical supply categories on MedVance — surgical instruments, dental, orthopedics, diagnostics, consumables and more at wholesale prices.",
  path: "/categories",
});

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <PageHero
        eyebrow="Shop by Category"
        title="All Medical Categories"
        subtitle="Explore our full range of medical equipment, devices and consumables — organised by speciality for faster procurement."
        crumbs={[{ label: "Categories" }]}
      />

      <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon];
            return (
              <a
                key={category.id}
                href={category.href}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.07)]"
              >
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${category.bgColor} ${category.iconColor}`}
                >
                  <Icon size={26} strokeWidth={1.6} />
                </div>

                <h3 className="text-base font-bold text-[#071B35] transition-colors group-hover:text-blue-700">
                  {category.name}
                </h3>

                <p className="mt-1.5 line-clamp-3 flex-1 text-xs leading-5 text-slate-500">
                  {category.blurb}
                </p>

                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#087F8C]">
                  Browse
                  <ChevronRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}
