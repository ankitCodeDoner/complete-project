import React from "react";
import { Breadcrumb, type Crumb } from "./Breadcrumb";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  /** Optional eyebrow label above the title. */
  eyebrow?: string;
  children?: React.ReactNode;
}

/** Light hero band with breadcrumb + title used at the top of pages. */
export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  crumbs,
  eyebrow,
  children,
}) => {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-[#f5f8fc] to-white">
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <Breadcrumb items={crumbs} />

        {eyebrow && (
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-teal-700">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#071B35] sm:text-3xl lg:text-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </section>
  );
};

export default PageHero;
