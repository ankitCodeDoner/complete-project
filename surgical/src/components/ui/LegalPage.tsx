import React from "react";
import { PageHero } from "./PageHero";

export interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

/** Shared layout for the site's policy / legal pages. */
export const LegalPage: React.FC<LegalPageProps> = ({
  title,
  updated,
  intro,
  sections,
}) => {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        crumbs={[{ label: title }]}
      />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        <p className="text-xs font-medium text-slate-400">
          Last updated: {updated}
        </p>

        <p className="mt-4 text-sm leading-7 text-slate-600">{intro}</p>

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-bold text-[#071B35]">
                {section.heading}
              </h2>
              <div className="mt-2 space-y-3">
                {section.body.map((para, i) => (
                  <p key={i} className="text-sm leading-7 text-slate-600">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 rounded-xl bg-[#f5f8fc] px-4 py-3 text-xs leading-6 text-slate-500">
          This is placeholder content for demonstration and should be replaced
          with your organisation&apos;s reviewed legal text before going live.
        </p>
      </section>
    </>
  );
};

export default LegalPage;
