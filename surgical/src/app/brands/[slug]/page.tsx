import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, CalendarDays, Package } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductListing } from "@/components/shop/ProductListing";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBrands, getBrand, getProductsByBrand } from "@/lib/data";
import { collectionGraph, pageMetadata } from "@/lib/seo";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const brand = await getBrand(slug);
  if (!brand) {
    return pageMetadata({
      title: "Brand not found",
      description: "This brand is not listed on the MedVance marketplace.",
      path: `/brands/${slug}`,
      noIndex: true,
    });
  }

  const products = await getProductsByBrand(slug);

  return pageMetadata({
    title: `${brand.name} Products`,
    description: `${brand.description} Shop ${brand.name} medical supplies at wholesale prices on MedVance. Origin: ${brand.origin}.`,
    path: `/brands/${brand.slug}`,
    image: products[0]?.image,
    imageAlt: products[0] ? `${brand.name}: ${products[0].name}` : brand.name,
    keywords: [brand.name, ...brand.specialities, "wholesale", "MedVance"],
  });
}

export default async function BrandPage({ params }: Params) {
  const { slug } = await params;
  const brand = await getBrand(slug);
  if (!brand) notFound();

  const products = await getProductsByBrand(slug);

  return (
    <>
      <JsonLd
        data={collectionGraph({
          name: `${brand.name} Products`,
          description: brand.description,
          path: `/brands/${brand.slug}`,
          items: products.map((product) => ({
            name: product.name,
            path: `/products/${product.slug}`,
          })),
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Brands", path: "/brands" },
            { name: brand.name, path: `/brands/${brand.slug}` },
          ],
        })}
      />
      {/* Brand hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-[#f5f8fc] to-white">
        <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <Breadcrumb
            items={[
              { label: "Brands", href: "/brands" },
              { label: brand.name },
            ]}
          />

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-24 w-40 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={150}
                height={72}
                className="h-auto max-h-[68px] w-auto max-w-[136px] object-contain"
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-[#071B35] sm:text-3xl">
                {brand.name}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                {brand.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#087F8C]" />
                  {brand.origin}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-[#087F8C]" />
                  Established {brand.established}
                </span>
                <span className="flex items-center gap-1.5">
                  <Package size={14} className="text-[#087F8C]" />
                  {brand.productCount}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {brand.specialities.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-[#F4FBFB] px-3 py-1 text-[11px] font-semibold text-[#087F8C]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10">
        <h2 className="mb-6 text-xl font-bold text-[#071B35]">
          {brand.name} Products
        </h2>

        {products.length > 0 ? (
          <ProductListing products={products} hideFacets={["brand"]} />
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center text-sm text-slate-500">
            Products from this brand are being added soon.
          </p>
        )}
      </section>
    </>
  );
}
