import React from "react";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { getNews } from "@/lib/data";

export const metadata = pageMetadata({
  title: "Blog & News",
  description:
    "Company announcements, partnership updates, press mentions and procurement insights from the MedVance team.",
  path: "/blog",
});

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default async function BlogPage() {
  const news = await getNews();
  const [featured, ...rest] = news;

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="Blog, News & Press"
        subtitle="Announcements, partnerships and practical insights on medical procurement from the MedVance team."
        crumbs={[{ label: "Blog" }]}
      />

      <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        {/* Featured */}
        {featured && (
          <a
            href={featured.href}
            className="group mb-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 lg:aspect-auto">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <span className="mb-3 w-fit rounded-full bg-[#F4FBFB] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#087F8C]">
                {featured.tag}
              </span>
              <h2 className="text-xl font-bold leading-snug text-[#071B35] transition-colors group-hover:text-[#087F8C] sm:text-2xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {featured.excerpt}
              </p>
              <div className="mt-5 flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={13} />
                  {formatDate(featured.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {featured.readTime}
                </span>
              </div>
            </div>
          </a>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(15,35,65,0.08)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#087F8C] shadow-sm">
                  {item.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={12} />
                    {formatDate(item.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {item.readTime}
                  </span>
                </div>
                <h3 className="line-clamp-2 text-base font-bold leading-snug text-[#10243E] transition-colors group-hover:text-[#087F8C]">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-500">
                  {item.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#087F8C]">
                  Read more
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
