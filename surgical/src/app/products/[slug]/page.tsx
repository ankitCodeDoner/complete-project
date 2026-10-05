import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductBuyPanel } from "@/components/shop/ProductBuyPanel";
import { ProductCard } from "@/components/ui/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getProducts,
  getProduct,
  getRelatedProducts,
} from "@/lib/data";
import { pageMetadata, productGraph } from "@/lib/seo";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) {
    return pageMetadata({
      title: "Product not found",
      description: "This product is not listed on the MedVance marketplace.",
      path: `/products/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: product.name,
    description: `${product.name} by ${product.brand}. ${product.description} Wholesale price ₹${product.price.toLocaleString("en-IN")}.`,
    path: `/products/${product.slug}`,
    image: product.image,
    imageAlt: product.name,
    keywords: [
      product.name,
      product.brand,
      product.category,
      product.generic,
      product.speciality,
      "wholesale",
    ],
  });
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);

  const deliveryInfo = [
    { icon: Truck, title: "Fast delivery", text: "Dispatch in 24–48 hrs" },
    { icon: ShieldCheck, title: "Genuine product", text: "Authorised source" },
    { icon: RotateCcw, title: "Easy returns", text: "7-day return policy" },
  ];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: product.category, path: `/categories/${product.categorySlug}` },
    { name: product.name, path: `/products/${product.slug}` },
  ];

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-10">
      <JsonLd data={productGraph(product, crumbs)} />
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          {
            label: product.category,
            href: `/categories/${product.categorySlug}`,
          },
          { label: product.name },
        ]}
      />

      {/* Main */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8"
              priority
            />
            {product.discount > 0 && (
              <span className="absolute left-4 top-4 rounded-lg bg-[#14866d] px-2.5 py-1 text-xs font-bold text-white">
                {product.discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          <a
            href={`/brands/${product.brandSlug}`}
            className="text-xs font-bold uppercase tracking-wide text-[#087F8C] hover:underline"
          >
            {product.brand}
          </a>

          <h1 className="mt-2 text-2xl font-bold leading-snug text-[#071B35] sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <span className="flex items-center gap-1 rounded-md bg-[#F4FBFB] px-2 py-1 text-sm font-semibold text-[#10243E]">
              <Star size={14} fill="#fbbf24" className="text-[#fbbf24]" />
              {product.rating}
            </span>
            <span className="text-sm text-slate-400">
              {product.reviews} reviews
            </span>
            <span className="text-sm text-slate-300">|</span>
            <span className="text-sm text-slate-500">{product.generic}</span>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-600">
            {product.description}
          </p>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <ProductBuyPanel product={product} />
          </div>

          {/* Delivery info */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {deliveryInfo.map((info) => (
              <div
                key={info.title}
                className="rounded-xl border border-slate-200 bg-white p-3 text-center"
              >
                <info.icon
                  size={20}
                  className="mx-auto mb-2 text-[#087F8C]"
                  strokeWidth={1.7}
                />
                <p className="text-xs font-bold text-[#10243E]">{info.title}</p>
                <p className="mt-0.5 text-[10px] text-slate-400">{info.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="mb-4 text-lg font-bold text-[#071B35]">
            Specifications
          </h2>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: "Brand", value: product.brand },
                  { label: "Category", value: product.category },
                  { label: "Generic Name", value: product.generic },
                  { label: "Country of Origin", value: product.origin },
                  { label: "Pack Size", value: product.packSize },
                  { label: "Speciality", value: product.speciality },
                  ...product.specs,
                ].map((row, i) => (
                  <tr
                    key={`${row.label}-${i}`}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#f7f9fc]"}
                  >
                    <td className="w-1/2 px-4 py-3 font-medium text-slate-500">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#10243E]">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold text-[#071B35]">
            Delivery &amp; Returns
          </h2>
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600">
            <p>
              <span className="font-semibold text-[#10243E]">Delivery:</span>{" "}
              In-stock orders are dispatched within 24–48 hours with tracked
              shipping. Express delivery is available in major metros. Delivery
              estimates are confirmed at checkout based on your location.
            </p>
            <p>
              <span className="font-semibold text-[#10243E]">Returns:</span>{" "}
              Unused products in original packaging can be returned within 7
              days. Certain sterile and cold-chain items are non-returnable for
              safety reasons.
            </p>
            <p>
              <span className="font-semibold text-[#10243E]">Bulk orders:</span>{" "}
              Need institutional volumes? Use{" "}
              <span className="font-semibold text-[#087F8C]">Request Quote</span>{" "}
              for custom pricing and credit terms.
            </p>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-5 text-xl font-bold text-[#071B35]">
            Related Products
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
