import React from "react";
import { notFound } from "next/navigation";
import { ShieldCheck, Truck, Wallet, Headset } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ProductListing } from "@/components/shop/ProductListing";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getCategories,
  getCategory,
  getProductsByCategory,
} from "@/lib/data";
import { collectionGraph, pageMetadata } from "@/lib/seo";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) {
    return pageMetadata({
      title: "Category not found",
      description: "This category is not listed on the MedVance marketplace.",
      path: `/categories/${slug}`,
      noIndex: true,
    });
  }

  const products = await getProductsByCategory(slug);
  const description = `Buy ${category.name.toLowerCase()} online at wholesale prices on MedVance. ${category.blurb} Bulk discounts, fast delivery and secure B2B procurement.`;

  return pageMetadata({
    title: `Buy ${category.name} Online at Best Price`,
    description,
    path: `/categories/${category.slug}`,
    image: products[0]?.image,
    imageAlt: products[0] ? `${category.name}: ${products[0].name}` : category.name,
    keywords: [
      category.name,
      `buy ${category.name}`,
      `${category.name} wholesale`,
      "MedVance",
    ],
  });
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug);

  const brands = Array.from(new Set(products.map((p) => p.brand))).sort();
  const specialities = Array.from(
    new Set(products.map((p) => p.speciality))
  ).sort();

  const whyPoints = [
    {
      icon: Wallet,
      title: "Wholesale pricing",
      text: `Institutional rate cards and bulk tiers on ${category.name.toLowerCase()}, with no hidden markups.`,
    },
    {
      icon: Truck,
      title: "Fast delivery",
      text: "Pan-India dispatch with tracking, plus express delivery in major metros.",
    },
    {
      icon: ShieldCheck,
      title: "Genuine & certified",
      text: "Every product is sourced from authorised manufacturers under our ISO 13485 framework.",
    },
    {
      icon: Headset,
      title: "Procurement support",
      text: "A dedicated desk to help you compare brands and manage repeat orders.",
    },
  ];

  const description = `Looking for a reliable source to buy ${category.name.toLowerCase()}? MedVance brings ${products.length}+ ${category.name.toLowerCase()} products from trusted manufacturers together in one place — ${category.blurb.toLowerCase()}`;

  return (
    <>
      <JsonLd
        data={collectionGraph({
          name: `Buy ${category.name} Online at Best Price`,
          description,
          path: `/categories/${category.slug}`,
          items: products.map((product) => ({
            name: product.name,
            path: `/products/${product.slug}`,
          })),
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Categories", path: "/categories" },
            { name: category.name, path: `/categories/${category.slug}` },
          ],
        })}
      />
      <PageHero
        eyebrow={category.name}
        title={`Buy ${category.name} Online at Best Price`}
        subtitle={description}
        crumbs={[
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
      />

      {/* Listing */}
      <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10">
        <ProductListing products={products} />
      </section>

      {/* SEO: Why choose us */}
      <section className="border-t border-slate-100 bg-[#f5f8fc]">
        <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-[#071B35] sm:text-3xl">
            Why choose MedVance to buy {category.name.toLowerCase()} online
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            MedVance is India&apos;s B2B marketplace for{" "}
            {category.name.toLowerCase()} and every other medical speciality.
            We combine wholesale pricing, a verified supplier network and
            reliable logistics so hospitals, clinics and labs can procure with
            confidence. Whether you need a single unit or institutional volumes,
            you get transparent pricing, genuine certified products and a
            dedicated team to support your purchase from quote to delivery.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E9FAF6] text-[#087F8C]">
                  <point.icon size={22} strokeWidth={1.7} />
                </div>
                <h3 className="text-sm font-bold text-[#10243E]">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-slate-500">
                  {point.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-7 text-slate-600">
            Explore the full {category.name.toLowerCase()} range above, filter
            by brand, country of origin and speciality, and add products to your
            cart or request a bulk quote. Buy {category.name.toLowerCase()}{" "}
            online at the best price on MedVance — trusted by 90,000+ medical
            establishments across India.
          </p>
        </div>
      </section>

      {/* Quick links */}
      {(brands.length > 0 || specialities.length > 0) && (
        <section className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {brands.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#10243E]">
                  By Brand
                </h3>
                <div className="flex flex-wrap gap-2">
                  {brands.map((b) => (
                    <span
                      key={b}
                      className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {specialities.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#10243E]">
                  By Speciality
                </h3>
                <div className="flex flex-wrap gap-2">
                  {specialities.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
