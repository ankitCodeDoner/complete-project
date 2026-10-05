import React from "react";
import { PromoBanner } from "./PromoBanner";
import { Stats } from "./Stats";
import { TopBrands } from "./TopBrands";
import { Category } from "./Category";
import { TopSellingProduct } from "./TopSellingProduct";
import { WhyChooseUs } from "./WhyChooseUs";
import { WhatsTrending } from "./WhatsTrending";
import { RegionExport } from "./RegionExport";
import {
  getBanners,
  getBrands,
  getCategories,
  getFeaturedProducts,
  getStats,
  getFeatures,
  getNews,
  getRegions,
} from "@/lib/data";
import OffersOnProduct from "./OffersOnProduct";

export const Home = async () => {
  // Load all homepage data on the server, then pass it to the
  // presentational sections as props. Swapping the JSON loaders for
  // a real API later requires no change to the components below.
  const [
    banners,
    stats,
    brands,
    categories,
    products,
    features,
    news,
    regions,
  ] = await Promise.all([
    getBanners(),
    getStats(),
    getBrands(),
    getCategories(),
    getFeaturedProducts(),
    getFeatures(),
    getNews(),
    getRegions(),
  ]);

  return (
    <div>
      <PromoBanner banners={banners} />
      <Stats stats={stats} />
      <TopBrands brands={brands} />
      <Category categories={categories} />
      <TopSellingProduct products={products} />
      <OffersOnProduct products={products} />
      <WhyChooseUs features={features} />
      {/* <WhatsTrending news={news} /> */}
      {/* <RegionExport regions={regions} /> */}
    </div>
  );
};
