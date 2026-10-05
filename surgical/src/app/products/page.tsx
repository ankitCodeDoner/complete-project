import React from "react";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";
import { ProductListing } from "@/components/shop/ProductListing";
import { getProducts } from "@/lib/data";

export const metadata = pageMetadata({
  title: "All Products",
  description:
    "Shop the full MedVance catalogue of medical equipment, instruments and consumables at wholesale prices with bulk discounts and fast delivery.",
  path: "/products",
});

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageHero
        eyebrow="Marketplace"
        title="All Products"
        subtitle={`Browse our full catalogue of ${products.length}+ medical products across every speciality — filter by brand, origin and speciality to find exactly what you need.`}
        crumbs={[{ label: "Products" }]}
      />

      <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10">
        <ProductListing products={products} />
      </section>
    </>
  );
}
