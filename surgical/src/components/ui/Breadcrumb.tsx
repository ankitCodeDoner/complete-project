import React from "react";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
}

/** Simple SEO-friendly breadcrumb trail. The last item is the current page. */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500"
    >
      <a
        href="/"
        className="flex items-center gap-1 transition hover:text-[#087F8C]"
      >
        <Home size={13} />
        <span className="sr-only sm:not-sr-only">Home</span>
      </a>

      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={`${item.label}-${i}`}>
            <ChevronRight size={13} className="text-slate-300" />
            {item.href && !isLast ? (
              <a
                href={item.href}
                className="transition hover:text-[#087F8C]"
              >
                {item.label}
              </a>
            ) : (
              <span
                className={isLast ? "font-semibold text-[#10243E]" : undefined}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
