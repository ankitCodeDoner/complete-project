import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { getNews, getNewsItem } from "@/lib/data";
import { articleGraph, pageMetadata } from "@/lib/seo";

interface Params {
  params: Promise<{ slug: string }>;
}

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = await getNewsItem(slug);
  if (!post) {
    return pageMetadata({
      title: "Article not found",
      description: "This article is not available on the MedVance newsroom.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    imageAlt: post.title,
    keywords: [post.tag, post.title, "MedVance", "healthcare procurement"],
    openGraphType: "article",
    publishedTime: post.date,
    authors: [post.author],
    section: post.tag,
    tags: [post.tag],
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getNewsItem(slug);
  if (!post) notFound();

  const related = (await getNews())
    .filter((n) => n.slug !== post.slug)
    .slice(0, 3);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <JsonLd data={articleGraph(post, crumbs)} />
      <Breadcrumb
        items={[{ label: "Blog", href: "/blog" }, { label: post.tag }]}
      />

      <span className="mt-6 inline-block rounded-full bg-[#F4FBFB] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#087F8C]">
        {post.tag}
      </span>

      <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-[#071B35] sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <User size={13} className="text-[#087F8C]" />
          {post.author}
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarDays size={13} className="text-[#087F8C]" />
          {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={13} className="text-[#087F8C]" />
          {post.readTime}
        </span>
      </div>

      <div className="relative mt-7 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-8 space-y-5">
        <p className="text-base font-medium leading-7 text-[#334155]">
          {post.excerpt}
        </p>
        {post.content.map((para, i) => (
          <p key={i} className="text-[15px] leading-8 text-slate-600">
            {para}
          </p>
        ))}
      </div>

      <div className="mt-10 border-t border-slate-100 pt-6">
        <a
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087F8C] hover:underline"
        >
          <ArrowLeft size={15} />
          Back to all articles
        </a>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-5 text-lg font-bold text-[#071B35]">
            More from the newsroom
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 text-sm font-bold leading-snug text-[#10243E] transition-colors group-hover:text-[#087F8C]">
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
