import React from "react";
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Truck,
} from "lucide-react";
import { iconMap } from "@/lib/icons";
import type { Category as CategoryType } from "@/lib/types";

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

interface CategoryProps {
  categories: CategoryType[];
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const Category: React.FC<CategoryProps> = ({ categories }) => {
  return (
    <section className="w-full bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">

        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-teal-700" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700 sm:text-xs">
                Our Categories
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[#071B35] sm:text-3xl lg:text-4xl">
              Shop by Category
            </h2>

            <p className="mt-2 max-w-lg text-xs leading-5 text-slate-500 sm:text-sm">
              Explore our range of professional medical equipment and healthcare
              products across every speciality.
            </p>
          </div>

          <a
            href="/categories"
            className="group hidden shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-[#071B35] transition-all duration-300 hover:border-[#a7dce9] hover:bg-[#F4FBFB] hover:text-[#087F8C] sm:inline-flex"
          >
            View All
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
          {categories.map((category) => {
            const Icon = iconMap[category.icon];

            return (
              <a
                key={category.id}
                href={category.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#a7dce9] hover:shadow-[0_14px_30px_rgba(14,116,144,0.10)]"
              >
                {/* Soft corner wash that appears on hover */}
                <div
                  className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-70 ${category.bgColor}`}
                />

                {/* Icon chip */}
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${category.bgColor} ${category.iconColor}`}
                >
                  <Icon size={26} strokeWidth={1.7} aria-hidden="true" />
                </div>

                {/* Name */}
                <h3 className="relative mt-4 text-sm font-bold leading-tight text-[#071B35] transition-colors duration-300 group-hover:text-[#087F8C]">
                  {category.name}
                </h3>

                {/* Blurb */}
                <p className="relative mt-1.5 line-clamp-2 flex-1 text-[11px] leading-4 text-slate-400">
                  {category.blurb}
                </p>

                {/* Explore row */}
                <span className="relative mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 transition-colors duration-300 group-hover:text-[#087F8C]">
                  Explore
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            );
          })}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 flex justify-center sm:hidden">
          <a
            href="/categories"
            className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-5 py-2.5 text-xs font-semibold text-[#071B35] transition-all duration-300 hover:border-[#a7dce9] hover:bg-[#F4FBFB] hover:text-[#087F8C]"
          >
            View All Categories
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* Trust Strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-slate-100 pt-7 text-[10px] font-medium text-slate-500 sm:gap-x-10 sm:text-xs">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-[#087F8C]" />
            Quality-Assured
          </div>
          <div className="flex items-center gap-1.5">
            <Stethoscope size={15} className="text-[#087F8C]" />
            Healthcare Solutions
          </div>
          <div className="flex items-center gap-1.5">
            <Truck size={15} className="text-[#087F8C]" />
            Fast Delivery
          </div>
          <div className="flex items-center gap-1.5">
            <Activity size={15} className="text-[#087F8C]" />
            Trusted Supplies
          </div>
        </div>

      </div>
    </section>
  );
};

export default Category;
